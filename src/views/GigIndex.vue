<template>
  <!-- <div> -->
    <!-- <GigFilter ></GigFilter> -->
    <!-- @setFilterBy="setFilterBy" -->

    <GigList
      v-if="gigs"
      :gigs="gigs"
      @removeGig="removeGig"
      @setFilter="setFilter"
    ></GigList>

    <!-- <button hidden>
      <RouterLink to="/gig/edit">Add a new gig</RouterLink>
    </button> -->
  <!-- </div> -->
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionRemoveGig } from '../store/gig.store'
import GigList from '../cmps/GigList.vue'
// import GigFilter from "../cmps/GigFilter.vue"

export default {
  data() {
    return {}
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    gigs() {
      return this.$store.getters.gigs
    }
  },
  created() {
    if (this.$route.query.searchStr) {
      let filterBy = {
        title: this.$route.query.searchStr,
        price: 0,
        daysToMake: 0,
        description: '',
        budget: null,
        seller: [],
        owner: ''
      }
      this.$store.dispatch({ type: 'loadGigs', filterBy })
    } else this.$store.dispatch({ type: 'loadGigs' })
    console.log(this.gigs)
  },
  methods: {
    setFilter(filterBy) {
      console.log(filterBy)
      this.$store.dispatch({ type: 'loadGigs', filterBy })
    },
    async removeGig(gigId) {
      try {
        await this.$store.dispatch(getActionRemoveGig(gigId))
        showSuccessMsg('Gig removed')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove gig')
      }
    },

    printGigToConsole(gig) {
      console.log('Gig msgs:', gig.msgs)
    },
  },
  components: {
    GigList,
    // GigFilter
  },
}
</script>
