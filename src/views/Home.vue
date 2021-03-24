<template>
  <div>
    <v-navigation-drawer permanent app expand-on-hover>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Title
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>A Block</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>

      <v-toolbar-title>{{ username }}</v-toolbar-title>
      <v-btn icon @click.stop="onLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main> </v-main>
  </div>
</template>

<script>
import { get_user } from "@/api/auth";
import { doLogout } from "@/utils/request";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      username: ""
    };
  },
  async created() {
    if (!this.getUser) {
      await get_user()
        .then(response => {
          this.$store.commit("setUser", response.data);
        })
        .catch(() => {});
    }
    const user = this.getUser;
    this.username = user.username;
  },
  methods: {
    async onLogout() {
      doLogout();
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>
<style lang="css" scoped></style>
