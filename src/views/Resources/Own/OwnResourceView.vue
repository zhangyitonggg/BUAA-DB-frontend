<template>
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
          确定要删除 <strong>{{ curItem ? curItem.title : '' }}</strong> 吗？
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
      ownShare: [],
    };
  },
  methods: {
    // 获取所有用户数据
    getOwnShare() {
      this.$store.dispatch("ownPosts")
        .then((res) => { this.ownShare = res })
        .catch((err) => { this.$store.commit("setAlert", { type: "error", message: err, }); });
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