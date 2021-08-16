<template>
  <v-footer
    padless
    :style="{
      bottom: 0,
      position: 'absolute',
      width: '100%',
      height: '106px',
    }"
  >
    <v-card class="flex" flat tile>
      <v-card-title class="background">
        <strong class="subheading">All rights reserved</strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 text-center">
        {{ new Date().getFullYear() }} — <strong>Vue Desk</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "AppFooter",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
});
</script>
