<template>
  <v-app>
    <v-container>
      <!-- 帖子标题部分 -->
      <v-card class="mt-5 pa-5">
        <v-avatar size="40">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Author" />
        </v-avatar>
        <v-card-title class="d-flex align-center">
          <span class="title font-weight-bold">关于HttpClient的访问 带参数的get访问</span>
          <v-chip class="ml-3" color="blue" dark small>#C#</v-chip>
          <v-chip class="ml-1" color="blue" dark small>.NET</v-chip>
        </v-card-title>
        <v-card-subtitle class="grey--text text--darken-1">发表于 2024-10-17 15:55 采纳率: 85.7%</v-card-subtitle>
        <v-divider></v-divider>
        
        <!-- 帖子内容部分 -->
        <v-card-text>
          <p>cpu该怎么搭建啊啊啊啊啊啊，有没有大佬能帮帮我</p>
          
          <!-- 示例代码 -->
          <v-card class="pa-3 my-3" outlined>
            <v-code style="background-color: #f5f5f5;">
                Int a = 1；<br>
                int b = 2; <br>
                int sum = a + b; <br>
                Console.WriteLine(sum);
            </v-code>
          </v-card>
          <p>喜欢飞爷嘿嘿嘿嘿嘿嘿</p>
        </v-card-text>
        
        <!-- 按钮操作 -->
        <v-card-actions>
          <v-btn color="red" outlined>写回答</v-btn>
          <v-btn text>邀请回答</v-btn>
          <v-btn text>关注问题</v-btn>
          <v-btn text>分享</v-btn>
          <v-btn text>通知我</v-btn>
          <v-btn text>收藏</v-btn>
        </v-card-actions>
      </v-card>

      <!-- 回答部分 -->
      <v-card class="mt-5 pa-5">
        <v-card-title>2 条回答</v-card-title>
        <v-divider></v-divider>
        
        <v-card class="pa-3 my-3" outlined>
          <v-card-title class="d-flex align-center">
            <v-avatar size="30" class="mr-2">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="User" />
            </v-avatar>
            <span>michits - 发表于 2024-10-17 16:07</span>
          </v-card-title>
          <v-card-text>
            <p>有bug，应该这么写：</p>
            <v-card class="pa-3 my-3" outlined>
              <v-code style="background-color: #f5f5f5;">
                我十三是吧;<br>
                string pa阿斯顿撒打算geSize = "0";<br>
                string category = "1大叔大婶";<br>
                string url = $"{ip}:{port}/v1/users?pageIndex={pageIndex}&pageSize={pageSize}...";
              </v-code>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-btn icon>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
            <v-btn text>评论</v-btn>
            <v-btn text>分享</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "PostPage",
};
</script>

<style scoped>
.title {
  font-size: 24px;
}
.v-code {
  font-family: 'Courier New', monospace;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
}
</style>