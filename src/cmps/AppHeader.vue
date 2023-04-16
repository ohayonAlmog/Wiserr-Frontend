<template>
  <header
    class="app-header main-layout full flex align-center"
    v-bind:style="{ position: currentUrl!=='http://localhost:5173/#/'  ? 'static' : 'fixed' }"
  >
  <!-- https://wiserr-w8y7.onrender.com/
  http://127.0.0.1:5173/#/ -->

    <section :class="handleSideModal" @click.self="onToggleHamburger(event)">
      <div class="side-menu">
        <div v-if="isSideMenuOpen" class="back-drop" @click="onToggleHamburger"></div>

        <div class="logged-side-menu flex align-items" v-if="loggedInUser">
          <img class="side-menu-img" :src="imageUrl" />
          <span>Hello {{ userName }}</span>
        </div>

        <div class="side-btn-cont" v-if="!loggedInUser">
          <button class="side-menu-link sign" @click="showLoginModal">Sign In</button>
        </div>

        <div class="side-btn-cont" v-if="!loggedInUser">
          <button class="side-menu-link join" @click="showJoinModal">Join</button>
        </div>

        <div class="side-btn-cont">
          <button class="side-menu-btn" @click="onToggleHamburger">
            <a class="side-menu-link" href="#/explore">Explore</a>
          </button>
        </div>

        <div  v-if="loggedInUser" class="side-btn-cont">
          <button class="side-menu-btn" @click="onToggleHamburger">
            <a class="side-menu-link" href="#/seller/profile">Profile</a>
          </button>
        </div>

        <div  v-if="loggedInUser" class="side-btn-cont">
          <button class="side-menu-btn" @click="onToggleHamburger">
            <a class="side-menu-link" href="#/seller/orders">Dashboard</a>
          </button>
        </div>
        <!-- v-if="loggedInUser.gigs.length===0"  -->
        <div class="side-btn-cont">
          <button class="side-menu-btn" @click="onToggleHamburger">
            <a class="side-menu-link" href="#/seller/register">Become a Seller</a>
          </button>
        </div>

        <div class="side-btn-cont">
          <button class="side-menu-link logout" @click="logout" v-if="loggedInUser">Log Out</button>
        </div>

        <button
          v-if="screenWidth<932&&loggedInUser"
          class="btn-orders-menu"
          @click="showOrders=!showOrders"
        >
          Orders
          <BuyerOrders v-if="showOrders" :user="loggedInUser" />
        </button>
      </div>
    </section>

    <section :class="headerFull">
      <div class="header-container flex align-center justify-content space-between">
        <div class="sub-header-container flex align-center justify-content">
          <button
            v-if="isTransperent&&screenWidth>632"
            class="btn-hamburger"
            v-html="getSvg('hamburgerBtn')"
            @click="onToggleHamburger"
          ></button>
          <button
            v-if="screenWidth<632|| !isTransperent"
            class="btn-hamburger"
            v-html="getSvg('greyHamburgerBtn')"
            @click="onToggleHamburger"
          ></button>
          <RouterLink class="logo-header flex align-center justify-content" to="/">Wiserr</RouterLink>
          <div :class="serachClass">
            <div class="header-search flex">
              <form class="header-input-container flex" @submit="setFilterBy">
                <input
                  v-model="filterBy.title"
                  type="input"
                  placeholder="What service are you looking for today?"
                  autocomplete="off"
                />
                <button class="btn-search">
                  <div v-html="getSvg('search')" class="search-icon-header"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
        <nav class="nav-links flex align-center justify-content">
          <span class="explore-link">
            <RouterLink to="/explore">Explore</RouterLink>
          </span>

          <span class="seller-link">
            <RouterLink to="/seller/register">Become a Seller</RouterLink>
          </span>

          <span v-if="!loggedInUser" class="sign-in-link">
            <button @click="showLogin = true">Sign In</button>
          </span>

          <button @click="showSignup" v-if="!loggedInUser" class="btn-join">
            <span>Join</span>
          </button>

          <button
            v-if="screenWidth>932&&loggedInUser"
            class="btn-orders"
            @click="showOrders=!showOrders"
          >
            Orders
            <!-- <div :class="handleModalOrders" @click.self="showOrders = !showOrders"> -->
            <BuyerOrders v-if="showOrders&&screenWidth>932" />
            <!-- </div>  -->
          </button>

          <!-- <div class="close-order" @click="showUserModal = !showUserModal"></div> -->
          <div class="logged-in-img" v-if="loggedInUser" @click="showUserModal = !showUserModal">
            <img v-if="screenWidth>932" :src="imageUrl" />
            <div class="user-modal" v-if="showUserModal">
              <button @click="$router.push('/seller/profile')">Profile</button>
              <button @click="$router.push('/seller/orders')">Dashboard</button>
              <button @click="logout">Logout</button>
            </div>
          </div>
        </nav>
      </div>
    </section>

    <section :class="secHeaderClass">
      <section class="type-tag main-layout full">
        <div
          v-if="screenWidth>1300"
          class="links-container flex space-between align-center justify-content"
        >
          <a href="#/explore">Graphics &amp; Design</a>
          <a href="#/explore">Digital Marketing</a>
          <a href="#/explore">Writing &amp; Translation</a>
          <a href="#/explore">video &amp; Animation</a>
          <a href="#/explore">Music &amp; Audio</a>
          <a href="#/explore">Programming &amp; Tech</a>
          <a href="#/explore">Photography</a>
          <a href="#/explore">Buisness</a>
          <a href="#/explore">AI services</a>
        </div>

        <div v-if="screenWidth>600&&screenWidth<1300">
          <div class="links-container">
            <vueper-slides
              class="no-shadow"
              :visible-slides="visibleNavs"
              :bullets="false"
              :touchable="false"
              :gap="3"
              fixed-height="60px"
              :dragging-distance="250"
            >
              <vueper-slide
                v-for="(slide, i) in slides"
                :key="i"
                :title="slide.title"
                :content="slide.content"
              >
                <template #content>
                  <div class="vueperslide__content-wrapper" style="flex">
                    <router-link :to="slide.link">{{ slide.title }}</router-link>
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </div>
        </div>
      </section>
    </section>
    <Login v-if="showLogin" @login="login" @hideLogin="hideLogin" @openSignup="showSignup" />
    <Signup v-if="showSignupModal" @hideSignup="hideSignup" />
  </header>
