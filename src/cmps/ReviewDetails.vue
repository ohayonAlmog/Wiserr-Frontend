<template>
    <section class="review-details-main-cont">
        <section v-if="gig && type === 'reviewShort' && user" class="toggle-arrows">
            <button class="btn next" v-if="gig" @click="toggleRev(1)"><span v-html="getSvg('featuresArrow')"></span></button>
            <button class="btn prev" v-if="gig" @click="toggleRev(0)"><span v-html="getSvg('featuresArrow')"></span></button>
        </section>
        
        <section v-if="gig && (type === 'reviewShort') && user" class="review-details">
            
            <section>
                <div class="user-profile-image">
                    <img :src="user.reviews[toggle].imgUrl">
                </div>
            
                <section class="content">
                    <section class="reviewer-details flex">
                        <h6 class="username">{{ user.reviews[toggle].username }}</h6>
                        <section class="country-container flex">
                            <img :src="user.reviews[toggle].flag">
                            <p class="country clear-list">{{ user.reviews[toggle].country }}</p>
                        </section>
                        <span class="inline-devider">|</span>
                        <section class="ratings clear-list flex align-center">
                            <ul class="stars clear-list flex">
                                <li v-for="j in +user.reviews[toggle].rate" v-bind:key="j">
                                    <span v-html="getSvg('star')" class="flex justify-center align-center"></span>
                                </li>
                            </ul>
                            <p class="rating-average"> {{ user.reviews[toggle].rate }}</p>
                        </section>
                    </section>

                    <p class="review-description">{{ user.reviews[toggle].review }}</p>
                    <span class="time-container">
                        <time>{{ user.reviews[toggle].reviewedAt }}</time>
                    </span>
                </section>
            </section>  
        </section>

        <section v-if="gig && type === 'reviewLong' && user" class="review-preview-long">
            
            <div class="header flex">
                <section class="img-container">
                    <img class="reviewer-img" :src="i.imgUrl">
                </section>
            

                <section class="reviewer-details flex column">
                    <p class="username">{{ i.username }}</p>
                    <section class="country-wrapper flex">
                        <img :src="i.flag">
                        <p class="country clear-list">{{ i.country }}</p>
                    </section>
                </section>
            </div>

            <section class="review-content">
                <section class="review-rate flex align-center">
                    <section class="main-rating clear-list align-center flex">
                        <ul class="stars clear-list flex">
                            <li v-for="j in +i.rate" v-bind:key="j">
                                <span v-html="getSvg('star')" class="flex justify-center align-center"></span>
                            </li>
                        </ul>
                        <p class="rating-score"> {{ i.rate }}</p>
                    </section>
                    <span class="inline-devider">|</span>
                    <p class="reviewed-at">{{  i.reviewedAt  }}</p>
                </section>
                <p class="review-description">{{ i.review }}</p>
            </section>
        
        </section>
    </section>
</template>


<script>
import { svgService } from '../services/svg.service.js'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
    name: 'ReviewDetails',
    props: ['gig', 'type', 'i', 'user'],
    data() {
        return {
            toggle: 0,
        }
    },
    created() {
        this.toggle = 0
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        getRateRounded() {
            return Math.round(this.averageReviewUserRate)
        },
        toggleRev(identifier) {
            if(identifier){
                if(this.toggle === this.user.reviews.length - 1) this.toggle = 0
                else this.toggle = this.toggle + 1
            }
            else {
                if(this.toggle === 0) this.toggle = this.user.reviews.length - 1
                else this.toggle = this.toggle - 1
            }
        },
        averageReviewUserRate() {
            let rateSum = this.user.reviews.reduce((acc, reviewer) => {
            let rate = +reviewer.rate
            return acc + rate
            }, 0)
            return rateSum / this.user.reviews.length
        },
    },
    computed: {
        /*getIRate() {
            return this.i.rate
        },
        getUserRate() {
            return this.user.reviews[toggle].rate
        },*/
    },
    components: {
        VueSlickCarousel,
    },
}
</script>