<template>
    <v-container style="max-width: 70%;">
      <div class="follow-list">
        <div v-for="(user, index) in users" :key="index" class="user-card">
          <img :src="user.avatar" class="avatar" />
          <div class="user-info">
            <div class="user-name">
              {{ user.name }}
              <span v-if="user.isAdmin" class="verified-badge">✔</span>
            </div>
            <div class="user-description">{{ user.description }}</div>
          </div>
          <button class="follow-btn" :class="{ followed: user.followed }" @click="unFollow(user)">
            取消关注
          </button>
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [
          {
            name: "小小帅AIGC",
            avatar: require('@/assets/images/blogDefault.png'),
            description: "此人很懒，什么都没写",
            isAdmin: false,
          },
          {
            name: "久坐A",
            avatar: require('@/assets/images/blogDefault.png'),
            description: "“代码舞者，舞出数字华章”",
            isAdmin: true,
          },
          {
            name: "java李杨勇",
            avatar: require('@/assets/images/blogDefault.png'),
            description:
              "CSDN毕设辅导道祖第一人，专注于大学生项目实战开发，讲解、毕业答疑辅导等。",
            isAdmin: true,
          },
          {
            name: "java李杨勇",
            avatar: require('@/assets/images/qqnl.png'),
            description:
              "CSDN毕设辅导道祖第一人，专注于大学生项目实战开发，讲解、毕业答疑辅导等。",
            isAdmin: true,
          },
          {
            name: "java李杨勇",
            avatar: require('@/assets/images/blogDefault.png'),
            description:
              "CSDN毕设辅导道祖第一人，专注于大学生项目实战开发，讲解、毕业答疑辅导等。",
            isAdmin: true,
          },
        ],
      };
    },
    methods: {
      unFollow(user) {
        this.users = this.users.filter(u => u !== user);
      },
    },
    mounted() {
      this.$store.commit("setAppTitle", "我的关注");
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
    background-color: #fff;
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
    background-color: #fff;
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
  