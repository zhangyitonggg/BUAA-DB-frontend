<template>
  <v-app>
    <v-container>
      <!-- 返回按钮 -->
      <v-btn icon @click="$router.go(-1)"
        style="position: fixed; left: 65px; top: 80px; background-color: #1976D2; color: white; border-radius: 50%; padding: 8px; z-index: 1000;"
        class="elevation-2 hoverable">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <!-- 帖子标题部分 -->
      <v-card class="mt-5 pa-5">
        <v-card-title class="d-flex align-center">
          <v-avatar size="40" style="margin-left:-20px;">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Author" />
          </v-avatar>
          <span class="title font-weight-bold">{{ post.title }}</span>
          <v-chip v-for="(tag, index) in post.tags" :key="index" class="ml-1" color="green" dark small>
            {{ "#" + tag }}
          </v-chip>
        </v-card-title>
        <v-card-subtitle class="grey--text text--darken-1" style="margin-left: 32px;">发表于 {{ post.created_at
          }}</v-card-subtitle>
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
              <v-icon>mdi-comment-multiple</v-icon>
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
        <v-card-title>{{ comments.length }} 条评论</v-card-title>
        <v-divider></v-divider>

        <div v-for="(comment, index) in comments" :key="index">
          <v-card class="pa-2 my-3" outlined>
            <!-- 用户信息 -->
            <v-card-title class="d-flex align-center">
              <v-avatar size="30" class="mr-2">
                <img src="https://avatars.githubusercontent.com/u/60098978?v=4" alt="User" />
              </v-avatar>
              <span style="font-size: 1.2rem; font-weight: bold;">{{ comment.created_by.username }} - 发表于 {{
                comment.created_at }}</span>
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
          <v-textarea v-model="newComment" outlined label="写下您的评论..." rows="4" clearable class="mb-2"
            color="primary"></v-textarea>
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
/* eslint-disable */
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
      post: {
        "tags": [
          "数据库", "期末考试", "复习资料"
        ],
        "title": "分享数据库课程期末考试往年题",
        "content": "## 数据库课程期末考试题目分享\n大家好！这里整理了一些数据库课程历年的期末考试题，供大家复习使用。\n\n### 题目特点\n1. **基础概念题**：题目通常会涵盖数据库的基本概念，如关系代数、范式分解等，这类题目主要考察理解能力。\n2. **SQL语句编写**：几乎每年都会有SQL语句编写题，重点考核查询、更新和多表联接等操作，难度从基础到进阶不等。\n3. **设计类题目**：这类题目要求设计ER图、表结构，或者根据业务需求优化数据库。\n4. **综合应用题**：通常是最后的大题，结合实际案例进行数据库设计和优化，难度较大。\n\n希望这些资料能帮助大家更好地复习！如果有其他问题，欢迎在评论区交流～",
        "created_at": "2024-11-12 12:00:12",
        "favorites": 45,
        "likes": 63,
        "dislikes": 1,
        "created_by": {
          "user_id": 1,
          "username": "张三"
        },
        "like": true,
        "dislike": false,
        "favorite": true
      },
      followed: false,
      dialog: false, // 控制弹框显示
      newComment: "", // 用户输入的评论
      comments: [
        {
          "content": "这份资料太有用了！SQL语句部分的题目讲解很清晰，感谢分享！",
          "created_at": "2024-11-13 09:45",
          "likes": 15,
          "dislikes": 0,
          "created_by": {
            "user_id": 2,
            "username": "数据库达人"
          }
        },
        {
          "content": "请问有2023年的考试题吗？我们老师说今年会参考那一年的题型。",
          "created_at": "2024-11-13 10:20",
          "likes": 8,
          "dislikes": 0,
          "created_by": {
            "user_id": 3,
            "username": "小明"
          }
        },
        {
          "content": "设计题部分有一些难点，尤其是表之间的关系处理，有没有相关的解题思路可以分享？",
          "created_at": "2024-11-13 11:30",
          "likes": 12,
          "dislikes": 1,
          "created_by": {
            "user_id": 4,
            "username": "学霸"
          }
        }
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
  margin-left: 10px;
}

.v-code {
  font-family: 'Courier New', monospace;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
}
</style>