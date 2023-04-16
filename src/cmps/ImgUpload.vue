<template>
    <section v-if="gig" class="img-upload-container">
        <div>
        <label class="upload-label" for="img">{{ uploadMsg }}</label>
        <input class="upload-input" type="file" accept="img/*" @change="uploadImg" id="img"/>
        </div>

        <div v-if="images.length" className="gig-images">
            <vueper-slides
            class="no-shadow"
            :visible-slides="3"
            :slide-ratio="1 / 3"
            :arrows="false"
            :autoplay="false" 
            :gap="2"
            :dragging-distance="70">
            <vueper-slide v-for="img in images" :key="img" :image="img" />
            </vueper-slides>
        </div>
    </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import { uploadService } from '../services/upload.service.js'

export default {
  props: ["gig"],

  data() {
    return {
      height: null,
      width: null,
      images: [...this.gig.imgs],
      isUploading: false,
      isImgUploaded: false,
    }
  },
  methods: {
    async uploadImg(ev) { //cloudinary
      this.isUploading = true
      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      this.isUploading = false
      this.height = height
      this.width = width
      this.images.push(secure_url)
      this.isImgUploaded = secure_url
      this.$emit('uploaded', this.images)
    },
  },
  computed: {
    uploadMsg() {
      if (this.isImgUploaded) return 'Upload Another?'
      return this.isUploading ? 'Uploading....' : 'Upload Image'
    }
  },
  components: {
    VueperSlides, 
    VueperSlide
  },
}
</script>