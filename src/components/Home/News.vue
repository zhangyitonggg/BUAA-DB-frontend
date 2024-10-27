<template>
  <div>
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
              欢迎回到 ASEPT。
            </h4>
            <span>正在获取公告。</span>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <v-row justify="center">
        <v-expansion-panels inset v-model="activePanel">
          <v-expansion-panel
            v-for="(item, i) in news"
            :key="i"
          >
            <v-expansion-panel-header>
              <div style="display: flex; justify-content: space-between; width: 100%;">
                <div>{{ item.title }}</div>
                <div style="color: grey; text-align: right; margin-right: 16px;">
                  <span>{{ formatDate(item.notified_at) }}</span>
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-md-preview :text="item.content"></v-md-preview>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </template>
    <v-banner v-if="news.length === 0">
      好吧，看起来现在还没有公告。
    </v-banner>
  </div>
</template>

<script>
import { format } from 'date-fns';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

export default {
  name: "NewsList",
  components: {
    VMdPreview
  },
  data() {
    return {
      news: [],
      loading: true,
      activePanel: 0, // 默认展开第一个面板，设置为数字
    }
  },
  mounted() {
    this.$store.commit("setAppTitle", "公告");
    this.$store.dispatch("getNews", { page: 1 })
      .then(res => {
        this.news = res.messages;
      })
      .catch(_ => {
        this.news = [];
        this.$store.commit("setAlert", { type: "error", message: "无法获取公告。请检查你的网络设置。" })
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    formatDate(dateString) {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
    },
  }
}
</script>

<style scoped>
.v-expansion-panel-header {
  font-size: large;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.panel-content {
  margin-top: 30px;
}
</style>
