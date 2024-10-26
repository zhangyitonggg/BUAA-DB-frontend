<template>
  <div>
    <v-btn class="fixed-button" fab dark color="indigo" @click="addTask">
      <v-icon dark>
        mdi-invoice-plus
      </v-icon>
    </v-btn>
  </div>
</template>
<script>
  export default {
    name: 'TasksView',
    components: {
    },
    data() {
    },
    computed: {
    },
    methods: {
      addTask() {
        this.$router.push('/tasks/add');
      }
    },
    watch: {
    },
    mounted() {
      this.$store.commit("setAppTitle", "悬赏");
    },
  }
</script>

<style scoped>
  .fixed-button {
    position: fixed;
    right: 3%;
    bottom: 15%;
    z-index: 5;
  }
</style>