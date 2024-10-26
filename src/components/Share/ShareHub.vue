<template>
  <div style="margin-top: -50px;">
    <template v-if="loading">
      <v-container fluid class="d-flex align-center justify-center">
        <v-row class="text-center">
          <v-col>
            <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid class="d-flex align-center justify-center">
        <v-row class="text-center">
          <v-col>
            <h3>
              潮平两岸阔，风正一帆悬。
            </h3>
            <h4>
              欢迎回到航U邦。
            </h4>
            <span>正在获取资源站。</span>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <v-container>
        <v-card outlined class="pa-4 top" @mouseleave="onCardMouseLeave()">
          <div class="filters">
            <v-row class="align-center">
              <v-col cols="auto">
                <span><strong>排序</strong>:</span>
              </v-col>
              <v-col>
                <span @click="setFilter('sort_by', 0)" :class="{ active: filters.sort_by === 0 }">综合</span>
                <span @click="setFilter('sort_by', 1)" :class="{ active: filters.sort_by === 1 }">最多点赞</span>
                <span @click="setFilter('sort_by', 4)" :class="{ active: filters.sort_by === 4 }">最多收藏</span>
                <span @click="setFilter('sort_by', 2)" :class="{ active: filters.sort_by === 2 }">最近创建</span>
                <span @click="setFilter('sort_by', 3)" :class="{ active: filters.sort_by === 3 }">最近评论</span>
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="auto">
                <span><strong>收费</strong>:</span>
              </v-col>
              <v-col>
                <v-radio-group v-model="filters.pay" row>
                  <v-radio label="不限" :value="0"></v-radio>
                  <v-radio label="收费" :value="1"></v-radio>
                  <v-radio label="免费" :value="2"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </div>
          <!-- 底部的搜索栏 -->
          <v-divider></v-divider>
          <v-row class="mt-4">
            <v-col>
              <v-text-field v-model="filters.search" label="请输入搜索内容" placeholder="" filled append-icon="mdi-magnify"
                hide-details></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <v-container>

<!-- todo:这里只写了一个静态卡片，感觉接口最好改一下 -->
        <v-row>
          <v-col>
            <v-card outlined>
              <v-row no-gutters class="picture"> <!-- 给整个 v-row 添加 padding -->
                <v-col cols="auto" class="d-flex align-center"> <!-- 确保图片在垂直方向上居中 -->
                  <v-img src="@/assets/images/blogDefault.png" aspect-ratio="1" height="110px" width="110px"
                    contain></v-img>
                </v-col>
                <v-col>
                  <v-card-title>
                    计算机组成考试题（2023-2024学年）
                    <v-icon color="#F8CC00"> mdi-bitcoin </v-icon>
                  </v-card-title>
                  <v-card-subtitle>
                    这是一份计算机组成考试题，希望对大家有所帮助。目前正确答案正在整理中...
                  </v-card-subtitle>
                  <div style="margin-left: 1.8%;"> <!-- 添加左边距 -->
                    <v-chip color="aqua" label small class="me-3">计算机组成</v-chip>
                    <v-chip color="aqua" label small class="me-3">考试题</v-chip>
                    <v-chip color="aqua" label small class="me-3">2023-2024</v-chip>
                  </div>
                  <v-card-actions style="margin-left: 0.8%;">
                    <div>
                      <span>
                        <v-icon style="display: inline-block; margin-top: -7px;">mdi-thumb-up</v-icon>
                        <span class="ml-2">3407</span>
                      </span>
                      <span>
                        <v-icon>mdi-thumb-down</v-icon>
                        <span class="ml-2">109</span>
                      </span>
                      <span>
                        <v-icon>mdi-heart-box</v-icon>
                        <span class="ml-2">96</span>
                      </span>
                      <span>
                        <v-icon>mdi-comment-multiple</v-icon>
                        <span class="ml-2">12</span>
                      </span>
                    </div>
                    <div class="ml-auto">
                      <span>张三</span>
                      <span>2024-04-29</span>
                    </div>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ShareHub',
  data() {
    return {
      loading: true,
      filters: {
        sort_by: 0,
        pay: 0,
        search: ''
      },
      filtersChanged: false, // 用来标记 filters 是否有变化
      posts: [],
    };
  },
  watch: {
    filters: {
      deep: true, // 深度监听对象
      handler() {
        this.filtersChanged = true;
      },
    },
  },
  methods: {
    onCardMouseLeave() {
      if (this.filtersChanged) {
        // 如果 filters 有变化，就重新获取数据
        this.getPosts();
        this.filtersChanged = false; // 重置变化标记
      }
    },
    setFilter(type, value) {
      this.filters[type] = value;
    },
    getPosts() {
      // 获取数据
      this.$store.dispatch("getPosts",{pay: this.filters.pay, sort_by: this.filters.sort_by, search: this.filters.search})
        .then(res => {
          this.posts = res.posts;
        })
        .catch(_ => {
          this.posts = [];
          this.$store.commit("setAlert", { type: "error", message: "无法连接到资源站。请检查你的网络设置。" })
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
      this.$store.commit("setAppTitle", "共享资源站");
      this.getPosts();
    },
};
</script>

<style scoped>
.top {
  border-width: 3px !important;
  /* 只改变边框粗细 */
  border-style: solid;
  border-radius: 5px;
  /* 可选，增加圆角效果 */
}

span {
  cursor: pointer;
  margin-right: 20px;
  color: gray;
}

.active {
  color: orange;
}

.filters {
  padding: 10px;
  /* 内边距 */
  display: inline-block;
  /* 确保 span 是块元素，并且 padding 生效 */
}

.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin: 0 5px;
  width: max-content;
  height: 20px;
  font-size: 12px;
  font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
  color: #3d3d3d;
  background: #d9fe32;
  border-radius: 10px;
}

.picture {
  padding-left: 1%;
  padding-top: 0.3%;
  padding-bottom: 0.1%;
}
</style>
