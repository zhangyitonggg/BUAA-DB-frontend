<template>
  <v-container class="spacing-playground pa-16" fluid>
    <component :is="currentComponent" />
    <v-btn class="fixed-button" fab dark color="indigo" @click="add">
      <v-icon dark>
        mdi-invoice-plus
      </v-icon>
    </v-btn>
  </v-container>
</template>
<script>
  import ShareHub from '../../components/Share/ShareHub.vue'
  import SharingResource from '../../components/Share/ShareResource.vue'
  import GiveMeMoney from '../../components/Home/GiveMeMoney.vue'

  export default {
    name: 'ShareView',
    components: {
      ShareHub,
      SharingResource,
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
      add() {
        this.$router.push('/resources/add');
      }
    },
    watch: {
    }
  }
</script>
<style scoped>
  .v-bottom-navigation {
    bottom: 0;
  }
  .fixed-button {
    position: fixed;
    right: 5%;
    bottom: 15%;
    z-index: 5;
  }
</style>