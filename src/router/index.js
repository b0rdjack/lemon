import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ActivityNew from "../views/Activity/ActivityNew.vue";
import ActivityUpdate from "../views/Activity/ActivityUpdate.vue";
import Activity from "../views/Activity/Activity.vue";
import Account from "../views/Account.vue";
import Login from "../views/Login.vue";
import PasswordReset from "../views/PasswordReset.vue";
import Signup from "../views/Signup.vue";

Vue.use(VueRouter);

function isAuthenticated() {
  const _token = localStorage.getItem("token");
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
    path: "/activity/new",
    name: "ActivityNew",
    component: ActivityNew,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/activity/:id",
    name: "Activity",
    component: Activity,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/activity/:id/edit",
    name: "ActivityUpdate",
    component: ActivityUpdate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
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
