<template>
    <section v-if="user" class="seller-profile flex space-between main-layout full"> <!--v-if="user" -->
        <section class="content flex space-between">
            <div class="user-info">
                <div class="profile-info">
                    <div class="img-container">
                        <img :src="user.imgUrl" /> <!--change to user.image -->
                    </div>
                    <h2>{{user.username}}</h2> <!--change to user.username -->
                    <div class="stats">
                        <ul>
                            <li class="flex space-between">
                                <div class="flex space-between">
                                    <span v-html="getSvg('map')" class="flex justify-center align-center"></span>Country
                                </div>    
                                <span>{{user.loc}}</span> <!--change to {{ user.location }} -->
                            </li>
                            <li class="flex space-between">
                                <div class="flex space-between">
                                    <span v-html="getSvg('user')" class="flex justify-center align-center"></span>Member Since
                                </div>
                                <span>{{user.memberSince}}</span> <!--change to {{ user.since }} -->
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="description">
                    <ul>
                        <li>
                            <h3>Description</h3>
                            <p>{{user.about}}</p> <!--change to {{ user.description }} -->
                        </li>
                    </ul>
                </div>
                <button class="messages-btn align-center">Messages</button>
            </div>
            <div class="render-gigs flex column">
                <h1 class="active-gigs">Active Gigs</h1>
                <div class="gigs-list flex">
                    <div @click="this.$router.push('/gig/edit')" class="add-gig  flex justify-center align-center">
                            <div class="flex column align-center">
                                <span class="add-gig-btn">+</span>
                                <p>Create a new Gig</p>
                            </div>
                    </div>
                     <gig-seller-preview v-for="gig in gigs" v-bind:key="gig" :gig="gig" @removeGig="removeGig" />
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { svgService } from '../services/svg.service.js'
import GigSellerPreview from '../cmps/GigSellerPreview.vue'

export default {
    name: 'SellerProfile',
    data() {
        return {
            user: null,
            u: null,
            //gigs: null,
            //descriptionHardCoded: `Hello, this is Frederick, stand up for vividstore, I am a young and enthusiastic graphic artist and realistic pencil sketch artist.\nI am certified as graphic designer from George Washington University, USA.\nI have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching.\nThank you.`
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        async removeGig(gigId) {
            console.log('removeGig Seller Profile')
            await this.$store.dispatch({ type: 'removeGig', gigId })
            this.gigs = this.$store.getters.gigs.filter(gig => gig.owner._id === this.user._id)
        },
    },
    async created() {
        //this.user = this.loggedInUser
        let u = this.$store.getters.loggedinUser //Brings mini user - need to check
        let userId = u._id
        this.user = await this.$store.dispatch({ type:'getById', userId})
        this.$store.dispatch({ type: 'loadGigs' })
        console.log('Seller Profile', this.user)
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
        gigs() {
           return this.$store.getters.gigs.filter(gig => gig.owner._id === this.user._id)
        },
    },
    components: {
        GigSellerPreview
    },
}
</script>