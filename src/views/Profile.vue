<template>
  <div id="profile">
    <div class="competition-header">
      <div class="button-back" @click="$router.back()">
        <v-icon class="icon-back" color="#6332F8" large>mdi-chevron-left</v-icon
        >Back
      </div>

      <div class="header-title"><b>프로필</b></div>
    </div>
    <div class="profile-box">
      <img class="profile-avatar" :src="profileSrc" />
      <div class="profile-info">
        <div class="profile-name">숭아:D</div>
        <div class="profile-achievement-header">Achievement Title</div>
        <div class="profile-achievements-holder">
          <div class="profile-achievement">
            <div class="medal medal-bronze" />
            <v-chip color="#6332f8" dark x-small dense>32</v-chip>
          </div>
          <div class="profile-achievement">
            <div class="medal medal-silver" />
            <v-chip color="#6332f8" dark x-small dense>17</v-chip>
          </div>
          <div class="profile-achievement">
            <div class="medal medal-gold" />
            <v-chip color="#6332f8" dark x-small dense>3</v-chip>
          </div>
          <div class="profile-achievement">
            <div class="medal medal-win" />
            <v-chip color="#6332f8" dark x-small dense>5</v-chip>
          </div>
        </div>
        <div class="profile-stories">
          <div class="profile-story-add">
            <v-icon large color="#c4c4c4"> mdi-plus </v-icon>
          </div>

          <div class="profile-story-default" />
          <div class="profile-story-default" />
        </div>
      </div>
    </div>
    <v-tabs v-model="tab" fixed-tabs background-color="#fff" color="#6332f8">
      <v-tab key="participated">
        <svg
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.7778 0H3.22222C1.45 0 0 1.45 0 3.22222V25.7778C0 27.55 1.45 29 3.22222 29H25.7778C27.55 29 29 27.55 29 25.7778V3.22222C29 1.45 27.55 0 25.7778 0ZM9.66667 22.5556H6.44444V11.2778H9.66667V22.5556ZM16.1111 22.5556H12.8889V6.44444H16.1111V22.5556ZM22.5556 22.5556H19.3333V16.1111H22.5556V22.5556Z"
            fill="#5F5F5F"
          />
        </svg>
      </v-tab>
      <v-tab key="voted">
        <svg
          width="26"
          height="29"
          viewBox="0 0 26 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.6667 15.9508H20.6844L17.7956 18.8506H20.5544L23.1111 21.7505H2.88889L5.46 18.8506H8.42111L5.53222 15.9508H4.33333L0 20.3005V26.1002C0 27.6951 1.28556 29 2.87444 29H23.1111C24.7 29 26 27.7096 26 26.1002V20.3005L21.6667 15.9508ZM20.2222 8.62878L13.0722 15.8058L7.95889 10.6732L15.1089 3.49611L20.2222 8.62878ZM14.0978 0.422303L4.89667 9.65822C4.33333 10.2237 4.33333 11.1371 4.89667 11.7026L12.0467 18.8796C12.61 19.4451 13.52 19.4451 14.0833 18.8796L23.27 9.65822C23.8333 9.09276 23.8333 8.17931 23.27 7.61385L16.12 0.436802C15.5711 -0.143161 14.6611 -0.143161 14.0978 0.422303Z"
            fill="#5F5F5F"
          />
        </svg>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item class="profile-tab" key="participated">
        <div class="profile-tab-filters">
          <div class="profile-tab-filter highlighted">최근순</div>
          <div class="profile-tab-filter">인기순</div>
          <div class="profile-tab-filter">랭킹순</div>
        </div>
        <div
          class="profile-log-holder"
          v-for="log in pLogs"
          :key="`p-log-${log.winner_code}`"
          :style="'background: ' + log.background_color"
          @click="onClickLog(log, 'participate')"
        >
          <div class="profile-log-title">
            {{ log.name }}
          </div>
          <div class="profile-log-desc mt-auto">
            {{ log.num_participants }} 참가자
          </div>
          <div class="profile-log-desc">{{ log.num_votes }} 투표</div>

          <img :src="log.my_image" class="profile-log-image" />

          <div class="profile-log-theme">
            <div class="profile-log-desc">{{ log.theme }}</div>
          </div>
          <div
            class="profile-log-medal"
            v-bind:class="{
              'log-medal-bronze': log.prize === 3,
              'log-medal-gold': log.prize === 1,
            }"
          ></div>
        </div>
      </v-tab-item>
      <v-tab-item class="profile-tab" key="voted">
        <div class="profile-tab-filters">
          <div class="profile-tab-filter highlighted">최근순</div>
          <div class="profile-tab-filter">인기순</div>
          <div class="profile-tab-filter">랭킹순</div>
        </div>
        <div
          class="profile-log-holder"
          v-for="log in vLogs"
          :key="`v-log-${log.winner_code}`"
          :style="'background: ' + log.background_color"
          @click="onClickLog(log, 'vote')"
        >
          <div class="profile-log-title">
            {{ log.name }}
          </div>
          <div class="profile-log-desc mt-auto">
            {{ log.num_participants }} 참가자
          </div>
          <div class="profile-log-desc">{{ log.num_votes }} 투표</div>

          <img :src="log.my_image" class="profile-log-image" />

          <div class="profile-log-theme">
            <div class="profile-log-desc">{{ log.theme }}</div>
          </div>
          <div
            class="profile-log-medal"
            v-bind:class="{
              'log-medal-pick': log.prize === 1,
            }"
          ></div>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model="showDialog" width="300">
      <v-card class="log-dialog">
        <div class="log-dialog-title">
          {{ name }}
        </div>

        <img class="log-dialog-winner" :src="image" />
        <v-btn color="#6332F8" outlined> Follow </v-btn>
        <div class="log-dialog-rank">{{ rankString }}</div>
        <div class="log-dialog-ment">{{ ment }}</div>
        <v-btn text color="#5f5f5f" @click="showDialog = false"> 닫기 </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import pLogs from "@/assets/pLogs.json";
