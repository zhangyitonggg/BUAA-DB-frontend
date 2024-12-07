<template>
  <v-container style="max-width: 70%;">
    <div class="posts-list">
      <div v-for="(post, index) in posts" :key="index" class="card">
        <div class="post-card">
          <!-- Post Info Section -->
          <div class="post-info" @click="viewPost(post.id)">
            <h3>{{ post.title }}</h3>
            <v-chip v-for="(tag, tagIndex) in post.tags" :key="tagIndex" color="light-green" label small class="me-3 tag">
              {{ tag }}
            </v-chip>
            <p class="info-text">
              分享者: <span class="username">{{ post.created_by.username }}</span> &nbsp;&nbsp;&nbsp;
              分享时间: <span class="timestamp">{{ post.created_at }}</span>
            </p>
          </div>
          <!-- Action Buttons on Top Right -->
          <div class="action-buttons">
            <v-btn icon @click="removeFavorite(post.id)" class="remove-btn">
              <v-icon>mdi-heart-remove</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    viewPost(postId) {
      window.open(`/resources/${postId}`, "_blank");
    },
    removeFavorite(postId) {
      this.$store.dispatch("notFavourPost", {id: postId})
        .then((res) => {
          this.posts = this.posts.filter((post) => post.id !== postId);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  mounted() {
    this.$store.commit("setAppTitle", "我的收藏");
    this.$store.dispatch("getFavorites", {id: this.$store.state._user_id_})
      .then((res) => {
        this.posts = res.favourites;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
.posts-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.card {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  margin-bottom: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.post-card {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.post-info {
  margin-left: 20px;
  color: #333;
}

.post-info h3 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.info-text {
  margin: 10px 0;
  font-size: 14px;
  color: #666;
}

.username {
  font-weight: 600;
  color: #3f51b5;
}

.timestamp {
  font-style: italic;
  color: #999;
}

.tag {
  background-color: #1ba160;
  color: #fff;
  border-radius: 15px;
  margin-right: 8px;
  margin-bottom: 0px;
}

.action-buttons {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 12px;
}

.view-btn, .remove-btn {
  color: #3f51b5;
  transition: color 0.3s ease;
}

.view-btn:hover, .remove-btn:hover {
  color: #ff4081;
}

.view-btn, .remove-btn {
  font-size: 20px;
}

.view-btn v-icon, .remove-btn v-icon {
  font-size: 24px;
}
</style>
