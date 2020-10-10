<template>
  <div class="wrapper">
    <div class="competition-header">
      <div class="button-back" @click="$router.back()">
        <v-icon class="icon-back" color="#6332F8" large>mdi-chevron-left</v-icon
        >Back
      </div>

      <div class="header-title"><b>ZEPETO</b> World Cup</div>
    </div>
    <div class="competition-versus">
      <div class="competition-versus-header">
        <div class="competition-versus-title">
          {{ "남친룩" }}
        </div>
        <div class="competition-versus-round">
          {{ roundText }}
        </div>
      </div>
      <div class="competition-versus-pictures">
        <img
          class="competition-versus-placeholder"
          :src="leftSrc"
          @click="onSelect('l')"
          v-bind:class="{
            win_left: selected && !winRight,
            lose_left: selected && winRight,
          }"
        />

        <img
          class="competition-versus-placeholder"
          :src="rightSrc"
          @click="onSelect('r')"
          v-bind:class="{
            win_right: selected && winRight,
            lose_right: selected && !winRight,
          }"
        />

        <div class="competition-versus-logo" v-bind:class="{ blur: selected }">
          VS
        </div>
      </div>
    </div>
    <div class="competition-follow">
      <v-spacer />
      <v-btn color="#6332F8" outlined v-bind:class="{ blur: selected }">
        Follow
      </v-btn>
      <v-spacer />
      <v-spacer />
      <v-btn color="#6332F8" outlined v-bind:class="{ blur: selected }">
        Follow
      </v-btn>
      <v-spacer />
    </div>
    <v-progress-linear
      height="40"
      color="#6332F8"
      class="competition-progress"
      :value="progress"
    />
  </div>
</template>

<script>
export default {
  computed: {
    compName() {
      return this.$stores.tate.compName;
    },
    progress() {
      return Math.floor((this.voted * 100) / this.competitors.length);
    },
    roundText() {
      if (this.competitors.length === 2) return "결승전";
      else if (this.competitors.length === 4) return "준결승전";
      else return `${this.round} 라운드`;
    },
    buttonText() {
      return "< Back";
    },
  },
  data: () => ({
    winRight: false,
    competitors: [1, 2, 3, 4, 5, 6, 7, 8],
    round: 1,
    selected: false,
    voted: 0,
    leftSrc: "https://render-cdn.zepeto.io/20201010/07/39mqKHscZUNLOrbCCm",
    rightSrc: "https://render-cdn.zepeto.io/20201010/07/39mqwDscZUYSiLsYus",
  }),
  methods: {
    async onSelect(dir) {
      if (dir === "r") {
        this.winRight = true;
      } else {
        this.winRight = false;
      }

      this.selected = true;
      this.voted += 2;

      await setTimeout(() => {
        if (this.voted === this.competitors.length) {
          this.voted = 0;
        }
        this.selected = false;
      }, 1500);
    },
  },
};
</script>

<style>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.competition-header {
  width: 100%;
  height: 50px;
  background: #ffffff;
  display: flex;
  padding: 6px;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 0.5px solid #c4c4c4;
}

.header-title {
  font-size: 18px;
  font-weight: 500;
}

.button-back {
  position: absolute;
  width: 70px;
  display: flex;
  align-items: center;
  line-height: 1;
  left: 6px;
  color: #6332f8;
  font-size: 16px;
  font-weight: 500;
}

.icon-back {
  margin-right: -6px;
  margin-top: -1px;
}

.competition-versus {
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
}

.competition-versus-header {
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.competition-versus-title {
  font-size: 28px;
  font-weight: bold;
}

.competition-versus-round {
  font-size: 12px;
  margin-top: 6px;
  font-weight: bold;
  color: #5f5f5f;
}

.competition-versus-pictures {
  width: 100%;
  display: flex;
  flex: 1;
  position: relative;
}

.competition-versus-placeholder {
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
}

.competition-versus-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transform: translate(-50%, -50%);
  transition: 0.2s ease-in;
}

.blur {
  opacity: 0;
  transition: 0.2s ease-in;
}

.competition-follow {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
}

.competition-progress {
  width: 100%;
  height: 50px;
  display: flex;
}

.win_right {
  animation: punch_left 1s ease-in-out;
  -webkit-animation: punch_left 1s ease-in-out;
  transform: translateX(-50%);
}

.win_left {
  animation: punch_right 1s ease-in-out;
  -webkit-animation: punch_right 1s ease-in-out;
  transform: translateX(50%);
}

.lose_left {
  animation: fly_left 1s ease-in-out;
  -webkit-animation: fly_left 1s ease-in-out;
  transform: translateX(-100%);
}

.lose_right {
  animation: fly_right 1s ease-in-out;
  -webkit-animation: fly_right 1s ease-in-out;
  transform: translateX(100%);
}

@keyframes punch_left {
  from {
    transform: translateX(0);
  }
  20% {
    transform: translateX(20%);
  }
  40% {
    transform: translateX(-160%);
  }
  80% {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes fly_left {
  from {
    transform: translateX(0);
  }
  20% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(-250%);
  }
  to {
    transform: translateX(-250%);
  }
}

@keyframes punch_right {
  from {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-20%);
  }
  40% {
    transform: translateX(160%);
  }
  80% {
    transform: translateX(50%);
  }
  to {
    transform: translateX(50%);
  }
}

@keyframes fly_right {
  from {
    transform: translateX(0);
  }
  20% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(250%);
  }
  to {
    transform: translateX(250%);
  }
}
</style>