<template>
  <div>
    <div class="d-flex flex-row">
      <div class="competition-header">
        <div class="button-back" @click="$router.back()">
          <v-icon class="icon-back" color="#6332F8" large
            >mdi-chevron-left</v-icon
          >Back
        </div>
        <div class="header-title">
          <b>Create Contest</b>
        </div>
      </div>
    </div>
    <div class="contest-main-view d-flex flex-column justify-space-between">
      <div>
        <div class="heading2">Guideline</div>
        <v-text-field v-model="title" label="Contest title"></v-text-field>
        <v-text-field v-model="theme" label="Theme"></v-text-field>
        <v-select
          v-model="max"
          :items="items"
          label="Maximun number"
        ></v-select>
        <v-btn
          rounded
          outlined
          depressed
          class="submit-change"
          @click="assignModal = true"
          style="margin-top: 20px"
          :color="assign ? '#6332F8' : '#5F5F5F'"
          >Assign Pose</v-btn
        >
        <img
          alt="Avatar"
          :src="pose"
          v-if="pose"
          class="center ma-5"
          width="200px"
        />
      </div>

      <v-btn
        rounded
        block
        large
        depressed
        dark
        color="#6332F8"
        style="margin-top: 20px"
        @click="createContest"
        >Create</v-btn
      >
      <v-alert
        dense
        type="error"
        elevation="2"
        v-if="alert"
        style="margin-top: 30px"
      >
        방 설정 정보를 모두 입력해주세요
      </v-alert>
      <v-overlay :value="assignModal" class="d-flex flex-column justify-end">
        <div class="contest_create_modal d-flex flex-column align-center">
          <div
            class="contest_create_modal_title"
            style="color: black; margin-top: 20px"
          >
            Assign Pose
            <v-btn icon color="black" style="justify-self: flex-end">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-row class="d-flex justify-center">
            <v-col
              v-for="(p, i) in poses"
              :key="p"
              class="d-flex child-flex"
              cols="5"
            >
              <v-img
                :src="p"
                :lazy-src="p"
                @click="selectPose(i)"
                :class="{ 'submit-selected': selectedPose == i }"
              >
              </v-img>
            </v-col>
          </v-row></div
      ></v-overlay>
    </div>
  </div>
</template>

<script>
import { get_image, make_comp } from "@/assets/api";
const fullshot = [
  "PHOTOBOOTH_ONE_545",
  "PHOTOBOOTH_ONE_478",
  "PHOTOBOOTH_ONE_463",
  "PHOTOBOOTH_ONE_428",
];
export default {
  name: "ContestCreate",
  data() {
    return {
      title: null,
      theme: null,
      max: null,
      assignModal: true,
      assign: false,
      items: [4, 8, 16, 32, 64, 128],
      tabs: ["Recommended", "Full", "Close Up"],
      pose: null,
      poses: null,
      selectedPose: null,
      alert: false,
    };
  },
  mounted() {
    this.loadPoses();
  },
  methods: {
    async createContest() {
      if (this.title && this.theme && this.max) {
        let booth = null;
        let cover = null;
        if (this.selectedPose) {
          booth = fullshot[this.selectedPose];
          cover = this.pose;
        } else cover = this.poses[0];
        const result = await make_comp(
          "O8ALN9",
          this.title,
          cover,
          this.max,
          booth,
          this.theme
        );
        if (result) this.$router.back();
      } else {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2000);
      }
    },
    async loadPoses() {
      this.poseLoading = true;
      let shots = fullshot;
      const poses = [];
      let img;
      for (var i in shots) {
        img = await get_image(300, shots[i], "O8ALN9");
        poses.push(img);
      }
      this.poses = poses;
      this.poseLoading = false;
    },
    selectPose(i) {
      this.selectedPose = i;
      const pose = this.poses[i];
      this.pose = pose;
      this.assignModal = false;
      this.assign = true;
    },
  },
};
</script>
<style>
.contest-main-view {
  margin: 20px;
}
.contest_create_modal {
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 65vh;
  width: 100vw;
}
</style>
