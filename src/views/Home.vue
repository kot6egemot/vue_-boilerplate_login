<template>
  <div>
    <v-navigation-drawer permanent app expand-on-hover>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Конфигуратор скуд
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="onLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main> </v-main>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { get_user } from "@/api/auth";
import { doLogout } from "@/utils/request";

export default {
  name: "Home",
  created() {
    get_user();
  },
  methods: {
    async onLogout() {
      doLogout();
    }
  }
};
</script>
<style lang="css" scoped></style>
