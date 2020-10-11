<template>
  <div id="submit">
    <div class="d-flex flex-row">
      <div class="competition-header">
        <div class="button-back" @click="$router.back()">
          <v-icon class="icon-back" color="#6332F8" large
            >mdi-chevron-left</v-icon
          >Back
        </div>

        <div class="header-title">
          <b>{{ contestinfo ? contestinfo.name : null }}</b>
        </div>
      </div>
    </div>
    <!-- {{ $route.params.id }} -->
    <div class="submit-main">
      <div class="heading2">Guideline</div>
      <div class="submit-guide-content">
        이 콘테스트는 <b>{{ contestinfo ? contestinfo.name : null }} </b>입니다.
        <br />
        <b>{{ contestinfo ? contestinfo.theme[0] : null }}</b
        >에 맞는 의상을 미리 착용해 주세요! <br />
        참여는 한번만 가능합니다. <br />
        모든 준비가 완료되셨다면 <br />하단의 참여하기 버튼을 눌러주세요!
      </div>
      <div class="text-center loader_container row_direction" v-if="loading">
        <v-progress-circular
          indeterminate
          color="grey"
          :size="70"
        ></v-progress-circular>
      </div>
      <div
        class="submit-avata-box d-flex flex-row justify-space-between"
        v-else
      >
        <div class="submit-avatar d-flex flex-column justify-center">
          <img :src="avatar" class="center center-cropped" />
          <v-btn
            outlined
            depressed
            class="submit-change"
            @click="submitAvatar = true"
            style="margin-top: 20px"
            >Change Avatar</v-btn
          >
        </div>
        <div class="submit-avatar d-flex flex-column justify-center">
          <img alt="Avatar" :src="pose" class="center center-cropped" />
          <v-btn
            outlined
            depressed
            class="submit-change"
            @click="submitPose = true"
            style="margin-top: 20px"
            >Change Pose</v-btn
          >
        </div>
      </div>
      <v-btn
        v-if="!loading"
        block
        depressed
        large
        class="submit-button"
        @click="submitConfirm = true"
        dark
        color="#6332F8"
        >Participate</v-btn
      >
    </div>
    <v-dialog
      v-model="submitLoading"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <div
        class="submit-fullscreen d-flex flex-column align-center justify-center"
      >
        <v-progress-circular
          indeterminate
          color="grey darken-3"
          :size="70"
        ></v-progress-circular>
      </div>
    </v-dialog>
    <v-dialog v-model="submitConfirm" transition="dialog-bottom-transition">
      <div class="confirm-dialog d-flex flex-column align-center">
        이 사진으로 제출하시겠습니까?
        <img alt="Avatar" :src="pose" v-if="pose" class="center ma-5" />
        <div class="submit-confirm-buttons d-flex flex-row">
          <v-btn
            depressed
            class="ma-5 submit-button"
            @click="submitConfirm = false"
            >Cancel</v-btn
          >
          <v-btn depressed class="ma-5 submit-button" @click="submit()"
            >Confirm</v-btn
          >
        </div>
      </div>
    </v-dialog>
    <v-overlay :value="submitAvatar" class="d-flex flex-column justify-end">
      <div class="contest_create_modal d-flex flex-column align-center">
        <div
          class="contest_create_modal_title d-flex flex-row justify-space-between align-center"
          style="color: black; margin-top: 20px"
        >
          <div
            class="d-flex flex-row flex-grow-1 text-center justify-center align-center"
            style="margin-left: 50px"
          >
            Change Avatar
          </div>
          <v-btn
            icon
            color="black"
            @click="submitAvatar = false"
            style="margin-right: 20px"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div
          class="submit-loading-full d-flex flex-column align-center justify-center"
          v-if="loading"
        >
          <v-progress-circular
            indeterminate
            color="grey"
            :size="70"
          ></v-progress-circular>
        </div>
        <v-row class="d-flex justify-center" v-else>
          <v-col
            v-for="(p, i) in avatars"
            :key="p"
            class="d-flex child-flex"
            cols="5"
          >
            <v-img
              :src="p"
              :lazy-src="p"
              @click="selectAvatar(i)"
              :class="{ 'submit-selected': selectedAvatar == i }"
            >
            </v-img>
          </v-col>
        </v-row></div
    ></v-overlay>
    <v-overlay :value="submitPose" class="d-flex flex-column justify-end">
      <div class="contest_create_modal d-flex flex-column align-center">
        <div
          class="contest_create_modal_title d-flex flex-row justify-space-between align-center"
          style="color: black; margin-top: 20px"
        >
          <div
            class="d-flex flex-row flex-grow-1 text-center justify-center align-center"
            style="margin-left: 50px"
          >
            Change Pose
          </div>
          <v-btn
            icon
            color="black"
            @click="submitPose = false"
            style="margin-right: 20px"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div
          class="submit-loading-full d-flex flex-column align-center justify-center"
          v-if="poseLoading"
        >
          <v-progress-circular
            indeterminate
            color="grey"
            :size="70"
          ></v-progress-circular>
        </div>
        <v-row class="d-flex justify-center" v-else>
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
</template>

