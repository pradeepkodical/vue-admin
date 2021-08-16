<template>
  <v-app>
    <app-side-nav ref="sideNav" />
    <v-main>
      <app-header @onToggle="doToggle" />
      <v-container fluid :style="{ paddingBottom: '106px' }">
        <router-view />
      </v-container>
      <app-footer />
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import AppFooter from "./AppFooter.vue";
import AppHeader from "./AppHeader.vue";
import AppSideNav from "./AppSideNav.vue";

export default Vue.extend({
  name: "AppLayout",
  components: { AppFooter, AppHeader, AppSideNav },
  data: () => ({
    drawer: null,
  }),
  methods: {
    doToggle() {
      this.$refs.sideNav.doToggle();
    },
  },
});
</script>

<style>
.v-main {
  background-color: var(--v-background-base);
}
</style>
