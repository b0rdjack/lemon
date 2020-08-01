<template>
  <b-row class="vh-100" align-v="center">
    <b-col></b-col>
    <b-col>
      <b-card class="login-card">
        <b-form @submit="onSubmit">
          <b-form-group id="email" label="E-mail" label-for="email-input">
            <b-form-input
              id="email-input"
              v-model="form.email"
              type="email"
              :state="validateEmail"
              required
              placeholder="Ex: pierre.dupont@outlook.com"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateEmail">Votre e-mail doit être valide.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="password" label="Mot de passe" label-for="password-input">
            <b-form-input
              id="password-input"
              v-model="form.password"
              type="password"
              :state="validatePassword"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validatePassword">Votre mot de passe doit être valide.</b-form-invalid-feedback>
          </b-form-group>
          <b-row class="text-center">
            <b-col>
              <b-button type="submit" variant="primary" :disabled="loading">Connexion</b-button>
            </b-col>
          </b-row>
          <b-row class="text-center link">
            <b-col>
              <router-link to="signup">Pas de compte ? Inscrivez vous !</router-link>
            </b-col>
          </b-row>
          <b-row class="text-center link">
            <b-col>
              <router-link to="password_reset">Mot de passe oublié ?</router-link>
            </b-col>
          </b-row>
        </b-form>
        <b-row class="text-center">
          <b-col></b-col>
          <b-col>
            <b-spinner variant="primary" v-if="loading" class="spinner"></b-spinner>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
import { API_URL } from "../config";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  computed: {
    validateEmail() {
      let regex = /\S+@\S+\.\S+/;
      return regex.test(this.form.email);
    },
    validatePassword() {
      let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
      return regex.test(this.form.password);
    },
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      this.loading = true;
      await fetch(API_URL + "professional", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.form.email,
          password: this.form.password,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.loading = false;
          if (response.error) {
            alert(response.messages[0]);
          } else {
            await localStorage.setItem(
              "token",
              response.token_type + " " + response.access_token
            );
            this.$router.replace({ name: "Home" });
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