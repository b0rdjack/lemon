<template>
  <b-card class="signup-card">
    <b-form-group id="lastname-group" label="Nom" label-for="lastname">
      <b-form-input
        id="lastname"
        v-model="form.lastname"
        required
        placeholder="Ex: Smith"
        @input="$emit('update:form', form)"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="firstname-group" label="Prénom" label-for="firstname">
      <b-form-input
        id="firstname"
        v-model="form.firstname"
        required
        placeholder="Ex: John"
        @input="$emit('update:form', form)"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="email-group" label="Adresse E-mail" label-for="email">
      <b-form-input
        id="email"
        v-model="form.email"
        type="email"
        required
        placeholder="Ex: pierre.dupont@outlook.com"
        @input="$emit('update:form', form)"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="password-group" label="Mot de passe" label-for="password">
      <b-form-input
        id="password"
        v-model="form.password"
        type="password"
        required
        @input="$emit('update:form', form)"
      ></b-form-input>
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
    },
  },
};
</script>

<style>
</style>