<template>
  <app-layout />
</template>

<script>
import Vue from "vue";
import AppLayout from "./layout/AppLayout.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppLayout,
  },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Home"],
      ["mdi-send", "About"],
      ["mdi-send", "Contact"],
    ],
  }),
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
  },
});
</script>
