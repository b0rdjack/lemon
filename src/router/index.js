import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import PasswordReset from "../views/PasswordReset.vue";
import Signup from "../views/Signup.vue";

Vue.use(VueRouter);

function isAuthenticated() {
  const _token = localStorage.getItem("token");
  console.log(_token);
  return _token === null ? false : true;
}

const routes = [
  {
    path: "/",
    redirect: {
      name: "Home",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/password_reset",
    name: "PasswordReset",
    component: PasswordReset,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next();
      return;
    }
    next("/login");
  }
  next();
});

export default router;
