<template>
  <section>
    <section v-if="gig && user" class="seller-details-cont fs16 flex">
      <div v-if="gig.owner.imgUrl" class="img-container">
        <img :src="gig.owner.imgUrl" />
      </div>

      <section class="seller-details flex column">
        <section class="header flex">
          <a>{{ gig.owner.username }}</a>
        </section>

        <p class="slogan">{{ user.slogan }}</p>
        <section class="seller-reviews fs14 clear-list flex align-center">
          <ul class="stars clear-list flex">
            <li v-for="i in rateRounded" v-bind:key="i">
              <span
                v-html="getSvg('star')"
                class="flex justify-center align-center"
              ></span>
            </li>
          </ul>
          <p class="reviews-average">{{ averageReviewUserRate().toFixed(1) }}</p>
          <p class="reviews-amount">({{ gig.reviewsAmount }})</p>
        </section>
      </section>
    </section>

    <section v-if="gig" class="seller-details-container">
      <section class="seller-stat">
        <ul>
          <li class="flex column">
            <span class="mini-title">From</span>
            <span class="mini-info">{{ user.loc }}</span>
          </li>
          <li class="flex column">
            <span class="mini-title">Member since</span>
            <span class="mini-info">{{ user.memberSince }}</span>
          </li>
          <li class="flex column">
            <span class="mini-title">Avg. response time</span>
            <span class="mini-info">{{ user.avgResponseTime }}</span>
          </li>
          <li class="flex column">
            <span class="mini-title">Last delivery</span>
            <span class="mini-info">{{ user.lastDelivery }}</span>
          </li>
          <li class="flex column">
            <span class="mini-title">Languages</span>
            <span class="mini-info">English</span>
          </li>
        </ul>
      </section>
      <section class="seller-desc">
        <p>{{ user.about }}</p>
      </section>
    </section>
  </section>
</template>


<script>
import { svgService } from "../services/svg.service.js";

export default {
  props: ["user"],
  data() {
    return {
      gig: null,
      rateRounded:Math.round(this.averageReviewUserRate())
    }
  },
  async created() {
    const { gigId } = this.$route.params
    this.gig = await this.$store.dispatch({ type: "setCurrentGig", gigId })
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    averageReviewUserRate() {
            let rateSum = this.user.reviews.reduce((acc, reviewer) => {
            let rate = +reviewer.rate
            return acc + rate
            }, 0)
            return rateSum / this.user.reviews.length
        },
  },
}
</script>