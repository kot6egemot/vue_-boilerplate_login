<template>
  <v-card width="300" height="300" class="elevation-12 ma-auto">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Авторизация</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="username"
          label="Введите логин"
          id="login"
          name="username"
          type="text"
        />
        <v-text-field
          v-model="password"
          required
          label="Введите пароль"
          id="password"
          name="password"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn type="submit" @click="startAuth" color="primary">Войти</v-btn>
    </v-card-actions>

    <v-snackbar v-model="snackbar" :timeout="6000">
      Неправильный логин или пароль!
      <v-btn dark text @click="snackbar = false">Закрыть</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { login } from "@/api/auth";
import { getFingerPrint } from "@/utils/request";
import { TokenStorage } from "@/utils/token_storage";

export default {
  name: "LoginView",
  data() {
    return {
      username: "admin",
      password: "admin",
      snackbar: false
    };
  },
  methods: {
    async startAuth() {
      const fingerprint = await getFingerPrint();
      login({
        username: this.username,
        password: this.password,
        fingerprint
      })
        .then(response => {
          TokenStorage.storeToken(response.data.access_token);
          TokenStorage.storeRefreshToken(response.data.refresh_token);
          this.$router.push({ name: "Home" });
        })
        .catch(() => {
          this.snackbar = true;
        });
    }
  }
};
</script>

<style scoped></style>
