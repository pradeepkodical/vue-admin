<template>
  <v-form class="search-text">
    <v-text-field hide-details single-line v-model="searchText"></v-text-field>
    <v-btn icon @click="doSearch" type="submit">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchBox",
  data: () => ({
    searchText: "",
  }),
  methods: {
    doSearch(e: { preventDefault: () => void }) {
      e.preventDefault();
      this.$emit("search", this.searchText);
    },
  },
});
</script>

<style scoped lang="css">
.search-text {
  display: flex;
  align-items: center;
}
</style>
