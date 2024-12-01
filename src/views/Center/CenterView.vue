<template>
  <div style="margin-top: -50px;">
    <v-container class="spacing-playground pa-16" fluid>
      <component :is="currentComponent" />
      <v-bottom-navigation app fixed color="primary" v-model="activeBtn">
        <v-btn value="UserInfo">
          <span>基本信息</span>
          <v-icon>mdi-message-alert</v-icon>
        </v-btn>
        <v-btn value="MyFollow">
          <span>我的关注</span>
          <v-icon>mdi-account-star</v-icon>
        </v-btn>
        <v-btn value="MyFavorite">
          <span>我的收藏</span>
          <v-icon>mdi-movie-open-star</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-container>
  </div>

  </template>
  
  <script>
  import UserInfo from '../../components/Center/UserInfo.vue'
  import MyFollow from '../../components/Center/MyFollow.vue'
  import MyFavorite from '../../components/Center/MyFavorite.vue'; 

  export default {
    name: 'CenterView',
    components: {
      UserInfo,
      MyFollow,
      MyFavorite,
    },
    data() {
      return {
        activeBtn: 'UserInfo',
        loading: true,
      }
    },
    computed: {
      currentComponent() {
        return this.activeBtn;
      }
    },
    created() {
      console.log(this.$store.state.myFavorite)
      if (this.$store.state.myFavorite) {
        this.$store.commit("setMyFavorite", false);
        this.activeBtn = 'MyFavorite';
      }
    },
    methods: {
    },
    watch: {
    }
  }
  </script>
  
  <style scoped>
  .v-bottom-navigation {
    bottom: 0;
  }
  </style>