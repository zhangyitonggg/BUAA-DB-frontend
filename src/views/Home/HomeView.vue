<template>
    <v-container class="spacing-playground pa-16" fluid>
      <component :is="currentComponent" />
      <v-bottom-navigation app fixed color="primary" v-model="activeBtn">
        <v-btn value="NewsList">
          <span>公告</span>
          <v-icon>mdi-message-alert-outline</v-icon>
        </v-btn>
        <v-btn value="FrontConfig">
          <span>页面设置</span>
          <v-icon>mdi-chat-processing</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-container>
  </template>
  <script>
  import NewsList from '../../components/Home/News.vue'
  import FrontConfig from '../../components/Home/FrontConfig.vue'
  export default {
    name: 'HomeView',
    components: {
      NewsList,
      FrontConfig,
    },
    data() {
      return {
        activeBtn: 'NewsList',
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