<template>
  <v-container>
    <!-- 上传头像 -->
    <v-form @submit.prevent="uploadAvatar">
      <v-file-input
        v-model="file"
        label="选择头像"
        accept="image/*"
        outlined
        :rules="[fileRequired]"
        prepend-icon="mdi-camera"
        @change="previewImage"
      ></v-file-input>

      <!-- 显示预览 -->
      <v-img v-if="imagePreview" :src="imagePreview" max-width="200" class="my-2"></v-img>

      <!-- 提交按钮 -->
      <v-btn color="primary" type="submit" :disabled="!file">上传头像</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      file: null,  // 存储文件
      imagePreview: null,  // 存储预览的图像 URL
    };
  },
  computed: {
    // 如果没有文件则禁用提交按钮
    fileRequired() {
      return (v) => !!v || '请上传头像';
    },
  },
  methods: {
    // 预览头像
    previewImage() {
      if (this.file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.file);  // 将文件读取为 DataURL（base64）
      }
    },
    
    // 上传头像
    async uploadAvatar() {
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append('avatar', this.file);

      try {
        // 发送到后端的 API（假设接口为 POST /upload-avatar）
        const response = await this.$axios.post('/upload-avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // 成功后做的操作
        console.log('头像上传成功', response);
      } catch (error) {
        console.error('上传失败', error);
      }
    },
  },
};
</script>
