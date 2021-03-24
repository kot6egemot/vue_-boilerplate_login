<template>
  <v-card>
    <v-card-title> Обновить запись раздела {{ title }}</v-card-title>
    <v-card-text>
      <v-form v-model="form_is_valid">
        <template v-for="header in headers">
          <v-text-field
            :key="header.value"
            :label="header.text"
            v-model="item[header.value]"
          ></v-text-field>
        </template>
        <v-btn color="success" class="mr-4" @click="onCreate">
          Сохранить
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
import { entity_form, entity_create } from "@/api/entity";

export default {
  name: "ItemCreate",
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
        .then(() => {
          this.showSnackbar("Запись успешно создана", "green");
        })
        .catch(error => {
          this.showSnackbar(`Произошла ошибка ${error}`, "red");
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
