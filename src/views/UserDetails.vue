<template>
  <v-card elevation="2">
    {{ userId }}
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

//import UserServices from "../services/users";
//import ProgressServices from "../services/ProgressServices";

export default Vue.extend({
  props: {
    userId: String,
  },
});
</script>

<style>
.users-search-bar {
  position: sticky;
  top: 60px;
}
.users-list {
  background-color: var(--v-panelBg-base) !important;
}
</style>
