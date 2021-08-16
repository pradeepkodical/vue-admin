<template>
  <v-navigation-drawer app v-model="sideNav" @input="onChanged" color="sideBar">
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <avatar-box :src="initials" :initials="initials"> </avatar-box>
      </v-list-item-avatar>
    </v-list-item>

    <v-list-item-group v-model="selectedItem" class="side-menu">
      <template v-for="item in items">
        <v-list-item
          :key="item.title"
          v-if="item.path"
          link
          @click="doSelect(`${item.path}`)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-group
          :key="item.title"
          v-else
          value="true"
          :prepend-icon="item.icon"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="citem in item.children"
            :key="citem.title"
            link
            @click="doSelect(`${citem.path}`)"
          >
            <v-list-item-icon> </v-list-item-icon>
            <v-list-item-title v-text="citem.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list-item-group>
  </v-navigation-drawer>
</template>

<script lang="ts">
import AuthServices from "@/services/auth";
import Vue from "vue";

import AvatarBox from "../components/AvatarBox.vue";

interface MenuItem {
  title: string;
  icon: string;
  path?: string;
  children?: Array<MenuItem>;
}

export default Vue.extend({
  name: "AppSideNav",
  components: { AvatarBox },
  data() {
    return {
      sideNav: true,
      selectedItem: "",
      items: [
        { title: "Home", icon: "mdi-home-city", path: "/" },
        { title: "Contact", icon: "mdi-account", path: "/contact" },
        {
          title: "Users and Leads",
          icon: "mdi-account-group-outline",
          children: [
            {
              title: "Users",
              icon: "mdi-account-group-outline",
              path: "/users",
            },
            {
              title: "Leads",
              icon: "mdi-account-group-outline",
              path: "/leads",
            },
          ],
        },
      ] as Array<MenuItem>,
    };
  },
  created() {
    const path = this.$router.currentRoute.path;
    const selectPath = (item: MenuItem) => {
      if (item.path === path) {
        this.selectedItem = item.title;
      }
      if (item.children) {
        item.children.forEach((i) => {
          selectPath(i);
        });
      }
    };

    this.items.forEach((i) => {
      selectPath(i);
    });
  },
  computed: {
    userName() {
      return AuthServices.getUserName();
    },
    initials() {
      return AuthServices.getUserInitials();
    },
  },
  methods: {
    onChanged(state: boolean) {
      this.sideNav = state;
    },
    doToggle() {
      this.sideNav = !this.sideNav;
    },
    doSelect(path: string) {
      this.$router.push(path).catch((e) => {
        console.log(e);
      });
    },
  },
});
</script>

<style>
.side-menu .v-list-item__icon {
  margin-right: 12px !important;
  margin-left: 0 !important;
}
</style>
