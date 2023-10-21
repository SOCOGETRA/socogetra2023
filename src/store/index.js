import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {
      name : '',
      prenom: '',
      number: '',
      email : '',
      photo : '',
      titre : '',
      sexe : '',
      droit : '',
      lieu : '',
      statut : '',
      id : null,
    },
    dossier: 1,
    enLigne: false,
  },
  mutations: {
    Connexion: (state, data) => {
      state.users.name = data.nom;
      state.users.prenom = data.prenom;
      state.users.email = data.email;
      state.users.number = data.contact;
      state.users.id = data.id_user;
      state.users.photo = data.photo;
      state.users.titre = data.titre;
      state.users.sexe = data.statut;
      state.users.droit = data.droit;
      state.users.lieu = data.lieu;
      state.users.statut = data.statut;
      state.enLigne = true;
    },
    Dossiers: (state, data) => {
      state.dossier = data.id_doc;
    },
    Booking: (state, data) => {
      state.dossier = data.id_doc;
    }

  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
