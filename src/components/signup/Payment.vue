<template>
  <div>
    <b-card title="Informations de paiements" class="payment-card">
      <b-card-text>
        Plan Basic
        <br />
        <b>14,99€</b> /mois
        <br />
        <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non urna sed libero ornare hendrerit. Cras id risus massa. Cras velit libero, tincidunt facilisis quam ac, hendrerit ornare ex.
        <br />
        <br />Nous utilisons le système de paiement sécurisé et chiffré
        <a
          href="https://stripe.com/fr"
          target="_blank"
        >Stripe</a>.
      </b-card-text>
    </b-card>
    <br />
    <b-card class="payment-card">
      <b-form-group id="card_number-group" label="Numéro de carte" label-for="card_number">
        <b-form-input
          id="card_number"
          v-model="payment.card_number"
          :state="validateNumber"
          required
          placeholder="Ex: 424224242442"
          @input="$emit('update:payment', payment)"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateNumber">Veuillez saisir un numéro valide.</b-form-invalid-feedback>
      </b-form-group>
      <b-row>
        <b-col cols="4">
          <b-form-group id="exp_month-group" label="Mois d'expiration" label-for="exp_month">
            <b-form-input
              id="exp_month"
              v-model="payment.exp_month"
              :state="validateExpMonth"
              required
              @input="$emit('update:payment', payment)"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateExpMonth">Veuillez saisir un mois valide.</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="exp_year-group" label="Année d'expiration" label-for="exp_year">
            <b-form-input
              id="exp_year"
              v-model="payment.exp_year"
              :state="validateExpYear"
              required
              @input="$emit('update:payment', payment)"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateExpYear">Veuillez saisir une année valide.</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-group id="cvc-group" label="CVC" label-for="cvc">
            <b-form-input
              id="cvc"
              v-model="payment.cvc"
              :state="validateCvc"
              required
              @input="$emit('update:payment', payment)"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateCvc">Veuillez saisir un CVC valide.</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PaymentForm",
  props: {
    payment: {
      card_number: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
      valid: false,
    },
  },
  watch: {
    payment: {
      handler(val) {
        this.payment.valid =
          this.validateNumber &&
          this.validateCvc &&
          this.validateExpMonth &&
          this.validateExpYear;
      },
      deep: true,
    },
  },
  computed: {
    validateNumber() {
      return (
        this.payment.card_number.length >= 13 &&
        this.payment.card_number.length <= 19 &&
        this.checkNumber(this.payment.card_number)
      );
    },
    validateCvc() {
      return (
        this.checkNumber(this.payment.cvc) &&
        (this.payment.cvc.length == 3 || this.payment.cvc.length == 4)
      );
    },
    validateExpMonth() {
      return (
        this.checkNumber(this.payment.exp_month) &&
        parseInt(this.payment.exp_month, 10) >= 1 &&
        parseInt(this.payment.exp_month, 10) <= 12 &&
        this.payment.exp_month.length === 2
      );
    },
    validateExpYear() {
      let currentYear = new Date().getFullYear();
      return (
        this.checkNumber(this.payment.exp_year) &&
        this.payment.exp_year >= currentYear &&
        this.payment.exp_year.length === 4
      );
    },
  },
  methods: {
    checkNumber(str) {
      str = str.trim();
      if (!str) {
        return false;
      }
      str = str.replace(/^0+/, "") || "0";
      var n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0;
    },
  },
};
</script>