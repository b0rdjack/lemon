<template>
  <b-card class="signup-card">
    <b-form-group id="lastname-group" label="Nom" label-for="lastname">
      <b-form-input
        id="lastname"
        v-model="form.lastname"
        required
        :state="validateLastName"
        placeholder="Ex: Dupont"
        @input="$emit('update:form', form)"
      ></b-form-input>
      <b-form-invalid-feedback
        :state="validateLastName"
      >Votre nom doit comporter au moins 2 caractères.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="firstname-group" label="Prénom" label-for="firstname">
      <b-form-input
        id="firstname"
        v-model="form.firstname"
        required
        :state="validateFirstName"
        placeholder="Ex: Pierre"
        @input="$emit('update:form', form)"
      ></b-form-input>
      <b-form-invalid-feedback
        :state="validateFirstName"
      >Votre prénom doit comporter au moins 2 caractères.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="email-group" label="E-mail" label-for="email">
      <b-form-input
        id="email"
        v-model="form.email"
        type="email"
        :state="validateEmail"
        required
        placeholder="Ex: pierre.dupont@outlook.com"
        @input="$emit('update:form', form)"
      ></b-form-input>
      <b-form-invalid-feedback :state="validateEmail">Votre e-mail doit être valide.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="password-group" label="Mot de passe" label-for="password">
      <b-form-input
        id="password"
        v-model="form.password"
        type="password"
        :state="validatePassword"
        aria-describedby="password-help-block"
        required
        @input="$emit('update:form', form)"
      ></b-form-input>
      <b-form-text
        id="password-help-block"
      >Votre mot de passe doit être avoir entre 8 et 32 caractères et contenir au moins: une minuscule, une majuscule, un chiffre et un caractère spéciale.</b-form-text>
      <b-form-invalid-feedback :state="validatePassword">Votre mot de passe doit être valide.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="confirm-password-group"
      label="Confirmation du mot de passe"
      label-for="confirm_password"
    >
      <b-form-input
        id="confirm_password"
        v-model="form.confirm_password"
        type="password"
        :state="validateConfirmPassword"
        required
        @input="$emit('update:form', form)"
      ></b-form-input>
      <b-form-invalid-feedback
        :state="validateConfirmPassword"
      >Vos mots de passe doivent correspondre et être valide.</b-form-invalid-feedback>
    </b-form-group>
  </b-card>
</template>

<script>
export default {
  name: "SignupForm",
  props: {
    form: {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
      confirm_password: "",
      valid: true,
    },
  },
  watch: {
    form: {
      handler(val) {
        this.form.valid = !(
          this.validateLastName &&
          this.validateFirstName &&
          this.validateEmail &&
          this.validatePassword &&
          this.validateConfirmPassword
        );
      },
      deep: true,
    },
  },
  computed: {
    validateLastName() {
      return this.form.lastname.length >= 2;
    },
    validateFirstName() {
      return this.form.firstname.length >= 2;
    },
    validateEmail() {
      let regex = /\S+@\S+\.\S+/;
      return regex.test(this.form.email);
    },
    validatePassword() {
      let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
      return regex.test(this.form.password);
    },
    validateConfirmPassword() {
      return (
        this.form.password === this.form.confirm_password &&
        this.form.confirm_password != ""
      );
    },
    validateForm() {
      this.form.valid = !(
        this.validateLastName &&
        this.validateFirstName &&
        this.validateEmail &&
        this.validatePassword &&
        this.validateConfirmPassword
      );
    },
  },
};
</script>

<style>
</style>