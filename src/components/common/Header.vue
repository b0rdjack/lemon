<template>
  <div class="header">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="/home">Traily</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button href="/activity/new">Ajouter une activité</b-button>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Mon compte</em>
            </template>
            <b-dropdown-item href="/account">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Déconnexion</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal
      v-model="loading"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
    >
      <b-row>
        <b-col></b-col>
        <b-col>
          <h3>Déconnexion</h3>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col class="text-center">
          <b-spinner variant="primary"></b-spinner>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { API_URL } from "../../config";
export default {
  name: "Header",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async logout() {
      this.loading = true;
      let token = await localStorage.getItem("token");
      await fetch(API_URL + "user/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          await localStorage.removeItem("token");
          this.loading = false;
          this.$router.replace({ path: "/login" });
        })
        .catch(async (error) => {
          console.error(error);
          await localStorage.removeItem("token");
          this.loading = false;
          this.$router.replace({ name: "/login" });
        });
    },
  },
};
</script>

<style>
</style>