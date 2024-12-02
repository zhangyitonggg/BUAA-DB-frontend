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
                    title: "【任务发布】寻找全栈开发导师",
                    tiny_content: "希望能找到一位有丰富全栈开发经验的导师，每周进行一次线上指导，帮助我解决学习中的问题并提供项目实践建议。感兴趣的请联系！",
                    created_at: "2021-09-01",
                    created_by: {
                        username: "张三",
                    },
                    tags: ["2024-2025", "复习资料"],
                    commission: 12,
                },
                {
                    title: "【提问】如何优化后端接口性能？",
                    tiny_content: "最近在开发一个电商项目，发现部分接口响应时间过长。主要使用的技术栈是Node.js + Express。请问有哪些优化建议，或者有没有类似的案例分享？",
                    created_at: "2021-09-01",
                    created_by: {
                        username: "张三",
                    },
                    tags: ["计算机组成", "2024-2025", "复习资料"],
                    commission: 0,
                },
                {
                    title: "【求助】设计一个任务发布系统的数据库结构",
                    tiny_content: "正在设计一个任务发布系统，涉及到用户、任务、评论等功能。希望能得到关于数据库表结构设计的具体建议，尤其是如何设计关联关系更合理。",
                    created_at: "2021-09-01",
                    created_by: {
                        username: "张三",
                    },
                    tags: ["计算机组成", "2024-2025", "复习资料"],
                    commission: 1,
                },
                {
                    title: "【任务发布】前端设计优化需求",
                    tiny_content: "需要一名熟悉Vue.js和UI/UX设计的开发者，帮助优化现有项目的用户界面，包括交互设计和性能提升。有兴趣的可以提交报价。",
                    created_at: "2021-09-01",
                    created_by: {
                        username: "张三",
                    },
                    tags: ["计算机组成", "2024-2025", "复习资料"],
                    commission: 0,
                },
                {
                    title: "【提问】React和Vue如何选择？",
                    tiny_content: "在开发一个中型项目时，团队对选择React还是Vue存在争议。请问这两者在性能、生态和学习成本上的主要差异是什么？希望大家能分享自己的经验。",
                    created_at: "2021-09-01",
                    created_by: {
                        username: "张三",
                    },
                    tags: ["计算机组成", "2024-2025", "复习资料"],
                    commission: 10,
                },
                {
                    title: "【求助】后端服务高并发处理方案",
                    tiny_content: "项目上线后访问量激增，后端服务器偶尔会崩溃。使用的技术栈是Java Spring Boot。请问有哪些可行的高并发处理方案？",
                    created_at: "2021-09-01",
                    created_by: {
                        username: "张三",
                    },
                    tags: ["计算机组成", "2024-2025", "复习资料"],
                    commission: 20,
                },
                {
                    title: "【任务发布】短期项目外包——数据分析",
                    tiny_content: "我们正在寻找一位熟悉Python和数据分析的开发者，负责处理并分析一组业务数据。项目周期为两周，具体细节可以私信商讨。",
                    created_at: "2021-09-01",
                    created_by: {
                        username: "张三",
                    },
                    tags: ["计算机组成", "2024-2025", "复习资料"],
                    commission: 1,
                },
                {
                    title: "【提问】如何设计任务优先级排序算法？",
                    tiny_content: "在任务管理系统中，需要根据用户需求动态调整任务的优先级排序。请问有哪些常用的排序算法或者设计思路适合这种场景？",
                    created_at: "2021-09-01",
                    created_by: {
                        username: "张三",
                    },
                    tags: ["计算机组成", "2024-2025", "复习资料"],
                    commission: 2,
                },
                {
                    title: "【求助】移动端页面适配问题",
                    tiny_content: "项目的移动端页面在不同分辨率设备上显示效果不一致。请问有什么最佳实践或者工具可以帮助解决适配问题？",
                    created_at: "2021-09-01",
                    created_by: {
                        username: "张三",
                    },
                    tags: ["计算机组成", "2024-2025", "复习资料"],
                    commission: 0,
                },
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
        this.$store.commit("setAppTitle", "我的资源");
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
