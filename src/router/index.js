import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import Submit from "@/views/Submit.vue";
import Competition from "@/views/Competition.vue";

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
    path: "/submit/:id",
    name: "Submit",
    component: Submit,
    meta: { transitionName: "slide-left" },
  },
  {
    path: "/competition/:code",
    name: "Competition",
    component: Competition,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
