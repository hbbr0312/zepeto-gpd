import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import Submit from "@/views/Submit.vue";
import Competition from "@/views/Competition.vue";
import ContestCreate from "@/views/ContestCreate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { transitionName: "slide-right" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { transitionName: "slide-left" },
  },
  {
    path: "/submit",
    name: "Submit",
    component: Submit,
    meta: { transitionName: "slide-left" },
  },
  {
    path: "/competition",
    name: "Competition",
    component: Competition,
  },
  {
    path: "/create",
    name: "ContestCreate",
    component: ContestCreate,
    meta: { transitionName: "slide-left" },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
