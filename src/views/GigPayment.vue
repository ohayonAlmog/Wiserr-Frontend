<template>
    <section v-if="gig" class="gig-payment-main main-layout full">
        <section class="payment-container flex">
            <section class="flex-cont flex clear-list">
                <section class="payment-details-container">
                    <h2>Payment Option</h2>
                    <section class="credit-selection flex">
                        <div class="credit-txt">
                            <p>Credit & Debit Cards</p>
                        </div>
                        <div class="visa">
                            <span v-html="getSvg('visa')"></span>
                        </div>
                    </section>
                    <section class="payment-option">
                        <div class="card-info flex">
                            <div class="card-num-container">
                                <p>Card Number</p>
                                <input class="card-num" type="text" value="4580 5926 2262 7546" />
                            </div>
                            <div class="shorts-input">
                                <div>
                                    <p>Expiration Date</p>
                                    <input class="short" type="text" value="12 / 26" />
                                </div>
                                <div>
                                    <p>Security Code</p>
                                    <input class="short" type="text" value="226" />
                                </div>
                            </div>
                        </div>
                        <div class="name-inputs flex">
                            <div>
                                <p>First Name</p>
                                <input class="name-input" type="text" />
                            </div>
                            <div>
                                <p>Last Name</p>
                                <input class="name-input" type="text" />
                            </div>
                        </div>
                    </section>
                </section>
            

                <section class="gig-payment">
                    <section class="gig-payment-content">
                        <section class="gig-payment-header">
                            <img class="gig-payment-img" :src="`${gig.imgs[0]}`"/>
                            <p class="gig-payment-title">{{ gig.title }}</p>
                        </section>
                        <h3 class="gig-payment-price">US${{ gig.price }}</h3>
                        <p>From this package you can get a BLACK OUTLINE SKETCH of your logo / character.  NO COLOR </p>

                        <ul class="gig-payment-features">
                            <li v-for="feature in features" v-bind:key="feature">
                                <span v-html="getSvg('greenV')"></span>
                                {{ feature }}
                            </li>
                        </ul>

                        <div class="gig-payment-price-calc">
                            <p>Service Fee</p>
                            <p>US${{ serviceCalc(gig.price) }}</p>
                        </div>
                        <div class="gig-payment-price-calc">
                            <p>VAT</p>
                            <p>US${{ vatCalc(gig.price) }}</p>
                        </div>
                        <div class="gig-payment-price-calc total">
                            <p>Total</p>
                            <p>US${{ totalPrice() }}</p>
                        </div>
                        <div class="gig-payment-price-calc">
                            <p class="gig-payment-bold">Delivery Time</p>
                            <p>{{ gig.daysToMake }}</p>
                        </div>

                        <button @click="isUserLoggedIn" class="gig-payment-continue-btn">Confirm And Pay</button>
                        <login v-if="loginShow" @hideLogin="hideLogin" @login="login"></login>
                        <sign-up v-if="signUpShow" @hideSignup="hideSignup" @signup="signup"></sign-up>
                    </section>
                </section>
            </section>
        </section>
    </section>
</template>

<script>
import { svgService } from "../services/svg.service.js"
import { utilService } from "../services/util.service.js"
import Login from "../cmps/Login.vue"
import SignUp from "../cmps/Signup.vue"
export default {
  name: "GigPayment",
  data() {
    return {
      gig: null,
      user: null,
      servicePrice: null,
      loginShow: false,
      signUpShow: false,
      vatPrice: null,
      features: [
        "1 concept included",
        "Logo transparency",
        "Vector file",
        "Printable file",
        "Include 3D mockup",
        "Include source file",
      ],
    };
  },
  async created() {
    this.loginShow = false
    this.signUpShow = false
    
    const { gigId } = this.$route.params
    this.gig = await this.$store.dispatch({ type: "setCurrentGig", gigId })
    this.user = this.$store.getters.loggedinUser;
  },
  methods: {
    async getUser() {
        let userId = this.gig.owner._id
        let user = await this.$store.dispatch({ type:'getById', userId})
        this.user = user
    },
    formattedDate(){
        const today = new Date()
        const yyyy = today.getFullYear()
        let mm = today.getMonth() + 1 // Months start at 0
        let dd = today.getDate()
        const formattedToday = dd + '.' + mm + '.' + yyyy
        return formattedToday
    },
    login(userCred) {
        this.loginShow = false
        this.$store.dispatch({type: 'login', userCred})
        this.addOrder()
    },
    signup(userCred) {
        this.signUpShow = false
        this.$store.dispatch({ type: 'signup', userCred })
        this.addOrder()
    },
    hideLogin() {
        this.loginShow = false
    },
    hideSignup() {
        this.signUpShow = false
    },
    serviceCalc(price) {
      this.servicePrice = +(price * 0.15).toFixed(2)
      return this.servicePrice
    },
    vatCalc(price) {
      this.vatPrice = +(price - price / 1.17).toFixed(2)
      return this.vatPrice
    },
    totalPrice() {
      return (this.servicePrice + this.vatPrice).toFixed(2)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    isUserLoggedIn(){
        if (!this.loggedInUser) {
                this.loginShow = true
                return
            } else {
                this.addOrder()
            }
    },
    addOrder() {
            const order =
            {
                buyer:{_id: this.user._id, fullname: this.user.fullname, username: this.user.username, imgUrl:this.user.imgUrl},
                gig:{_id:this.gig._id, title:this.gig.title,price:this.gig.price},
                seller:{_id:this.gig.owner._id,fullname:this.gig.owner.fullname,username:this.gig.owner.username},
                imgUrl:this.gig.imgs[0],
                status:"Pending",
                date: this.formattedDate(),
            }
            console.log(order)
            this.$store.dispatch({ type: 'saveOrder', order: { ...order } })
            setTimeout(() => {
                this.$router.push('/explore')
            }, 500)
            // socketService.emit('gig-ordered', this.user)
    },
  },
  computed: {
        loggedInUser() {
            console.log('loggedInUser, user:' ,this.$store.getters.loggedinUser)
            let u = this.$store.getters.loggedinUser
            this.user = u
            /*if  (u) this.user = {...this.u}
            else this.user = null*/
            return u
        },
    },
  components: {
    Login,
    SignUp
  },
}
</script>