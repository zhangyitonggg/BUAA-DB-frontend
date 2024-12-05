<template>
  <div style="margin-top: -50px;">
    <Loading v-if="loading" />
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
                <span @click="setFilter('sort_by', 1)"
                  :class="{ active: filters.sort_by === 1 }">最多点赞</span>
                <span @click="setFilter('sort_by', 4)"
                  :class="{ active: filters.sort_by === 4 }">最多收藏</span>
                <span @click="setFilter('sort_by', 2)"
                  :class="{ active: filters.sort_by === 2 }">最近创建</span>
                <span @click="setFilter('sort_by', 3)"
                  :class="{ active: filters.sort_by === 3 }">最近评论</span>
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="auto">
                <span><strong>收费</strong>:</span>
              </v-col>
              <v-col>
                <v-radio-group v-model="filters.pay" row>
                  <v-radio label="不限" :value="0"></v-radio>
                  <v-radio label="收费" :value="1"></v-radio>
                  <v-radio label="免费" :value="2"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="auto">
                <span><strong>标签筛选</strong>:</span>
              </v-col>
              <v-col>
                <v-chip-group multiple column active-class="active-tag">
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
      <v-container>
        <v-row v-for="(item) in post" :key="item.post_id">
          <v-col>
            <div class="card-container">
              <!-- 卡片主体 -->
              <v-card outlined class="card-content" style="cursor: pointer;">
                <v-row no-gutters class="picture">
                  <v-col cols="auto" class="d-flex align-center">
                    <!-- <v-img :src="item.image" aspect-ratio="1" height="110px" width="110px"
                    contain></v-img> -->
                    <!-- <v-icon color="#FFB300"
                      style="font-size: 106px; margin-left: -10%; margin-right: -20px;">mdi-file-download-outline
                    </v-icon> -->
                  </v-col>
                  <v-col>
                    <v-card-title>
                      {{ item.title }}
                      <v-icon v-if="item.cost > 0" color="#F8CC00">mdi-bitcoin</v-icon>
                      <span v-if="item.cost > 0"
                        style="font-size: 13px; color: #666666; margin-left: 0.2%;">
                        {{ item.cost }} 菜币
                      </span>
                    </v-card-title>
                    <div style="margin-left: 1.8%;">
                      <v-chip v-for="(tag, tagIndex) in item.tags" :key="tagIndex" color="aqua"
                        label small class="me-3">
                        {{ tag }}
                      </v-chip>
                    </div>
                    <v-card-actions style="margin-left: 0.8%;">
                      <div>
                        <span>
                          <v-icon
                            style="display: inline-block; margin-top: -7px;">mdi-thumb-up</v-icon>
                          <span class="ml-2">{{ item.likes }}</span>
                        </span>
                        <span>
                          <v-icon>mdi-thumb-down</v-icon>
                          <span class="ml-2">{{ item.dislikes }}</span>
                        </span>
                        <span>
                          <v-icon>mdi-heart-box</v-icon>
                          <span class="ml-2">{{ item.favorites }}</span>
                        </span>
                        <span>
                          <v-icon>mdi-comment-multiple</v-icon>
                          <span class="ml-2">{{ item.comments }}</span>
                        </span>
                      </div>
                      <div class="ml-auto">
                        <span>{{ item.created_by.username }}</span>
                        <span>{{ formatDate(item.created_at) }}</span>
                      </div>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card>
              <!-- 操作按钮 -->
              <div class="action-buttons">
                <v-btn color="primary" class="me-2" icon @click.stop="tryOpenItem(item)">
                  <v-icon style="font-size: 32px;">mdi-open-in-new</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <!-- 支付确认对话框 -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card elevation="3" class="rounded-lg">
          <v-card-title class="text-h6 text-center font-weight-bold pb-0">
            <v-icon color="primary" size="32px" class="mr-2">mdi-alert-circle-outline</v-icon>
            确认支付 <v-icon color="#F8CC00" size="32px" class="ml-2">mdi-bitcoin</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="py-4">
            <div class="text-body-1">
              您确定要支付 <strong class="text-primary text-h6">{{ curItem.cost }}</strong> 菜币吗？
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn text color="grey darken-2" class="font-weight-bold" @click="closeDialog">取消</v-btn>
            <v-btn text color="primary" class="font-weight-bold" @click="confirmPayment">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import Loading from '../Loading.vue';
import { format } from 'date-fns';

export default {
  name: 'ShareHub',
  components: {
    Loading,
    format,
  },
  data() {
    return {
      loading: true,
      filters: {
        sort_by: 0,
        pay: 0,
        search: '',
        tags: [],
      },
      filtersChanged: false, // 用来标记 filters 是否有变化
      dialog: false, // 是否显示支付确认对话框
      curItem: {
        cost: 0
      }, // 当前操作的 item
      post: [],
      availableTags: [],
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
    formatDate(dateString) {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
    },
    onCardMouseLeave() {
      if (this.filtersChanged) {
        // 如果 filters 有变化，就重新获取数据
        this.getPosts();
        this.filtersChanged = false; // 重置变化标记
      }
    },
    setFilter(type, value) {
      this.filters[type] = value;
    },
    getPosts() {
      let pay = null
      if (this.filters.pay === 1) {
        pay = true;
      } else if (this.filters.pay === 2) {
        pay = false;
      }
      this.$store.dispatch("getPosts",{
        pay: pay,
        sort_by: this.filters.sort_by,
        key_word: this.filters.search,
        tags: this.filters.tags
      })
        .then(res => {
          this.post = res.posts;
        })
        .catch(e => {
          this.post = [];
          this.$store.commit("setAlert", { type: "error", message: e })
        })
    },
    goToPage(page) {
      this.$router.push(page);
    },
    tryOpenItem(item) {
      this.curItem = item;
      // todo 打开操作逻辑
      if (item.cost > 0) {
        // 如果有价格，就弹出购买对话框
        this.dialog = true;
      } else {
        this.goToPage('/resources/' + item.post_id);
      }
    },
    getTagColor(tag) {
      return this.filters.tags.includes(tag) ? 'blue accent-2' : 'brown';
    },
    toggleTag(tag) {
      const index = this.filters.tags.indexOf(tag);
      if (index === -1) {
        // 如果标签未被选中，则添加到 filters.tags
        this.filters.tags.push(tag);
      } else {
        // 如果标签已被选中，则移除
        this.filters.tags.splice(index, 1);
      } console.log(this.filters.tags);
    },
    closeDialog() {
      this.dialog = false;
    },
    confirmPayment() {
      // todo 这里需要触发实际支付逻辑，即调用支付 API
      let s = `已支付 ${this.curItem.cost} 菜币`;
      this.$store.commit("setAlert", { type: "info", message: s });
      this.closeDialog(); // 关闭对话框
    },
  },
  mounted() {
    this.loading = true;
    this.$store.commit("setAppTitle", "共享资源");
    this.$store.dispatch("getTags", { key_word: null })
      .then(res => {
        this.availableTags = res.tags;
      })
      .catch(e => {
        this.$store.commit("setAlert", { type: "error", message: e })
      });
    this.getPosts();
    this.loading = false;
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
    background: #d9fe32;
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
</style>