<template>
    <!-- eslint-disable -->
    <div class="table-container">
        <v-container fluid class="pa-6">
            <v-btn class="fixed-button1" fab dark color="indigo" @click="back">
                <v-icon dark>
                    mdi-arrow-u-left-top-bold
                </v-icon>
            </v-btn>
            <p class="text-h4 mt-6 mb-4">自己发布的悬赏</p>
            <p class="text-subtitle-2 mb-4">查看，关闭自己的悬赏任务</p>
    
            <v-data-table :headers="headers" :items="ownTasks" class="elevation-0" sticky>
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
                <!-- 添加标签列 -->
                <template v-slot:item.tags="{ item }">
                    <v-chip-group column>
                        <v-chip v-for="(tag, index) in item.tags" :key="index" class="ma-2" color="light-green" text-color="white">
                            {{ tag }}
                        </v-chip>
                        </v-chip-group>
                        </template>
            </v-data-table>
        </v-container>
              
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
                { text: "费用", value: "commission" },
                { text: "标签", value: "tags" },  // 新增标签列
                { text: "查看", value: "view", sortable: false }, // 添加操作列
            ],
            ownTasks: [
                {
                    "mission_id": 0,
                    "title": "【紧急求助】寻找数据库往年考试题",
                    "tiny_content": "跪求能够提供数据库课程往年考试题的同学，分享资料并感谢！",
                    "created_at": "2024-11-01",
                    "created_by": {
                        "username": "张三"
                    },
                    "tags": ["数据库", "往年试题", "复习资料"],
                    "commission": 12
                },
                {
                    "mission_id": 1,
                    "title": "【紧急求助】需要机器学习相关的论文资料",
                    "tiny_content": "有谁能分享一些机器学习领域的经典论文或学习资料吗？非常感谢！",
                    "created_at": "2024-11-02",
                    "created_by": {
                        "username": "李四"
                    },
                    "tags": ["机器学习", "论文", "复习资料"],
                    "commission": 0
                },
                {
                    "mission_id": 2,
                    "title": "【紧急求助】计算机组成原理复习资料",
                    "tiny_content": "有没有计算机组成原理的复习资料或者笔记？希望能够分享一些，感谢大家！",
                    "created_at": "2024-11-03",
                    "created_by": {
                        "username": "王五"
                    },
                    "tags": ["计算机组成", "复习资料", "笔记"],
                    "commission": 0
                },
                {
                    "mission_id": 3,
                    "title": "【紧急求助】C语言编程习题集",
                    "tiny_content": "想找一些C语言编程习题集，帮助复习基础知识。有资料的请分享，谢谢！",
                    "created_at": "2024-11-04",
                    "created_by": {
                        "username": "赵六"
                    },
                    "tags": ["C语言", "编程习题", "复习资料"],
                    "commission": 0
                },
                {
                    "mission_id": 4,
                    "title": "【求助】计算机网络历年试题",
                    "tiny_content": "谁有计算机网络课程的历年试题或参考资料，分享一下，非常感激！",
                    "created_at": "2024-11-05",
                    "created_by": {
                        "username": "钱七"
                    },
                    "tags": ["计算机网络", "试题", "复习资料"],
                    "commission": 10
                },
                {
                    "mission_id": 5,
                    "title": "【求助】算法与数据结构学习资料",
                    "tiny_content": "正在学习算法与数据结构，需要一些参考资料或者学习笔记，谁能提供？",
                    "created_at": "2024-11-06",
                    "created_by": {
                        "username": "孙八"
                    },
                    "tags": ["算法", "数据结构", "学习资料"],
                    "commission": 5
                },
                {
                    "mission_id": 6,
                    "title": "【求助】Java编程考试试题",
                    "tiny_content": "有没有Java编程的历年考试试题或习题集，帮忙分享一下，谢谢！",
                    "created_at": "2024-11-07",
                    "created_by": {
                        "username": "周九"
                    },
                    "tags": ["Java", "编程", "考试试题"],
                    "commission": 7
                },
                {
                    "mission_id": 7,
                    "title": "【求助】操作系统复习资料",
                    "tiny_content": "谁有操作系统的复习资料或者笔记？希望可以帮助我更好地复习，谢谢！",
                    "created_at": "2024-11-08",
                    "created_by": {
                        "username": "吴十"
                    },
                    "tags": ["操作系统", "复习资料", "笔记"],
                    "commission": 6
                },
                {
                    "mission_id": 8,
                    "title": "【求助】计算机图形学学习资料",
                    "tiny_content": "需要一些计算机图形学的学习资料，谁有可以分享吗？非常感谢！",
                    "created_at": "2024-11-09",
                    "created_by": {
                        "username": "郑十一"
                    },
                    "tags": ["计算机图形学", "学习资料", "参考书籍"],
                    "commission": 4
                },
                {
                    "mission_id": 9,
                    "title": "【求助】操作系统课程笔记",
                    "tiny_content": "有没有操作系统课程的笔记或者复习资料，急需帮助！",
                    "created_at": "2024-11-10",
                    "created_by": {
                        "username": "冯十二"
                    },
                    "tags": ["操作系统", "复习资料", "笔记"],
                    "commission": 2
                }
            ],
        };
    },
    methods: {
        // 获取所有用户数据
        getOwnTask() {
            // todo 
        },
        back() {
            this.$router.push("/tasks");
        },
        // 查看操作
        viewItem(item) {
            // 跳转到任务详情页面
            this.$router.push("/tasks/testPostForAsker");
        },
    },
    mounted() {
        this.$store.commit("setAppTitle", "我的悬赏");
        this.getOwnTask();
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
