<template>
  <div id="app">
    <NavbarComp />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import NavbarComp from './views/NavbarComp.vue';

export default {
  name: "App",
  components: {
    NavbarComp,
  },
};
</script>

<style>
body {
  font-family: "Lato", sans-serif;
}

#app {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
