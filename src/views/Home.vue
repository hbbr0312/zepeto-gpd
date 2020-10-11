<template>
  <div id="home">
    <div class="home_upper">
      <div
        class="home_rl_pd d-flex flex-row justify-space-between align-center"
      >
        <div class="heading1">숭아:D</div>
        <router-link to="/profile">
          <v-avatar size="34px">
            <img
              alt="Avatar"
              src="https://render-cdn.zepeto.io/20201010/17/39mqDcsd2pDxFLdIIN"
            />
          </v-avatar>
        </router-link>
      </div>
      <div class="home_rl_pd d-flex flex-row justify-space-between">
        <v-btn
          :dark="filter == 0"
          :outlined="filter != 0"
          depressed
          color="#6332F8"
          @click="filterclick(0)"
          width="94"
          v-if="!searchOn"
          rounded
          >강패대</v-btn
        >
        <v-btn
          :dark="filter == 1"
          :outlined="filter != 1"
          depressed
          color="#6332F8"
          @click="filterclick(1)"
          width="94"
          v-if="!searchOn"
          rounded
          >강얼대</v-btn
        >
        <v-btn
          :dark="filter == 2"
          :outlined="filter != 2"
          depressed
          color="#6332F8"
          @click="filterclick(2)"
          width="94"
          v-if="!searchOn"
          rounded
          >투표중</v-btn
        >
        <input
          v-model="keyword"
          type="text"
          v-if="searchOn"
          placeholder="검색어를 입력하세요"
        />
        <v-btn icon><v-icon @click="searchclick">mdi-magnify</v-icon></v-btn>
      </div>
    </div>
    <div
      class="home_main"
      :style="{ height: `${windowHeight - 146}px;` }"
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
      <div class="contests-wrapper">
        <ContestCard
          :contestinfo="c"
          v-for="(c, i) in comps"
          :key="i"
          :id="i"
        />
      </div>
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
import { get_com_list } from "@/assets/api";
import ContestCard from "@/components/ContestCard";
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      keyword: "",
      searchOn: false,
      filter: -1,
      comps: null,
      windowHeight: window.innerHeight,
      origin_comps: null,
    };
  },
  components: { ContestCard },
  async mounted() {
    this.loading = true;
    if (this.$store.getters.getComps) {
      this.comps = this.$store.getters.getComps;
      this.loading = false;
      this.origin_comps = this.$store.getters.getComps;
      return;
    }
    const data = await get_com_list();
    this.comps = data;
    this.origin_comps = JSON.parse(JSON.stringify(data));
    this.$store.commit("setComps", data);
    this.loading = false;
  },
  methods: {
    filterclick(i) {
      if (this.filter != i) {
        this.filter = i;
        if (i == 0) {
          this.comps = this.origin_comps.filter((e) => e.theme[0] != "강얼대");
        } else if (i == 1) {
          this.comps = this.origin_comps.filter((e) => e.theme[0] == "강얼대");
        } else {
          this.comps = this.origin_comps.filter((e) => e.status == "voting");
        }
      } else {
        this.filter = -1;
        this.comps = JSON.parse(JSON.stringify(this.origin_comps));
      }
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
  padding: 20px 20px 0;
  display: flex;
  overflow: auto;
  flex-direction: column;
}

.contests-wrapper {
  width: 100%;
  min-height: 100%;
  overflow: auto;
}

.home-fab {
  margin-bottom: 80px;
}

.home_height_fill {
  height: 60vh;
}
.v-btn--rounded {
  border-radius: 15px !important;
}
</style>