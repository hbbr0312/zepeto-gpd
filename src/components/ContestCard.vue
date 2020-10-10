<template>
  <router-link :to="`/submit/${id}`">
    <div class="contestcard d-flex flex-column justify-space-between">
      <div class="contestcard_title d-flex flex-row justify-left">
        {{ contestTitle }}
      </div>
      <div class="d-flex flex-row justify-space-between">
        <div class="contestcard_title">10 / 32</div>
        <div class="contestcard_title">
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
};
</script>
<style>
.contestcard {
  margin: 15px;
  padding: 20px;
  background-color: #e5e5e5;
  border-radius: 20px;
  height: 140px;
}
.contestcard_title {
}
</style>