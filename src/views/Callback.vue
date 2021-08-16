<template>
  <div>
    <p>Sign-in in progress</p>
  </div>
</template>

<script>
import AuthServices from "@/services/auth";
import Vue from "vue";

export default Vue.extend({
  async created() {
    try {
      const result = await AuthServices.signinRedirectCallback();
      let returnToUrl = "/";
      if (result.state !== undefined) {
        returnToUrl = result.state;
      }
      this.$router.push({ path: returnToUrl });
    } catch (e) {
      this.$router.push({ name: "Unauthorized" });
    }
  },
});
</script>
