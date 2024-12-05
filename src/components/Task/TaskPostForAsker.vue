<template>
    <v-container class="mt-5">
      <!-- 返回按钮 -->
      <v-btn
        icon
        @click="$router.go(-1)"
        class="return-button elevation-2 hoverable"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
  
      <!-- 任务部分 -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-5">
            <div class="task-header">
              <!-- 标题部分 -->
              <span class="title font-weight-bold">{{ task.title }}</span>
              <!-- 时间和状态部分 -->
              <div class="d-flex align-center mt-1">
                <div class="task-time text-grey text--small">
                  发布于：{{ new Date(task.created_at).toLocaleString() }}
                </div>
                <v-chip
                  :color="task.open ? 'green' : 'red'"
                  class="ml-3"
                  outlined
                  small
                >
                  {{ task.open ? '进行中' : '已关闭' }}
                </v-chip>
              </div>
            </div>
            <div class="task-tags mt-2">
              <!-- 标签部分 -->
              <v-chip
                v-for="(tag, index) in task.tags"
                :key="index"
                class="ml-1"
                color="green"
                dark
                big
              >
                {{ "#" + tag }}
              </v-chip>
            </div>
            <v-divider class="my-3"></v-divider>
              <v-md-preview :text="task.content"></v-md-preview>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- 回答部分 -->
      <v-row justify="center" class="mt-4">
        <v-col cols="12" md="8">
          <v-card v-for="(submit, index) in submits" :key="index" class="mb-3">
            <v-card-title class="d-flex justify-space-between">
              <span class="font-weight-bold">{{ submit.created_by.username }}</span>
              <span class="text-grey">{{ submit.created_at }}</span>
            </v-card-title>
            <v-card-text>
              <p>{{ submit.profile }}</p>
            </v-card-text>
            <v-card-actions>
              <div class="answer-actions">
                <button @click="openBhpan(submit)">下载资源</button>
                <button v-if="task.open=true" @click="confirmAnswer(submit)">认同答案</button>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- 弹窗 -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">确认操作</v-card-title>
          <v-card-text>您确定要认同此答案吗？认同此答案后，全部悬赏菜币将分发给此用户，本任务也将不再接受其他回答。</v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
            <v-btn color="green darken-1" text @click="approveAnswer">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
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
    name: 'TaskPost',
    components: {
      VMdPreview
    },
    data() {
      return {
        dialog: false,
        selectedSubmit: null,
        task: {
          commission: 100, // 佣金保留不变
          open: true, // 表示求助仍在进行中
          tags: ["求助", "前端", "优化"], // 调整为更贴近求助性质的标签
          title: "【紧急求助】跪求能得100分的前端代码", // 增强紧迫感和明确性
          content: 
            "### 求助说明\n" +
            "大家好，我在处理一个前端项目时遇到了一些显示问题：\n" +
            "- 首先，~~我没学过vue。~~\n" +
            "- 其次，在我学习vue的过程中，我发现部分按钮样式在不同浏览器中表现不一致。\n\n" +
            "我已经尝试了一些 CSS 调整，但效果不理想。以下是代码示例：：\n" +
            "```css\n" +
            ".container {\n" +
            "  display: flex;\n" +
            "  justify-content: space-between;\n" +
            "  padding: 10px;\n" +
            "}\n" +
            "```\n" +
            "希望大家都vivo一份能得满分的前端vue代码。\n\n" +
            "#### 感谢大家的帮助！🙏", // 调整为更符合求助信息的描述
          created_at: "2024-12-01T09:00:00", // 保留时间不变
        },
        submits: [
          {
            "submit_id": "6f3c8b96-1234-4a2b-bf3f-9a7b8b7bcfd9",
            "profile": "用户提交的文件内容简介，例如代码分析报告",
            "bhpan_url": "http://oo.buaa.edu.cn/assignment/520/discussion/1557",
            "created_at": "2024-12-01 10:15:30",
            "created_by": {
              "username": "test",
              "user_url": "https://example.com/users/user_01",
              "user_id": "a1d2c3b4-5678-9ef0-1234-567890abcdef"
            }
          },
          {
            "submit_id": "b7c9d1e2-5678-4abc-def0-1234567890ab",
            "profile": "用户提交的代码解决了页面显示问题",
            "bhpan_url": "http://oo.buaa.edu.cn/assignment/520/discussion/1557",
            "created_at": "2024-12-01 11:00:00",
            "created_by": {
              "username": "吴旭飞",
              "user_url": "https://example.com/users/dev_expert",
              "user_id": "c3b4d5e6-7890-1234-5678-abcdef123456"
            }
          },
          {
            "submit_id": "9ef0d123-4567-890a-bcde-f0123456789a",
            "profile": "优化了用户界面设计和交互逻辑",
            "bhpan_url": "http://oo.buaa.edu.cn/assignment/520/discussion/1557",
            "created_at": "2024-12-01 12:45:15",
            "created_by": {
              "username": "张奕彤",
              "user_url": "https://example.com/users/ui_designer",
              "user_id": "d5e6f7a8-9012-3456-7890-bcdef0123456"
            }
          },
          {
            "submit_id": "abcd1234-5678-90ef-ghij-klmn12345678",
            "profile": "初步实现任务分配算法的提交",
            "bhpan_url": "",
            "created_at": "2024-12-01 14:10:50",
            "created_by": {
              "username": "fyszlr",
              "user_url": "https://example.com/users/algo_specialist",
              "user_id": "e7a8f901-2345-6789-0123-cdef34567890"
            }
          }
        ],
      };
    },
    methods: {
      openBhpan(submit) {
        window.open(submit.bhpan_url);
      },
      confirmAnswer(submit) {
        this.selectedSubmit = submit;
        this.dialog = true;
      },
      approveAnswer() {
        console.log("认同答案：", this.selectedSubmit);
        this.dialog = false;
      },
    },
  };
  </script>
  
  <style>
  .task-time {
    font-size: 14px;
    color: #757575;
    margin-left: 8px;
  }
  
  .return-button {
    position: fixed;
    left: 65px;
    top: 80px;
    background-color: #9dedf0;
    color: white;
    border-radius: 50%;
    padding: 8px;
    z-index: 1000;
  }
  
  .task-header {
    margin-bottom: 8px;
  }
  
  .task-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .title {
    font-size: 24px;
  }
  
  .v-container {
    max-width: 960px;
    margin: 0 auto;
  }
  
  .v-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .answer-actions {
    display: flex;
    gap: 12px;
    margin-top: -20px;
    margin-left: 7px;
  }
  
  .answer-actions button {
    padding: 7px 12px;
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