<script>
import { get_image } from "@/assets/api";
const avatars = ["O8ALN9", "MYKURU", "I863RV", "PEJS9P"];
const closeup = [
  "PHOTOBOOTH_ONE_543",
  "PHOTOBOOTH_ONE_482",
  "PHOTOBOOTH_ONE_512",
  "PHOTOBOOTH_ONE_426",
];
const fullshot = [
  "PHOTOBOOTH_ONE_545",
  "PHOTOBOOTH_ONE_478",
  "PHOTOBOOTH_ONE_463",
  "PHOTOBOOTH_ONE_428",
];
export default {
  name: "Submit",
  data() {
    return {
      loading: false,
      contestinfo: null,
      avatar: null,
      pose: null,
      avatars: null,
      /*eslint-disable */
      poses: Array.from({ length: 14 }, (e) => null),
      selectedPose: 0,
      selectedAvatar: 0,
      shotmode: 0,
      submitAvatar: true,
      submitPose: false,
      submitConfirm: false,
      submitLoading: false,
      poseLoading: false,
    };
  },
  mounted() {
    this.loading = true;
    const contestinfo = this.$store.getters.getComps[this.$route.params.id];
    this.contestinfo = contestinfo;
    if (contestinfo.theme[0] == "강얼대") {
      this.shotmode = 1;
    }
    this.loadAvatars();
    this.loadPoses();
  },
  updated() {},
  methods: {
    async loadAvatars() {
      let img;
      const avas = [];
      for (var i in avatars) {
        img = await get_image(300, "PHOTOBOOTH_ONE_545", avatars[i]);
        if (i == 0) this.avatar = img;
        avas.push(img);
      }
      this.avatars = avas;
    },
    async loadPoses() {
      this.poseLoading = true;
      let shots;
      if (this.shotmode == 0) {
        shots = fullshot;
      } else {
        shots = closeup;
      }
      const poses = [];
      let img;
      for (var i in shots) {
        img = await get_image(300, shots[i], avatars[this.selectedAvatar]);
        if (i == 0) {
          this.pose = img;
          this.loading = false;
        }
        poses.push(img);
      }
      this.poses = poses;
      this.poseLoading = false;
    },
    async submit() {
      this.submitConfirm = false;
      this.submitLoading = true;
      setTimeout(() => {
        this.submitLoading = false;
        this.$router.push("/");
      }, 1000);
    },
    selectAvatar(i) {
      this.selectedAvatar = i;
      this.loadPoses();
      const ava = this.avatars[i];
      this.avatar = ava;
      this.submitAvatar = false;
    },
    selectPose(i) {
      this.selectedPose = i;
      const pose = this.poses[i];
      this.pose = pose;
      this.submitPose = false;
    },
  },
};
</script>
<style>
#submit {
}
.header {
  margin-top: 20px;
  padding-bottom: 10px;
}
.submit-guide-content {
}
.submit-main {
  padding: 20px;
}

.submit-avata-box {
  margin-top: 20px;
  height: 40vh;
  margin-bottom: 20px;
}
.confirm-dialog {
  padding-top: 20px;
  background-color: white;
}
.submit-confirm-buttons {
  margin: 10px;
}
.avatar-dialog {
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding-top: 20px;
  background-color: white;
}
.submit-fullscreen {
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}
.submit-select-center-cropped-box {
  width: 120px;
  overflow: hidden;
  position: relative;
}

.submit-select-center-cropped {
  position: absolute;
  left: -10%;
  right: -1000%;
  top: -100%;
  bottom: -100%;
  margin: auto;
  min-height: 100%;
  min-width: 100%;
}
.submit-selected {
  border: 1px solid #6332f8;
  border-radius: 20px;
}
.loader_container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.row_direction {
  margin-left: -20px;
  width: 100vw;
  height: 50vh;
}
.submit-pose-fill {
  background-color: red;
  height: 100%;
  width: 100vw;
}
.pupple_text {
  color: #6332f8;
}
.submit-loading-full {
  height: 100vh;
}
.center-cropped {
  object-fit: cover; /* Scale the image so it covers whole area, thus will likely crop */
  object-position: center; /* Center the image within the element */
  height: 220px;
  width: 160px;
}
</style>