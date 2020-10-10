<template>
  <div id="submit">
    <div class="header d-flex flex-row">
      <router-link to="/" class="align-self-start">
        <v-icon>mdi-chevron-left</v-icon>
      </router-link>
      <div class="text-center view-title">Submit</div>
    </div>
    <!-- {{ $route.params.id }} -->
    <div class="submit-main">
      <div class="heading2">Guideline</div>
      <div class="submit-guide-content">
        이 콘테스트는 <b>{{ title }} </b>입니다. <br />
        <b>{{ theme }}</b
        >에 맞는 의상을 미리 착용해 주세요! <br />
        참여는 한번만 가능합니다. <br />
        모든 준비가 완료되셨다면 <br />하단의 참여하기 버튼을 눌러주세요!
      </div>
      <div
        v-if="loading"
        class="d-flex flex-row justify-center align-center flex-grow-0"
      >
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
          <img alt="Avatar" :src="avatar" v-if="avatar" class="center" />
          <v-btn depressed class="submit-change" @click="submitAvatar = true"
            >Change Avatar</v-btn
          >
        </div>
        <div class="submit-avatar d-flex flex-column justify-center">
          <img alt="Avatar" :src="pose" v-if="pose" class="center" />
          <v-btn depressed class="submit-change" @click="submitPose = true"
            >Change Pose</v-btn
          >
        </div>
      </div>
      <v-btn block depressed class="submit-button" @click="submitConfirm = true"
        >SUBMIT</v-btn
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
    <v-dialog v-model="submitAvatar" transition="dialog-bottom-transition">
      <div class="avatar-dialog d-flex flex-column align-center">
        Change Avatar

        <v-row>
          <v-col v-for="p in poses" :key="p" class="d-flex child-flex" cols="4">
            <v-img
              :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
              :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
        <!-- <div class="d-flex flex-row" v-for="(p, i) in poses" :key="i">
          <div
            class="submit-select-center-cropped-box"
            v-for="(img, j) in p"
            :key="`${i}-${j}`"
          >
            <img
              alt="Avatar"
              :src="img"
              class="center ma-5 submit-select-center-cropped"
            />
          </div>
        </div> -->
        <div class="submit-confirm-buttons d-flex flex-row">
          <v-btn
            depressed
            class="ma-5 submit-button"
            @click="submitAvatar = false"
            >Cancel</v-btn
          >
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { get_image } from "@/assets/api";

const example = [
  "PHOTOBOOTH_ONE_425",
  "PHOTOBOOTH_ONE_463",
  "PHOTOBOOTH_ONE_545",
  "PHOTOBOOTH_ONE_478",
];
export default {
  name: "Submit",
  data() {
    return {
      loading: false,
      title: "여친룩 꾸미기 대회",
      theme: "데일리룩",
      avatar: null,
      pose: null,
      submitAvatar: false,
      submitPose: false,
      submitConfirm: false,
      submitLoading: false,
      poses: null,
    };
  },
  async mounted() {
    this.loading = true;
    const avatar = await get_image(150, "PHOTOBOOTH_ONE_463", "07FS6S");
    this.avatar = avatar;
    const pose = await get_image(150, "PHOTOBOOTH_ONE_425", "07FS6S");
    this.pose = pose;
    const poses = [];
    let img;
    for (var i in example) {
      img = await get_image(300, example[i], "07FS6S");
      poses.push(img);
    }
    this.poses = poses;
    this.loading = false;
  },
  methods: {
    async submit() {
      this.submitConfirm = false;
      this.submitLoading = true;
      setTimeout(() => {
        this.submitLoading = false;
        this.$router.push("/");
      }, 1000);
    },
    async changeAvatar() {
      const avatar = await get_image(200, "PHOTOBOOTH_ONE_463", "07FS6S");
      this.avatar = avatar;
    },
    async changePose() {
      const pose = await get_image(200, "PHOTOBOOTH_ONE_425", "07FS6S");
      this.pose = pose;
    },
  },
};
</script>
<style>
#submit {
}
.header {
  margin-top: 20px;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 10px;
}
.submit-guide-content {
}
.submit-main {
  padding: 20px;
}
.submit-avatar {
}
.submit-avata-box {
  margin-top: 20px;
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
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding-top: 20px;
  background-color: white;
  height: 100vh;
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
</style>