<template>
  <div class="new-activity">
    <Header />
    <b-row v-if="loading" align-v="center" class="text-center mt-5">
      <b-col class="mt-5">
        <b-spinner variant="primary" label="Spinning" style="width: 4rem; height: 4rem;"></b-spinner>
      </b-col>
    </b-row>
    <b-row class="new-activity-row mt-5" v-else>
      <b-col class="ml-2">
        <b-card title="Création d'une activité" class="new-activity-card">
          <Input
            group_id="name-group"
            label="Nom"
            id="name"
            :value="form.name"
            type="text"
            :state="validateName"
            v-on:change="updateValue($event)"
            placeholder="Ex: Starbucks"
            invalid_message="Veuillez saisir un nom valide"
          />
          <Input
            group_id="address-group"
            label="Adresse"
            id="address"
            :value="form.address"
            type="text"
            :state="validateAddress"
            v-on:change="updateValue($event)"
            placeholder
            invalid_message="Veuillez saisir une adresse valide"
          />
          <b-form-group label="Code postal">
            <b-form-select
              v-if="postal_codes"
              v-model="form.postal_code.id"
              :options="postal_codes"
            ></b-form-select>
          </b-form-group>
          <Input
            group_id="siren-group"
            label="Siren"
            class="mt-3"
            id="siren"
            :value="form.siren"
            type="text"
            :state="validateSiren"
            v-on:change="updateValue($event)"
            placeholder="Ex: 01245678"
            invalid_message="Veuillez saisir un SIREN valide"
          />
          <Input
            group_id="phone_number-group"
            label="Téléphone"
            id="phone_number"
            :value="form.phone_number"
            type="text"
            :state="validatePhoneNumber"
            v-on:change="updateValue($event)"
            placeholder="Ex: 0145256584"
            invalid_message="Veuillez saisir un numéro de téléphone valide"
          />
          <b-form-group label="Accès handicapé" class="mt-3">
            <b-form-radio v-model="form.disabled_access" value="1">Oui</b-form-radio>
            <b-form-radio v-model="form.disabled_access" value="0">Non</b-form-radio>
          </b-form-group>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="new-activity-card" title="Horaires">
          <b-form-group>
            <b-row>
              <b-col>
                <b-time id="opening_hours" v-model="form.opening_hours"></b-time>
              </b-col>
              <b-col class="text-center">
                <h3>à</h3>
              </b-col>
              <b-col>
                <b-time id="opening_hours" v-model="form.closing_hours"></b-time>
              </b-col>
            </b-row>
          </b-form-group>
          <b-form-group label="Temps moyens passé sur place" class="text-center">
            <b-row>
              <b-col>
                <b-time id="average_time_spent" v-model="form.average_time_spent"></b-time>
              </b-col>
            </b-row>
          </b-form-group>
        </b-card>
      </b-col>
      <b-col class="mr-2">
        <b-card class="new-activity-card" title="Caractéristiques">
          <b-form-group label="Catégorie">
            <b-form-select
              v-if="subcategories"
              v-model="form.subcategory.id"
              :options="subcategories"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Tags"
            description="Nous vous recommandons d'en sélectionner plusieurs."
          >
            <b-form-select v-if="tags" v-model="form.tags" :options="tags" multiple></b-form-select>
          </b-form-group>
          <b-form-group label="Quantité" description="Quantité concernant le prix">
            <b-form-select
              v-if="quantities"
              v-model="form.prices[0].quantity.id"
              :options="quantities"
            ></b-form-select>
          </b-form-group>
          <Input
            group_id="group-amount"
            label="Prix moyen"
            description="Laisser 00.00 si votre activité est gratuite."
            id="amount"
            :value="form.prices[0].amount"
            type="text"
            :state="validateAmount"
            v-on:change="updateAmount($event)"
            invalid_message="Veuillez saisir un prix valide"
          />
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-5 text-center buttons">
      <b-col>
        <b-button size="lg" :disabled="loading || !validateForm" @click="onSubmit">Créer l'activité</b-button>
      </b-col>
    </b-row>
    <b-modal
      v-model="loading_submit"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
    >
      <b-row>
        <b-col class="text-center">
          <h3>Création de l'activité</h3>
        </b-col>
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
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import { API_URL } from "../../config";
export default {
  name: "ActivityNew",
  components: {
    Header,
    Input,
  },
  beforeMount: async function () {
    await this.getPostalCodes();
    await this.getOptions();
  },
  computed: {
    validateName() {
      return this.form.name.length > 2;
    },
    validateAddress() {
      return this.form.address.length > 5;
    },
    validateSiren() {
      const regex = /^[0-9]{9}$/g;
      return regex.test(this.form.siren);
    },
    validatePhoneNumber() {
      const regex = /^[0-9]{10}$/g;
      return regex.test(this.form.phone_number);
    },
    validateAmount() {
      const regex = /^(\d+|\d{1,3}(\.\d{3})*)(.\d+)?$/gm;
      return regex.test(this.form.prices[0].amount);
    },
    validateForm() {
      return (
        this.validateName &&
        this.validateAddress &&
        this.validateSiren &&
        this.validatePhoneNumber &&
        this.validateAmount
      );
    },
  },
  methods: {
    updateValue(e) {
      this.form[e.type] = e.value;
    },
    updateAmount(e) {
      this.form.prices[0][e.type] = e.value;
    },
    async getPostalCodes() {
      this.loading = true;
      this.token = await localStorage.getItem("token");
      await fetch(API_URL + "postal_codes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.loading = false;
          response.postal_codes.forEach((postal_code) => {
            this.postal_codes.push({
              value: postal_code.id,
              text: postal_code.code,
            });
          });
          if (this.postal_codes.length > 0) {
            this.form.postal_code.id = this.postal_codes[0].value;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getOptions() {
      this.loading = true;
      await fetch(API_URL + "options", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.loading = false;
          this.subcategories = this.adaptArray(response.subcategories);
          if (this.subcategories.length > 0) {
            this.form.subcategory.id = this.subcategories[0].value;
          }
          this.tags = this.adaptArray(response.tags);
          if (this.tags.length > 0) {
            this.form.tags.push(this.tags[0].value);
          }
          this.quantities = this.adaptArray(response.quantities);
          if (this.quantities.length > 0) {
            this.form.prices[0].quantity.id = this.quantities[0].value;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    adaptArray(response_arr) {
      let arr = [];
      response_arr.forEach((element) => {
        arr.push({
          value: element.id,
          text: element.label,
        });
      });
      return arr;
    },
    async onSubmit(e) {
      e.preventDefault();
      this.loading_submit = true;
      fetch(API_URL + "activities", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.token,
        },
        body: JSON.stringify({
          name: this.form.name,
          address: this.form.address,
          siren: this.form.siren,
          phone_number: this.form.phone_number,
          opening_hours: this.getSecondes(this.form.opening_hours),
          closing_hours: this.getSecondes(this.form.closing_hours),
          average_time_spent: this.getSecondes(this.form.average_time_spent),
          disabled_access: this.form.disabled_access,
          subcategory: this.form.subcategory,
          tags: this.getConformTags(),
          postal_code: this.form.postal_code,
          prices: this.form.prices,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.loading_submit = false;
          if (response.error) {
            alert("Les informations saisies ne sont pas conforme.");
          } else {
            alert(
              "Votre demande a bien été transmise à notre équipe. \n Vous pouvez suivre l'état de votre demande depuis l'écran d'accueil"
            );
          }
        })
        .catch((error) => {
          console.error(error);
          this.loading_submit = false;
          alert(
            "Une erreur est survenue veuillez réessayez dans quelques instants."
          );
        });
    },
    getSecondes(value) {
      let splitted = value.split(":");
      let hour = splitted[0] * 3600;
      let minute = splitted[1] * 60;
      return hour + minute;
    },
    getConformTags() {
      let tmp_tags = [];
      this.form.tags.forEach((tag) => {
        tmp_tags.push({
          id: tag,
        });
      });
      return tmp_tags;
    },
  },
  data() {
    return {
      postal_codes: [],
      loading: false,
      loading_submit: false,
      token: null,
      subcategories: [],
      tags: [],
      quantities: [],
      form: {
        name: "",
        address: "",
        siren: "",
        phone_number: "",
        opening_hours: "07:30",
        closing_hours: "21:30",
        average_time_spent: "00:30",
        disabled_access: "0",
        postal_code: {
          id: "",
          code: "",
        },
        subcategory: {
          id: "",
          label: "",
        },
        state: {
          id: "",
          label: "",
        },
        tags: [],
        prices: [
          {
            amount: "00.00",
            quantity: {
              id: "",
              label: "",
            },
          },
        ],
      },
    };
  },
};
</script>