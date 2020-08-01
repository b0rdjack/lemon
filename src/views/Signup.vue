<template>
  <b-row class="vh-100" align-v="center">
    <b-col></b-col>
    <b-col>
      <PaymentForm :payment.sync="payment" v-if="first_step" />
      <SignupForm :form.sync="form" v-else />
      <b-row class="text-center buttons">
        <b-col>
          <div v-if="first_step">
            <b-button @click="previousStep" class="previous-btn" :disabled="loading">
              <font-awesome-icon :icon="['fas', 'angle-double-left']" />Précédent
            </b-button>
            <b-button
              @click="onSubmit"
              class="signup-btn"
              :disabled="loading || !payment.valid"
            >S'inscrire</b-button>
          </div>
          <b-button @click="nextStep" :disabled="!form.valid" v-else>
            Suivant
            <font-awesome-icon :icon="['fas', 'angle-double-right']" />
          </b-button>
        </b-col>
      </b-row>
      <b-row class="text-center buttons" v-if="!first_step">
        <b-col>
          <router-link to="Login">Déjà un compte ? Connectez vous !</router-link>
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
        confirm_password: "",
        valid: false,
      },
      payment: {
        card_number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        valid: false,
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