import vLogs from "@/assets/vLogs.json";

export default {
  name: "Profile",
  computed: {
    participatedLog() {
      return [1, 2, 3];
    },
    votedLog() {
      return [1, 2, 3];
    },
    rankString() {
      if (this.type === "vote") {
        return "내가 뽑은 아바타의 순위 : " + this.rank + "위";
      } else {
        return "나의 순위 : " + this.rank + "위";
      }
    },
    ment() {
      if (this.type === "vote") {
        if (this.rank === 1) {
          return "바로 돗자리 까셔야 겠는걸요?";
        } else {
          return "투표했던 아바타가 아쉽게도 우승하지 못했습니다ㅠㅠ";
        }
      } else {
        if (this.rank === 1) {
          return "축하합니다! 우승하셨습니다!";
        } else {
          return "이번엔 아쉽게 우승을 놓쳤지만, 기회는 언제든 있습니다!";
        }
      }
    },
  },
  data: () => ({
    tab: "participated",
    pLogs: pLogs,
    vLogs: vLogs,
    profileSrc: "https://render-cdn.zepeto.io/20201010/17/39mqDbsd2o28qD3zN7",
    showDialog: false,
    name: null,
    image: null,
    rank: null,
    type: null,
  }),
  methods: {
    onClickLog(log, type) {
      this.type = type;
      this.name = log.name;
      this.image = log.winner_image;
      this.rank = log.rank;
      this.showDialog = true;
    },
  },
};
</script>
<style>
#profile {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.profile-box {
  width: 100%;
  height: 280px;
  display: flex;
  align-items: center;
  padding: 20px 10px;
}

.profile-avatar {
  width: 120px;
  height: 100%;
  object-fit: cover;
  display: flex;
}

.profile-info {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.profile-name {
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
}

.profile-achievement-header {
  font-size: 15px;
  color: #5f5f5f;
  line-height: 28px;
}

.profile-achievements-holder {
  width: 100%;
  display: flex;
  margin-top: 5px;
}

.profile-achievement {
  width: 35px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 3px;
}

.medal {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
}

.medal-bronze {
  background: url("~@/assets/bronze.png") no-repeat;
  background-size: contain;
  background-position: center center;
}

.medal-silver {
  background: url("~@/assets/silver.png") no-repeat;
  background-size: contain;

  background-position: center center;
}

.medal-gold {
  background: url("~@/assets/gold.png") no-repeat;
  background-size: contain;

  background-position: center center;
}

.medal-win {
  background: url("~@/assets/king.png") no-repeat;
  margin-top: 2px;
  background-size: contain;
  background-position: center center;
}

.profile-stories {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
}

.profile-story-add {
  width: 55px;
  height: 55px;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.profile-story-default {
  width: 55px;
  height: 55px;
  border-radius: 10px;
  background: #c4c4c4;
  margin-right: 10px;
}

.profile-tab {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 60px 20px 0 20px;
  overflow: auto !important;
}

.profile-tab-filters {
  position: absolute;

  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}

.profile-tab-filter {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f5f5f;
  font-size: 15px;
  font-weight: normal;
}

.highlighted {
  color: #6332f8;
}

.v-tabs {
  flex: 0 !important;
}

.theme--light.v-tabs-items {
  display: flex;
}

.v-window__container {
  width: 100%;
  height: 100%;
  display: flex;
}

.profile-log-holder {
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  position: relative;
  color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  overflow: hidden;
}

.profile-log-holder:after {
  content: "\A";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
  opacity: 1;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.profile-log-title {
  font-size: 17px;
  font-weight: bold;
  z-index: 2;
}

.profile-log-image {
  position: absolute;
  width: 140px;
  height: 100%;
  object-fit: cover;
  bottom: -20px;
  right: 40px;
  z-index: 2;
}

.profile-log-desc {
  font-size: 12px;
  z-index: 2;
}

.profile-log-medal {
  position: absolute;
  top: -10px;
  right: 10px;
  width: 50px;
  height: 50px;

  z-index: 2;
}

.profile-log-theme {
  position: absolute;
  bottom: 10px;
  right: 20px;
  z-index: 2;
}

.log-medal-bronze {
  background: url("~@/assets/bronze.png") no-repeat;
  background-size: contain;
  background-position: center center;
}

.log-medal-gold {
  background: url("~@/assets/gold.png") no-repeat;
  background-size: contain;
  background-position: center center;
}

.log-medal-pick {
  background: url("~@/assets/king.png") no-repeat;
  background-size: contain;
  background-position: center center;
}

.log-dialog {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.log-dialog-winner {
  width: 300px;
  margin-bottom: 20px;
}

.log-dialog-title {
  font-size: 18px;
  font-weight: bold;
}

.log-dialog-rank {
  margin-top: 15px;
  font-size: 12px;
  color: #5f5f5f;
}

.log-dialog-ment {
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 15px;
  color: black;
}
</style>
