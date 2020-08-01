<template>
  <b-row class="vh-100" align-v="center">
    <b-col></b-col>
    <b-col>
      <b-card class="login-card">
        <b-form @submit="onSubmit">
          <b-form-group id="email" label="E-mail" label-for="email-input">
            <b-form-input
              id="email-input"
              v-model="email"
              type="email"
              :state="validateEmail"
              required
              placeholder="Ex: pierre.dupont@outlook.com"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateEmail">Votre e-mail doit être valide.</b-form-invalid-feedback>
          </b-form-group>
          <b-row class="text-center">
            <b-col>
              <b-button type="submit" variant="primary" :disabled="loading">Réinitialiser</b-button>
            </b-col>
          </b-row>
          <b-row class="text-center link">
            <b-col>
              <router-link to="Login">Se connecter ?</router-link>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col></b-col>
            <b-col>
              <b-spinner variant="primary" v-if="loading" class="spinner"></b-spinner>
            </b-col>
            <b-col></b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
import { API_URL } from "../config";
export default {
  name: "PasswordReset",
  data() {
    return {
      email: "",
      loading: false,
    };
  },
  computed: {
    validateEmail() {
      let regex = /\S+@\S+\.\S+/;
      return regex.test(this.email);
    },
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      this.loading = true;
      await fetch(API_URL + "reset_password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.loading = false;
          if (response.error) {
            alert("Cet e-mail n'est associé à aucun compte !");
          } else {
            alert(response.messages[0]);
            this.$router.replace({ name: "Login" });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error(error);
        });
    },
  },
};
</script>
<style>
</style>