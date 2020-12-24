<template>
  <section class="pagination" v-if="totalPages > 0">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" @click.prevent="prevPage">
            <span class="sr-only arrow_left"
              ><img src="/assets/img/arrow.svg" alt=""
            /></span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: nowPage === page  }"
          v-for="(page, idx) in pages"
          :key="idx"
        >
          <a class="page-link" href="#" @click.prevent="selectPage(page )">{{
            page 
          }}</a>
        </li>

        <li class="page-item">
          <a class="page-link" href="#" @click.prevent="nextPage">
            <span class="sr-only arrow_right"
              ><img src="/assets/img/arrow.svg" alt=""
            /></span>
          </a>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
// import _ from 
export default {
  props: {
    nowPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    pages() {
      return this.totalPages;
    },
  },
  methods: {
    prevPage() {
      if (this.nowPage <= 1) return;
      this.selectPage(this.nowPage - 1);
    },
    nextPage() {
      if (this.nowPage >= this.totalPages) return;
      this.selectPage(this.nowPage + 1);
    },
    selectPage(page) {
      let query = {...this.$route.query};
      query.page = page;
      this.$router.push({
        query,
      });
    },
  },
};
</script>

<style lang="scss" >
</style>