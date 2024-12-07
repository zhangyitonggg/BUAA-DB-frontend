<template>
    <v-container style="max-width: 70%;">
      <div class="follow-list" v-if="users.length != 0">
        <div v-for="(user, index) in users" :key="index" class="user-card">
          <img :src="user.avatar" class="avatar" />
          <div class="user-info">
            <div class="user-name">
              {{ user.username }}
              <span v-if="user.isAdmin" class="verified-badge">✔</span>
            </div>
            <div class="user-description">{{ user.description }}</div>
          </div>
          <button class="follow-btn" :class="{ followed: user.followed }" @click="unFollow(user)">
            取消关注
          </button>
        </div>
      </div>
      <div v-else>
        <v-alert type="info">你还没有关注任何人哦。</v-alert>
      </div>
    </v-container>
</template>
<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  watch: {
  },
  methods: {
    unFollow(user) {
      this.$store.dispatch("notFollowUser", { id: user.id }).then(() => {
        user.followed = false;
        this.users = this.users.filter(u => u !== user);
      }).catch((err) => {
        this.$store.commit("setAlert", {
          type: "error",
          message: err,
        });
      });
    },
  },
  mounted() {
    this.$store.commit("setAppTitle", "我的关注");
    this.$store.dispatch("getFollows", { id: this.$store.state._user_id_ }).then((res) => {
      this.users = res.users;
    }).catch((err) => {
      this.$store.commit("setAlert", {
        type: "error",
        message: err,
      });
    })
  },
};
</script>

<style scoped>
  .follow-list {
    max-width: 900px;
    margin: 0 auto;
    padding: 10px;
  }

  .user-card {
    display: flex;
    align-items: center;
    padding: 15px;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }

  .user-info {
    flex: 1;
  }

  .user-name {
    font-size: 14px;
    font-weight: bold;
  }

  .verified-badge {
    color: orange;
    margin-left: 5px;
  }

  .user-description {
    color: #666;
    font-size: 12px;
  }

  .follow-btn {
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 5px 15px;
    cursor: pointer;
    outline: none;
    font-size: 12px;
  }

  .followed {
    border-color: #aaa;
    color: #aaa;
  }

  .follow-btn:hover {
    border-color: #888;
  }
</style>
