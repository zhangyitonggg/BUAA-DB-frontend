<template>
  
</template>

<script>
import TaskPostForAsker from './TaskPostForAsker.vue';
import TaskPostForOther from './TaskPostForOther.vue';

export default({
  components: {
    TaskPostForAsker,
    TaskPostForOther,
  },
  data() {
    return {
      taskId: this.$route.params.id,
      task: null,
    };
  },
  mounted() {
    this.$store.dispatch("getTaskDetail", { id: this.taskId })
      .then((res) => {
        this.task = res
      })
      .catch((err) => {
        this.$store.commit("setAlert", {
          type: "error",
          message: err,
        });
      });
    console.log(this.task)
  }
})
</script>
