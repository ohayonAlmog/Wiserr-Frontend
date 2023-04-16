<template>
  <section v-if="user._id!==order.buyer._id" class="dashboard-orders-data" >

        
        <div  class="table-entity ">

          <div  class="buyer-col flex column align-center ">

            <img :src="order.buyer.imgUrl" >
          <span class="regular">{{ order.buyer.username }}</span>
          </div>
        
        <div class="gig-col flex column">
          <span class="table-span regular">{{ order.gig.title  }}</span>
        </div>

        <div class="due-on-col flex column">
          <span class="table-span regular">{{ order.date }}</span>
        </div>

        <div class="total-col flex column">
          <span class="table-span-price regular"> $ {{ order.gig.price }}</span>
        </div>

        <div class="status flex" :class="{
          pending:order.status === 'Pending', 
          ongoing:order.status === 'Ongoing', 
          completed:order.status === 'Completed', 
          rejected:order.status === 'Rejected'}">
          <span  @click="toggleStatusModal" class="regular">{{ order.status }}</span>

          <div v-if="isModalShown" class="set-status" >
  <div class="status status-drop completed" @click="setStatus(order,1)" >Completed</div>
  <div class="status status-drop ongoing" @click="setStatus(order,2)">Ongoing</div>
  <div class="status status-drop rejected" @click="setStatus(order,3)">Rejected</div>

</div>
        </div>
</div>
  </section>
</template>
<script>

export default {
  name: 'OrderPreview',

  props: ['order','user'],

  data() {
    return {
   isModalShown:false
    }
  },
methods:{
  toggleStatusModal(){
    this.isModalShown=!this.isModalShown
  },
  setStatus(order,num){
    this.isModalShown=!this.isModalShown
    this.$emit('setStatus', order,num)
    },

}
}
</script>
