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
          <b-spinner variant="primary" v-if="loading" class="spinner"></b-spinner>
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
import { API_URL } from "../config";
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
      this.loading = true;
      await fetch(API_URL + "professional/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          last_name: this.form.lastname,
          first_name: this.form.firstname,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.confirm_password,
          card: {
            number: this.payment.card_number,
            exp_month: this.payment.exp_month,
            exp_year: this.payment.exp_year,
            cvc: this.payment.cvc,
          },
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.loading = false;
          if (response.error) {
            console.log(response);
            alert("Les informations saisies ne sont pas valides.");
          } else {
            alert(response.messages[0]);
            this.$router.replace({ name: "Login" });
          }
        });
    },
  },
};
</script>