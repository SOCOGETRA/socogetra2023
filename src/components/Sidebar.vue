<template>
    <div class="hello">
        <div style="display: flex; height: calc(100vh - 48px);">
            <div style="width: 43px; background-color: #f0f0f0; border-right: 1px solid #ebeaea">
                <router-link to="/"> <vs-button style="margin: 50px -40px;" icon="home" color="#C32D39" type="line" id="rotate">Administration</vs-button> </router-link>
                <router-link to="/cloud"> <vs-button style="margin: 50px -34px; color: #409effd1;" icon="cloud" color="" type="line" id="rotate">Bibliothèque</vs-button> </router-link>
                <router-link to="/r_humaine/employes"> <vs-button style="margin: 50px -31px; color: #13ce66bd;" icon="sms" color="" type="line" id="rotate">R.Humaine</vs-button> </router-link>
                <router-link to="/finance"> <vs-button style="margin: 50px -21px; color: #ff9800;" icon="sms" color="" type="line" id="rotate">Finance</vs-button> </router-link>
            </div>
            <div style="background-color: #fafafa; width: calc(100% - 43px);">
                <vs-sidebar static-position default-index="1" color="danger" class="sidebarx" spacer style="z-index: 100; width: 100%; height: calc(100vh - 48px); background: #fafafa;" v-model="active">

                    <div class="header-sidebar" slot="header" style="display: grid;">
                        <center><vs-avatar  size="70px" :src="users.photo"/></center>

                        <div>
                            <h5 style="text-align: center;">
                              {{users.name}} {{users.prenom}}
                            </h5>
                            <p style="text-align: center; font-size: 12px;">
                              {{users.titre}}
                            </p>
                        </div>
                        

                    </div>
                    <div style="overflow: auto; height: 70vh;">
                    <vs-divider position="center" class="sideItem">
                    Conteneur
                    </vs-divider>

                    <vs-sidebar-item to="/" index="1" icon="dashboard" class="sideItem">
                    Dashboard
                    </vs-sidebar-item>

                    <vs-sidebar-item to="/" index="2" icon="dashboard" class="sideItem">
                    IMPORT
                    </vs-sidebar-item>

                    <vs-sidebar-item to="/tableau_export" index="3" icon="dashboard" class="sideItem">
                    EXPORT
                    </vs-sidebar-item>

                    <vs-sidebar-item to="zones" index="4" icon="location_on" class="sideItem">
                    PARC
                    </vs-sidebar-item>

                    <vs-sidebar-item to="armateurs" index="5" icon="account_box" class="sideItem">
                    GESTION AUTO
                    </vs-sidebar-item>

                    <vs-sidebar-item to="/comptabilite" index="6" icon="person" class="sideItem" v-if="users.statut == 'COMPTA'">
                    COMPTABILITE
                    </vs-sidebar-item>

                  <vs-divider position="center" class="sideItem" >
                    Configurations
                  </vs-divider>

                    <vs-sidebar-item to="/utilisateurs" index="7" icon="supervisor_account" class="sideItem">
                    Utilisateurs
                    </vs-sidebar-item>
                    <vs-sidebar-item to="/excel" index="8" icon="supervisor_account" class="sideItem">
                    Donneur d'Ordres
                    </vs-sidebar-item>
                    <vs-sidebar-item index="8" icon="account_box" v-if="affiche" class="sideItem">
                    Profile
                    </vs-sidebar-item>
                    <vs-sidebar-item index="9" class="sideItem" v-if="affiche">
                    Card
                    </vs-sidebar-item>
                  </div>
                    <div class="footer-sidebar" slot="footer">
                        <vs-button icon="reply" color="danger" type="flat" @click="deconnexion()">Déconnexion</vs-button>
                        <vs-button icon="settings" color="primary" type="border"></vs-button>
                    </div>

                </vs-sidebar>
            </div>
        </div>
        
    </div>
  </template>
  
  <script>
  export default {
    name: 'SideBar',
    computed: {
    users() {
      return this.$store.state.users;
        }
      },
    data() {
      return {
        affiche: false,
        active: true,
        value2: true,
        user: {
        nom : 'a',
        number: '',
        email : '',
        photo : '',
        titre : '',
        statut : '',
        droit : '',
        lieu : '',
        id : null,
      },
      }
    },
    methods:{
    openLoading(){
      this.$vs.loading()
      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 2000);
    },
    deconnexion(){
      this.$vs.loading()
      
      this.$store.commit('Connexion', this.user);
            this.$router.push({ path: '/about' });
              setTimeout( ()=> {
        this.$vs.loading.close()
      }, 2000);
    }
  },
  
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  