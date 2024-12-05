<template>
    <v-container style="max-width: 70%;">
      <div class="posts-list">
        <div v-for="(post, index) in posts" :key="index" class="card">
          <div class="post-card">
            <!-- Post Info Section -->
            <div class="post-info">
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
              <v-btn icon @click="viewPost(post.post_id)" class="view-btn">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn icon @click="removeFavorite(post.post_id)" class="remove-btn">
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
        posts: [
          {
            post_id: 1,
            title: "计算机组成考试题（2023-2024学年）",
            cost: 5,
            tags: ["计算机组成", "考试题", "2023-2024"],
            created_by: {
              user_id: 1,
              username: "张三",
              avatar: require("@/assets/images/blogDefault.png"),
            },
            created_at: "2024-04-29",
          },
          {
            post_id: 2,
            title: "数据结构期末复习资料（2024-2025学年）",
            cost: 0,
            tags: ["数据结构", "复习资料", "2024-2025"],
            created_by: {
              user_id: 2,
              username: "李四",
              avatar: require("@/assets/images/blogDefault.png"),
            },
            created_at: "2024-05-10",
          },
          {
            post_id: 3,
            title: "操作系统复习资料（2023-2024学年）",
            cost: 0,
            tags: ["操作系统", "复习资料", "2023-2024"],
            created_by: {
              user_id: 3,
              username: "王五",
              avatar: require("@/assets/images/blogDefault.png"),
            },
            created_at: "2024-06-15",
          },
          {
            post_id: 4,
            title: "计算机网络期末考试题（2024-2025学年）",
            cost: 10,
            tags: ["计算机网络", "考试题", "2024-2025"],
            created_by: {
              user_id: 4,
              username: "赵六",
              avatar: require("@/assets/images/blogDefault.png"),
            },
            created_at: "2024-07-20",
          }
        ],
      };
    },
    methods: {
      viewPost(postId) {
        // 跳转到查看页面
        console.log(`Viewing post with ID: ${postId}`);
        // todo 跳转到一个帖子页面
        this.$router.push(`/resources/testPost`);
      },
      removeFavorite(postId) {
        // todo 取消收藏的逻辑 
        console.log(`Removing favorite for post with ID: ${postId}`);
        // 实际应用中可能会发送API请求，更新状态等
      }
    },
    mounted() {
      this.$store.commit("setAppTitle", "我的收藏");
      this.$store.commit("setMyFavorite", true);
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
  