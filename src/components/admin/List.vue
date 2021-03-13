<template>
  <div>List123</div>
</template>

<script>
export default {
  props: ["title", "entity"],
  name: "List",
  created() {
    console.log(this.title, this.entity);
  }
};
</script>

<style scoped></style>
