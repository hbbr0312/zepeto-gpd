<template>
  <v-app>
    <v-main>
      <transition :name="transitionName" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      prevHeight: 0,
      transitionName: null,
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName;
      this.transitionName = transitionName || null;
      next();
    });
  },
};
</script>

<style>
@font-face {
  font-family: SF Pro;
  font-style: normal;
  font-weight: normal;
  src: url("assets/font/SFProDisplay-Regular.ttf") format("ttf");
}
#app {
  font-family: SF Pro, Avenir;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
.v-application a {
  text-decoration: none;
  color: black !important;
}
</style>
