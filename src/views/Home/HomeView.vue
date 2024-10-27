<template>
  <v-container class="spacing-playground pa-16" fluid>
    <news-list />
  </v-container>
</template>
<script>
  import NewsList from '../../components/Home/News.vue'
  import FrontConfig from '../../components/Home/FrontConfig.vue'
  export default {
    name: 'HomeView',
    components: {
      NewsList,
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
    watch: {
    },
    mounted() {
      var title = this.getCurrentTimeGreetings() + "，" + this.$store.getters.username;
      this.$store.commit("setAppTitle", title);
    }
  }
</script>
<style scoped>
  .v-bottom-navigation {
    bottom: 0;
  }
</style>