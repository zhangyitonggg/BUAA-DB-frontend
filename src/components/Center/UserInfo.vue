<template>
  <v-container style="max-width: 700px;">
    <v-card class="pa-4">
      <v-row>
        <v-col cols="12">
          <h3>用户基本信息</h3>
        </v-col>
        <v-col style="padding: 0;" cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="8">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>用户名</v-list-item-title>
              <v-list-item-subtitle>zhangyitong</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>身份</v-list-item-title>
              <v-list-item-subtitle>普通用户</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>电子邮件地址</v-list-item-title>
              <v-list-item-subtitle>22373337@buaa.edu.cn</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>个性标签</v-list-item-title>
              <v-list-item-subtitle>热爱编程，喜欢挑战</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="4" style="margin-top: 20px;">
          <v-img
            src="@/assets/images/blogDefault.png"
            aspect-ratio="1"
            height="130px"
            width="130px"
            contain
            style="transform: translateX(-9%);"
          ></v-img>
          <v-btn text color="primary">选择新头像</v-btn>
        </v-col>
        <v-col style="padding: 0;" cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col style="padding: 0.1px;" class="text-right">
          <v-btn text color="red">修改密码</v-btn>
          <v-btn text color="red">修改电子邮件地址</v-btn>
          <v-btn text color="red">修改个性标签</v-btn>
          <v-btn text color="red">退出登录</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "UserCenter",
};
</script>

<style scoped>
h3 {
  font-weight: bold;
}
</style>
