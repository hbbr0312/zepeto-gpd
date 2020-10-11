<template>
  <router-link :to="link">
    <div
      class="profile-log-holder d-flex flex-column justify-space-between"
      :style="`background: linear-gradient(${color[0]}, ${color[1]}) !important;`"
    >
      <div class="ribbon" v-if="contestinfo.participated">Participated</div>
      <div class="contestcard_title d-flex flex-row justify-left">
        {{ contestinfo.name }}
      </div>

      <div class="d-flex flex-row justify-space-between">
        <div class="contestcard_theme">
          <v-icon dark>mdi-account</v-icon>
          {{ contestinfo.num_participants }} /
          {{ contestinfo.capacity }}
        </div>
        <div class="contestcard_theme">
          {{ contestinfo.theme[0] }}
        </div>
      </div>
      <v-img
        contain
        class="profile-log-image"
        style="top: 0; z-index: 1; right: 10px"
        :src="contestinfo.cover_image"
        cover
      />
    </div>
  </router-link>
</template>
<script>
const colors = [
  ["#6332f8", "#9198e5"],
  ["#D72A2A", "rgba(215,42,42,0.5)"],
  ["#1774CB", "rgba(23,116,203,0.5)"],
  ["#CBAA00", "rgba(215,187,42,0.5)"],
  ["#6332f8", "#9198e5"],
  ["#D72A2A", "rgba(215,42,42,0.5)"],
  ["#1774CB", "rgba(23,116,203,0.5)"],
  ["#CBAA00", "rgba(215,187,42,0.5)"],
  ["#6332f8", "#9198e5"],
  ["#D72A2A", "rgba(215,42,42,0.5)"],
  ["#1774CB", "rgba(23,116,203,0.5)"],
  ["#CBAA00", "rgba(215,187,42,0.5)"],
];

export default {
  name: "ContestCard",
  props: ["contestinfo", "id"],
  data() {
    return {
      color: colors[0],
      link: "/",
    };
  },
  mounted() {
    this.color = colors[this.id];
    const status = this.contestinfo.status;
    if (status == "ongoing") {
      this.link = `/submit/${this.id}`;
    } else {
      this.$store.state.compName = this.contestinfo.name;
      if (this.contestinfo.booth_fixed)
        this.$store.state.compCode = this.contestinfo.booth.split("_")[2];
      this.link = "/competition";
    }
  },
};
</script>
<style>
.contestcard {
  margin: 15px;
  padding: 20px;
  border-radius: 20px;
  height: 140px;
  overflow: hidden;
  position: relative;
}
.contestcard_title {
  font-size: 17px;
  color: white;
  font-weight: 500;
  position: absolute;
  z-index: 3;
}
.contestcard_theme {
  margin-top: 85px;
  font-size: 13px;
  color: white;
  z-index: 2;
}
.ribbon {
  margin: 0;
  padding: 0;
  font-size: 11px;
  font-weight: 500;
  background: #f44499;
  color: white;
  padding: 10px 0;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(30%) translateY(0%) rotate(40deg);
  transform-origin: top left;
  z-index: 3;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.3);
}
.ribbon:before,
.ribbon:after {
  content: "";
  position: absolute;
  top: 0;
  margin: 0 -1px; /* tweak */
  width: 100%;
  height: 100%;
  background: #f44499;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.3);
}
.ribbon:before {
  right: 100%;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.3);
}
.ribbon:after {
  left: 100%;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.3);
}
.test {
  display: inline-block;
  position: relative;
}
.test:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url(http://placehold.it/20x20/1) repeat;
}
</style>