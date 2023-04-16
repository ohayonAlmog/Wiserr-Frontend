<template>
    <section class="gig-preview-seller">
        <div class="gig-info flex column space-between">
            <div class="img-container">
                <img ref="img" :src="gig.imgs[0]"/>
            </div>
            <div class="preview-title">
                <router-link :to="`/gig/${gig._id}`">
                    <a>{{ gig.title }}</a>
                </router-link>
            </div>
            <div class="preview-footer">
                <div class="tools">
                    <span @click="removeGig" v-html="getSvg('trash')"></span>
                    <span @click="editGig" v-html="getSvg('edit')"></span>
                    <span @click="watchGig" v-html="getSvg('watch')"></span>
                </div>

                <div class="preview-price-container flex">
                    <p>starting at</p>
                    <span class="preview-price">${{ gig.price }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { svgService } from "../services/svg.service.js"
export default {
    props: {
        gig: Object
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        removeGig() {
            console.log('removeGig Seller Prev')
            this.$emit('removeGig', this.gig._id)
        },
        editGig() {
            this.$router.push(`/gig/edit/${this.gig._id}`)
        },
        watchGig() {
            this.$router.push(`/gig/${this.gig._id}`)
        }
    }
}
</script>