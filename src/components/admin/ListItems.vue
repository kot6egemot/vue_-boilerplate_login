<template>
  <v-card elevation="5" style="height: calc(100vh - 92px)">
    <v-card-title>{{ title }}</v-card-title>
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate color="green"></v-progress-circular>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      fixed-header
      :header-props="{ sortIcon: null }"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" :to="`${entity}/create`"
            >Создать</v-btn
          >
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          :to="`${entity}/update/${item.id}`"
          @click="onEditItem(item)"
        >
          <v-icon class="mr-2" small>mdi-pencil</v-icon>
        </v-btn>
        <v-icon small @click="onDeleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-snackbar
      :timeout="5000"
      v-model="snackbar.show"
      :color="snackbar.color"
      bottom
      >{{ this.snackbar.text }}
    </v-snackbar>
  </v-card>
</template>

<script>
import { entity_list } from "@/api/entity";

export default {
  props: ["title", "entity"],
  name: "List",
  created() {
    this.loading = true;
    entity_list(this.entity)
      .then(r => {
        const response_data = r.data;
        this.loading = false;
        this.headers = response_data.headers;
        this.headers.push({
          value: "actions",
          text: "Действия",
          sortable: false
        });
        this.items = response_data[this.entity];
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
      });
  },
  data() {
    return {
      loading: false,
      search: "",
      snackbar: {
        show: false,
        text: "",
        color: ""
      },
      headers: [],
      items: []
    };
  },
  methods: {
    onCreateItem() {
      console.log("click Создать");
    },
    onEditItem(item) {
      console.log("click Редактировать");
      console.log(item);
    },
    onDeleteItem(item) {
      console.log("click Удалить");
      console.log(item);
    }
  }
};
</script>

<style scoped></style>
