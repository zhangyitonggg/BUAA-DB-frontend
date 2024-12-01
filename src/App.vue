<template>
  <v-app>
    <vue-particles  v-if="$store.getters.hasParticles"
      color="#575454"
      :particleOpacity="0.5"
      :particlesNumber="30"
      shapeType="circle"
      :particleSize="4"
      linesColor="#575454"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.7"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
    >
    </vue-particles>

    <v-app-bar app v-if="$store.state._show_platform_frame_">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <img src="@/assets/images/logo.png" alt="our logo" class="logo" style="cursor: pointer;" @mouseover="showWelcome = true" @mouseleave="showWelcome = false">
      <v-toolbar-title v-if="showWelcome" style="margin-left: 20px;" class="welcome-text">航U邦欢迎您！</v-toolbar-title>      
      <v-toolbar-title v-if="!showWelcome" style="margin-left: 20px;">{{ $store.state._app_title_ }}</v-toolbar-title>      
      <v-spacer></v-spacer>
      <div class="pr-4">{{ getCurrentTimeGreetings() }}，{{ $store.getters.username }}</div>
      <v-btn icon @click="toggleParticles" :color="$store.getters.hasParticles ? 'primary' : 'grey'">
        <v-icon>
          mdi-apache-kafka
        </v-icon>
      </v-btn>
      <v-btn icon @click="changeMode">
        <v-icon transition="scale-transition">
          {{ this.$vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
        </v-icon>
      </v-btn>
      <v-menu bottom min-width="130px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="36">
              <img src="@/assets/images/zyt.png">
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-btn depressed rounded text @click="navigateTo('/center')">
                个人中心
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded text color="error" @click="logout">
                注销
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>


    <v-navigation-drawer v-model="drawer" fixed temporary>
      <div class="d-flex flex-column" style="height: 100%;">
        <v-list class="flex-grow-1">
          <v-list-item v-for="[icon, text, route] in links" :key="icon" link @click="navigateTo(route)">
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-spacer></v-spacer>
        <v-list>
          <v-list-item link @click="handleAboutClick" class="about-btn">
            <v-list-item-icon>
              <v-icon>mdi-progress-question</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>关于</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>

    <v-alert
      elevation="11"
      v-show="$store.state._alert_.show != 0"
      :type="['success', 'info', 'warning', 'error'].includes($store.state._alert_.type) ? $store.state._alert_.type : 'info'"
      transition="scroll-y-transition">
      {{ $store.state._alert_.message }}
    </v-alert>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data() {
    return {
      showWelcome: false, // 控制欢迎文字的显示
      drawer: false,
      links: [
        ['mdi-home', '首页', '/'],
        ['mdi-book-open-variant-outline', '共享资源站', '/resources'],
        ['mdi-account-group', '任务悬赏站', '/tasks'],
        ['mdi-account', '个人中心', '/center'],
        ['mdi-newspaper-variant-multiple-outline', '管理公告', '/admin/newsManage'],
        ['mdi-account-cog', '管理用户', '/admin/userManage'],
        ['mdi-notebook-remove-outline', '管理分享', '/admin/shareManage'],
        ['mdi-calendar-multiple', '管理悬赏', '/admin/taskManage'],
      ],
    };
  },

  methods: {
    navigateTo(route) {
      this.$router.push(route).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
    },
    handleAboutClick() {
      this.navigateTo('/about');
    },
    logout() {
      this.$store.commit("clearPersonalInfo");
      this.$router.push({ name: 'login' });
    },
    changeMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$store.commit("setAlert", this.$vuetify.theme.dark ? { "type": "success", "message": "黑暗模式已启用。" } : { "type": "success", "message": "黑暗模式已关闭。" });
    },
    toggleParticles() {
      this.$store.commit("setParticles", !this.$store.getters.hasParticles);
      this.$store.commit("setAlert", this.$store.getters.hasParticles ? { "type": "success", "message": "背景颗粒已启用。" } : { "type": "success", "message": "背景颗粒已关闭。" });
    },
    getCurrentTimeGreetings() {
        const h = new Date().getHours()
        if (h < 2) return '夜深了'
        if (h < 6) return '别卷了'
        if (h < 12) return '上午好'
        if (h < 13) return '中午好'
        if (h < 18) return '下午好'
        if (h < 23) return '晚上好'
        return '夜深了'
      },
  },
  created() {
    if (localStorage.getItem('__token__') && localStorage.getItem('__user_name__')) {
      this.$store.commit('setAlert', {
        type: "success",
        message: "欢迎回来，" + localStorage.getItem('__user_name__') + "。",
      });
    }
  },
  beforeCreate() {
    if (localStorage.getItem('__dark_theme__')) {
      this.$vuetify.theme.dark = localStorage.getItem('__dark_theme__') === 'true';
    }
  }
};
</script>


<style lang="scss">
@import './assets/styles/main.scss';

#particles-js {
  width: 100%;
  height: calc(100vh - 64px);
  position: absolute;
}

.v-alert {
  z-index: 1001;
  position: fixed;
  bottom: 0;
  width: 105%;
  height: fit-content;
}

.slide-y-enter-active,
.slide-y-leave-active {
  transition: all 0.5s ease;
}

.slide-y-enter,
.slide-y-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.scale-transition {
  transition: transform 0.3s ease;
}
.scale-transition-enter-active {
  transform: scale(1.2);
}
.scale-transition-leave-active {
  transform: scale(0.8);
}
.logo {
  vertical-align: middle; 
  margin-left: 0px;
  margin-top: 0px;
  width: 65px;
  height: auto;
}
.welcome-text {
  background-color: rgba(249, 234, 134, 0.9); /* 使用明亮的黄色背景 */
  color: #ed5e5e; /* 使用红色文字 */
  padding: 8px 15px; /* 增加内边距 */
  border-radius: 10px; /* 增加圆角 */
  white-space: nowrap; /* 不换行 */
  transition: opacity 0.3s; /* 过渡效果 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); /* 添加阴影效果 */
  font-weight: bold; /* 加粗字体 */
  font-size: 16px; /* 调整字体大小 */
}
</style>