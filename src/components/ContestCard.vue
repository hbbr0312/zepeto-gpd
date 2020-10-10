<template>
  <router-link :to="`/submit/${id}`">
    <div class="contestcard d-flex flex-column justify-space-between">
      <div class="ribbon">Participated</div>
      <div class="contestcard_title d-flex flex-row justify-left">
        {{ contestTitle }}
      </div>
      <div class="d-flex flex-row justify-space-between">
        <div class="contestcard_theme">
          <v-icon dark>mdi-account</v-icon> 10 / 32
        </div>
        <div class="contestcard_theme">
          {{ theme }}
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "ContestCard",
  props: ["contestTitle", "theme", "id"],
  data() {
    return {
      participated: false,
    };
  },
};
</script>
<style>
.contestcard {
  margin: 15px;
  padding: 20px;
  background-color: #e5e5e5;
  border-radius: 20px;
  height: 140px;
  overflow: hidden;
  position: relative; /* required  for demo*/
}
.contestcard_title {
  font-size: 17px;
  color: white;
}
.contestcard_theme {
  font-size: 13px;
  color: white;
}
.ribbon {
  margin: 0;
  padding: 0;
  font-size: 11px;
  background: #f44499;
  color: white;
  padding: 1em 0;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(30%) translateY(0%) rotate(40deg);
  transform-origin: top left;
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
}
.ribbon:before {
  right: 100%;
}
.ribbon:after {
  left: 100%;
}
/* Custom styles */
</style>