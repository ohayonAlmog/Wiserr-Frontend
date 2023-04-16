<template>
  <section class="filter-box">
    <section class="p24" v-show="boxType==='Seller Details'">
      Seller Level:
      <el-checkbox-group v-model="filterBy.seller">
        <el-checkbox label="Top Rated Seller" />
        <el-checkbox label="Level 1" />
        <el-checkbox label="Level 2" />
      </el-checkbox-group>
    </section>
    <section v-show="boxType==='Budget'" class="flex space-between filter-inputs p24 menu-content">
      <section class="flex column">
        <label>
          Min
          <el-input
            type="number"
            class="w-50 m-2"
            v-model="filterBy.budget.min"
          />
        </label>
      </section>
      <section class="flex column">
        <label>
          Max
          <el-input type="number" v-model="filterBy.budget.max" />
        </label>
      </section>
    </section>
    <section class="p24" v-show="boxType==='Delivery Time'">
      <el-radio-group
        v-model="filterBy.deliveryTime"
        class="ml-4 flex column align-center justify-center"
      >
        <el-radio label=3 size="large">up to 3 days</el-radio>
        <el-radio label=7 size="large">up to 7 days</el-radio>
        <el-radio class="anytime-btn" label=100 size="large">anytime</el-radio>
      </el-radio-group>
    </section>
    <section class="button-row flex space-between align-center p16-24">
      <button class="lh24 p12-24 clear" @click.stop="clearInputs">
        Clear All
      </button>
      <button class="lh24 p12-24 apply" @click.stop="applyFilter">Apply</button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'FilterBox',
  props: ['filterType'],
  data() {
    return {
      boxType: null,
      filterBy: {
        seller: [],
        budget: {
          min: 0,
          max: 500000,
        },
        deliveryTime: null,
        title: null
      },
    }
  },
  created() {
    this.boxType = this.filterType
  },
  methods: {
    clearInputs() {
      this.filterBy.seller = []
      this.filterBy.budget = { min: 0, max: 500000 }
      this.filterBy.deliveryTime = null
      this.$emit('setFilter', { ...this.filterBy })
      this.filterBy.budget = { min: 0, max: 0 }
    },
    applyFilter() {
      // console.log(this.filterBy)
      this.$emit('setFilter', { ...this.filterBy })
    },
  },
}
</script>
