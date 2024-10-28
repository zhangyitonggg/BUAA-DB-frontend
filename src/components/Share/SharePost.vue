<template>
    <v-app>
      <v-container>
        <!-- 返回按钮 -->
        <v-btn 
          icon 
          @click="$router.go(-1)" 
          style="position: fixed; left: 65px; top: 80px; background-color: #1976D2; color: white; border-radius: 50%; padding: 8px; z-index: 1000;"
          class="elevation-2 hoverable"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
  
        <!-- 帖子标题部分 -->
        <v-card class="mt-5 pa-5">
          <v-card-title class="d-flex align-center">
            <v-avatar size="40" style="margin-left:-20px;">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Author" />
            </v-avatar>
            <span class="title font-weight-bold">资源分享：开发者必备工具</span>
            <v-chip class="ml-3" color="green" dark small>#工具推荐</v-chip>
            <v-chip class="ml-1" color="green" dark small>#开发者</v-chip>
          </v-card-title>
          <v-card-subtitle class="grey--text text--darken-1" style="margin-left: 32px;">发表于 2024-10-17 15:55</v-card-subtitle>
          <v-divider></v-divider>
          
          <!-- 帖子内容部分 -->
          <v-card-text>
            <v-md-preview :text="testText"></v-md-preview>                
          </v-card-text>
          
          <!-- 按钮操作 -->
          <v-card-actions>
            <v-btn color="red" outlined>下载资源</v-btn>
            <v-btn text>评论</v-btn>
            <v-btn text>点赞</v-btn>
            <v-btn text>收藏</v-btn>
            <v-btn text>关注作者</v-btn>
          </v-card-actions>
        </v-card>
  
        <!-- 回答部分 -->
        <v-card class="mt-5 pa-5">
          <v-card-title>2 条分享</v-card-title>
          <v-divider></v-divider>
          
          <v-card class="pa-3 my-3" outlined>
            <v-card-title class="d-flex align-center">
              <v-avatar size="30" class="mr-2">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="User" />
              </v-avatar>
              <span>用户123 - 发表于 2024-10-17 16:07</span>
            </v-card-title>
            <v-card-text>
              <p>我推荐 <strong>Docker</strong>，非常好用的容器化工具，能让部署更简单。</p>
            </v-card-text>
            <v-card-actions>
              <v-btn icon>
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
              <v-btn text>评论</v-btn>
            </v-card-actions>
          </v-card>
  
          <v-card class="pa-3 my-3" outlined>
            <v-card-title class="d-flex align-center">
              <v-avatar size="30" class="mr-2">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="User" />
              </v-avatar>
              <span>开发者小张 - 发表于 2024-10-17 16:10</span>
            </v-card-title>
            <v-card-text>
              <p>我最近在用 <strong>Figma</strong> 设计工具，非常棒，适合团队协作。</p>
            </v-card-text>
            <v-card-actions>
              <v-btn icon>
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
              <v-btn text>评论</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script>
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
  export default {
    name: "PostPage",
    components: {
        VMdPreview
    },
    data() {
      return {
        // Data goes here
        testText:  "## Docker \n 大家好！今天想跟大家分享一些我在开发中常用的工具，希望对大家有所~~帮助~~。 \n\n ```c\nint a = 1;\n```\n ### 请在下方下载资源包。",
      };
    },
  };
  </script>
  
  <style scoped>
  .title {
    font-size: 24px;
    margin-left:10px;
  }
  .v-code {
    font-family: 'Courier New', monospace;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    color: #333;
  }
  </style>
  