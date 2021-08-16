<template>
  <v-avatar color="secondary">
    <v-img
      v-if="!failedImage"
      :src="src"
      contain
      v-on:error="onImgError"
    ></v-img>
    <span v-else class="white--text text-h5 text-uppercase">{{
      initials
    }}</span>
  </v-avatar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AvatarBox",
  props: {
    src: String,
    initials: String,
  },
  data: () => ({
    failedImage: false,
  }),
  methods: {
    onImgError() {
      this.failedImage = true;
    },
  },
});
</script>
