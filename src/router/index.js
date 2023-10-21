import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Bilan from '../components/Bilan.vue'

import Login from '../views/AboutView.vue'
import Cloud from '../components/cloud/Principale.vue'
import Cloud_fichier from '../components/cloud/Fichiers.vue'
import Utilisateur from '../components/Utilisateurs.vue'
import Email from '../components/Email.vue'
import Chat from '../components/Chat.vue'
import Excel from '../components/Excel.vue'
import Excel2 from '../components/Excel2.vue'
import Zones from '../components/Zones.vue'
import Bennes from '../components/Bennes.vue'
import Bon from '../components/Benne_list.vue'
import CamionsChauffeurs from '../components/Camion_chauffeur.vue'
import Camion from '../components/Camion.vue'
import Comptabilite from '../components/Comptabilite.vue'
import Chauffeur from '../components/Chauffeur.vue'
import Flotte from '../components/Flotte.vue'
import BenneDashboard from '../components/Benne_dashboard.vue'
import Facturation from '../components/Facturation.vue'
import Facturation_e from '../components/Facturation_export.vue'
import Factures from '../components/Factures.vue'
import TableauExport from '../components/Tableau_export.vue'
import BenneStat from '../components/Benne_stat.vue'
import CamionMobile from '../components/Camion_mobile.vue'


import AD_Dossier_ordres from '../components/Dossiers_ordres.vue'
import AD_Dossier_booking from '../components/Dossier_booking.vue'
import Import from '../components/Ordres.vue'
import AD_Ordres from '../views/Import.vue'
import AD_Dispatche from '../views/Dispatche.vue'
import AD_Details from '../views/Details.vue'
import AD_Details_f from '../views/Details_f.vue'
import AD_Armateurs from '../views/Armateurs.vue'
import SC_Armateurs from '../views/Armateursc.vue'
import AD_Detailss from '../views/Detailss.vue'
import AD_Fichier from '../views/Export.vue'
import RH_Employes from '../components/Rhumaine.vue'
import RH_Paiement from '../components/Paiements.vue'
import RH_Salaire from '../components/Salaire_mois.vue'
import AD_Donneurs from '../components/Donneur_ordres.vue'



import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/albakoos_dashboard',
    name: 'home',
    component: HomeView
  },
  {
    path: '/bilan',
    name: 'bilan',
    component: Bilan
  },
  {
    path: '/administration/ordres',
    name: 'AD_Ordres',
    component: AD_Ordres
  },
  {
    path: '/administration/dispatche',
    name: 'AD_Dispatche',
    component: AD_Dispatche
  },
  {
    path: '/administration/details',
    name: 'AD_Details',
    component: AD_Details
  },
  {
    path: '/administration/details_facture',
    name: 'AD_Details_f',
    component: AD_Details_f
  },
  {
    path: '/facturation',
    name: 'Facturation',
    component: Facturation
  },
  {
    path: '/facturation_export',
    name: 'Facturation_e',
    component: Facturation_e
  },
  {
    path: '/administration/armateurs',
    name: 'AD_Armateurs',
    component: AD_Armateurs
  },
  {
    path: '/administration/factures',
    name: 'Factures',
    component: Factures
  },
  {
    path: '/administration/armateursc',
    name: 'SC_Armateurs',
    component: SC_Armateurs
  },
  {
    path: '/administration/detailss',
    name: 'AD_Detailss',
    component: AD_Detailss
  },
  {
    path: '/administration/fichier',
    name: 'AD_Fichier',
    component: AD_Fichier
  },
  {
    path: '/administration/dossier_ordres',
    name: 'AD_Dossier_ordres',
    component: AD_Dossier_ordres
  },
  {
    path: '/administration/dossier_booking',
    name: 'AD_Dossier_bookings',
    component: AD_Dossier_booking
  },
  {
    path: '/administration/donneur_ordres',
    name: 'AD_Donneurs',
    component: AD_Donneurs
  },
  {
    path: '/r_humaine/employes',
    name: 'RH_Employes',
    component: RH_Employes
  },
  {
    path: '/r_humaine/paiement',
    name: 'RH_Paiement',
    component: RH_Paiement
  },
  {
    path: '/r_humaine/salaire_mois',
    name: 'RH_Salaire',
    component: RH_Salaire
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/email',
    name: 'email',
    component: Email
  },
  {
    path: '/zones',
    name: 'zones',
    component: Zones
  },
  {
    path: '/benne_stat',
    name: 'benne_stat',
    component: BenneStat
  },
  {
    path: '/camion_mobile',
    name: 'camion_mobile',
    component: CamionMobile
  },
  {
    path: '/camion',
    name: 'camion',
    component: Camion
  },
  {
    path: '/comptabilite',
    name: 'comptabilite',
    component: Comptabilite
  },
  {
    path: '/chauffeur',
    name: 'chauffeur',
    component: Chauffeur
  },
  {
    path: '/flotte',
    name: 'flotte',
    component: Flotte
  },
  {
    path: '/',
    name: 'home',
    component: BenneDashboard
  },
  {
    path: '/tableau_export',
    name: 'TableauExport',
    component: TableauExport
  },
  {
    path: '/import',
    name: 'Import',
    component: Import
  },
  {
    path: '/liste_benne',
    name: 'liste_benne',
    component: Bon
  },
  {
    path: '/camion_chauffeur',
    name: 'camion_chauffeur',
    component: CamionsChauffeurs
  },
  {
    path: '/utilisateurs',
    name: 'utilisateurs',
    component: Utilisateur
  },
  {
    path: '/excel',
    name: 'excel',
    component: Excel
  },
  {
    path: '/excel2',
    name: 'excel2',
    component: Excel2
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/cloud',
    name: 'cloud',
    component: Cloud
  },
  {
    path: '/cloud_fichier',
    name: 'cloud_fichier',
    component: Cloud_fichier
  },
  {
    path: '/bennes',
    name: 'bennes',
    component: Bennes
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/doc'+process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const authenticated = store.state.users.name.length;
  console.log(to.path);
  console.log(authenticated);
  console.log(from.path);
  next();
    if(to.path !== '/about' || to.path !== '/administration/detailss') {
      if(authenticated > 2) {
       // //location.reload();
        next();
      } else {
        next('/about?error=1');
      }
   }

 //   if(to.path == '/about') {
 //     next();
  //  }
    
  
})

export default router
