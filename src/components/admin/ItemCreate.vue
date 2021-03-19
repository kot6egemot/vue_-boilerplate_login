<template>
  <v-card>
    <v-card-title> Создать {{ title }}</v-card-title>
    <v-card-text>
      <v-form v-model="form_is_valid">
        <v-text-field
          :key="header.value"
          v-for="header in headers"
          :label="header.text"
          v-model="item[header.value]"
        ></v-text-field>
        <v-btn color="success" class="mr-4" @click="onCreate">
          Сохранить
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { entity_form, entity_create } from "@/api/entity";

export default {
  name: "ItemCreate",
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
        for (let header of this.headers) {
          this.item[header.value] = "";
        }
        console.log(r);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onCreate() {
      entity_create(this.entity, this.item)
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
