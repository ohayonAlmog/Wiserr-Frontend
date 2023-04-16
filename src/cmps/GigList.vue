<template>
  <section class="main-list-section">
    <GigFilter @setFilter="setFilter" />
    <GigSort :gigs="gigs" @sort="sort" />
    <section class="gig-list" v-if="gigs.length">
      <GigPreview
        v-for="gig in gigs"
        :gig="gig"
        :key="gig._id"
        @removeGig="$emit('removeGig', $event)"
      />
    </section>

    <section class="no-gigs" v-if="gigs.length===0">
      <img class= "no-gigs-img" src="https://res.cloudinary.com/dm72lanye/image/upload/v1680385675/tfssc37o4mfswjdrjonn.png">
<h2 class="no-gigs-msg">No Services Found For Your Search</h2>
<p class="no-gigs-info">Try a new search or get a free quote for your project from our community of freelancers.</p>
    </section>
    
  </section>
</template>

<script>
import GigPreview from './GigPreview.vue'
import GigFilter from './GigFilter.vue'
import GigSort from './GigSort.vue'
export default {
  name: 'GigList',
  props: ['gigs'],
  data() {
    return {
      // sortBy: {
      //   by: '',
      // },
      filterStyle: false,
    }
  },
  methods: {
    sort(sortBy) {
      console.log(sortBy)
      // let gigs = this.gigs
      // gigs.sort((a, b) => {
      //   a.price = +a.price
      //   b.price = +b.price
      //   return a.price - b.price
      // })
    },
    setFilter(filterBy) {
      this.$emit('setFilter', filterBy)
    },
    removeGig(gigId) {
      console.log('list', gigId)
      this.$emit('removeGig', gigId)
    },
  },
  components: {
    GigPreview,
    GigFilter,
    GigSort
  },
}
</script>
