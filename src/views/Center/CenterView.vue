<template>
  <div style="margin-top: -50px;">
    <v-container class="spacing-playground pa-16" fluid>
      <component :is="currentComponent" />
      <v-bottom-navigation app fixed color="primary" v-model="activeBtn">
        <v-btn value="UserInfo">
          <span>基本信息</span>
          <v-icon>mdi-message-alert-outline</v-icon>
        </v-btn>
        <v-btn value="MyFollow">
          <span>我的关注</span>
          <v-icon>mdi-hand-coin</v-icon>
        </v-btn>
        <v-btn value="GiveMeMoney">
          <span>我的收藏</span>
          <v-icon>mdi-hand-coin</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-container>
  </div>

  </template>
  
  <script>
  import UserInfo from '../../components/Center/UserInfo.vue'
  import GiveMeMoney from '../../components/Home/GiveMeMoney.vue'
  import MyFollow from '../../components/Center/MyFollow.vue'
    
  export default {
    name: 'CenterView',
    components: {
      UserInfo,
      GiveMeMoney,
      MyFollow,
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