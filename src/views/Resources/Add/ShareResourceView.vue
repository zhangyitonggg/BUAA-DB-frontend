<template>
    <v-container>
        <v-col>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="title"
                        label="标题"
                        :rules="[v => !!v || '标题不能为空']"
                        aria-required=""
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="cost"
                    label="收费金额"
                    :rules="[
                        v => !!v || '报酬不能为空',
                        v => /^\d+$/.test(v) || '报酬必须是非负整数'
                    ]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-autocomplete
                        v-model="tags"
                        :items="tags_to_select"
                        color="blue-grey lighten-2"
                        label="标签"
                        item-text="name"
                        item-value="name"
                        multiple
                        hide-selected
                    >
                        <template v-slot:selection="data">
                            <v-chip
                                v-bind="data.attrs"
                                :input-value="data.selected"
                                close
                                @click="data.select"
                                @click:close="remove(data.item)"
                            >
                                {{ data.item.name }}
                            </v-chip>
                        </template>
                        <template v-slot:item="data">
                            <template v-if="typeof data?.item !== 'object'">
                                <v-list-item-content> {{ data.item }} </v-list-item-content>
                            </template>
                            <template v-else>
                                <v-list-item-content>
                                <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                                </v-list-item-content>
                            </template>
                        </template>
                  </v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="link" 
                        :label="labelText"
                        :rules="[rules.required, rules.isValidUrl]"
                        aria-required=""
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea
                        v-model="content"
                        label="描述"
                        rows="16"
                    ></v-textarea>
                </v-col>
                <v-col>
                    <v-md-preview :text="content" default-show-toc="True"></v-md-preview>
                </v-col>
            </v-row>
        </v-col>
        <v-btn
            color="light-blue"
            dark
            @click="publish"
            class="mr-2"
        >
            <v-icon left>mdi-send</v-icon> 发布
        </v-btn>
        <v-btn
            color="gray"
            dark
            @click="back"
        >
            <v-icon left>mdi-backspace</v-icon> 取消
        </v-btn>
    </v-container>
</template>
<script>
    import VMdPreview from '@kangc/v-md-editor/lib/preview';
    import '@kangc/v-md-editor/lib/style/preview.css';
    import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
    import '@kangc/v-md-editor/lib/theme/style/github.css';
    import hljs from 'highlight.js';
    VMdPreview.use(githubTheme, {
        Hljs: hljs,
    });
    export default {
        data: () => ({
            title: null,
            cost: 0,
            tags: [],
            tags_to_select: [
                { name: '计算机组成'},
                { name: '数据库'},
                { name: '2024-2025'},
                { name: '1234'},
                { name: '11'},
            ],
            content: "Input your description here. We support **Markdown format**.",
            link: null,
            rules: {
                // 必填校验
                required: v => !!v || '链接不能为空',
                // 链接格式校验
                isValidUrl: v => {
                const urlPattern = new RegExp(
                    "^(https?:\\/\\/)?" + // 支持 http 和 https
                    "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + // 域名
                    "((\\d{1,3}\\.){3}\\d{1,3}))" + // 或 IP 地址
                    "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // 端口和路径
                    "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // 查询参数
                    "(\\#[-a-zA-Z\\d_]*)?$", // 锚点
                    "i" // 忽略大小写
                );
                return urlPattern.test(v) || '链接格式不正确';
                },
            },
        }),
        components: {
            VMdPreview
        },
        computed: {
            labelText() {
                // 如果链接格式正确，则显示合法的提示
                if (this.rules.isValidUrl(this.link) === true) {
                    return '您上传的bhpan链接是合法的';
                }
                return '请上传资源的bhpan链接';
            },
        },
        watch: {
        },
        methods: {
            remove (item) {
                const index = this.tags.indexOf(item.name)
                if (index >= 0) this.tags.splice(index, 1)
            },
            publish() {
                console.log(this.title, this.cost, this.tags, this.content);
                this.$router.push('/resources');
                // todo 调用创建任务的接口
            },
            back() {
                this.$router.push('/resources');
                this.$store.commit("setAlert", {
                    type: "success",
                    message: "已取消发布任务。",
                });
            }
        },
        mounted() {
            this.$store.commit("setAppTitle", "分享资源");
        },
    }
</script>