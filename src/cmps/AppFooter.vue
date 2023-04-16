<template>
  <footer class="app-footer   ">
    <div class="content-container flex align-center space-between">
      <div class="logo-footer-container">
        <span class="logo-footer">Wiserr</span>
        <small>©️ Wiserr International Ltd.2023</small>
      </div>
      <div class="social-links flex align-center align-items space-between">
        <div>
          <a href="https://twitter.com/fiverr">
            <span v-html="getSvg('twitter')"></span>
          </a>
        </div>
        <div>
          <a href="https://www.facebook.com/Fiverr/">
            <span v-html="getSvg('facebook')"></span>
          </a>
        </div>
        <div>
            <a href="https://www.linkedin.com/company/fiverr-com">
              <span v-html="getSvg('linkedin')"></span>
            </a>
          </div>
          <div>
            <a href="https://www.pinterest.com/fiverr/">
              <span v-html="getSvg('pinterest')"></span>
            </a>
          </div>
          <div>
            <a href="https://www.instagram.com/fiverr/">
              <span v-html="getSvg('instagram')"></span>
            </a>
          </div>
        </div>
    </div>
  </footer>
</template>
  
<script>
import { svgService } from "../services/svg.service.js";

  export default {

     methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    }
  }
  };
</script>