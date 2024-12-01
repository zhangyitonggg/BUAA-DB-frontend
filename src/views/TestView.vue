<template>
    <div class="app-container">
      <!-- Main Content -->
      <div class="content">
        <main class="main-content">
          <!-- Question Card -->
          <div class="card question-card">
            <h2>哪一句话突然让你破防了？</h2>
            <div class="tags">
              <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="question-actions">
              <button @click="followQuestion">关注问题</button>
              <button @click="addAnswer">写回答</button>
            </div>
          </div>
  
          <!-- Answer Cards -->
          <div
            class="card answer-card"
            v-for="(answer, index) in answers"
            :key="index"
          >
            <h3>{{ answer.user }}</h3>
            <p>{{ answer.content }}</p>
            <div class="answer-actions">
              <button @click="likeAnswer(index)">赞同 {{ answer.likes }}</button>
              <button>评论</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Question tags
        tags: ["情绪", "情绪失控", "现实情感"],
  
        // Answers list
        answers: [
         { user: "用户1", content: "一句简单的真心话让我泪流满面。", likes: 5 },
          { user: "用户2", content: "他说：'我会一直支持你'，让我破防了。", likes: 12 },
          { user:  "用户3", content: "他说：'我从没离开过你'，瞬间泪目。", likes: 8 },
        ],
      };
    },
    methods: {
      followQuestion() {
        alert("已关注问题");
      },
      addAnswer() {
        alert("撰写回答功能未实现");
      },
      likeAnswer(index) {
        this.answers[index].likes++;
      },
    },
  };
  </script>
  
  <style>
  /* General Styles */
  body {
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
  }
  
  .header {
    background-color: #f6f6f6;
    width: 100%;
    padding: 20px 0;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  .content {
    max-width: 800px;
    width: 100%;
    margin: 20px auto;
    padding: 0 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  /* Card Styles */
  .card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  /* Question Card Styles */
  .question-card h2 {
    margin-bottom: 10px;
  }
  
  .tags {
    margin: 10px 0;
  }
  
  .tag {
    background-color: #eef;
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .question-actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
  
  .question-actions button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .question-actions button:hover {
    background-color: #0056b3;
  }
  
  /* Answer Card Styles */
  .answer-card h3 {
    margin-bottom: 5px;
  }
  
  .answer-card p {
    margin-bottom: 15px;
  }
  
  .answer-actions {
    display: flex;
    gap: 10px;
  }
  
  .answer-actions button {
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .answer-actions button:hover {
    background-color: #0056b3;
  }
  </style>