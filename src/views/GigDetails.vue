<template>
<section>
    <section class="nav-cont">
        <section class="nav-main">
            <ul class="nav-list clear-list flex align-center">
                <li class="p0" v-for="({ to, title }, idx) in navSections" :key="to" @click="(activeNav = idx)"
                    :class="{ activeNav: activeNav === idx }">
                    <router-link :to="`#${to}`">{{ title }}</router-link>
                </li>
            </ul>
        </section>
    </section>

    <section v-if="gig && user" class="gig-details-flex-container">
        <section class="gig-details">
            <section v-if="gig" class="main">
                <p id="overview" class="title fs28">{{gig.title}}</p>
                <section class="seller-section flex align-center fs14">
                    <div class="img-container">
                        <img :src="gig.owner.imgUrl"/>
                    </div>
                    <div class="text-container">
                        <div class="text">
                            <p class="seller-username">{{ gig.owner.username }}</p>
                            <p class="seller-level">{{ user.level }}</p>
                            <div class="line"> | </div>
                        </div>
                        <div class="rate flex align-center clear-list">
                            <ul class="stars clear-list flex">
                                <li class="p0" v-for="i in RateRounded" v-bind:key="i">
                                    <span v-html="getSvg('star')" class="flex justify-center align-center"></span>
                                </li>
                            </ul>
                            <p class="rate-score">{{ averageReviewGigRate().toFixed(1) }}</p>
                            <p class="seller-reviews-count" v-if="user.reviews.length">({{ gig.reviewsAmount }})</p>
                        </div>
                    </div>
                </section>
            </section>

            <section class="slideshow">
                <vueper-slides ref="vueperslides1" :touchable="false" :autoplay="false" :bullets="false" @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })" :slide-ratio="(48 / 67)">
                    <vueper-slide v-for="(img, i) in gig.imgs" :key="i" :image="img"></vueper-slide>
                </vueper-slides>

                <div class="thumbnails-slider">
                    <vueper-slides class="no-shadow thumbnails" ref="vueperslides2" @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })" :visible-slides="gig.imgs.length" :fixed-height="'90px'" :bullets="false" :touchable="false" :gap="1" :arrows="false">
                        <vueper-slide v-for="(img, i) in gig.imgs" :slide-ratio="(48 / 67)" :key="i" :image="img" @click="$refs.vueperslides2.goToSlide(i)"></vueper-slide>
                    </vueper-slides>
                </div>
            </section>
            <section class="abouts">
                <section class="review-seller">
                    <h2 class="fs20 lh28">What people loved about this seller</h2>
                        <div class="review-details-container">
                            <review-details :gig="gig" :user="user" :type="'reviewShort'"></review-details>
                        </div>
                </section>
                <section class="about-gig">
                    <h2 class="fs20 lh28" id="description">About This Gig</h2>
                    <p class="desc lh24 fs16">{{gig.description}}</p>
                </section>
                <ul class="metadata clear-list flex">
                    <li>
                        <p class="meta">Logo Style</p>
                        <p>{{gig.logoStyle}}</p>
                    </li>
                    <li>
                        <p class="meta">File format</p>
                        <p>AI, JPG, PDF, PNG, PSD,<br> EPS, CDR, SVG</p>
                    </li>
                </ul>
                <section class="about-seller">
                    <h2 class="fs20 lh28" id="about">About The Seller</h2>
                    <seller-details :user="user"></seller-details>
                </section>
            
                <section class="review-preview-container" id="reviews">
                    <review-preview :gig="gig" :user="user"></review-preview>
                </section>

                <ul class="render-long-review clear-list">
                    <li v-for="i in user.reviews" v-bind:key="i">
                        <review-details :gig="gig" :i="i" :user="user" :type="'reviewLong'"></review-details>
                    </li>
                </ul>
            </section>
        </section>
        
        <section class="contact">
            <section class="gig-details-order">
                <section class="header align-center">
                    <h3 class="title">Order Details</h3>
                    <h3 class="price fs20"> US${{ gig.price }} </h3>
                </section>
                <p class="fs14">From this package you can get a BLACK OUTLINE SKETCH of your logo / character.  NO COLOR </p>

                <section class="icons fs14">
                    <div class="order-delivery flex align-center">
                        <span v-html="getSvg('clock')"></span>
                        <p class="fs14"> {{ gig.daysToMake }} Days Delivery</p>
                    </div>
                    <div class="order-revisions flex align-center">
                        <span v-html="getSvg('revisions')"></span>
                        <p class="fs14"> Unlimited Revisions </p>
                    </div>
                </section>

                <ul class="features p0">
                    <details>
                        <summary>
                            What's Included?
                            <span class="icon" v-html="getSvg('featuresArrow')"></span>
                        </summary>
                        <li class="fs14" v-for="feature in features" v-bind:key="feature">
                            <span class="pie12" v-html="getSvg('greenV')"></span>
                            {{ feature }}
                        </li>
                    </details>
                </ul>

                <router-link :to="`/gig/payment/${gig._id}`">
                    <button class="continue-btn">Continue <span v-html="getSvg('continueArrow')"></span></button>
                </router-link>

            </section>
        </section>
    </section>
</section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import { svgService } from '../services/svg.service.js'
import 'vueperslides/dist/vueperslides.css'
import GigPayment from './GigPayment.vue'
import SellerDetails from '../cmps/SellerDetails.vue'
import ReviewDetails from '../cmps/ReviewDetails.vue'
import ReviewPreview from '../cmps/ReviewPreview.vue'

export default {
  data() {
    return {
      gig: null,
      user: null,
      RateRounded: null,
      activeNav: 0,
      features: ['1 concept included', 'Logo transparency', 'Vector file', 'Printable file', 'Include 3D mockup', 'Include source file'],
      navSections: [
                { to: 'overview', title: 'Overview' },
                { to: 'description', title: 'Description' },
                { to: 'about', title: 'About the seller' },
                { to: 'reviews', title: 'Reviews' },
            ],
    }
  },
  async created() {
    const { gigId } = this.$route.params
    //this.$store.dispatch({ type: "setCurrentGig", gigId })
        //.then((gig)=> this.gig ={...gig})
    this.gig = await this.$store.dispatch({ type: "setCurrentGig", gigId })
    this.averageReviewGigRate()

    let userId = this.gig.owner._id
    let user = await this.$store.dispatch({ type:'getById', userId})
    this.user = user

    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  components: { 
    VueperSlides, 
    VueperSlide,
    GigPayment,
    SellerDetails,
    ReviewDetails,
    ReviewPreview
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        averageReviewGigRate() {
            let rateSum = this.gig.reviews.reduce((acc, reviewer) => {
            let rate = +reviewer.rate
            return acc + rate
            }, 0)
            this.RateRounded = Math.round(rateSum / this.gig.reviews.length)
            return rateSum / this.gig.reviews.length
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

