
<template>
  <div :class="{active:alive}" class="alert flex" >
    <div class="color-left"></div>
    <section class="alert-content flex align-center">
      <p>{{ msg?.txt }}</p>
      <!-- <button class="close-btn" @click="(alive = !alive)">X</button> -->
    </section>

  </div>
</template>
<!-- v-show="alive" -->
<!-- :class="alertClass" -->
<script>
import { eventBus, SHOW_MSG } from "../services/event-bus.service"

export default {
  created() {
    eventBus.on(SHOW_MSG, (msg) => {
      this.msg = msg
      var delay =/*  msg.delay || 7000 */ 5000
      this.alive = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        this.alive = false
      }, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return `alert-${this.msg.type}`
    },
  },
}
</script>

<!-- <template>
  <div v-show="alive" class="alert" :class="alertClass">
    {{ msg?.txt }}
  </div>
</template>


<script>
import { eventBus, SHOW_MSG } from "../services/event-bus.service.js"

export default {
  created() {
    eventBus.on(SHOW_MSG, (msg) => {
      this.msg = msg
      var delay = msg.delay || 2000
      this.alive = true
      setTimeout(() => {
        this.alive = false
      }, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return `alert-${this.msg.type}`
    },
  },
}
</script> -->