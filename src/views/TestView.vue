<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card max-width="600px">
          <v-card-title>
            <v-icon left class="mr-2">mdi-account-circle</v-icon>
            个人信息
          </v-card-title>
          <v-divider></v-divider>
          <v-row no-gutters class="my-4" align="center" justify="center">
            <!-- 左边头像和名字 -->
            <v-col cols="4">
              <v-row justify="center">
                <v-img src="@/assets/images/blogDefault.png" aspect-ratio="1" height="110px" width="110px" contain></v-img>
              </v-row>
              <v-row class="py-2" justify="center">
                <v-divider></v-divider>
              </v-row>
              <v-row justify="center" class="mb-2">
                <div class="text-h5">{{ username }}</div>
              </v-row>
              <v-row justify="center">
                <v-btn
                  ref="change_avatar_button"
                  icon="mdi-pencil"
                  variant="text"
                  color="primary"
                  size="small"
                >
                  修改头像
                </v-btn>
              </v-row>
            </v-col>

            <!-- 垂直分隔线 -->
            <v-divider vertical></v-divider>

            <!-- 右边个人信息 -->
            <v-col>
              <v-list>
                <v-list-item prepend-icon="mdi-account">
                  <v-list-item-title>
                    用户名 <span class="mx-1"></span> {{ username }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-card-account-details">
                  <v-list-item-title>
                    学号 <span class="mx-1"></span> {{ studentId || '未填写' }}
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-btn variant="text" color="primary" ref="change_studentid_button">修改学号</v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
        username: 'hugo', // 可以修改成动态的
        studentId: '' // 学号，如果为空显示“未填写”
    };
  },
  watch: {

  },
  methods: {

  },
  mounted() {
      this.$store.commit("setAppTitle", "个人信息");
  },
};
</script>
  