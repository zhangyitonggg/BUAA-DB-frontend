<template>
    <v-container class="spacing-playground pa-16" fluid>
      <component :is="currentComponent" />
      <v-bottom-navigation app fixed color="primary" v-model="activeBtn">
        <v-btn value="ShareHub">
          <span>共享资源站</span>
          <v-icon>mdi-message-alert-outline</v-icon>
        </v-btn>
        <v-btn value="FrontConfig">
          <span>分享资源</span>
          <v-icon>mdi-chat-processing</v-icon>
        </v-btn>
        <v-btn value="GiveMeMoney">
          <span>我的资源</span>
          <v-icon>mdi-hand-coin</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-container>
  </template>
  
  <script>
  import ShareHub from '../../components/Share/ShareHub.vue'
  import FrontConfig from '../../components/Home/FrontConfig.vue'
  import GiveMeMoney from '../../components/Home/GiveMeMoney.vue'
  
  export default {
    name: 'ShareView',
    components: {
      ShareHub,
      FrontConfig,
      GiveMeMoney,
    },
    data() {
      return {
        activeBtn: 'ShareHub',
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