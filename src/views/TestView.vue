<template>
  <v-container>
    <v-row>
      <v-col v-for="(card, index) in cards" :key="card.id">
        <div
          class="card-container"
          @mouseover="hoverCard(index)"
          @mouseleave="leaveCard(index)"
        >
          <!-- 删除按钮 -->
          <v-btn
            class="delete-btn"
            color="red"
            outlined
            v-show="hoveredCard === index"
            @click="deleteCard(card.id)"
          >
            删除
          </v-btn>

          <!-- 卡片内容 -->
          <v-card
            class="hover-card"
            outlined
            :class="{ 'hover-active': hoveredCard === index }"
          >
            <v-row no-gutters>
              <v-col cols="auto" class="d-flex align-center">
                <v-img
                  :src="card.image"
                  aspect-ratio="1"
                  height="110px"
                  width="110px"
                  contain
                ></v-img>
              </v-col>
              <v-col>
                <v-card-title>{{ card.title }}</v-card-title>
                <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
                <div style="margin-left: 1.8%;">
                  <v-chip
                    v-for="tag in card.tags"
                    :key="tag"
                    color="aqua"
                    label
                    small
                    class="me-3"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
                <v-card-actions style="margin-left: 0.8%;">
                  <div>
                    <span>
                      <v-icon>mdi-thumb-up</v-icon>
                      <span class="ml-2">{{ card.likes }}</span>
                    </span>
                    <span>
                      <v-icon>mdi-thumb-down</v-icon>
                      <span class="ml-2">{{ card.dislikes }}</span>
                    </span>
                    <span>
                      <v-icon>mdi-heart-box</v-icon>
                      <span class="ml-2">{{ card.favorites }}</span>
                    </span>
                  </div>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          image: "@/assets/images/logo.png",
          title: "数据结构期末复习资料",
          subtitle: "2024-2025学年",
          tags: ["数据结构", "复习资料", "2024-2025"],
          likes: 5289,
          dislikes: 143,
          favorites: 305,
        },
        {
          id: 2,
          image: "@/assets/images/blogDefault.png",
          title: "计算机组成考试题",
          subtitle: "2023-2024学年",
          tags: ["计算机组成", "考试题", "2023-2024"],
          likes: 3407,
          dislikes: 109,
          favorites: 96,
        },
      ],
      hoveredCard: null, // 当前悬停的卡片索引
    };
  },
  methods: {
    hoverCard(index) {
      this.hoveredCard = index;
    },
    leaveCard() {
      this.hoveredCard = null;
    },
    deleteCard(id) {
      this.cards = this.cards.filter((card) => card.id !== id);
    },
  },
};
</script>

<style scoped>
.card-container {
  position: relative;
  overflow: hidden;
}

.hover-card {
  transition: transform 0.3s ease;
}

.hover-active {
  transform: translateX(-50px); /* 左移效果 */
}

.delete-btn {
  position: absolute;
  right: -80px; /* 初始隐藏 */
  top: 50%;
  transform: translateY(-50%);
  transition: right 0.3s ease;
  z-index: 10;
}

.card-container:hover .delete-btn {
  right: 10px; /* 鼠标悬停时显示删除按钮 */
}
</style>
