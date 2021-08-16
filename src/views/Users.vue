<template>
  <v-card elevation="2">
    <v-toolbar
      class="d-flex flex-row-reverse users-list users-search-bar"
      :style="{ zIndex: 4, top: `${$vuetify.breakpoint.xs ? '50px' : '60px'}` }"
    >
      <search-box @search="doSearch"></search-box>
    </v-toolbar>
    <v-list three-line class="users-list">
      <v-list-item-group v-model="selected">
        <template v-for="(item, index) in list">
          <v-list-item
            :key="item.aggregateId"
            @click="() => selectUser(item.aggregateId)"
          >
            <v-list-item-avatar>
              <avatar-box :src="item.avatarUrl" :initials="item | initials">
              </avatar-box>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-html="`${item.firstName} ${item.lastName}`"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.emailAddress"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <paging-box
      :currentPage="filter.currentPage"
      :rowsPerPage="filter.pageSize"
      :totalCount="filter.totalCount"
      @change="onPagingChanged"
    ></paging-box>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import SearchBox from "../components/SearchBox.vue";
import AvatarBox from "../components/AvatarBox.vue";
import PagingBox from "../components/PagingBox.vue";
import { PagingFilter } from "../models/pagingModel";
import ProgressServices from "../services/progress";

export default Vue.extend({
  components: { SearchBox, AvatarBox, PagingBox },
  data: () => ({
    selected: null,
  }),
  async created() {
    await this.doReload(this.filter);
  },
  computed: {
    filter() {
      return this.$store.state.users.filter;
    },
    list() {
      return this.$store.state.users.items;
    },
  },

  methods: {
    async onPagingChanged(filter: PagingFilter) {
      const { searchText } = this.filter;
      await this.doReload({
        searchText,
        ...filter,
      });
    },
    async doSearch(searchText: string) {
      const { pageSize } = this.filter;
      await this.doReload({
        pageSize,
        searchText,
        currentPage: 1,
        totalCount: 0,
      });
    },
    async doReload(filter: PagingFilter) {
      try {
        ProgressServices.show();
        await this.$store.dispatch("users/getUsersByFilter", filter);
      } finally {
        ProgressServices.hide();
      }
    },
    selectUser(userId: string) {
      this.$router.push(`/users/${userId}`);
    },
  },
});
</script>

<style>
.users-search-bar {
  position: sticky;
}
.users-list {
  background-color: var(--v-panelBg-base) !important;
}
</style>
