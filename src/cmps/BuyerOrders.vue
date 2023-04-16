<template>
  <div :class="orderModalClass">
 
    <section>
      <article v-for="(order, i) in orders" :key="i"  @click="$router.push(`/gig/${order.gig._id}`)" class="order-item flex justify-center align-center clear-list">
        <section class="order-img-container">
          <img :src="order.imgUrl"/>
        </section>
        <div class="flex column">
            <p class="fs14" >{{ order.gig.title }}</p>
            <div class="fs12 flex ">
                <span>{{ order.seller.username }}</span>
              <span :class="{rejected:order.status==='Rejected', ongoing:order.status==='Ongoing'
              ,completed:order.status==='Completed' ,pending:order.status==='Pending'}">{{ order.status }}</span>
            </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  props: ['user'],
data (){
  return {
    screenWidth: window.innerWidth
  }
  
},

methods:{
  handleResize() {
      this.screenWidth = window.innerWidth;
    },
},
  async created() {
    let user = sessionStorage.getItem('loggedinUser')
    user = JSON.parse(user)
    console.log(user)
    let filterBy = {by: 'buyer', id: user._id }
    this.$store.dispatch({type: 'loadOrders', filterBy})
    window.addEventListener("resize", { handleEvent: this.handleResize });
    this.user = this.$store.getters.loggedinUser;

  },

  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    orders() {
      // return this.$store.getters.orders
      let orders = this.$store.getters.orders
      let user = sessionStorage.getItem('loggedinUser')
      user = JSON.parse(user)
      console.log('orders', orders)
      console.log('user', user)
      let buyerOrders = orders.filter(order => order.buyer._id === user._id)
      return buyerOrders.reverse()
    },

    orderModalClass(){
      // console.log(this.screenWidth);
      if(this.screenWidth>900) return 'order-modal p5-5-5-0'
      else return 'order-modal-side  p5-5-5-0'
    }
  }
}
</script>
