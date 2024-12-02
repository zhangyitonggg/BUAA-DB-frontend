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
            <span class="title font-weight-bold">{{ post.title }}</span>
            <v-chip 
              v-for="(tag, index) in post.tags" 
              :key="index" 
              class="ml-1" 
              color="green" 
              dark 
              small>
              {{ "#" + tag }}
            </v-chip>
          </v-card-title>
          <v-card-subtitle class="grey--text text--darken-1" style="margin-left: 32px;">发表于 {{ post.created_at }}</v-card-subtitle>
          <v-divider></v-divider>
          
          <!-- 帖子内容部分 -->
          <v-card-text>
            <v-md-preview :text="post.content"></v-md-preview>                
          </v-card-text>
          
          <!-- 按钮操作 -->
          <v-card-actions class="d-flex justify-space-between flex-wrap">
            <!-- 点赞、点踩、收藏 -->
            <div class="d-flex">
              <v-btn text @click="toggleLike">
                <v-icon :color="post.like ? 'red lighten-1' : 'gray'">mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn text @click="toggleDisLike">
                <v-icon :color="post.dislike ? 'red lighten-1' : 'gray'">mdi-thumb-down</v-icon>
              </v-btn>
              <v-btn text @click="togglefavorite">
                <v-icon :color="post.favorite ? 'red lighten-1' : 'gray'">mdi-heart-box</v-icon>
              </v-btn>
              <v-btn text @click="openCommentDialog()">
                <v-icon >mdi-comment-multiple</v-icon>
              </v-btn>
            </div>
            
            <!-- 操作按钮 -->
            <div class="d-flex" style="gap: 16px;">
              <v-btn color="red" outlined @click="openBhpan">下载资源</v-btn>
              <v-btn color="blue" outlined @click="toggleFollow">{{ followed ? '取消关注' : '关注作者' }}</v-btn>
            </div>
          </v-card-actions>
        </v-card>
        
        <!-- 回答部分 -->
        <v-card class="mt-5 pa-5">
          <v-card-title>{{ comments.length }} 条分享</v-card-title>
          <v-divider></v-divider>

          <div v-for="(comment, index) in comments" :key="index">
            <v-card class="pa-2 my-3" outlined>
              <!-- 用户信息 -->
              <v-card-title class="d-flex align-center">
                <v-avatar size="30" class="mr-2">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="User" />
                </v-avatar>
                <span style="font-size: 1.2rem; font-weight: bold;">{{ comment.created_by.username }} - 发表于 {{ comment.created_at }}</span>
              </v-card-title>
              
              <!-- 评论内容 -->
              <v-card-text>
                <p style="font-size: 1rem;">{{ comment.content }}</p>
              </v-card-text>
            </v-card>
            
          </div>
        </v-card>
      </v-container>
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card class="pa-4 rounded elevation-3" color="#f5f5f5">
          <!-- 标题 -->
          <v-card-title class="d-flex justify-center text-center">
            <span class="headline font-weight-bold" style="color: #1976d2;">请输入您的评论</span>
          </v-card-title>
      
          <!-- 输入框 -->
          <v-card-text class="pa-0">
            <v-textarea
              v-model="newComment"
              outlined
              label="写下您的评论..."
              rows="4"
              clearable
              class="mb-2"  
              color="primary"
            ></v-textarea>
          </v-card-text>
      
          <!-- 动作按钮 -->
          <v-card-actions class="d-flex justify-end">
            <v-btn outlined color="red" class="mr-2" @click="dialog = false">
              取消
            </v-btn>
            <v-btn outlined color="green" @click="submitComment">
              提交
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
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
        post: {
          tags: [
            "工具推荐", "开发者"
          ],
          title: "资源分享：开发者必备工具",
          content:  "## Docker \n 大家好！今天想跟大家分享一些我在开发中常用的工具，希望对大家有所~~帮助~~。 \n\n ```c\nint a = 1;\n```\n ### 请在下方下载资源包。",
          bhpan_url:"https://bhpan.buaa.edu.cn/link/AAA86BCF578B0049A582920EA83FEE2F78",
          created_at: "2024-11-12 12:00:12",
          favorites: 12,
          likes: 23,
          dislikes: 2,
          created_by: {
            user_id: 1,
            username: "John Doe",
          },
          like: true,
          dislike: false,
          favorite: true,
        }, 
        followed: false,
        dialog: false, // 控制弹框显示
        newComment: "", // 用户输入的评论
        comments: [
          {
            content: "我推荐 Docker，非常好用的容器化工具，能让部署更简单。",
            created_at: "2024-10-17 16:07",
            likes: 12,
            dislikes: 1,
            created_by: {
              user_id: 2,
              username: "用户123",
            },  

          },
          {
            content: "我最近在用 Figma 设计工具，非常棒，适合团队协作。",
            created_at: "2024-10-17 16:10",
            likes: 23,
            dislikes: 2,
            created_by: {
              user_id: 3,
              username: "开发者小张",
            },  

          },
        ]
      };
    },
    methods: {
      getPost() {
        // todo 调 1.获得post的接口以及 2.获得评论的接口 以及 3.获得是否关注的接口
      },
      openBhpan() {
        window.open(this.post.bhpan_url);
      },
      toggleLike() {
        if (this.post.like == false) {
          this.post.like = true;
          // todo 调用点赞接口
          if (this.post.dislike == true) {
            this.post.dislike = false;
            // todo 调用取消点踩接口
          }
        } else {
          this.post.like = false;
          // todo 调用取消点赞接口
        }
      },
      toggleDisLike() {
        if (this.post.dislike == false) {
          this.post.dislike = true;
          // todo 调用点踩接口
          if (this.post.like == true) {
            this.post.like = false;
            // todo 调用取消点赞接口
          }
        } else {
          this.post.dislike = false;
          // todo 调用取消点踩接口
        }
      },
      togglefavorite() {
        if (this.post.favorite == true) {
          this.post.favorite = false;
          // todo 调用取消收藏接口
        } else {
          this.post.favorite = true;
          // todo 调用收藏接口
        }
      },
      toggleFollow() {
        if (this.followed == false) {
          this.followed = true;
          // todo 调用关注接口
        } else {
          this.followed = false;
          // todo 调用取消关注接口
        }
      },
      openCommentDialog() {
        this.dialog = true;
        this.newComment = ""; // 初始化评论输入框
      },
      submitComment() {
        // 处理评论提交逻辑
        if (this.newComment.trim() !== "") {
          this.dialog = false;
          // todo 调用提交评论接口
          // todo 重新获取一下评论
        } else {
          this.$store.commit("setAlert", { "type": "error", "message": "评论不可以为空。" });
        }
      },
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
  