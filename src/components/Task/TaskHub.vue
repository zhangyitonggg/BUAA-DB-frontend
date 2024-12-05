<template>
    <div style="margin-top: -50px;">
        <template v-if="loading">
            <v-container fluid class="d-flex align-center justify-center">
                <v-row class="text-center">
                    <v-col>
                        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
                    </v-col>
                </v-row>
            </v-container>
            <v-container fluid class="d-flex align-center justify-center">
                <v-row class="text-center">
                    <v-col>
                        <h3>
                            潮平两岸阔，风正一帆悬。
                        </h3>
                        <h4>
                            欢迎回到航U邦。
                        </h4>
                        <span>正在获取资源站。</span>
                    </v-col>
                </v-row>
            </v-container>
        </template>
        <template v-else>
            <v-container>
                <v-card outlined class="pa-4 top" @mouseleave="onCardMouseLeave()">
                    <div class="filters">
                        <v-row class="align-center">
                            <v-col cols="auto">
                                <span><strong>排序</strong>:</span>
                            </v-col>
                            <v-col>
                                <span @click="setFilter('sort_by', 0)"
                                    :class="{ active: filters.sort_by === 0 }">综合</span>
                                <!-- <span @click="setFilter('sort_by', 1)"
                                    :class="{ active: filters.sort_by === 1 }"></span> -->
                                <span @click="setFilter('sort_by', 4)"
                                    :class="{ active: filters.sort_by === 4 }">悬赏金额</span>
                                <span @click="setFilter('sort_by', 2)"
                                    :class="{ active: filters.sort_by === 2 }">最近创建</span>
                                <span @click="setFilter('sort_by', 3)"
                                    :class="{ active: filters.sort_by === 3 }">最近回答</span>
                            </v-col>
                        </v-row>
                        <v-row class="align-center">
                            <v-col cols="auto">
                                <span><strong>标签筛选</strong>:</span>
                            </v-col>
                            <v-col>
                                <v-chip-group v-model="filters.tags" multiple column active-class="active-tag">
                                    <v-chip v-for="(tag, index) in availableTags" :key="index"
                                        :color="getTagColor(tag)"
                                        outlined @click="toggleTag(tag)">
                                        {{ tag }}
                                    </v-chip>
                                </v-chip-group>
                            </v-col>
                        </v-row>
                    </div>
                    <!-- 底部的搜索栏 -->
                    <v-divider></v-divider>
                    <v-row class="mt-4">
                        <v-col>
                            <v-text-field v-model="filters.search" label="请输入搜索内容" placeholder="" filled
                                append-icon="mdi-magnify" hide-details></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
            <div class="container">
                <div class="row">
                    <div class="card" v-for="(item, index) in cards" :key="index" @click="tryOpenItem(item)">
                        <div class="card-body">
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.tiny_content }}</p>
                        </div>
                        <div class="card-tags">
                            <v-chip-group column>
                                <v-chip 
                                    v-for="(tag, idx) in item.tags" 
                                    :key="idx" 
                                    :color="getTagColor(tag)" 
                                    outlined
                                >
                                    {{ tag }}
                                </v-chip>
                            </v-chip-group>
                        </div>
                        <div class="card-middle">
                            <span class="author">发布于: {{ item.created_at }}</span>
                            <span class="author">发布者: {{ item.created_by.username }}</span>
                            <v-icon v-if="item.commission > 0" color="#F8CC00">mdi-bitcoin</v-icon>
                            <span v-if="item.commission > 0"
                                style="font-size: 13px; color: #666666; margin-left: 0.2%;">
                                {{ item.commission }} 菜币
                            </span>
                        </div>
                    </div>
                </div>
            </div>            

        </template>
    </div>
</template>

<script>
export default {
    name: 'ShareHub',
    data() {
        return {
            loading: true,
            filters: {
                sort_by: 0,
                pay: 0,
                search: '',
                tags: [],
            },
            availableTags: [
                "计算机组成", "数据库", "面向对象", "论文", "习题", "数据结构", "2023-2024", "2024-2025", "复习资料", "往年试题"
            ],
            filtersChanged: false, // 用来标记 filters 是否有变化
            curItem: null,
            cards: [
                {
                    "mission_id": 0,
                    "title": "【求助】寻找数据库往年考试题",
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
                    "title": "【求助】需要机器学习相关的论文资料",
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
                    "title": "【求助】计算机组成原理复习资料",
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
                    "title": "【求助】C语言编程习题集",
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
    watch: {
        filters: {
            deep: true, // 深度监听对象
            handler() {
                this.filtersChanged = true;
            },
        },
    },
    methods: {
        onCardMouseLeave() {
            if (this.filtersChanged) {
                // 如果 filters 有变化，就重新获取数据
                this.getTasks();
                this.filtersChanged = false; // 重置变化标记
            }
        },
        setFilter(type, value) {
            this.filters[type] = value;
        },
        getTasks() {
            // 获取数据 todo

            this.loading = false;
        },
        getTagColor(tag) {
            return this.filters.tags.includes(tag) ? 'brown' : 'blue accent-2';
        },
        toggleTag(tag) {
            console.log(tag);
            const index = this.filters.tags.indexOf(tag);
            if (index === -1) {
                // 如果标签未被选中，则添加到 filters.tags
                this.filters.tags.push(tag);
            } else {
                // 如果标签已被选中，则移除
                this.filters.tags.splice(index, 1);
            }
        },
        goToPage(page) {
            this.$router.push(page);
        },
        tryOpenItem(item) {
            this.curItem = item;
            // todo 打开任务
            // this.$router.push("/tasks/" + item.mission_id);
            this.goToPage("/tasks/testPostForOther");
        },
    },
    mounted() {
        this.$store.commit("setAppTitle", "悬赏任务站");
        this.getTasks();
    },
};
</script>

<style scoped>
.top {
    border-width: 3px !important;
    /* 只改变边框粗细 */
    border-style: solid;
    border-radius: 5px;
    /* 可选，增加圆角效果 */
}

span {
    cursor: pointer;
    margin-right: 20px;
    color: gray;
}

.active {
    color: orange;
}

.filters {
    padding: 10px;
    /* 内边距 */
    display: inline-block;
    /* 确保 span 是块元素，并且 padding 生效 */
}

.tag {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin: 0 5px;
    width: max-content;
    height: 20px;
    font-size: 12px;
    font-family: 'AlibabaPuHuiTi-3-55-Regular', sans-serif;
    color: #3d3d3d;
    background: #12a528;
    border-radius: 10px;
}

.picture {
    padding-left: 1%;
    padding-top: 0.3%;
    padding-bottom: 0.1%;
}


.card-container {
    position: relative;
    display: flex;
    align-items: center;
}

.card-content {
    transition: transform 0.3s ease;
    width: 100%;
}


.action-buttons {
    position: absolute;
    top: 30px;
    right: 20px;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.card-container:hover .action-buttons {
    opacity: 1;
    /* 鼠标悬浮时显示按钮 */
}

.container {
    padding: 20px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.card {
    flex: 0 0 48%;
    /* 每行展示三个卡片 */
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.tag {
    padding: 3px 8px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
}

.highlight {
    background-color: red;
}

.info {
    background-color: blue;
}

.normal {
    background-color: green;
}

.details {
    font-size: 12px;
    color: #999;
}

.card-body {
    color: black;
    margin-bottom: 10px;
}

.card-middle {
    margin: 10px 0;
    font-size: 14px;
    color: #666;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-tags {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.author {
    font-size: 14px;
    color: #333;
}

button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    color: orange;
}
</style>