<template>
    <section v-if="gig.reviews" class="review-preview flex column">
        <section class="header flex column">
            <h2>Reviews</h2>
            <section class="titles flex">
                <h3>{{ gig.reviewsAmount }} reviews for this Gig</h3>
                <ul class="stars p0 flex">
                    <li v-for="i in Math.ceil(gigReviewsAverage)" v-bind:key="i">
                        <span v-html="getSvg('star')" class="flex justify-center align-center"></span>
                    </li>
                </ul>
                <p class="rating-average"> {{ gigReviewsAverage.toFixed(0) }}</p>
            </section>
        </section>

        <section class="innerflex flex">
            <section class="stars-counters">
                <ul class="ranges clear-list flex column">
                    <li class="flex align-center" v-for="{ key, reviewsRange } in starsRangeCalc" :key="key">
                        <span class="key">{{ key }}</span>
                        <section class="progress-container flex align-center">
                            <progress :value="`${reviewsRange}`" :max="`${gig.reviewsAmount}`" />
                            <span class="range-number">({{ reviewsRange }})</span>
                        </section>
                    </li>
                </ul>
            </section>

            <section class="secondary clear-list flex column">
                <h6>Rating Breakdown</h6>
                <ul class="flex clear-list column">
                    <li class="flex align-center space-between" v-for="{ key, value } in sideStars" :key="key">
                        <span class="key">{{ key }}</span>
                        <section class="star-container flex align-center">
                            <span v-html="getSvg('star')"></span>
                            <span class="value">{{ value }}</span>
                        </section>
                    </li>
                </ul>
            </section>
        </section>
    </section>
</template>

<script>
import { svgService } from '../services/svg.service.js'

export default {
    name: 'ReviewPreview',
    props: ['user', 'gig'],
    data() {
        return {
            gigReviewsAverage: this.averageReviewGigRate()
        }
    },
    computed: {
        starsRangeCalc() {
            return [
                { key: '5 Stars', reviewsRange: Math.floor(this.gig.reviewsAmount * 0.95) },
                { key: '4 Stars', reviewsRange: Math.ceil(this.gig.reviewsAmount * 0.03) },
                { key: '3 Stars', reviewsRange: Math.ceil(this.gig.reviewsAmount * 0.015) },
                { key: '2 Stars', reviewsRange: Math.ceil(this.gig.reviewsAmount * 0.004) },
                { key: '1 Star', reviewsRange: Math.ceil(this.gig.reviewsAmount * 0.001) },
            ]
        },
        sideStars() {
            return [
                { key: 'Seller communication level', value: 4.8 },
                { key: 'Recommend to a friend', value: 4.9 },
                { key: 'Service as described', value: 5 },
            ]
        },
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
        averageReviewGigRate() {
            let rateSum = this.gig.reviews.reduce((acc, reviewer) => {
            let rate = +reviewer.rate
            return acc + rate
            }, 0)
            return rateSum / this.gig.reviews.length
        },
    }
}
</script>