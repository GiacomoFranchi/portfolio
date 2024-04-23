<script>
import AppHeader from "../src/components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  data() {
    return {
    };
  },
  components:{AppHeader, AppFooter},
};
</script>

<template>
  <AppHeader class="appheader"/>
  <router-view class="main"></router-view>
  <AppFooter class="appfooter" />
</template>

<style lang="scss">
@use "./style/general.scss";
@use "./style/partials/mixin" as *;
@use "./style/partials/variables" as *;
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Tilt+Neon&display=swap');

.appheader{
  height: 10vh;
  @media screen and (max-width: 500px) {
        height: 9vh;
    }
}

.main{
  margin-top: 10vh;
  margin-bottom: 8vh;
  height: 82vh;
  @media screen and (max-width: 500px) {
        height: 91vh;
        margin-top: 9vh;
    }
}

.appfooter{
  height: 8vh;
}
</style>
