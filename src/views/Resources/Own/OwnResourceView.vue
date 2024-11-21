<template>
    <div style="margin-top: 9px;">
        <v-container>
            <v-row>
                <v-col>
                <v-card outlined  @click="goToPage('/resources/testPost')" style="cursor: pointer;">
                    <v-row no-gutters class="picture"> <!-- 给整个 v-row 添加 padding -->
                    <v-col cols="auto" class="d-flex align-center"> <!-- 确保图片在垂直方向上居中 -->
                        <v-img src="@/assets/images/blogDefault.png" aspect-ratio="1" height="110px" width="110px"
                        contain></v-img>
                    </v-col>
                    <v-col>
                        <v-card-title style="margin-top:-5px;">
                        计算机组成考试题（2023-2024学年）
                        <v-icon color="#F8CC00"> mdi-bitcoin </v-icon>
                        <span style="font-size: 13px; color: #666666; margin-left:0.2%;">5菜币</span>
                        </v-card-title>
                        <div style="margin-left: 1.8%; margin-top: -10px;"> <!-- 添加左边距 -->
                        <v-chip color="aqua" label small class="me-3">计算机组成</v-chip>
                        <v-chip color="aqua" label small class="me-3">考试题</v-chip>
                        <v-chip color="aqua" label small class="me-3">2023-2024</v-chip>
                        </div>
                        <v-card-actions style="margin-left: 0.8%;">
                        <div>
                            <span>
                            <v-icon style="display: inline-block; margin-top: -7px;">mdi-thumb-up</v-icon>
                            <span class="ml-2">3407</span>
                            </span>
                            <span>
                            <v-icon>mdi-thumb-down</v-icon>
                            <span class="ml-2">109</span>
                            </span>
                            <span>
                            <v-icon>mdi-heart-box</v-icon>
                            <span class="ml-2">96</span>
                            </span>
                            <span>
                            <v-icon>mdi-comment-multiple</v-icon>
                            <span class="ml-2">12</span>
                            </span>
                        </div>
                        <div class="ml-auto">
                            <span>张三</span>
                            <span>2024-04-29</span>
                        </div>
                        </v-card-actions>
                    </v-col>
                    </v-row>
                </v-card>
                </v-col>
            </v-row>        
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
    }),
    components: {
    },
    computed: {
    },
    watch: {
    },
    methods: {
        goToPage(page) {
            this.$router.push(page);
        },
    },
    mounted() {
        this.$store.commit("setAppTitle", "您分享的资源");
    },
}
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
  background: #d9fe32;
  border-radius: 10px;
}

.picture {
  padding-left: 1%;
  padding-top: 0.3%;
  padding-bottom: 0.1%;
}
</style>