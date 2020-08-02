<template>
  <div class="account">
    <Header />
    <b-row class="account-row vh-100" align-v="center">
      <b-col></b-col>
      <b-col>
        <b-card title="Mon compte" class="account-card">
          <div class="card-content" v-if="!loading">
            <b-card-text>
              <b>Prénom:</b>
              {{account.first_name}}
              <br />
              <b>Nom:</b>
              {{account.last_name}}
              <br />
              <b>E-mail:</b>
              {{account.email}}
            </b-card-text>
            <b-button variant="danger" @click="openConfirm">
              <font-awesome-icon :icon="['fas', 'trash-alt']" />Supprimer mon compte
            </b-button>
          </div>
          <b-row class="text-center" v-else>
            <b-col></b-col>
            <b-col>
              <b-spinner variant="primary" class="spinner"></b-spinner>
            </b-col>
            <b-col></b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-modal
      ref="modal"
      title="Confirmez la suppression de votre compte"
      v-model="confirm"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form>
        <b-form-group id="password" label="Mot de passe" label-for="password-input">
          <b-form-input
            id="password-input"
            v-model="password"
            type="password"
            :state="validatePassword"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validatePassword">Votre mot de passe doit être valide.</b-form-invalid-feedback>
        </b-form-group>
      </form>
      <template v-slot:modal-footer>
        <b-button variant="danger" @click="deleteAccount">
          <font-awesome-icon :icon="['fas', 'trash-alt']" />Supprimer définitivement
        </b-button>
      </template>
    </b-modal>
    <b-modal
      v-model="loading_delete"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
    >
      <b-row>
        <b-col class="text-center">
          <h3>Suppression du compte</h3>
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
import { API_URL } from "../config";

export default {
  name: "Account",
  components: {
    Header,
  },
  beforeMount: async function () {
    await this.getAccount();
  },
  data() {
    return {
      account: {
        first_name: "",
        last_name: "",
        email: "",
      },
      password: "",
      loading: false,
      confirm: false,
      loading_delete: false,
      token: null,
    };
  },
  computed: {
    validatePassword() {
      let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
      return regex.test(this.password);
    },
  },
  methods: {
    async getAccount() {
      this.loading = true;
      this.token = await localStorage.getItem("token");
      await fetch(API_URL + "professional", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          this.loading = false;
          this.account = response.user;
        })
        .catch((error) => {
          this.loading = false;
          console.error(error);
        });
    },
    resetModal() {
      this.password = "";
    },
    openConfirm() {
      this.confirm = true;
    },
    async deleteAccount(e) {
      e.preventDefault();
      this.loading_delete = true;
      fetch(API_URL + "professional", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.token,
        },
        body: JSON.stringify({
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.error) {
            this.loading_delete = false;
            this.password = "";
            alert("Le mot de passe est erroné !");
          } else {
            await localStorage.clear();
            this.loading_delete = false;
            this.$router.replace({ path: "/login" });
          }
        })
        .catch(async (error) => {
          console.error(error);
          await localStorage.clear();
          this.loading_delete = false;
          this.$router.replace({ path: "/login" });
        });
    },
  },
};
</script>

<style>
</style>