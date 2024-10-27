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
                    v-model="coin"
                    label="报酬"
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
                    <v-textarea
                        v-model="description"
                        label="描述"
                        rows="20"
                    ></v-textarea>
                </v-col>
                <v-col>
                    <v-md-preview :text="description" default-show-toc="True"></v-md-preview>
                </v-col>
            </v-row>
        </v-col>
        <v-btn
            color="light-blue"
            dark
            @click="publish"
        >
            <v-icon left>mdi-send</v-icon>
            发布
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
            coin: 0,
            tags: [],
            tags_to_select: [
                { name: '1111'},
                { name: '1122'},
                { name: '1234'},
                { name: '11'},
            ],
            description: "Input your description here.",
        }),
        components: {
            VMdPreview
        },
        computed: {
        },
        watch: {
        },
        methods: {
            remove (item) {
                const index = this.tags.indexOf(item.name)
                if (index >= 0) this.tags.splice(index, 1)
            },
            publish() {
                console.log(this.title, this.coin, this.tags, this.description);
                this.$router.push('/tasks');
            }
        },
        mounted() {
            this.$store.commit("setAppTitle", "发布悬赏");
        },
    }
</script>