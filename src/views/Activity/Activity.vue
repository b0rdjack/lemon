<template>
  <div class="activity">
    <Header />
    <b-row v-if="loading" align-v="center" class="text-center mt-5">
      <b-col class="mt-5">
        <b-spinner variant="primary" label="Spinning" style="width: 4rem; height: 4rem;"></b-spinner>
      </b-col>
    </b-row>
    <b-row class="activity-row mt-5" v-else>
      <b-col class="ml-2">
        <b-card title="Informations" class="activity-card">
          <b>Nom:</b>
          {{activity.name}}
          <br />
          <b>Adresse:</b>
          {{activity.address}}
          <br />
          <b>Code postal:</b>
          {{activity.postal_code.code}}
          <br />
          <b>Siren:</b>
          {{activity.siren}}
          <br />
          <b>Téléphone:</b>
          {{activity.phone_number}}
          <br />
          <b>État:</b>
          {{activity.state.label}}
          <br />
          <b>Accès handicapé:</b>
          {{activity.disabled_access == "1" ? "Oui" : "Non"}}
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Horaires" class="activity-card">
          <b>Ouverture:</b>
          {{getHMS(activity.opening_hours)}}
          <br />
          <b>Fermeture:</b>
          {{getHMS(activity.closing_hours)}}
          <br />
          <b>Temps moyen:</b>
          {{getHMS(activity.average_time_spent)}}
          <br />
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Informations supplémentaires" class="activity-card mr-2">
          <b>Catégorie:</b>
          {{activity.subcategory.label}}
          <br />
          <b>Tags:</b>
          <li v-for="tag in activity.tags" :key="tag.id">{{tag.label}}</li>
          <br />
          <b>Prix:</b>
          {{activity.prices[0].amount}}
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-5 text-center buttons" v-if="activity">
      <b-col>
        <b-button
          size="lg"
          v-if='activity.state.label === "Refusé"'
          @click="updateActivity"
        >Modifier l'activité</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import { API_URL } from "../../config";
export default {
  name: "Activity",
  components: {
    Header,
  },
  beforeMount: async function () {
    await this.getActivity();
  },
  methods: {
    async getActivity() {
      this.loading = true;
      let token = await localStorage.getItem("token");
      await fetch(API_URL + "activities/" + this.$route.params.id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          this.loading = false;
          if (response.error) {
            alert(
              "Oups ! Une erreur est survenue, veuillez réessayer plus tard"
            );
          } else {
            this.activity = response.activity;
            switch (this.activity.state.label) {
              case "Accepted":
                this.activity.state.label = "Accepté";
                break;
              case "Denied":
                this.activity.state.label = "Refusé";
                break;
              case "Pending":
                this.activity.state.label = "En attente";
                break;
            }
          }
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    getHMS(duration) {
      let date = new Date(null);
      date.setSeconds(duration);
      return date.toISOString().substr(11, 8);
    },
    updateActivity() {
      this.$router.replace({
        path: "/activity/" + this.$route.params.id + "/edit",
      });
    },
  },
  data() {
    return {
      loading: false,
      activity: null,
    };
  },
};
</script>

<style>
</style>