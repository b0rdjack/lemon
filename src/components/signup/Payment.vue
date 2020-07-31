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
          required
          placeholder="Ex: 424224242442"
          @input="$emit('update:payment', payment)"
        ></b-form-input>
      </b-form-group>
      <b-row>
        <b-col cols="4">
          <b-form-group id="exp_month-group" label="Mois d'expiration" label-for="exp_month">
            <b-form-input
              id="exp_month"
              v-model="payment.exp_month"
              required
              @input="$emit('update:payment', payment)"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="exp_year-group" label="Année d'expiration" label-for="exp_year">
            <b-form-input
              id="exp_year"
              v-model="payment.exp_year"
              required
              @input="$emit('update:payment', payment)"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-group id="cvc-group" label="CVC" label-for="cvc">
            <b-form-input
              id="cvc"
              v-model="payment.cvc"
              required
              @input="$emit('update:payment', payment)"
            ></b-form-input>
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
    },
  },
};
</script>