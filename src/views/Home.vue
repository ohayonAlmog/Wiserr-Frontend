<template>
  <section class="home-page main-layout full">
    <section class="hero-container main-layout full">
      <div class="img-hero-container full">
        <span v-if="screenWidth>900">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          :alt="`Famous man ${index + 1}`"
          :class="{ active: index === currentIndex }"
        />
      </span>
      </div>
      <div class="search-container flex-column">
        <h1>
          Find the perfect&nbsp;
          <i>freelance</i>
          services for your business
        </h1>
        <div class="hero-search flex">
          <form class="input-container flex" @submit="setFilterBy" >
            <div class="search-bar-icon"  v-html="getSvg('greySearch')" ></div>
            <input 
              type="input"  v-model="filterBy.title"
              placeholder="Try &quot;building mobile app&quot;"
              autocomplete="off"
            />
            <button class="btn-search-form">Search</button>
          </form>
        </div>
        <div class="popular flex">
          Popular:
          <div class="tag">Website Design</div>
          <div class="tag">WordPress</div>
          <div class="tag">Logo Design</div>
          <div class="tag">AI services</div>
        </div>
      </div>
      <div v-if="screenWidth>900" class="hero-info flex">
        <div>
          <div>
            <div >
            <span  v-for="(star, index) in stars" :key="index">
              <span
                v-html="getSvg('star')"
                :class="[currentIndex===0||currentIndex===2||currentIndex===5 ? 'svg-star' : 'star-transperent']"
              ></span>
            </span>
          </div>
          </div>
          <div class="hero-name">
            {{ this.nameHeroes[currentIndex] }}
            <span class="hero-professional">{{
              this.gigHeros[currentIndex]
            }}</span>
          </div>
        </div>
        <span></span>
      </div>
    </section>

    <div class="trusted-by main-layout full flex align-center justify-content">
      <span class="flex align-center">
        <span class="trusted-span">Trusted by:</span>
        <span class="trusted-container">
          <div v-if="screenWidth>900">
        <img  src="../assets/img/meta.png" alt />
        <img src="../assets/img/google.png" alt />
        <img src="../assets/img/netflix.png" alt />
        <img src="../assets/img/pg.png" alt />
        <img class="paypal-img" src="../assets/img/paypal.png" alt />
      </div>
      <div v-else>
        <img  src="../assets/img/tinymeta.png" alt />
        <img src="../assets/img/tinygoogle.png" alt />
        <img src="../assets/img/tinynetflix.png" alt />
        <img src="../assets/img/tinypg.png" alt />
        <!-- <img class="paypal-img" src="../assets/img/tinypaypal.png" alt /> -->
      </div>
      </span>
    </span>
    </div>
    <section class="categories-list-coursel ">
      <section class="type-card">
        <h1>Popular professional services</h1>
        <!-- <div></div> -->
        <section class="slide-categories">
          <vueper-slides
            class="no-shadow"
            :visible-slides="visibleSlides"
            slide-multiple
            :slide-ratio="1 / 1"
            :dragging-distance="250"
            :gap="2"
            fixed-height="350px"
            :bullets="false"
            :touchable="false"
          >
            <vueper-slide
              v-for="(slide, i) in slides"
              :key="i"
              :image="slide.image"
              :title="slide.title"
              :content="slide.content"
              :link="slide.link"
            />
          </vueper-slides>
        </section>
      </section>
    </section>

    <section class="video-section main-layout full ">
      <div class="video-layout  flex align-center justify-content">
        <div class="site-info">
          <div class="side-text">
            <h2>A whole world of freelance talent at your fingertips</h2>
            <ul>
              <li>
                <section class="info flex align-center">
                  <span class="check-svg" v-html="getSvg('check')"></span>
                  <h3>The best for every budget</h3>
                </section>
                <p>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing.
                </p>
              </li>
              <li>
                <section class="info flex align-center">
                  <span class="check-svg" v-html="getSvg('check')"></span>
                  <h3>Quality work done quickly</h3>
                </section>
                <p>
                  Find the right freelancer to begin working on your project
                  within minutes.
                </p>
              </li>

              <li>
                <section class="info flex align-center">
                  <span class="check-svg" v-html="getSvg('check')"></span>
                  <h3>Protected payments, every time</h3>
                </section>
                <p>
                  Always know what you'll pay upfront. Your payment isn't
                  released until you approve the work.
                </p>
              </li>

              <li>
                <section class="info flex align-center">
                  <span class="check-svg" v-html="getSvg('check')"></span>
                  <h3>24/7 support</h3>
                </section>
                <p>
                  Questions? Our round-the-clock support team is available to
                  help anytime, anywhere.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="vid-container">
          <img src="../assets/img/videopic.png" alt />
        </div>
      </div>
    </section>

    <section class="category-svg ">
      <h2>Explore the marketplace</h2>
      <div class="categories-list">
        <ul v-for="(category, index) in categories" :key="index">
          <li>
            <a href>
              <img
                :src="category.src"
                :alt="category.titleStr"
                :loading="category.loading"
              />
              <h4>{{ category.titleStr }}</h4>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { svgService } from '../services/svg.service.js'
