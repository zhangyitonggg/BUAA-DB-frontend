<template>
  <v-menu
    bottom
    min-width="130px"
    rounded
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-on="on"
        v-bind="attrs"
      >
        <v-avatar size="36" >
          <img src="@/assets/images/zyt.png">
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-row no-gutters>
              <v-col class="text-center">
                <v-btn depressed text @click="navigateTo('/follows')">
                  <div>
                    <h2> {{ this.followCount }} </h2>
                    关注
                  </div>
                </v-btn>
              </v-col>
              <v-col class="text-center">
                <v-btn depressed text @click="navigateTo('/favorites')">
                  <div>
                    <h2> {{ this.favoriteCount }} </h2>
                    收藏
                  </div>
                </v-btn>
              </v-col>
              <v-col class="text-center">
                <v-btn depressed text @click="navigateTo('/resources/own')">
                  <div>
                    <h2> {{ this.postCount }} </h2>
                    分享
                  </div>
                </v-btn>
              </v-col>
              <v-col class="text-center">
                <v-btn depressed text @click="navigateTo('/tasks/own')">
                  <div>
                    <h2> {{ this.tasksCount }} </h2>
                    任务
                  </div>
                </v-btn>
              </v-col>
            </v-row>
            <v-divider class="my-3" />
            <v-btn depressed rounded text @click="navigateTo('/resources/share')">
              发布共享
            </v-btn>
            <v-divider class="my-3" />
            <v-btn depressed rounded text @click="navigateTo('/tasks/add')">
              发布任务
            </v-btn>
            <v-divider class="my-3" />
            <v-btn depressed rounded text @click="navigateTo('/center')">
              个人中心
            </v-btn>
            <v-divider class="my-3" />
            <v-btn rounded text color="error" @click="logout">
              注销
            </v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      followCount: 0,
      postCount: 0,
      favoriteCount: 0,
      tasksCount: 0,
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route).catch((err) => {
        if (err.name !== "NavigationDuplicated") {
          throw err;
        }
      });
    },
    logout() {
      this.$store.commit("clearPersonalInfo");
      this.$router.push("/auth");
    },
  },
  mounted() {
    this.$store.dispatch("getFollows", { id: this.$store.state._user_id_ })
      .then((res) => {
        this.followCount = res.total
      })
      .catch((err) => {
        this.$store.commit("setAlert", {
          type: "error",
          message: err,
        });
      });
    this.$store.dispatch("ownPosts",)
      .then((res) => {
        this.postCount = res.total
      })
      .catch((err) => {
        this.$store.commit("setAlert", {
          type: "error",
          message: err,
        });
      });
    this.$store.dispatch("getFavorites", { id: this.$store.state._user_id_ })
      .then((res) => {
        this.favoriteCount = res.total
      })
      .catch((err) => {
        this.$store.commit("setAlert", {
          type: "error",
          message: err,
        });
      });
    this.$store.dispatch("ownTasks")
      .then((res) => {
        this.tasksCount = res.total
      })
      .catch((err) => {
        this.$store.commit("setAlert", {
          type: "error",
          message: err,
        });
      });
  },
};
</script>

<style scoped>
.v-card {
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  border-radius: 8px;
  min-width: auto;
}
</style>