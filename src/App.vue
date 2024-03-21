<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  data() {
    return {
    };
  },
  components:{AppHeader},
};
</script>

<template>
  <AppHeader />
  <router-view></router-view>
</template>

<style lang="scss">
@use "./style/general.scss";
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Tilt+Neon&display=swap')
</style>
