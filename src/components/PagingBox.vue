<template>
  <v-toolbar flat class="d-flex flex-row-reverse align-items-center paging-bar">
    <v-spacer></v-spacer>
    <span class="text-subtitle-2"
      >{{ $vuetify.lang.t("$vuetify.dataIterator.rowsPerPageText") }}:</span
    >
    <v-select
      :items="dPages"
      :value="dRowsPerPage"
      @change="onRowsPerPageChanged"
      class="pl-1 mt-5 text-subtitle-2"
    ></v-select>
    <span class="pl-1 text-subtitle-2">
      {{
        $vuetify.lang.t("$vuetify.dataIterator.pageText", from, to, totalCount)
      }}
    </span>
    <v-btn icon plain @click="movePrevPage" :disabled="cannotGoPrev"
      ><v-icon>mdi-chevron-left</v-icon></v-btn
    >
    <v-btn icon plain @click="moveNextPage" :disabled="cannotGoNext"
      ><v-icon>mdi-chevron-right</v-icon></v-btn
    >
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PagingBox",
  props: {
    pages: { type: undefined, default: () => [5, 10, 15, 25, 50, 100] },
    rowsPerPage: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 },
    totalCount: { type: Number, default: 0 },
  },
  watch: {
    currentPage: function (newValue, oldValue) {
      if (newValue != oldValue) {
        this.dCurrentPage = newValue | 0;
      }
    },
  },
  data: () => ({
    dPages: [] as number[],
    dRowsPerPage: 0,
    dCurrentPage: 0,
  }),
  created() {
    this.dPages = this.pages;
    this.dRowsPerPage = this.rowsPerPage;
    this.dCurrentPage = this.currentPage;
  },
  computed: {
    from() {
      return 1 + (this.dCurrentPage - 1) * this.dRowsPerPage;
    },
    to() {
      return Math.min(this.dCurrentPage * this.dRowsPerPage, this.totalCount);
    },
    cannotGoPrev() {
      return this.dCurrentPage <= 1;
    },
    cannotGoNext() {
      const maxPage = Math.ceil((this.totalCount * 1.0) / this.dRowsPerPage);
      return this.dCurrentPage >= maxPage;
    },
  },
  methods: {
    movePrevPage() {
      if (this.dCurrentPage - 1 > 0) {
        this.dCurrentPage -= 1;
        this.onChange();
      }
    },
    moveNextPage() {
      if (
        this.dCurrentPage + 1 <=
        Math.ceil((this.totalCount * 1.0) / this.dRowsPerPage)
      ) {
        this.dCurrentPage += 1;
        this.onChange();
      }
    },
    onRowsPerPageChanged(pages: number) {
      this.dRowsPerPage = pages;
      this.dCurrentPage = 1;
      this.onChange();
    },
    onChange() {
      this.$emit("change", {
        pageSize: this.dRowsPerPage,
        currentPage: this.dCurrentPage,
        totalCount: this.totalCount,
      });
    },
  },
});
</script>

<style scoped lang="css">
.paging-bar {
  background-color: var(--v-panelBg-base) !important;
}
</style>
