<template>
    <!-- eslint-disable -->
    <div class="table-container">
        <v-container fluid class="pa-6">
            <v-btn class="fixed-button1" fab dark color="indigo" @click="back">
                <v-icon dark>
                    mdi-arrow-u-left-top-bold
                </v-icon>
            </v-btn>
            <p class="text-h4 mt-6 mb-4">自己分享的所有资源</p>
            <p class="text-subtitle-2 mb-4">查看，修改自己的资源分享贴</p>
    
            <v-data-table :headers="headers" :items="ownShare" class="elevation-0" sticky>
                <template v-slot:item.index="{ index }">
                    {{ index + 1 }}
                </template>
                <!-- 操作列 -->
                <template v-slot:item.view="{ item }">
                    <!-- 查看按钮 -->
                    <v-btn icon color="blue" @click="viewItem(item)">
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                </template>
                <template v-slot:item.edit="{ item }">
                    <v-btn icon color="green" @click="editItem(item)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <template v-slot:item.delete="{ item }">
                    <v-btn icon color="red" @click="deleteItem(item)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
    
            </v-data-table>
        </v-container>

        <v-dialog v-model="dialog" max-width="800px" transition="dialog-bottom-transition">
            <v-card class="elevation-12 rounded-lg">
                <v-toolbar flat>
                    <v-toolbar-title class="text-h5">确认删除</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false" class="text-gray">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
        
                <v-card-text class="text-body-1">
                    <v-icon color="red">mdi-alert-circle-outline</v-icon>
                    确定要删除标题为 <strong>{{ curItem ? curItem.title : '' }}</strong> 的资源吗？
                </v-card-text>
        
                <v-divider></v-divider>
        
                <v-card-actions class="d-flex justify-end">
                    <v-btn text @click="dialog = false" class="mr-2">取消</v-btn>
                    <v-btn color="red" @click="confirmDelete" class="rounded-10" elevation="2">确认删除</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
              
    </div>
</template>

