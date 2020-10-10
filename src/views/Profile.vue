<template>
  <div id="profile">
    <div class="competition-header">
      <div class="button-back" @click="$router.back()">
        <v-icon class="icon-back" color="#6332F8" large>mdi-chevron-left</v-icon
        >Back
      </div>

      <div class="header-title"><b>Profile</b></div>
    </div>
    <div class="profile-box">
      <img class="profile-avatar" :src="profileSrc" />
      <div class="profile-info">
        <div class="profile-name">Name</div>
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
      <v-tab-item class="profile-tab" key="participated"> </v-tab-item>
      <v-tab-item class="profile-tab" key="voted"></v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    tab: "participated",
    profileSrc: "https://render-cdn.zepeto.io/20201010/07/39mqKHscZUNLOrbCCm",
  }),
};
</script>
<style>
#profile {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
  object-fit: contain;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0 10px;
  overflow: auto;
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
</style>
