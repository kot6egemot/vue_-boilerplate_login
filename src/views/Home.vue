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
      <v-list dense nav>
        <template v-for="menu in menu_items">
          <v-list-item
            :to="`/${menu.entity}`"
            :title="menu.title"
            :key="menu.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ menu.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <v-divider></v-divider>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ username }}</v-toolbar-title>
      <v-btn icon @click.stop="onLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { get_user } from "@/api/auth";
import { doLogout } from "@/utils/request";
import { mapGetters } from "vuex";
import menu_items from "@/utils/temp/menu_items";

export default {
  name: "Home",
  data() {
    return {
      username: "",
      menu_items: menu_items
    };
  },
  async created() {
    if (!this.getUser) {
      await get_user().then(response => {
        this.$store.commit("setUser", response.data);
      });
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
