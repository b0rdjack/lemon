<template>
  <b-row class="vh-100" align-v="center">
    <b-col></b-col>
    <b-col>
      <PaymentForm :payment.sync="payment" v-if="first_step" />
      <SignupForm :form.sync="form" v-else />
      <b-row>
        <b-col>
          <div v-if="first_step">
            <b-button @click="onSubmit" variant="info" :disabled="loading">S'inscrire</b-button>
            <b-button @click="previousStep" variant="info" :disabled="loading">Précédent</b-button>
          </div>

          <b-button @click="nextStep" variant="info" v-else>Suivant</b-button>
          <b-button
            variant="outline-primary"
            class="signup_button"
            href="/login"
          >Déjà un compte ? Se connecter</b-button>
        </b-col>
      </b-row>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
import SignupForm from "@/components/signup/Form.vue";
import PaymentForm from "@/components/signup/Payment.vue";
export default {
  components: {
    SignupForm,
    PaymentForm,
  },
  data() {
    return {
      form: {
        lastname: "",
        firstname: "",
        email: "",
        password: "",
      },
      payment: {
        card_number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
      },
      loading: false,
      first_step: false,
    };
  },
  methods: {
    nextStep() {
      this.first_step = true;
    },
    previousStep() {
      this.first_step = false;
    },
    async onSubmit(e) {
      e.preventDefault();
      console.log(this.form);
      console.log(this.payment);
    },
  },
};
</script>