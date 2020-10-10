<template>
  <div id="home">
    <div class="home_upper">
      <div
        class="home_rl_pd d-flex flex-row justify-space-between align-center"
      >
        <div class="heading1">Name</div>
        <router-link to="/profile">
          <v-avatar size="34px">
            <img
              alt="Avatar"
              src="https://render-cdn.zepeto.io/20201010/07/39mqJ0scZN6RlXJxa1"
            />
          </v-avatar>
        </router-link>
      </div>
      <div class="home_rl_pd d-flex flex-row justify-space-between">
        <div class="home-filter">Filter1</div>
        <div class="home-filter">Filter2</div>
        <div class="home-filter">Filter3</div>
        <v-icon>mdi-magnify</v-icon>
      </div>
    </div>

    <div class="home_main" :style="{ height: `${windowHeight - 146}px` }">
      <ContestCard
        contestTitle="여친룩 꾸미기 대회"
        theme="데일리룩"
        v-for="i in 10"
        :key="i"
        :id="i"
      />
    </div>
    <v-fab-transition>
      <v-btn
        key="mdi-flag-plus"
        color="white"
        fab
        absolute
        bottom
        right
        class="home-fab"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import ContestCard from "@/components/ContestCard";
export default {
  name: "Home",
  data() {
    return {
      windowHeight: window.innerHeight,
    };
  },
  components: { ContestCard },
};
</script>
<style>
.hbbr {
  background-color: red;
}
.view-title {
  font-size: 17px;
  font-weight: 600;
}
.heading1 {
  font-size: 34px;
  font-weight: bold;
}
.heading2 {
  font-size: 22px;
  font-weight: bold;
}
.home_rl_pd {
  padding: 0 15px 5px 15px;
}
.home_upper {
  border-bottom: 1px solid #c4c4c4;
  background-color: rgba(118, 118, 128, 0.05);
  padding-top: 60px;
}
.home_main {
  overflow: auto;
}
.home-fab {
  margin-bottom: 45px;
}
.home-filter {
}
</style>