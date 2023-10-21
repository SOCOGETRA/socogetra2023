<template>
    <div class="hello">
        <div class="screenUse">
          <Nav-bar style="width: 100%;"/>
          <vs-row>
            <vs-col vs-w="2.5">
              <Side-bar style="width: 100%;"/>
            </vs-col>
            <vs-col vs-w="9.5" style="overflow:scroll; height: calc(100vh - 48px);">
              <div style="position: fixed; width: calc(79% - 13px); z-index: 1000;">
                <vs-card class="navbar" style="margin-bottom: -10px; border-bottom: 3px solid #f0c1c5;">
                <div style="width: 400px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> Dashboard (Bennes)
                </div>
                <span style="float: right; margin-right: 150px;">
                      <vs-button color="#C32D39"  icon="person_add" style="padding: 5px; position: absolute; width: 150px;" @click="popupActivo2=true">Créer dossier</vs-button>
                  </span>
                </vs-card>
              </div>
              
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;">

                <vs-divider position="left"><img style="margin-top: 5px;" src="../assets/sogecit.png" width="150"></vs-divider>
                <vs-row>

                  <vs-col vs-w="4" style="padding-right: 10px;">
                      <el-card class="box-card" style="padding: -15px;  background-color: #c1c5f014;">
                        <vs-icon icon="local_shipping" size="small" bg="#009eff5c" style="color: #6285db; font-size: 20px;" round></vs-icon> <span class="titre-zone">Total Voyages</span>
                            <vs-row class="space-zone">
                              <vs-col vs-w="12" style="display: grid;">
                                <vs-row class="space-zone">
                                  <vs-col vs-w="5.5" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="local_shipping" color="white" bg="#409eff" round></vs-icon> <span class="prix-zone">26 <span style="font-weight: normal;">voyages</span></span></span>
                                  </vs-col>
                                  <vs-col vs-w="6.5" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#efa45b" round></vs-icon> <span style="color: #009eff;" class="prix-zone">1 587 500 CFA</span></span>
                                  </vs-col>
                                </vs-row>
                               
                               
                              </vs-col>
                              
                            </vs-row>
                      </el-card>
                    </vs-col>

                    <vs-col vs-w="4" style="padding-right: 10px;">
                      <el-card class="box-card" style="padding: -15px;  background-color: #c1c5f014;">
                        <vs-icon icon="filter_alt" size="small" bg="#009eff5c" style="color: #6285db; font-size: 20px;" round></vs-icon> <span class="titre-zone">Total Carburants</span>
                           <vs-row class="space-zone">
                              <vs-col vs-w="12" style="display: grid;">
                                <vs-row class="space-zone">
                                  <vs-col vs-w="5.5" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="filter_alt" color="white" bg="#13ce66" round></vs-icon> <span class="prix-zone">1 525 <span style="font-weight: normal;">litres</span></span></span>
                                  </vs-col>
                                  <vs-col vs-w="6.5" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#efa45b" round></vs-icon> <span style="color: #009eff;" class="prix-zone">587 500 CFA</span></span>
                                  </vs-col>
                                </vs-row>
                              </vs-col>
                            </vs-row>
                      </el-card>
                    </vs-col>

                    <vs-col vs-w="4" style="padding-right: 10px;">
                      <el-card class="box-card" style="padding: -15px;  background-color: #c1c5f014;">
                        <vs-icon icon="payments" size="small" bg="#009eff5c" style="color: #6285db; font-size: 20px;" round></vs-icon> <span class="titre-zone">Total Dépenses</span>
                           <vs-row class="space-zone">
                              <vs-col vs-w="12" style="display: grid;">
                                <vs-row class="space-zone">
                                  <vs-col vs-w="5.5" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#640064" round></vs-icon> <span class="prix-zone">3 <span style="font-weight: normal;">dépenses</span></span></span>
                                  </vs-col>
                                  <vs-col vs-w="6" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#efa45b" round></vs-icon> <span style="color: #009eff;" class="prix-zone">87 500 CFA</span></span>
                                  </vs-col>
                                </vs-row>
                              </vs-col>
                            </vs-row>
                      </el-card>
                    </vs-col>
                  </vs-row>

                  <vs-divider position="left">STATISTIQUE DES CAMIONS DU (03/04/2023)</vs-divider>
                  
                  <el-card class="box-card" style="padding: -15px; border-radius: 20px;">
                  
                  <el-table
                    stripe
                    ref="multipleTable"
                    :data="donnees"
                    style="width: 100%; font-family: Helvetica;"
                    >
                    <el-table-column
                      type="selection"
                      width="55">
                      <img style="margin-top: 5px;" src="../assets/camionbenne.png" width="25">
                    </el-table-column>
                    <el-table-column
                      property="name"
                      label="Véhicule">
                      <template slot-scope="scope">
                       
                        <el-link type="primary" @click="Borderau(scope.row)"> {{ scope.row.n_doc }}</el-link>
                        
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Voyages">
                      12
                    </el-table-column>
                    
                    <el-table-column
                      label="Prix Voyages">
                      595 000 CFA
                    </el-table-column>
                    
                    
                    <el-table-column
                      label="Carburant">
                      115 litres
                    </el-table-column>
                    <el-table-column
                      label="Prix Carburant">
                      88 000 CFA
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="sddesd"
                      show-overflow-tooltip>
                      <vs-button color="#d57f87" type="border">Dark</vs-button>
                    </el-table-column>
                  </el-table>
                  </el-card>
  
                
                <vs-divider/>
                
              </div>
            </vs-col>
          </vs-row>
  
          <vs-popup classContent="popup-example"  title="Nouveau dossier" :active.sync="popupActivo2">
            <div>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date de Réception</label>
                  <el-input   type="date" v-model="form.date_recept" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Conteneur</label>
                  <el-input v-model="form.n_conteneur" placeholder="N° Conteneur">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Type</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.type_c"
                    >
                    <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in type_cont" />
                  </vs-select>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Nombre de Conteneur</label>
                  <el-input-number style="width: 100%;" v-model="form.nbre_tcs" :min="1" :max="10"></el-input-number>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Déclaration</label>
                  <el-input v-model="form.n_declaration" placeholder="N° Déclaration">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>BL</label>
                  <el-input v-model="form.bl" placeholder="N° BL">
                  </el-input>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Armateur</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.armateur"
                    >
                      <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in armateur" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                  <label>Client</label>
                  <el-input style="width: 100%;" v-model="form.client" placeholder="Nom client">
                  </el-input>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Camion </label>
                  <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    multiple
                    autocomplete
                    v-model="form.camion"
                    >
                    <vs-select-item :key="index" :value="item.imatriculation" :text="item.imatriculation" v-for="item,index in donneesCamion" />
                  </vs-select>
                  
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                  <label>Chauffeur</label>
                  
                  <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    multiple
                    autocomplete
                    v-model="form.chauffeur"
                    >
                    <vs-select-item :key="index" :value="item.nom_prenom" :text="item.nom_prenom" v-for="item,index in donneesChauf" />
                  </vs-select>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Zone de livraison</label>
                  <vs-select
                    @change="handleSelectChange($event)"
                    style="width: 100%;"
                    v-model="form.zone_livraison"
                    >
                      <vs-select-item :key="index" :value="item.zone_livraison" :text="item.zone_livraison" v-for="item,index in donneesZones" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Zone de facturation</label>
                  <el-input disabled  style="width: 100%;" v-model="form.zone_facturation" placeholder="ZONE">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Statut</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.statut"
                    >
                      <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in type_cont" />
                  </vs-select>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>BADT</label>
                  <el-input   type="date" v-model="form.badt" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>DO</label>
                  <el-input   type="date" v-model="form.do" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Sortie de port</label>
                  <el-input type="date" v-model="form.sortie_port" placeholder="Date de Réception"></el-input>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date requete</label>
                  <el-input   type="date" v-model="form.date_requete" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date récupération</label>
                  <el-input   type="date" v-model="form.date_recup" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Entrée parc</label>
                  <el-input type="date" v-model="form.entree_parc" placeholder="Date de Réception"></el-input>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Transitaire</label>
                  <el-input style="width: 100%;" v-model="form.transitaire" placeholder="Transitaire"></el-input>
                  
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                  <label>Observation</label>
                  <el-input  type="textarea" v-model="form.observation" placeholder="Observation">
                  </el-input>
                </vs-col>
                
              </vs-row>
              
            </div>
           
            
            <center><vs-button style="margin: 20px; width: 300px;" @click="onSubmit()" color="primary" type="filled">Enregistrer le dossier</vs-button></center>
            <vs-popup title="Inner popup" :active.sync="popupActivo3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br><br>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <br><br>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              </vs-popup>
          </vs-popup>
  
          <vs-popup classContent="popup-example"  title="Bordereau de livraison" :active.sync="activePrompt9">
            
            <center style="width: 21cm;">
              
              <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="true"
                :preview-modal="true"
                :paginate-elements-by-height="1100"
                filename="hee hee"
                :pdf-quality="2"
                :manual-pagination="false"
                pdf-format="a4"
                pdf-orientation="portrait"
                pdf-content-width="800px"
  
                @progress="onProgress($event)"
                @hasStartedGeneration="hasStartedGeneration()"
                @hasGenerated="hasGenerated($event)"
                ref="html2Pdf"
            >
                <section slot="pdf-content">
                  <div style="width: 19.5cm; margin-left: .5cm; font-size: 12px; margin-top: 20px" id="html-to-pdf" ref="content">
                    <div style="width: 100%; padding: 10px">
                      <div style="float: left; display: block;">
                        <img src="../assets/logo_beldal.jpg" width="185">
                      </div>
                      <div style="float: left; padding: 12px;">
                        <span style="font-weight: bold; font-size: 19px; font-family: 'Nunito Sans', sans-serif;">BORDEREAU DE LIVRAISON CONTENEUR</span>
                      </div>
                    </div>
                    .
                    <div>
                      <vs-divider style="font-family: 'Nunito Sans', sans-serif;">03/04/2023</vs-divider>
                    </div>
  
                    <div style="text-align: left; font-family: 'Nunito Sans', sans-serif;" v-if="elementChoisi != null">
                      <vs-row >
                        <vs-col vs-w="4.5" style="padding: 5px; font-size: 12px;">
                          <el-input placeholder="" v-model="elementChoisi.n_conteneur">
                            <template slot="prepend">CONTENEUR</template>
                          </el-input>
                          
                        </vs-col>
                        <vs-col vs-w="3" style="padding: 5px">
                          <el-input placeholder="" v-model="elementChoisi.type_c">
                            <template slot="prepend">TYPE</template>
                          </el-input>
                          
                        </vs-col>
                        <vs-col vs-w="4.5" style="padding: 5px">
                          <el-input placeholder="" value="          ">
                            <template slot="prepend">Code Chargement</template>
                          </el-input>
                        </vs-col>
                      </vs-row>
                      <vs-row style="padding-top: 10px; font-family: 'Nunito Sans', sans-serif;">
                        <vs-col vs-w="4.5" style="padding: 5px">
                          <el-input placeholder="" v-model="elementChoisi.n_declaration">
                            <template slot="prepend">N° DECLARAT°</template>
                          </el-input>
                        </vs-col>
  
                        <vs-col vs-w="3" style="padding: 5px">
                          <el-input placeholder="" value="SCANNER">
                            <template slot="prepend">ST</template>
                          </el-input>
                        </vs-col>
  
                        <vs-col vs-w="4.5" style="padding: 5px">
                          <el-input placeholder="" value="CHASSIS">
                            <template slot="prepend">MODE LIVRAISON</template>
                          </el-input>
                        </vs-col>
                    
                      </vs-row>
                      <vs-row style="padding-top: 10px">
                        <vs-col vs-w="4" style="padding: 5px; font-family: 'Nunito Sans', sans-serif;">
                          <b style="font-size: 14px;">CLIENT : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.client }}</span>
                        </vs-col>
                        <vs-col vs-w="4" style="padding: 5px">
                          <b style="font-size: 14px;">TRANSITAIRE : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.transitaire }}</span>
                        </vs-col>
                        
                      </vs-row>
                      <vs-row style="padding-top: 10px">
                        <vs-col vs-w="4" style="padding: 5px">
                          <b style="font-size: 14px;">Zone de livraison : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.zone_livraison }}</span>
                        </vs-col>
                        <vs-col vs-w="4" style="padding: 5px">
                          <b style="font-size: 14px;">CHAUFFEUR : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.chauffeur }}</span>
                        </vs-col>
                        <vs-col vs-w="4" style="padding: 5px">
                          <b style="font-size: 14px;">CAMION : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.camion }}</span>
                        </vs-col>
                        
                      </vs-row>
                    </div>
  
                    <div style="margin-top: 20px;">
                      <center style="padding: 10px; font-size: 17px; text-decoration: underline; font-family: 'Nunito Sans', sans-serif;">CODE AVARIES</center>
                      <table style="width: 100%;">
                        <tr>
                          <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                          <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                          <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                          <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                          <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                        </tr>
                      </table>
                    </div>
                    
                    <div style="margin-top: 20px;">
                      <img src="../assets/bordereau_suit.jpg" width="100%">
                    </div>
  
                    <div style="margin-top: 20px; font-family: 'Nunito Sans', sans-serif;">
                      <vs-row>
                        <vs-col vs-w="6" style="padding: 5px; border: 1px solid gray; padding-bottom: 40px;">
                          <center><span style="font-weight: bold;">SIGNATURE COMMIS</span></center>
                          <center><span>( Nom et Prenom )</span></center>
                          
                        </vs-col>
                        <vs-col vs-w="6" style="padding: 5px; border: 1px solid gray;">
                          <center><span style="font-weight: bold;">SIGNATURE CLIENT</span></center>
                          <center><span>( Nom, Prenom & Date )</span></center>
                          
                        </vs-col>
                      </vs-row>
                    </div>
                    <b style="font-family: 'Nunito Sans', sans-serif;"><span>NB : Votre adresse de récupération à adresser à l'armateur et nous mettre en copie sur le : <span style="color:darkblue">info.execution@sbtl.ci</span></span></b>
                  
                  </div>
                </section>
            </vue-html2pdf>
             
                    
            </center>
                  
           
          </vs-popup>
        </div>
       
    </div>
  </template>
  
  <script>
  import VueHtml2pdf from 'vue-html2pdf'
  import html2pdf from "html2pdf.js";
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas';
  import axios from 'axios';
  import SideBar from '@/components/Sidebar.vue'
  import NavBar from '@/components/Navbar.vue'
  export default {
    name: 'HelloWorld',
    components: {
      SideBar,
      NavBar,
      VueHtml2pdf
    },
    data() {
      return {
        datarecu: this.$route.params.element,
        popupActivo2:false,
        popupActivo3:false,
        activePrompt9:false,
        select1:3,
        options1:[
          {text:'IT',value:0},
          {text:'Blade Runner',value:2},
          {text:'Thor Ragnarok',value:3},
        ],
        checkTrue: true,
        checkFalse: false,
        donnees: null,
        elementChoisi: null,
        donneesZones: null,
        donneesCamion: null,
        donneesChauf: null,
        deadline3: Date.now() + (new Date().setHours(17, 59, 59) - Date.now()),
        like: true,
          value1: '',
          value2: '',
          title: 'Growth this year',
        activeName: 'first',
        chartData: {
          labels: [ 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mais', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
          datasets: [ { data: [40, 20, 12, 33, 10, 3, 45, 41, 26, 11, 19, 26] } ]
        },
        chartOptions: {
          responsive: true
        },
        form: {
          date_recept: '',
          n_doc: '',
          n_conteneur: '',
          type_c: '',
          nbre_tcs: 1,
          n_declaration: '',
          bl: '',
          statut: '',
          armateur: '',
          client: '',
          camion: '',
          chauffeur: '',
          zone_livraison: '',
          zone_facturation: '',
          badt: '',
          do: '',
          sortie_port: '',
          sejour: '',
          date_requete: '',
          date_recup: '',
          entree_parc: '',
          transitaire: '',
          observation: ''
          },
          options: [{
            value: 'Option1',
            label: 'Option1'
          }, {
            value: 'Option2',
            label: 'Option2'
          }, {
            value: 'Option3',
            label: 'Option3'
          }, {
            value: 'Option4',
            label: 'Option4'
          }],
          type_cont: [{
            value: "20 'OPEN",
            label: "20 'OPEN"
          }, {
            value: "40 'OPEN",
            label: "40 'OPEN"
          }, {
            value: "20 'FLAT",
            label: "20 'FLAT"
          },{
            value: "40 'FLAT",
            label: "40 'FLAT"
          }, {
            value: "20 'DRY",
            label: "20 'DRY"
          }, {
            value: "40 'DRY",
            label: "40 'DRY"
          }, {
            value: "20 'FRIGO",
            label: "20 'FRIGO"
          }, {
            value: "40 'FRIGO",
            label: "40 'FRIGO"
          }],
          armateur: [{
            value: "Evergreen",
            label: "Evergreen"
          }, {
            value: "Maersk",
            label: "Maersk"
          }, {
            value: "Safmarine",
            label: "Safmarine"
          },{
            value: "Cosco",
            label: "Cosco"
          }, {
            value: "One",
            label: "One"
          }, {
            value: "PIL",
            label: "PIL"
          }, {
            value: "Oma",
            label: "Oma"
          }, {
            value: "Medlog",
            label: "Medlog"
          }],
        tableData: [{
            date: '2016-05-03',
            name: 'TRAORE Oumar',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'En cours'
          }, {
            date: '2016-05-02',
            name: 'SAKONE Oumar',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'Validé'
          }, {
            date: '2016-05-04',
            name: 'SAKONE Oumar',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'En cours'
          }, {
            date: '2016-05-01',
            name: 'SAKONE Oumar',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'Annulé'
          }, {
            date: '2016-05-08',
            name: 'SAKONE Oumar',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'Validé'
          }, {
            date: '2016-05-06',
            name: 'SAKONE Oumar',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'En cours'
          }, {
            date: '2016-05-07',
            name: 'SAKONE Oumar',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'En cours'
          }],
      }
    },
    methods: {
  
        listeDossier () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://sarezide.com/appi/albakoos_stats.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donnees = response.data.data;
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },
  
          generateReport () {
              this.$refs.html2Pdf.generatePdf()
          },
  
          exportToPDF() {
            html2pdf(document.getElementById("html-to-pdf"), {
              margin: 1,
              filename: "i-was-html.pdf",
            });
          },
  
          generatePDF () {
            var doc = new jsPDF();
            
            // Récupérer l'élément HTML que vous voulez convertir en PDF
            const element = document.getElementById('html-to-pdf')
  
            // Convertir l'élément HTML en Canvas
            html2canvas(element).then(canvas => {
              // Ajouter le Canvas au document PDF avec une résolution de 300 DPI
              const imgData = canvas.toDataURL('image/png', 2.7);
              doc.addImage(imgData, 'PNG', 10, 10);
              
              // Sauvegarder le document PDF
              doc.save('example.pdf')
            })
          },
  
         // generatePDF () {
          //  var doc = new jsPDF();
  
            // Récupérer l'élément HTML que vous voulez convertir en PDF
          //  const element = document.getElementById('html-to-pdf')
  
            // Convertir l'élément HTML en Canvas
          //  html2canvas(element).then(canvas => {
              // Ajouter le Canvas au document PDF
           //   const imgData = canvas.toDataURL('image/png')
            //  doc.addImage(imgData, 'PNG', 10, 10)
  
              // Sauvegarder le document PDF
           //   doc.save('example.pdf')
          //  })
         // },
  
        onSubmit() {
              let date = new Date();
              let day = date.getDate().toString().padStart(2, '0');
              let month = (date.getMonth() + 1).toString().padStart(2, '0');
              let h = date.getMinutes().toString().padStart(2, '0');
              let randomNum = Math.floor(Math.random() * 10000).toString().padStart(2, '0');
              let code = day + month + h + randomNum;
  
              this.form.n_doc = code;
              this.form.camion = this.form.camion[0];
              this.form.chauffeur = this.form.chauffeur[0];
              axios.post('https://sarezide.com/appi/albakoos_dossier_sbtl.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Dossier OK!',
                  message: 'Dossier Crée',
                  showClose: false
                  });
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },
  
        clickFn() {
          this.$refs.statistic.suspend(this.stop);
          this.stop = !this.stop;
        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        hilarity() {
          this.$notify({
            title: 'TRAVAIL DU JOUR TERMINE',
            message: "C'est bon pour aujourd'hui, vous pouvez entrez à la maison",
            duration: 0,
          });
        },
      },
  
      mounted() {
        this.listeDossier();
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-input__inner::placeholder {
      color: #201f1f;
  }
  
  </style>
  