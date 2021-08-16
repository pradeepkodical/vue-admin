<template>
  <div>
    <p>Renewal in progress</p>
  </div>
</template>

<script lang="ts">
import AuthServices from "@/services/auth";
import Vue from "vue";

export default Vue.extend({
  async created() {
    try {
      console.log("Silent RENEWING");

      const result = await AuthServices.signinSilentCallback();

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  },
});
</script>
