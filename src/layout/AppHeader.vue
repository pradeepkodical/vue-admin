<template>
  <div>
    <v-app-bar app color="appBar" flat>
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>

      <v-toolbar-title class="hidden-sm-and-down">Vue Desk</v-toolbar-title>

      <v-spacer></v-spacer>
      <span>Welcome {{ userName }}</span>

      <language-select></language-select>

      <v-btn
        icon
        v-if="$vuetify.theme.dark === true"
        @click="$vuetify.theme.dark = false"
      >
        <v-icon>mdi-white-balance-sunny</v-icon>
      </v-btn>
      <v-btn icon v-else @click="$vuetify.theme.dark = true">
        <v-icon>mdi-weather-night</v-icon>
      </v-btn>

      <v-btn icon @click="signOut">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
    <v-progress-linear
      indeterminate
      :style="{
        position: 'fixed',
        zIndex: 5,
        display: isBuzy ? 'block' : 'none',
      }"
    ></v-progress-linear>
  </div>
</template>

<script>
import AuthServices from "@/services/auth";
import Vue from "vue";
import LanguageSelect from "../components/LanguageSelect.vue";

export default Vue.extend({
  name: "AppHeader",
  components: {
    LanguageSelect,
  },
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  computed: {
    isBuzy() {
      return this.$store.state.progress.isBuzy;
    },
    userName() {
      return AuthServices.getUserName();
    },
  },
  methods: {
    toggleMenu() {
      this.$emit("onToggle");
    },
    async signOut() {
      await AuthServices.logout();
    },
  },
});
</script>
