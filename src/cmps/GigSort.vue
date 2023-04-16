<template>
  <section class="gig-sort flex space-between">
    <p class="gig-amount m0-4-0-0 fs14 lh22">
      {{ gigs.length }} services available
    </p>
    <section class="sort-wrapper flex column">
      <section class="sort-row flex space-between">
        <span class="lh19-2">Sort by</span>
        <section class="sort-input lh19-2" @click="spinFilter(); toggleSortList()">
          {{ sortBy }}
          <span class="arrow-span" :class="{arrowSpin:spin}" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg>
          </span>
        </section>
      </section>
      <section v-show="showSortList" class="sort-list fs14 lh22 p24 bs-b-0-12-18-0 m8-0-0 flex column align-center">
        <section  @click="sortByPrice" class="p9-16 m0-16">Price</section>
        <section  @click="sortByRate" class="p9-16 m0-16">Rate</section>
      </section>
    </section>
    <!-- <section>
      <span>sort by:</span>
      <el-select
        id="sort"
        class="sort-by"
        @change="setSortBy"
        v-model="sortBy.by"
        placeholder="Best Selling"
      >
        <el-option value="Recommended">Recommended</el-option>
        <el-option value="Best Selling">Best Selling</el-option>
        <el-option value="Newest Arrivals">Newest Arrivals</el-option>
      </el-select>
    </section> -->
  </section>
</template>

<script>
export default {
  name: 'GigSort',
  props: ['gigs'],
  data() {
    return {
      spin: false,
      showSortList: false,
      sortBy: 'Price'
    }
  },
  methods: {
    sortByPrice() {
      this.sortBy = 'Price'
      this.$emit('sort', this.sortBy)
    },
    sortByRate() {
      this.sortBy = 'Rate'
      this.$emit('sort', this.sortBy)
    },
    spinFilter() {
      this.spin = !this.spin
      console.log(this.spin)
    },
    toggleSortList() {
      this.showSortList = !this.showSortList
    },
    // setSortBy() {
    //   console.log({ ...this.sortBy })
    //   this.$store.dispatch({ type: 'loadToys', sortBy: { ...this.sortBy } })
    // },
  },
}
</script>
