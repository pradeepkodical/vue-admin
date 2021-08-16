<template>
  <div>
    {{ name }}

    {{ $vuetify.lang.t("$vuetify.dataIterator.rowsPerPageText") }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Home",
  data: () => ({ name: "pradeep" }),
});
</script>
