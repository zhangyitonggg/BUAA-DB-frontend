<template>
  <div style="margin-top: -50px;">
    <loading v-if="loading"/>
    <v-container v-else>
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
                <!-- <span @click="setFilter('sort_by', 3)"
                  :class="{ active: filters.sort_by === 3 }">最近回答</span> -->
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
              <v-text-field v-model="filters.key_word" label="请输入搜索内容" placeholder="" filled
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
    </v-container>
  </div>
</template>

<script>
import loading from "../Loading.vue";

export default {
  name: 'ShareHub',
  components: {
    loading,
  },
  data() {
    return {
      loading: true,
      filters: {
        sort_by: 0,
        pay: 0,
        key_word: '',
        tags: [],
      },
      availableTags: [],
      filtersChanged: false, // 用来标记 filters 是否有变化
      curItem: null,
      cards: [],
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
      this.$store.dispatch("getTasks", this.filters)
        .then((res) => {
          this.cards = res.posts;
        })
        .catch((error) => { this.$store.commit("setAlert", { type: "error", message: error, }); })
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
      }
    },
    tryOpenItem(item) {
      this.curItem = item;
      window.open(`/tasks/${item.mission_id}`, '_blank');
    },
  },
  mounted() {
    this.loading = true;
    this.$store.commit("setAppTitle", "共享资源站");
    this.$store.dispatch("getTags", {key_word: null})
      .then((tags) => {
        this.availableTags = tags.tags;
      })
      .catch((error) => {
        this.$store.commit("setAlert", {
          type: "error",
          message: error,
        });
      });
    this.getTasks();
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
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
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