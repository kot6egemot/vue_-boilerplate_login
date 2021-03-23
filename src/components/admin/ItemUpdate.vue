<template>
  <v-card>
    <v-card-title> Создать запись раздела {{ title }}</v-card-title>
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
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="6000">
      {{ snackbar.text }}
      <v-btn dark text @click="snackbar.show = false">Закрыть</v-btn>
    </v-snackbar>
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
      form_is_valid: false,
      snackbar: {
        show: false,
        text: "",
        color: ""
      }
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
        this.showSnackbar("Запись успешно создана", "green");
      })
      .catch(error => {
        this.showSnackbar(`Произошла ошибка ${error}`, "red");
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
    },
    showSnackbar(text, color) {
      this.snackbar.show = true;
      this.snackbar.text = text;
      this.snackbar.color = color;
    }
  }
};
</script>

<style scoped></style>
