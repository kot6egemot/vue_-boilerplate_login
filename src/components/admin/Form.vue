<template>
  <div></div>
</template>

<script>
import { entity_form } from "@/api/entity";

export default {
  name: "Form",
  props: ["entity", "title"],
  mounted() {
    entity_form(this.entity)
      .then(r => {
        console.log(r);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped></style>
