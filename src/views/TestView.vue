<template>
    <div class="container">
        <div class="row">
            <div class="card" v-for="(item, index) in cards" :key="index">
                <div class="card-header">
                    <span :class="'tag ' + item.tagClass">{{ item.tag }}</span>
                    <span class="details">{{ item.details }}</span>
                </div>
                <div class="card-body">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.content }}</p>
                </div>
                <div class="card-middle">
                    <span :class="'tag ' + item.tagClass"># {{ item.tag }}</span>
                </div>
                <div class="card-footer">
                    <span class="author">发布者: {{ item.author }}</span>
                    <div>
                        <button @click="handleStar(index)">⭐</button>
                        <button @click="handleDelete(index)">🗑️</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    export default {
        data() {
            return {
                cards: [
                    {
                        tag: "置顶",
                        tagClass: "highlight",
                        details: "10 关注 | 45 回复",
                        title: "【任务发布】寻找全栈开发导师",
                        content: "希望能找到一位有丰富全栈开发经验的导师，每周进行一次线上指导，帮助我解决学习中的问题并提供项目实践建议。感兴趣的请联系！",
                        author: "张三",
                    },
                    {
                        tag: "公告",
                        tagClass: "info",
                        details: "3 关注 | 12 回复",
                        title: "【提问】如何优化后端接口性能？",
                        content: "最近在开发一个电商项目，发现部分接口响应时间过长。主要使用的技术栈是Node.js + Express。请问有哪些优化建议，或者有没有类似的案例分享？",
                        author: "李四",
                    },
                    {
                        tag: "普通",
                        tagClass: "normal",
                        details: "5 关注 | 15 回复",
                        title: "【求助】设计一个任务发布系统的数据库结构",
                        content: "正在设计一个任务发布系统，涉及到用户、任务、评论等功能。希望能得到关于数据库表结构设计的具体建议，尤其是如何设计关联关系更合理。",
                        author: "王五",
                    },
                    {
                        tag: "公告",
                        tagClass: "info",
                        details: "7 关注 | 20 回复",
                        title: "【任务发布】前端设计优化需求",
                        content: "需要一名熟悉Vue.js和UI/UX设计的开发者，帮助优化现有项目的用户界面，包括交互设计和性能提升。有兴趣的可以提交报价。",
                        author: "赵六",
                    },
                    {
                        tag: "置顶",
                        tagClass: "highlight",
                        details: "8 关注 | 30 回复",
                        title: "【提问】React和Vue如何选择？",
                        content: "在开发一个中型项目时，团队对选择React还是Vue存在争议。请问这两者在性能、生态和学习成本上的主要差异是什么？希望大家能分享自己的经验。",
                        author: "钱七",
                    },
                    {
                        tag: "普通",
                        tagClass: "normal",
                        details: "2 关注 | 6 回复",
                        title: "【求助】后端服务高并发处理方案",
                        content: "项目上线后访问量激增，后端服务器偶尔会崩溃。使用的技术栈是Java Spring Boot。请问有哪些可行的高并发处理方案？",
                        author: "孙八",
                    },
                    {
                        tag: "置顶",
                        tagClass: "highlight",
                        details: "12 关注 | 40 回复",
                        title: "【任务发布】短期项目外包——数据分析",
                        content: "我们正在寻找一位熟悉Python和数据分析的开发者，负责处理并分析一组业务数据。项目周期为两周，具体细节可以私信商讨。",
                        author: "周九",
                    },
                    {
                        tag: "公告",
                        tagClass: "info",
                        details: "9 关注 | 25 回复",
                        title: "【提问】如何设计任务优先级排序算法？",
                        content: "在任务管理系统中，需要根据用户需求动态调整任务的优先级排序。请问有哪些常用的排序算法或者设计思路适合这种场景？",
                        author: "吴十",
                    },
                    {
                        tag: "普通",
                        tagClass: "normal",
                        details: "4 关注 | 10 回复",
                        title: "【求助】移动端页面适配问题",
                        content: "项目的移动端页面在不同分辨率设备上显示效果不一致。请问有什么最佳实践或者工具可以帮助解决适配问题？",
                        author: "郑十一",
                    },
                ],
            };
        },
        methods: {
            handleStar(index) {
                alert(`卡片 ${index + 1} 收藏！`);
            },
            handleDelete(index) {
                this.cards.splice(index, 1);
            },
        },
    };
    </script>
    
    <style scoped>
    .container {
        padding: 20px;
    }
    .row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .card {
        flex: 0 0 32.4%; /* 每行展示三个卡片 */
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