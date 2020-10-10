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
        <v-btn
          :dark="filters[0]"
          :outlined="!filters[0]"
          depressed
          color="#6332F8"
          @click="filterclick(0)"
          width="94"
          v-if="!searchOn"
          rounded
          >강패대</v-btn
        >
        <v-btn
          :dark="filters[1]"
          :outlined="!filters[1]"
          depressed
          color="#6332F8"
          @click="filterclick(1)"
          width="94"
          v-if="!searchOn"
          rounded
          >강얼대</v-btn
        >
        <v-btn
          :dark="filters[2]"
          :outlined="!filters[2]"
          depressed
          color="#6332F8"
          @click="filterclick(2)"
          width="94"
          v-if="!searchOn"
          rounded
          >참여</v-btn
        >
        <input
          v-model="keyword"
          type="text"
          v-if="searchOn"
          placeholder="여기를 수정해보세요"
        />
        <v-btn icon><v-icon @click="searchclick">mdi-magnify</v-icon></v-btn>
      </div>
    </div>
    <div
      class="home_main"
      :style="{ height: `${windowHeight - 146}px` }"
      v-if="loading"
    >
      <div class="home_height_fill d-flex flex-row justify-center align-center">
        <v-progress-circular
          indeterminate
          color="grey"
          :size="70"
        ></v-progress-circular>
      </div>
    </div>
    <div
      class="home_main"
      :style="{ height: `${windowHeight - 146}px` }"
      v-else
    >
      <ContestCard
        contestTitle="여친룩 꾸미기 대회"
        theme="데일리룩"
        v-for="i in 10"
        :key="i"
        :id="i"
      />
    </div>

    <v-fab-transition>
      <router-link to="/create">
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
        </v-btn></router-link
      >
    </v-fab-transition>
  </div>
</template>

<script>
import ContestCard from "@/components/ContestCard";
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      keyword: "",
      searchOn: false,
      filters: [false, false, false],
      windowHeight: window.innerHeight,
    };
  },
  components: { ContestCard },
  methods: {
    filterclick(i) {
      const filter = this.filters;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      filter[i] = !this.filters[i];
      this.filters = JSON.parse(JSON.stringify(filter));
    },
    searchclick() {
      this.searchOn = !this.searchOn;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
};
</script>
<style>
.view-title {
  font-size: 17px;
  font-weight: 600;
  margin-left: 65px;
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
  padding-bottom: 10px;
}
.home_main {
  overflow: auto;
}
.home-fab {
  margin-bottom: 80px;
}
.home-filter {
}
.home_height_fill {
  height: 60vh;
}
.v-btn--rounded {
  border-radius: 15px !important;
}
</style>