</template>
<script>
import { svgService } from "../services/svg.service.js";
import { VueperSlides, VueperSlide } from "vueperslides";
import Login from "../cmps/Login.vue";
import Signup from "../cmps/Signup.vue";
import BuyerOrders from "./BuyerOrders.vue";
export default {
  data() {
    return {
      slides: [
        {
          title: "Digital Marketing",
          link: "/explore"
        },
        {
          title: "Writing &Translation",
          link: "/explore"
        },
        {
          title: "Video & Animation",
          link: "/explore"
        },
        {
          title: "Music & Audio",
          link: "/explore"
        },
        {
          title: "Programming & Tech",
          link: "/explore"
        },
        {
          title: "Photography",
          link: "/explore"
        },
        {
          title: "Business",
          link: "/explore"
        },
        {
          title: "AI services",
          link: "/explore"
        }
      ],
      showProfileModal: false,
      showOrders: false,
      showUserModal: false,
      showLogin: false,
      showSignupModal: false,
      isTransperent: true,
      isSecHeaderShown: false,
      isSideMenuOpen: false,
      currentUrl: "http://localhost:5173/#/",

      filterBy: {
        title: ""
      },
      screenWidth: window.innerWidth
    };
  },

  computed: {
    orders() {
      console.log(this.$store.getters.orders);
      return this.$store.getters.orders;
    },

    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    imageUrl() {
      return this.$store.getters.loggedinUser.imgUrl;
    },

    imageUrl() {
      return this.$store.getters.loggedinUser.imgUrl;
    },

    userName() {
      return this.$store.getters.loggedinUser.fullname;
    },

    visibleNavs() {
      const width = this.screenWidth;
      if (width > 1300) return 7;
      if (width > 1200) return 6;
      if (width > 1000) return 4;
      if (width > 700) return 3;
      else return 3;
    },

    handleSideModal() {
      console.log(this.isSideMenuOpen);
      if (this.isSideMenuOpen) return "side-menu";
      else return "side-menu side-menu-closed";
    },
    handleModalOrders() {
      if (this.isSideMenuOpen) return "side-menu";
      else return "side-menu side-menu-closed";
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },

    headerFull() {
      if (!this.isTransperent || this.screenWidth < 632)
        return "header-container-full main-layout full  ";
      else return " main-layout full header-transperent ";
    },
    secHeaderClass() {
      // if(this.screenWidth < 632&&this.currentUrl.includes("https://wiserr-w8y7.onrender.com/#/explore")) return 'categories-header main-layout full "'
      if (
        !this.isSecHeaderShown ||
        this.currentUrl.includes("http://localhost:5173/#/gig/payment" )|| this.screenWidth < 632
      )
        return 'categories-header main-layout full "';
      else
        return 'categories-header shown main-layout full flex align-center "';
    },
    serachClass() {
      if (
        !this.isSecHeaderShown ||
        this.screenWidth < 650 ||
        this.currentUrl.includes("http://localhost:5173/#/gig/payment")
      )
        return "search-header";
      else return "search-header active ";
      // else return "shown-search-header ";
    }
  },
  methods: {
    hideLogin() {
      this.showLogin = false;
    },
    hideSignup() {
      this.showSignupModal = false;
    },

    showSignup() {
      console.log("showSignup");
      this.showSignupModal = true;
    },

    login(userCred) {
      console.log(this.showLogin);
      this.showLogin = false;
      this.$store.dispatch({ type: "login", userCred });
    },

    logout() {
      this.$store.dispatch({ type: "logout" });
    },

    onToggleHamburger() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },

    showLoginModal() {
      this.showLogin = true;
      this.onToggleHamburger();
    },
    showJoinModal(){
      this.showSignupModal = true;
      this.onToggleHamburger();
    },

    setFilterBy() {
      if (!this.filterBy.title) {
        this.$router.push("/explore");
        return;
      }
      this.$router.push({
        path: "explore",
        query: { searchStr: this.filterBy.title }
      });
      let filterBy = {
        title: this.filterBy.title,
        price: 0,
        daysToMake: 0,
        description: "",
        budget: null,
        seller: []
      };
      this.$store.dispatch({ type: "loadGigs", filterBy });
      this.filterBy.title = "";
    },

    handleResize() {
      this.screenWidth = window.innerWidth;
    },

    onScroll() {
      if (this.currentUrl === "http://localhost:5173/#/") {
        if (window.scrollY === 0) {
          this.isTransperent = true;
          console.log(this.isTransperent);
        } else {
          this.isTransperent = false;
        }

        if (window.scrollY >= 130 && this.screenWidth > 650) {
          this.isSecHeaderShown = true;
        } else {
          this.isSecHeaderShown = false;
        }
      } else {
        this.isTransperent = false;
        this.isSecHeaderShown = true;
      }
    },

    onHeaderObserved(entries) {
      console.log("onHeaderObserved called");
      const entry = entries[0];
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    closeProfileModal(){
      if(!this.showProfileModal) return
      else this.showProfileModal!=this.showProfileModal
    }
  },
  created() {
    window.addEventListener("scroll", this.onScroll);
    this.currentUrl = window.location.href;
    this.onScroll();
    window.addEventListener("resize", { handleEvent: this.handleResize });
    window.addEventListener("click", this.closeProfileModal);
  },

  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.currentUrl = window.location.href;
        this.onScroll();
      }
    }
  },
  components: {
    VueperSlides,
    VueperSlide,
    Login,
    Signup,
    BuyerOrders
  }
};
</script>