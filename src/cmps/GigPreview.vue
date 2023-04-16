<template>
  <section class="gig-preview">
    <!-- <img :src="url" @click="setGig" /> -->
    <section
      ref="previewImageSlide"
      @click.stop="setGig"
      class="gig-prev-slide"
    >
      <section style="{z-index: -1, width: 100%, height: 100%}"></section>
      <vueper-slides
        ref="vueperslides1"
        :touchable="false"
        fade
        :autoplay="false"
        @slide="
          $refs.vueperslides2.goToSlide($event.currentSlide.index, {
            emit: false,
          })
        "
        :slide-ratio="4 / 6.6"
        :bullets="true"
      >
        <vueper-slide
          class="gig-details-vueperslide2"
          v-for="(img, i) in gig.imgs"
          :key="i"
          :image="img"
        ></vueper-slide>
      </vueper-slides>
    </section>
    <section class="owner-preview flex align-center p12-12-8 lh16-8 fs14">
      <section class="owner-preview-img-container">
        <img :src="userImgUrl" />
      </section>
      <section class="flex column">
        <span class="user-name-prev lh-18">{{ gig.owner.fullname }}</span>
        <span class="user-level-prev lh21"
          >{{ gig.owner.level }}
          <!-- <span v-if="gig.owner.level !== ''">Seller</span> -->
          </span
        >
      </section>
    </section>
    <h3 @click="setGig" class="title-gig p0-12-5 m5-0-0 lh22">{{ gig.title }}</h3>
    <section class="review-prev p10-12 lh24">
      <span class="fs14 lh21">
        <span v-html="getSvg('reviewStar')"></span>
        {{ averageReviewRate }}
        <span>({{ gig.reviewsAmount }})</span>
      </span>
    </section>
    <section
      class="price-link lh24 p10-12 flex space-between align-center justify-center"
    >
      <span v-html="getSvg('heart')"></span>
      <button>
        <router-link :to="'/gig/' + gig._id"
          ><small class="fs10 lh20 p2-0-0">STARTING AT </small
          ><span class="fs18 lh20">${{ gig.price }}</span></router-link
        >
      </button>
    </section>
    <!-- <button hidden @click="onRemove(gig._id)">x</button>
    <button hidden @click="addGigMsg(gig._id)">Add gig msg</button>
    <button hidden @click="printGigToConsole(gig)">
      Print msgs to console
    </button> -->

    <!-- <button hidden>
      <RouterLink :to="'/gig/' + gig._id">Details</RouterLink>
    </button>
    <button hidden>
      <RouterLink :to="'/gig/edit/' + gig._id">Edit</RouterLink>
    </button> -->
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { svgService } from '../services/svg.service.js'

export default {
  name: 'GigPreview',

  props: ['gig'],

  data() {
    return {
      user: {
        reviews: {
          average: null,
          amount: null
        }
      }
    }
  },
  computed: {
    url() {
      return this.gig.url[0]
    },
    userImgUrl() {
      return this.gig.owner.imgUrl
    },
    averageReviewRate() {
      let rateSum = this.gig.reviews.reduce((acc, reviewer) => {
        let rate = +reviewer.rate
        return acc + rate
      }, 0)
      let avg = rateSum / this.gig.reviews.length
      return avg.toFixed(1)
    }
    // seller() {
    //   console.log(this.$store.getters.gigSeller)
    //   return this.$store.getters.gigSeller
    // }
    // reviewAmount() {
    //   if (this.gig.reviews.amount > 1000) return '1k+'
    //   else return this.gig.reviews.amount  
    // },
    // reviewAverage() {
    //   return this.gig.reviews.average.toFixed(1)
    // }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    setGig() {
      if (event.target.tagName.toLowerCase() === 'button' || event.target.tagName.toLowerCase() === 'svg') return
      this.$router.push('/gig/' + this.gig._id)
    },
    onRemove(gigId) {
      console.log('asd')
      this.$emit('removeGig', gigId)
    },
  },
  async created() {
    let userId = this.gig.owner._id
    let user = await this.$store.dispatch({type:'getById', userId})
    this.user = user
  },
  components: {
    VueperSlides,
    VueperSlide,
  }
}
</script>