<script>
export default {

    data() {
        return {
            dialog: false,
            curItem: null,
            headers: [
                { text: "ID", value: "index" },
                { text: "标题", value: "title" },
                { text: "创建时间", value: "created_at" },
                { text: "费用", value: "cost" },
                { text: "点赞数", value: "likes" },
                { text: "点踩数", value: "dislikes" },
                { text: "收藏数", value: "favorites" },
                { text: "查看", value: "view", sortable: false }, // 添加操作列
                { text: "编辑", value: "edit", sortable: false }, // 添加操作列
                { text: "删除", value: "delete", sortable: false }, // 添加操作列
            ],
            ownShare: [
                {
                    post_id: 1,
                    link: "/resources/testPost", // todo 链接
                    image: require("@/assets/images/blogDefault.png"), // 这里需要申请另一个api
                    title: "航U邦前端源码",
                    icon: { name: "mdi-bitcoin", color: "#F8CC00" },
                    cost: 20,
                    tags: ["数据库", "2024-2025"], // 这里需要申请另一个api
                    likes: 6,
                    dislikes: 0,
                    favorites: 2,
                    comments: 24,
                    created_by: {
                        user_id: 1,
                        username: "张三",
                        avatar: require("@/assets/images/blogDefault.png"),
                    },
                    created_at: "2024-04-29",
                },
                {
                    post_id: 1,
                    link: "/resources/testPost", // todo 链接
                    image: require("@/assets/images/blogDefault.png"), // 这里需要申请另一个api
                    title: "计算机组成考试题（2023-2024学年）",
                    icon: { name: "mdi-bitcoin", color: "#F8CC00" },
                    cost: 5,
                    tags: ["计算机组成", "考试题", "2023-2024"], // 这里需要申请另一个api
                    likes: 7,
                    dislikes: 1,
                    favorites: 6,
                    comments: 6,
                    created_by: {
                        user_id: 1,
                        username: "张三",
                        avatar: require("@/assets/images/blogDefault.png"),
                    },
                    created_at: "2024-04-29",
                },
                {
                    post_id: 2,
                    link: "/resources/testPost",
                    title: "数据结构期末复习资料（2024-2025学年）",
                    subtitle: "这是一份数据结构的复习资料，涵盖了本学年考试的重点知识点。希望对大家有所帮助。",
                    tags: ["数据结构", "复习资料", "2024-2025"],
                    cost: 0,
                    likes: 8,
                    dislikes: 0,
                    favorites: 3,
                    comments: 5, // 这里需要获取帖子的评论数量
                    created_by: {
                        user_id: 2,
                        username: "李四",
                        avatar: require("@/assets/images/blogDefault.png"),
                    },
                    created_at: "2024-05-10",
                },
                {
                    post_id: 3,
                    link: "/resources/testPost",
                    title: "操作系统期末复习资料（2024-2025学年）",
                    subtitle: "这是一份操作系统的复习资料，涵盖了本学年考试的重点知识点。",
                    tags: ["操作系统", "复习资料", "2024-2025"],
                    cost: 0,
                    likes: 10,
                    dislikes: 2,
                    favorites: 4,
                    comments: 3,
                    created_by: {
                        user_id: 3,
                        username: "王五",
                        avatar: require("@/assets/images/blogDefault.png"),
                    },
                    created_at: "2024-06-15",
                },
                {
                    post_id: 4,
                    link: "/resources/testPost",
                    title: "计算机网络期末复习资料（2024-2025学年）",
                    subtitle: "这是一份计算机网络的复习资料，涵盖了本学年考试的重点知识点。",
                    tags: ["计算机网络", "复习资料", "2024-2025"],
                    cost: 0,
                    likes: 12,
                    dislikes: 1,
                    favorites: 5,
                    comments: 4,
                    created_by: {
                        user_id: 4,
                        username: "赵六",
                        avatar: require("@/assets/images/blogDefault.png"),
                    },
                    created_at: "2024-07-20",
                },
                {
                    post_id: 5,
                    link: "/resources/testPost",
                    title: "数据库系统期末复习资料（2024-2025学年）",
                    subtitle: "这是一份数据库系统的复习资料，涵盖了本学年考试的重点知识点。",
                    tags: ["数据库系统", "复习资料", "2024-2025"],
                    cost: 0,
                    likes: 15,
                    dislikes: 0,
                    favorites: 6,
                    comments: 5,
                    created_by: {
                        user_id: 5,
                        username: "孙七",
                        avatar: require("@/assets/images/blogDefault.png"),
                    },
                    created_at: "2024-08-10",
                }
            ],
        };
    },
    methods: {
        // 获取所有用户数据
        getOwnShare() {
            // todo 
        },
        back() {
            this.$router.push("/resources");
        },
        // 查看操作
        viewItem(item) {
            // 跳转到资源详情页面
            this.$router.push(item.link);
        },
        editItem(item) {
            // 跳转到编辑页面
            // this.$router.push("/resources/edit/" + item.post_id);
            /* todo wxf去写吧：
                编辑页面就直接和发布页面一样，但是需要在发布页面中获取到当前资源的信息，即title，content，tags，cost等信息
                点击取消按钮，认为不修改，直接返回。
                点击确认按钮，发送修改请求，修改成功后，返回。
            */
        },
        // 删除操作
        deleteItem(item) {
            this.curItem = item;
            this.dialog = true;
        },
        confirmDelete() {
            // todo 调用删除接口
            this.dialog = false;  // 关闭对话框
            this.$store.commit("setAlert", {
                type: "success",
                message: "删除成功",
            });
            this.getOwnShare(); // 刷新列表
        },
    },
    mounted() {
        this.$store.commit("setAppTitle", "我的资源");
        this.getOwnShare();
    },
};
</script>

<style scoped>
.table-container {
    max-width: 85%; /* 设置表格的最大宽度 */
    margin: 0 auto; /* 居中对齐 */
    display: flex; /* 启用 flexbox 布局 */
    flex-direction: column; /* 纵向排列 */
    align-items: center; /* 水平居中对齐 */
}

.fixed-button1 {
    position: fixed;
    right: 3%;
    bottom: 13%;
    z-index: 5;
}
</style>