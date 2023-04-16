<template>
  <section v-if="gig" class="gig-edit main-layout full">
    <!-- <h1>{{(gig._id) ? 'Edit gig': 'Add gig'}}</h1> -->

    <form @submit.prevent="saveGig" class="flex column justify-center p30">
      <label class="gig-title flex">
        <span
          >Gig title
          <p>
            As your Gig storefront, your title is the most important place to
            include keywords that buyers would likely use to search for a
            service like yours.
          </p>
        </span>
        <input
          class="title-input"
          type="text"
          v-model="gig.title"
          placeholder="Enter Gig"
        />
      </label>
      <label class="description flex">
        <span
          >Description
          <p>Briefly Describe Your Gig</p>
        </span>
        <textarea
          type="text"
          v-model="gig.description"
          placeholder="Enter Gig description"
        />
      </label>
      <section class="gig-edit-section space-between clear-list flex">
        <label class="category flex column">
          <span class="flex-column"
            >Category
            <p>Choose the category most suitable for your Gig.</p>
          </span>
          <select name="Graphics and Design" id="">
            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Writing & Translation">Writing & Translation</option>
            <option value="Video & Animation">Video & Animation</option>
            <option value="Music & Audio">Music & Audio</option>
            <option value="Programming & Tech">Programming & Tech</option>
            <option value="Busines">Busines</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Data">Data</option>
          </select>
        </label>
        <label class="flex column">
          <span
            >Days to Make
            <p>Days it will take you on average to finish this gig</p>
          </span>
          <input
            type="number"
            v-model="gig.daysToMake"
            placeholder="Enter days to complete order"
          />
        </label>
        <label class="flex column">
          <span
            >Price
            <p>Price you're offering for this gig</p>
          </span>
          <input type="number" v-model="gig.price" placeholder="Enter price" />
        </label>
      </section>
      <label class="gig-img flex column">
        <span
          >Upload Images
          <p class="upload-description">
            Encourage buyers to choose your Gig by featuring a variety of your
            work.
          </p>
        </span>
      </label>
      <div class="gig-upload">
        <img-upload @uploaded="uploaded" :gig="gig"></img-upload>
      </div>
    </form>
    <div class="actions flex align-center space-between">
      <button class="close-btn" @click="onClose">Cancel</button>
      <button type="submit" @click="saveGig">
        Save
        <!-- {{(gig._id) ? 'Save': 'Add'}} -->
      </button>
    </div>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { getActionUpdateGig } from "../store/gig.store.js"
import ImgUpload from "../cmps/ImgUpload.vue"

export default {
  data() {
    return {
      gig: null,
    }
  },
  created() {
    const { gigId } = this.$route.params
    if (gigId) {
      this.$store
        .dispatch({ type: "setCurrentGig", gigId })
        .then((gig) => (this.gig = { ...gig }))
    } else this.gig = gigService.getEmptyGig()
  },
  methods: {
    saveGig() {
      if (this.gig._id) this.updateGig()
      else this.addGig()
    },
    async addGig() {
      this.gig.owner = this.loggedInUser
      try {
        await this.$store.dispatch({ type: "addGig", gig: this.gig })
        showSuccessMsg("Gig added")
        this.$router.push("/explore")
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add gig")
      }
    },
    async updateGig() {
      try {
        // gig = {...gig}
        // gig.price = +prompt('New price?', gig.price)
        await this.$store.dispatch(getActionUpdateGig(this.gig))
        this.$router.push("/seller/profile")
        // showSuccessMsg("Gig updated")
      } catch (err) {
        console.log(err)
        // showErrorMsg("Cannot update gig")
      }
    },
    onClose() {
      this.$router.push("/seller/profile")
    },
    uploaded(images) {
      this.gig.imgs = images
    },
    computed: {
      loggedInUser() {
        return this.$store.getters.loggedinUser
      },
    },
  },
  components: {
    ImgUpload,
  },
}
</script>

<style></style>
