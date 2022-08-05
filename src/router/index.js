import Vue from "vue"
import VueRouter from "vue-router"
import Greeting from "../components/Greeting"
import Insurance from "../components/Insurance"
import AgeError from "../components/AgeError"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "greeting",
    component: Greeting,
  },
  {
    path: "/insurance",
    name: "insurance",
    component: Insurance,
  },
  {
    path: "/age-error",
    name: "age error",
    component: AgeError,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
