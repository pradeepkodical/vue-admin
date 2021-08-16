<template>
  <span>
    <v-menu v-model="showMenu">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-web</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(lng, index) in langs"
          :key="index"
          @click="() => changeLng(lng)"
        >
          <v-list-item-title>{{ lng }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { changeLanguage } from "../plugins/vueI18n";

export default Vue.extend({
  name: "LanguageSelect",
  data: () => ({ showMenu: false, langs: ["en", "sv"] }),
  created() {
    this.langs = this.$i18n.availableLocales;
  },
  methods: {
    changeLng(lng: string) {
      changeLanguage(lng);
      //$i18n.locale
    },
  },
});
</script>
