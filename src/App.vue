<template>
  <section class="main-layout">
    <AppHeader />
    <RouterView/>
    <UserMsg/>
    <AppFooter />

  </section>
</template>

<script>
import { userService } from './services/user.service'
import { store } from './store/store'
import AppHeader from './cmps/AppHeader.vue'
import AppFooter from './cmps/AppFooter.vue'
import UserMsg from './cmps/UserMsg.vue'
import { socketService } from './services/socket.service.js'
import { showSuccessMsg } from './services/event-bus.service.js'
export default {
  
  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user)  store.commit({type: 'setLoggedinUser', user})
    socketService.on('user-is-watching', (msg) => {
      console.log(msg)
      showSuccessMsg(msg)
    })
    // socketService.on('new-order-seller', (msg) => {
    //   console.log(msg)
    //   showSuccessMsg(msg)
    // })
    // socketService.on('order-approved', (msg) => {
    //   console.log(msg)
    //   showSuccessMsg(msg)
    // })
    socketService.on('order-status-update', (order) => {
      // let msg = `You have received a new order, ${order.seller.username}`
      console.log('order-status-update');
      let msg =`Hey ${order.buyer.username}! \nYour order's status has been changed.`
      showSuccessMsg(msg)
    })
    socketService.on('new-order-seller', (order) => {
      console.log(order)
      let msg = `You have received a new order, ${order.seller.username}`
      showSuccessMsg(msg)
    })
    socketService.on('new-order-buyer', (order) => {
      console.log('new-order-buyer',order)
      let msg = `Hey ${order.buyer.username}! \nYour order is being processed. stay tuned.`
      showSuccessMsg(msg)
    })
  },
  components: {
    AppHeader,
    UserMsg,
    AppFooter,
  },
}
</script>