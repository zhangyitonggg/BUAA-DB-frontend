<template>
    <!-- eslint-disable -->
    <v-container fluid class="pa-6">
        <p class="text-h4 mt-6 mb-4">所有用户</p>
        <p class="text-subtitle-2 mb-4">封禁、解封用户</p>
  
        <v-data-table
        :headers="headers"
        :items="allUser"
        class="elevation-0"
        disable-sort sticky
        >

        <template v-slot:item.avatarurl="{ item }">
            <v-avatar size="32">
              <!-- 使用头像图片URL -->
              <img :src="item.avatarurl" alt="User Avatar" />
            </v-avatar>
        </template>

        <template v-slot:item.isblock="{ item }">
            <v-btn
                :outlined="true"
                small
                :color="item.isblock ? 'green' : 'red'"
                class="me-1"
                @click="dialog(item.isblock, item.username, item.userid)"
            >
                <v-icon small>
                    {{ item.isblock ? 'mdi-account-check' : 'mdi-account-off' }}
                </v-icon>
            </v-btn>
        </template>
        
        </v-data-table>
        
  
        <v-dialog max-width="500px" v-model="dialogActive">
            <v-card>
                <v-toolbar flat>
                    <v-toolbar-title>{{ dialogType ? "解封" : "封禁" }}用户</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogActive = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
  
                <v-card-text>
                    确定要{{ dialogType ? "解封" : "封禁" }}用户“{{ dialogUserName }}”？
                </v-card-text>
  
                <v-card-actions>
                    <v-btn text @click="dialogActive = false">取消</v-btn>
                    <v-btn :color="dialogType ? 'green' : 'red'" :loading="submitLoading" @click="onBlockUnblockClick">
                        {{ dialogType ? "解封" : "封禁" }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
  </template>
  
  <script>
  import { mapMutations } from "vuex";
  
  export default {
    data() {
        return {
            headers: [
                { text: "ID", value: "userid" },
                { text: "头像", value: "avatarurl" },
                { text: "用户名", value: "username" },
                { text: "电子邮件地址", value: "email" },
                { text: "操作", value: "isblock" },
            ],
            allUser: [],
            dialogActive: false,
            dialogType: false, // true 表示解封，false 表示封禁
            dialogUserName: "",
            dialogUserID: 0,
            submitLoading: false,
        };
    },
    methods: {
        ...mapMutations(["setAppTitle", "setAlert"]),
        // 获取所有用户数据
        getAllUser() {
            // 模拟 API 调用
            this.allUser = [
                {
                    userid: 1,
                    avatarurl: "https://via.placeholder.com/32",
                    username: "User1",
                    email: "20220101",
                    isblock: false,
                },
                {
                    userid: 2,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User2",
                    email: null,
                    isblock: true,
                },
                {
                    userid: 3,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User3",
                    email: "20220103",
                    isblock: false,
                },
                {
                    userid: 4,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User4",
                    email: "20220104",
                    isblock: true,
                },
                {
                    userid: 5,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User5",
                    email: "20220105",
                    isblock: false,
                },
                {
                    userid: 6,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User6",
                    email: "20220106",
                    isblock: true,
                },
                {
                    userid: 7,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User7",
                    email: "20220107",
                    isblock: false,
                },
                {
                    userid: 8,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User8",
                    email: "20220108",
                    isblock: true,
                },
                {
                    userid: 9,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User9",
                    email: "20220109",
                    isblock: false,
                },
                {
                    userid: 10,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User10",
                    email: "20220110",
                    isblock: true,
                },
                {
                    userid: 11,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User11",
                    email: "20220111",
                    isblock: false,
                },
                {
                    userid: 12,
                    avatarurl: "https://cdn.vuetifyjs.com/images/john.jpg",
                    username: "User12",
                    email: "20220112",
                    isblock: true,
                }
            ];
        },
        // 打开确认对话框
        dialog(isUnblock, username, userid) {
            this.dialogType = isUnblock;
            this.dialogUserName = username;
            this.dialogUserID = userid;
            this.dialogActive = true;
        },
        // 提交封禁/解封操作
        onBlockUnblockClick() {
            this.submitLoading = true;
  
            // 模拟 API 提交
            setTimeout(() => {
                const action = this.dialogType ? "解封" : "封禁";
                this.setAlert({
                    type: "success",
                    message: `${action}用户“${this.dialogUserName}”成功！`,
                });
                this.dialogActive = false;
                this.submitLoading = false;
                this.getAllUser(); // 更新用户列表
            }, 1000);
        },
    },
    mounted() {
        this.setAppTitle("用户管理");
        this.setAlert({
            type: "success",
            message: "欢迎来到用户管理页面！请在此管理该系统的用户！",
        });
        this.getAllUser();
    },
  };
  </script>
  
  <style scoped>
  </style>
  