<template>
  <section class="dashboard main-layout full flex">
    <section class="profile-progress">
      <h2 class="manage-orders-title">Dashboard Orders</h2>
      <div class="profile flex">
        <div class="img-container">
          <img :src="user.imgUrl" />
        </div>
        <div class="user-desc flex">
          <div class="profile-item">
            <p class="bold">Positive Rating</p>
            <p class="regular">93%</p>
          </div>
          <div class="profile-item">
            <p class="bold">Respone Time</p>
            <p class="regular">4 Hours</p>
          </div>
        </div>
      </div>
      <div class="progress">
        <article class="progress-item">
          <div class="progress-txt flex space-between">
            <p class="bold">Orders Completed</p>
          </div>
          <div class="demo-progress">
            <el-progress :text-inside="true" :stroke-width="17" :percentage="compPercentage" />
          </div>
        </article>

        <article class="progress-item">
          <div class="progress-txt flex space-between">
            <p class="bold">Response Rate</p>
          </div>
          <el-progress status="warning" :text-inside="true" :stroke-width="17" :percentage="95" />
        </article>

        <article class="progress-item">
          <div class="progress-txt flex space-between">
            <p class="bold">Delivered on Time</p>
          </div>
          <el-progress status="exception" :text-inside="true" :stroke-width="17" :percentage="85" />
        </article>
      </div>
    </section>

    <section class="seller-orders">
      <div class="income-order-dashboard flex">
        <div class="dashboard-item flex">
          <span class="bold">Annual Income</span>
          <h3>$ {{ calcAnualIncome }}</h3>
        </div>

        <div class="dashboard-item monthly flex">
          <span class="bold">Monthly Income</span>
          <h3>$ {{ calcMonthIncome }}</h3>
        </div>

        <div class="dashboard-item flex">
          <span class="bold">Completed Orders</span>
          <h3>{{ calcCompOrds }}</h3>
        </div>

        <div class="dashboard-item flex">
          <span class="bold">Pending Orders</span>
          <h3>{{ calcPendOrds }}</h3>
        </div>
      </div>

      <div class="order-table">
        <div class="table-head flex">
          <div class="buyer-column-head">
            <h4>Buyer</h4>
          </div>
          <div class="gig-column-head">
            <h4>Gig Details</h4>
          </div>
          <div class="order-column">
            <h4>Date</h4>
          </div>
          <div class="total-column">
            <h4>Price</h4>
          </div>
          <div class="status-column">
            <h4>Status</h4>
          </div>
        </div>

        <OrderPreview
          v-for="order in orders"
          :order="order"
          :user="user"
          :key="order._id"
          @setStatus="setStatus"
        />
      </div>
    </section>
  </section>
</template>

<script>
import OrderPreview from "../cmps/OrderPreview.vue";
import { socketService } from "../services/socket.service.js";

export default {
   created() {

    this.user = this.$store.getters.loggedinUser;
    this.$store.dispatch({ type: "loadOrders" });
  },
  


  computed: {
    orders() {
      let orders=JSON.parse(JSON.stringify(this.$store.getters.orders)).reverse();
  
      // let sortedOrders=orders.sort(
      // (a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime()).reverse()

      return orders
    },

    calcPendOrds() {
      return this.orders.reduce((count, order) => {
        if (order.status === "Ongoing") {
          return count + 1;
        } else {
          return count;
        }
      }, 0);
    },
    calcCompOrds() {
      if (!this.orders) return 0;
      return this.orders.reduce((count, order) => {
        if (order.status === "Completed") {
          return count + 1;
        } else {
          return count;
        }
      }, 0);
    },

    calcMonthIncome() {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      return this.orders.reduce((acc, currentOrder) => {
        const orderYear = parseInt(currentOrder.date.split(".")[2]);
        const orderMonth = parseInt(currentOrder.date.split(".")[1]);

        if (
          parseInt(orderYear) === currentYear &&
          parseInt(orderMonth) === currentMonth &&
          currentOrder.status === "Ongoing"
        ) {
          return acc + +currentOrder.gig.price;
        } else {
          return acc;
        }
      }, 0);
    },

    calcAnualIncome() {
      return this.orders.reduce((acc, currentOrder) => {
        const orderYear = parseInt(currentOrder.date.split(".")[2]);
        const currentYear = new Date().getFullYear();
        console.log(acc);

        if (orderYear === currentYear && currentOrder.status === "Ongoing") {
          console.log(currentOrder.status);
          return acc + +currentOrder.gig.price;
        } else {
          return acc;
        }
      }, 0);
    },

    compPercentage() {
      const numOrders = this.orders.length;
      const compOrders = this.orders.reduce((count, order) => {
        if (order.status === "Completed") {
          return count + 1;
        } else {
          return count;
        }
      }, 0);
      return Math.floor((compOrders / numOrders) * 100);
    }
  },

  methods: {
    setStatus({ ...order }, num) {
      console.log(order);
      if (num === 1) order.status = "Completed";
      else if (num === 2) order.status = "Ongoing";
      else order.status = "Rejected";
      this.$store.dispatch({ type: "updateOrder", order});
      // socketService.emit("order-change-status", order.buyer);
      this.$store.dispatch({ type: "loadOrders" });
    }
  },

  data() {
    return {};
  },
  components: {
    OrderPreview
  }
};
</script>
