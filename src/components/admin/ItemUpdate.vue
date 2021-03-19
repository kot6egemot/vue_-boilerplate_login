<template>
  <v-card>
    <v-card-title> Создать {{ title }} </v-card-title>
    <v-card-text>
      <v-form v-model="form_is_valid">
        <v-text-field
          :key="header.value"
          v-for="header in headers"
          :label="header.text"
          v-model="item[header.value]"
        ></v-text-field>
        <v-btn color="success" @click="onUpdate" class="mr-4">
          Обновить
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { entity_by_id, entity_form, entity_update } from "@/api/entity";

export default {
  name: "ItemUpdate",
  props: ["entity", "title"],
  data() {
    return {
      headers: [],
      item: {},
      form_is_valid: false
    };
  },
  mounted() {
    entity_form(this.entity)
      .then(r => {
        const response_data = r.data;
        this.headers = response_data.headers;
        console.log(r);
      })
      .catch(error => {
        console.log(error);
      });
    entity_by_id(this.entity, this.$route.params.id)
      .then(r => {
        const response_data = r.data;
        this.item = response_data[this.entity];
        console.log(r);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onUpdate() {
      entity_update(this.entity, this.$route.params.id, this.item)
        .then(r => {
          console.log(r);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped></style>