import { homeService } from '../services/home.service.js'

export default {
  name: 'home',
  data() {
    return {
      stars: [1, 2, 3, 4, 5],
      categories: null,
      sildes: null,
      filterBy: {
        title: "",
      },
      screenWidth: window.innerWidth,
      // images: [
      //   'src/assets/img/hero1.jpg',
      //   'src/assets/img/hero2.png',
      //   'src/assets/img/hero3.png',
      //   'src/assets/img/hero4.png',
      //   'src/assets/img/hero5.png',
      //   'src/assets/img/hero6.png',
      // ],

 images: [
        'https://res.cloudinary.com/dm72lanye/image/upload/v1680303807/jfvfj5wlvsvtrceqwgwd.jpg',
        'https://res.cloudinary.com/dm72lanye/image/upload/v1680303965/f4wxwkokhy2kjonezswh.webp',
        'https://res.cloudinary.com/dm72lanye/image/upload/v1680304011/daezca98d2prfmulbkyf.webp',
        'https://res.cloudinary.com/dm72lanye/image/upload/v1680304046/jcwr1u1s6iihrv7lyfzp.webp',
        'https://res.cloudinary.com/dm72lanye/image/upload/v1680304082/hmzyswlee0sfs0m3wcno.webp',
        'https://res.cloudinary.com/dm72lanye/image/upload/v1680304082/hmzyswlee0sfs0m3wcno.webp',
      ],
      


      nameHeroes: [
        'Valentina,',
        'Andrea,',
        'Moon,',
        'Ritika,',
        'Zach,',
        'Gabrielle,',
      ],
      gigHeros: [
        'AI Artist',
        'Fashion Designer',
        'Marketing Expert',
        'Shoemaker and Designer',
        'Bar Owner',
        'Video Editor',
      ],
      currentIndex: 0,
    }
  },
  created() {
    this.categories = homeService.getCategories()
    this.slides = homeService.getSlides()
    this.$store.dispatch({ type: 'loadGigs' })
  },

  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    }, 5500)
    window.addEventListener('resize', { handleEvent: this.handleResize })
  },

  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    setFilterBy() {
      if (!this.filterBy.title) {
        this.$router.push('/explore')
        return
      }
      this.$router.push({ path: 'explore', query: { searchStr: this.filterBy.title }})
      this.filterBy.title = ''
    },
    handleResize() {
      this.screenWidth = window.innerWidth
    },
  },
  computed: {
    visibleSlides() {
      const width = this.screenWidth;
      if (width>1200) return 5 
      if (width>1100) return 4 
      if (width>850) return 3 
      if (width>632) return 2 
      else return 1
    },
    beforeUnmount() {
      window.removeEventListener('resize', { handleEvent: this.handleResize })
    },
  },
  components: {
    VueperSlides,
    VueperSlide
  },
}
</script>
