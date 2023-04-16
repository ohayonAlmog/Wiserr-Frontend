<template>
  <section class="gig-filter-wrapper" :class="{ fixed: filterStyle }">
    <section
      class="gig-filter flex space-between">
      <section class="flex">
        <!-- <section class="filter-selector lh24 p12-16">
          Options
          <span v-html="getSvg('downArrow')" class="arrow-span" aria-hidden="true"></span>
        </section> -->
        <section
          v-for="(filter, i) in filterTypes"
          :key="i"
          @click="spinFilter(); filterType = filterType !== filter ? filter : null" 
          class="filter-selector lh24 p12-16"
        >
          <span>{{ filter }}</span>
          <FilterBox
            @click.stop
            v-if="filterType === filter"
            :filterType="filterType"
            @setFilter="setFilter"
          />
          <span v-html="getSvg('downArrow')" class="arrow-span" :class="{arrowSpin:spin && filterType===filter || !spin && filterType===filter}" aria-hidden="true">
              
          </span>
        </section>
      </section>
      <section class="flex">
        <div class=" btn-left flex align-center space-between lh24 switch-wrapper">
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
          Pro services
        </div>
        <div class="btn-right flex align-center space-between lh24 switch-wrapper">
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
          Local sellers
        </div>
        <!-- <div class="flex align-center space-between lh24 switch-wrapper">
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
          Online sellers
        </div> -->
      </section>
    </section>
  </section>
</template>

<script>
import FilterBox from './FilterBox.vue'
import { svgService } from "../services/svg.service.js" 
export default {
  name: 'GigFilter',
  data() {
    return {
      spin: false,
      filterStyle: false,
      filterTypes: [/* 'Seller Details', */ 'Budget', 'Delivery Time'],
      filterType: null,
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    spinFilter() {
      this.spin = !this.spin
    },
    setFilter(filterBy) {
      this.$emit('setFilter', {...filterBy})
    },
    handleScroll() {
      if (window.scrollY > 150) this.filterStyle = true
      else this.filterStyle = false
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    FilterBox,
  },
}
</script>