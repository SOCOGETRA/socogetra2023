<template>
    <div class="hello" :key="cacheKey">
        <div class="screenUse">
          <Nav-bar style="width: 100%;"/>
          <vs-row>
            <vs-col vs-w="2.5">
              <Side-bar style="width: 100%;"/>
            </vs-col>
            <vs-col vs-w="9.5" style="overflow:scroll; height: calc(100vh - 48px);">
              <div style="position: fixed; width: calc(79% - 13px); z-index: 1000;">
                <vs-card class="navbar" style="margin-bottom: -10px; border-bottom: 3px solid #f0c1c5;">
                <div style="width: 730px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> <b>IMPORT</b> / Ordres ( dossier : N° <b>{{ donneesOrdre[0].n_dossier }}</b> )
                 
                </div>
                <span style="float: right; margin-right: 150px;">
                      <vs-button color="#C32D39"  icon="note_add" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2=true">Ajouter Ordre</vs-button>
                  </span>
                  <span style="float: right; margin-right: 350px;">
                      <vs-button color="#C32D39"  icon="print" style="padding: 5px; position: absolute; width: 150px;" @click="generateReport">Imprimer</vs-button>
                  </span>

                  <br> <br>
                  <div>
                    <el-date-picker
                        v-model="dateSearch"
                        type="daterange"
                        range-separator="à"
                        start-placeholder="Date de début"
                        end-placeholder="Date de fin">
                    </el-date-picker>
                    <el-button icon="el-icon-search" circle @click="searchDate()"></el-button>
                    </div>
                </vs-card>
              </div>
              
              <div style="padding: 10px 5px; font-family:'Karla', sans-serif; margin-top: 120px;">
                
                  
                  <el-card class="box-card" style="padding: -15px; border-radius: 2px;" >
                  <h2 style="font-weight: bold;">Liste des dossiers d'ordres </h2>
                  
                  <vs-table search maxItems="7" :pagination="true" stripe :data="donnees">
                    <template slot="header">
                      <h3>
                      </h3>
                    </template>
                    <template slot="thead">
                      <vs-th>
                        DATE
                      </vs-th>
                      <vs-th>
                        DOSSIER
                      </vs-th>
                      <vs-th>
                        DONNEUR D'ORDRE
                      </vs-th>
                      <vs-th>
                        NBR ORDRE(S)
                      </vs-th>
                      <vs-th>
                        STATUT DOSSIER
                      </vs-th>
                      <vs-th>
                        AGENT
                      </vs-th>
                      <vs-th>
                        Action
                      </vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="data[indextr].date_ben">
                          <el-link type="primary"><i class="el-icon-document"></i> {{data[indextr].date_ben}}</el-link>
                          
                        </vs-td>

                        <vs-td :data="data[indextr].date_ben">
                            <vs-chip>
                                <vs-avatar :src="getNomById(data[indextr].chauffeur)"/>
                                {{data[indextr].chauffeur}}
                            </vs-chip>
                        </vs-td>

                        <vs-td :data="data[indextr].date_ben">
                          <b>{{data[indextr].n_matricule}}</b>
                        </vs-td>

                        <vs-td :data="data[indextr].date_ben">
                          {{data[indextr].n_bl}}
                        </vs-td>

                        <vs-td :data="data[indextr].date_ben">
                          <vs-chip transparent color="primary" style="width: 100%; text-align: left;">
                            <b>{{data[indextr].client}}</b> - <span style="color: black;">{{data[indextr].produit}}</span>
                          </vs-chip>
                           
                        </vs-td>

                        <vs-td :data="data[indextr].date_ben">
                          <span style="color: brown">{{data[indextr].lieu_chargement}}</span> / <span>{{data[indextr].lieu_dechargement}}</span>
                        </vs-td>

                        <vs-td :data="data[indextr].date_ben">
                          <b>{{data[indextr].poids}}</b> T
                        </vs-td>

                        <vs-td :data="data[indextr].date_ben">
                          <el-button type="info" icon="el-icon-stopwatch" circle @click="Carburant(data[indextr])"></el-button>
                          <el-button type="primary" icon="el-icon-edit" circle   @click="modifBon((data[indextr]))"></el-button>
                          <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                 
                  {{elements}}
                  </el-card>
  
              </div>
            </vs-col>
          </vs-row>
  
          <vs-popup classContent="popup-example"  title="Ordre de transfert" :active.sync="activePrompt2">
          <div>
            <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date/Reception dossier</label>
                  <el-input   type="date" v-model="form.date_ben" placeholder="Date du bon">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                    <label>N° dossier</label>
                    <el-input v-model="form.date_ben" placeholder="Date du bon">
                    </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                    <label>N° Conteneur</label>
                    <el-input v-model="form.date_ben" placeholder="Date du bon">
                    </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Types</label>
                  <vs-select
                    style="width: 100%;"
                    placeholder="Type"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="form.chauffeur"
                    >
                    <vs-select-item :key="index" :value="item.libelle" :text="item.libelle" v-for="item,index in donneesTypes" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Camion</label>
                  <vs-select
                    style="width: 100%;"
                    placeholder="Camion"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="form.n_matricule"
                    >
                    <vs-select-item :key="index" :value="item.imatriculation" :text="item.imatriculation" v-for="item,index in donneesCamion" />
                  </vs-select>
                  <el-input v-model="form.n_matricule" placeholder="N° Matricule">
                  </el-input>
                </vs-col>
              </vs-row>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Client</label>
                <vs-select
                  style="width: 100%;"
                  placeholder="Client"
                  class="selectExample"
                  label-placeholder="Autocomplete"
                  autocomplete
                  v-model="form.client"
                  >
                  <vs-select-item :key="index" :value="item.libelle" :text="item.libelle" v-for="item,index in donneesClient" />
                </vs-select>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Produits</label>
                <vs-select
                  style="width: 100%;"
                  placeholder="Produit"
                  class="selectExample"
                  label-placeholder="Autocomplete"
                  autocomplete
                  v-model="form.produit"
                  >
                  <vs-select-item :key="index" :value="item.libelle" :text="item.libelle" v-for="item,index in donneesProduit" />
                </vs-select>
              </vs-col>
            </vs-row>
            
            <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>N° BL</label>
                <el-input v-model="form.n_bl" placeholder="N° BL">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Lieu de Chargement</label>
                <el-input v-model="form.lieu_chargement" placeholder="Lieu de Chargement">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Lieu de Déchargement</label>
                <el-input v-model="form.lieu_dechargement" placeholder="Lieu de Déchargement">
                </el-input>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Poids</label>
                <el-input-number style="width: 100%;" v-model="form.poids" :precision="2" :step="0.1" :max="1000000000"></el-input-number>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                <label>Observation</label>
                <el-input  type="textarea" v-model="form.observation" placeholder="Observation">
                </el-input>
              </vs-col>
              
              
            </vs-row>
           
          
            
            
          </div>
         
          
          <center><vs-button style="margin: 20px; width: 300px;" @click="onSubmit()" color="primary" type="filled">Enregistrer le bon</vs-button></center>
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

        <vs-popup classContent="popup-example"  title="Modification de bon" :active.sync="activePromptm">
          <div>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Client</label>
                <el-input disabled v-model="form.client" placeholder="Date du bon">
                </el-input>
                
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Produits</label>
                <el-input disabled v-model="form.produit" placeholder="Date du bon">
                </el-input>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Date du bon</label>
                <el-input   type="date" v-model="form.date_ben" placeholder="Date du bon">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Chauffeur</label>
                <vs-select
                  style="width: 100%;"
                  placeholder="Chauffeur"
                  class="selectExample"
                  label-placeholder="Autocomplete"
                  autocomplete
                  v-model="form.chauffeur"
                  >
                  <vs-select-item :key="index" :value="item.nom_prenom" :text="item.nom_prenom" v-for="item,index in donneesChauf" />
                </vs-select>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Camion</label>
                <vs-select
                  style="width: 100%;"
                  placeholder="Camion"
                  class="selectExample"
                  label-placeholder="Autocomplete"
                  autocomplete
                  v-model="form.n_matricule"
                  >
                  <vs-select-item :key="index" :value="item.imatriculation" :text="item.imatriculation" v-for="item,index in donneesCamion" />
                </vs-select>
              </vs-col>
            </vs-row>
            <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>N° BL</label>
                <el-input v-model="form.n_bl" placeholder="N° BL">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Lieu de Chargement</label>
                <el-input v-model="form.lieu_chargement" placeholder="Lieu de Chargement">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Lieu de Déchargement</label>
                <el-input v-model="form.lieu_dechargement" placeholder="Lieu de Déchargement">
                </el-input>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Poids</label>
                <el-input-number style="width: 100%;" v-model="form.poids" :precision="2" :step="0.1" :max="1000000000"></el-input-number>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                <label>Observation</label>
                <el-input disabled type="textarea" v-model="form.observation" placeholder="Observation">
                </el-input>
              </vs-col>
              
              
            </vs-row>
           
          
            
            
          </div>
         
          
          <center><vs-button style="margin: 20px; width: 300px;" @click="onUpdate()" color="primary" type="filled">Enregistrer le bon</vs-button></center>
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

        <vs-popup classContent="popup-example"  title="Nouveau bon" :active.sync="activePrompt9">
          
          <center style="width: 29cm;">
            <vs-button color="#C32D39"  icon="task" style="padding: 5px;" @click="generatePDF">Télécharger en PDF</vs-button>
            <vs-button color="#3e9b0f"  icon="task" style="padding: 5px; margin-left: 10px;" @click="activePrompt9 = true">Exporter en Excel</vs-button>
            <vs-divider/>
            <div style="width: 27cm;" id="html-to-pdf">
              <h2>Liste des bons</h2>
              <vs-divider/>
              <el-table
                    ref="multipleTable"
                    :data="donnees"
                    stripe
                    style="font-size: 12px; margin-left: 1px; font-family: Helvetica;"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                        property="name"
                        label="Date">
                        <template slot-scope="scope">
                        
                        <el-link type="primary" style="font-size:12px"><i class="el-icon-document"></i> {{ scope.row.date_ben }}</el-link>
                        
                        </template>
                    </el-table-column>
                    <el-table-column
                      label="Chauffeur">
                      <template slot-scope="scope">
                          {{ scope.row.chauffeur }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="N° Matricule">
                      <template slot-scope="scope">
                          {{ scope.row.n_matricule }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="N° BL">
                      <template slot-scope="scope">
                          {{ scope.row.n_bl }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Chargement">
                      <template slot-scope="scope">
                          {{ scope.row.lieu_chargement }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Dechargement">
                      <template slot-scope="scope">
                          {{ scope.row.lieu_dechargement }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Poids">
                      <template slot-scope="scope">
                        
                          {{ scope.row.poids }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Observation">
                      <template slot-scope="scope">
                          {{ scope.row.observation }}
                      </template>
                    </el-table-column>
                  </el-table>
            </div>
                  
          </center>
                
         
        </vs-popup>

        <vs-prompt
                title="Associer du carburant"
                color="danger"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="onSubmitCarburant"
                accept-text="Ajouter"
                cancel-text="Annuler"
                @close="close"
                :active.sync="activePrompt3">
                <div class="con-exemple-prompt">
                  <div style="padding: 10px 0px;">

                    <label>Quantité litre</label>
                    <el-input style="width: 100%;" v-model="form2.litre" placeholder="litre">
                    </el-input>

                    <label>Prix/litre</label>
                    <el-input style="width: 100%;" v-model="form2.prix" placeholder="Prix">
                    </el-input>


                  </div>
                </div>
                </vs-prompt>
        </div>

        <vue-html2pdf
              :show-layout="false"
              :float-layout="true"
              :enable-download="true"
              :preview-modal="true"
              :paginate-elements-by-height="1400"
              filename="hee hee"
              :pdf-quality="2"
              :manual-pagination="false"
              pdf-format="a4"
              pdf-orientation="landscape"
              pdf-content-width="800px"

              @progress="onProgress($event)"
              @hasStartedGeneration="hasStartedGeneration()"
              @hasGenerated="hasGenerated($event)"
              ref="html2Pdf"
          >
              <section slot="pdf-content">
                <div>
                  <div style="width: 28cm;  margin-left: .5cm; margin-top: 20px;" id="html-to-pdf">
                    <div style="width: 100%; padding: 10px">
                      <div style="float: left; display: block;">
                        <img src="../assets/sogecit.png" width="185">
                      </div>
                      <div style="float: left; padding: 12px;">
                        <span style="font-weight: bold; font-size: 19px; font-family: 'Nunito Sans', sans-serif;">LISTE DES BONS - <span><b>a </b></span><span style="color: red; font-size: 18px">( total poids - <b>{{ totalPoids }} KG</b> )</span></span>
                      </div>
                    </div>
                  .
                    <h2></h2>
                    <vs-divider/>
                    <el-table
                          ref="multipleTable"
                          :data="donnees"
                          stripe
                          style="font-size: 12px; margin-left: 1px; font-family: Helvetica;"
                          @selection-change="handleSelectionChange">
                          <el-table-column
                            type="selection"
                            width="55">
                            <img style="margin-top: 5px;" src="../assets/camionbenne.png" width="20">
                          </el-table-column>
                          <el-table-column
                              property="name"
                              label="Date">
                              <template slot-scope="scope">
                              
                              <el-link type="primary" style="font-size:12px"><i class="el-icon-document"></i> {{ scope.row.date_ben }}</el-link>
                              
                              </template>
                          </el-table-column>
                          <el-table-column
                            label="Chauffeur">
                            <template slot-scope="scope">
                                {{ scope.row.chauffeur }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="N° Matricule">
                            <template slot-scope="scope">
                                {{ scope.row.n_matricule }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="N° BL">
                            <template slot-scope="scope">
                                {{ scope.row.n_bl }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="Chargement">
                            <template slot-scope="scope">
                                {{ scope.row.lieu_chargement }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="Dechargement">
                            <template slot-scope="scope">
                                {{ scope.row.lieu_dechargement }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="Poids">
                            <template slot-scope="scope">
                              
                                {{ scope.row.poids }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="Observation">
                            <template slot-scope="scope">
                                {{ scope.row.observation }}
                            </template>
                          </el-table-column>
                        </el-table>
                  </div>
                </div>
                  
              </section>
          </vue-html2pdf>
       
    </div>
  </template>
  
  <script>
  import VueHtml2pdf from 'vue-html2pdf';
  import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';
  import axios from 'axios';
  import SideBar from '@/components/Sidebar.vue';
  import NavBar from '@/components/Navbar.vue';
  export default {
    name: 'HelloWorld',
    components: {
      SideBar,
      NavBar,
      VueHtml2pdf
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        searchValue: '',
        element: null,
        donneesChauf: null,
        donneesCamion: null,
        activePrompt2:false,
        activePromptm:false,
        activePrompt9:false,
        activePrompt3:false,
        popupActivo3:false,
        select1:3,
        options1:[
          {text:'IT',value:0},
          {text:'Blade Runner',value:2},
          {text:'Thor Ragnarok',value:3},
        ],
        form2: {
          litre: '',
          prix: '',
          camion: '',
          chauffeur: '',
          },
        donneesC: [],
        donneesClient: null,
        donneesProduit: null,
        donneesOrdre: null,
        donneesTypes: null,
        donnees: null,
        donneesR: null,
        donneesChauffeur: null,
        totalPoids: 0,
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
        dateSearch: [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10)
          ],
        form: {
            date_ordre: '',
            dossier: '1',
            chauffeur: '',
            n_matricule: '',
            id_ben: '',
            n_bl: '',
            lieu_chargement: '',
            lieu_dechargement: '',
            poids: '',
            observation: '',
            par: 1,
            client: '',
            produit: '',
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
          }, {
            value: 'Option5',
            label: 'Option5'
          }, {
            value: 'Option2',
            label: 'Option2'
          }, {
            value: 'Option3',
            label: 'Option3'
          }, {
            value: 'Option4',
            label: 'Option4'
          }, {
            value: 'Option5',
            label: 'Option5'
          }],
        tableData: [{
            date: '2016-05-03',
            name: 'SAKONE Oumar',
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
        modifBon(list) {
          this.donneesC = list;
          this.activePromptm = true;
          this.form = {
            dossier: '1',
            date_ben: this.donneesC.date_ben,
            id_ben: this.donneesC.id_ben,
            chauffeur: this.donneesC.chauffeur,
            n_matricule:this. donneesC.n_matricule,
            n_bl: this.donneesC.n_bl,
            lieu_chargement: this.donneesC.lieu_chargement,
            lieu_dechargement: this.donneesC.lieu_dechargement,
            poids: this.donneesC.poids,
            observation: this.donneesC.observation,
            par: 1,
            client: this.donneesC.client,
            produit: this.donneesC.produit,
          }
        },
        ordre () {
            this.$vs.loading({
            type:'point',
            })
            fetch('https://socogetra.net/appi_socogetra/soco_dossier_ordres_id.php?ordre='+this.dossier+'&timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(data => {
              this.donneesOrdre = data.data;
              this.$vs.loading.close();
            })
            .catch(error => {
              console.log(error);
              this.$vs.loading.close();
            });
        },
        typeCamion () {
            this.$vs.loading({
            type:'point',
            })
            fetch('https://socogetra.net/appi_socogetra/soco_type_camion.php?ordre='+this.dossier+'&timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(data => {
              this.donneesTypes = data.data;
              this.$vs.loading.close();
            })
            .catch(error => {
              console.log(error);
              this.$vs.loading.close();
            });
        },
        listeChauffeurs () {
              this.$vs.loading({
              type:'point',
              })
              axios.get('https://socogetra.net/appi_socogetra/soco_chauffeurs.php?timestamp=' + new Date().getTime())
              .then((response) => {
                this.donneesChauf = response.data.data;
                this.$vs.loading.close()
              }, (error) => {
                console.log(error);
                this.$vs.loading.close()
              });
          },
          listeCamion () {
              this.$vs.loading({
              type:'point',
              })
              axios.get('https://socogetra.net/appi_socogetra/soco_camion.php?timestamp=' + new Date().getTime())
              .then((response) => {
                this.donneesCamion = response.data.data;
                this.$vs.loading.close()
              }, (error) => {
                console.log(error);
                this.$vs.loading.close()
              });
          },

          onPageChange(currentPage) {
            this.currentPage = currentPage
          },
        separateThousands(number) {
            let val = parseInt(number)
            return val.toLocaleString('fr-FR');
        },
        listeZones () {
            console.log(this.element)
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_socogetra/albakoos_benne.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donnees = response.data.data;
              this.donneesChauffeur = response.data.chauf;
              this.totalPoids = 0;
              for (let i = 0; i < this.donnees.length; i++) {
              this.totalPoids += parseFloat(this.donnees[i].poids);
              }
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        searchDate () {
            console.log(this.element)
            this.$vs.loading({
            type:'point',
            })
            const year = this.dateSearch[0].getFullYear();
            const month = String(this.dateSearch[0].getMonth() + 1).padStart(2, '0');
            const day = String(this.dateSearch[0].getDate()).padStart(2, '0');

            const year2 = this.dateSearch[1].getFullYear();
            const month2 = String(this.dateSearch[1].getMonth() + 1).padStart(2, '0');
            const day2 = String(this.dateSearch[1].getDate()).padStart(2, '0');

            let dte_db = `${year}-${month}-${day}`;
            let dte_fn = `${year2}-${month2}-${day2}`;
            axios.get('https://socogetra.net/appi_socogetra/albakoos_benne_date.php?date_db=' + dte_db + '&date_fn=' + dte_fn + '&timestamp=' + new Date().getTime())
            .then((response) => {
              this.donnees = response.data.data;
              this.donneesChauffeur = response.data.chauf;
              this.totalPoids = 0;
              for (let i = 0; i < this.donnees.length; i++) {
              this.totalPoids += parseFloat(this.donnees[i].poids);
              }
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        getNomById: function(id) {
          // filtrer le tableau pour trouver l'objet avec l'id correspondant
          const obj = this.donneesChauffeur.filter(item => item.nom_prenom === id)[0];
          // si l'objet est trouvé, retourner le nom
          if (obj) {
            return obj.email;
          } else {
            return "https://images.freeimages.com/fic/images/icons/61/dragon_soft/512/user.png"; // retourner une chaîne de caractères par défaut si l'id n'est pas trouvé
          }
        },

        listeClient () {
            
            axios.get('https://socogetra.net/appi_socogetra/albakoos_clients.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesClient = response.data.data;
              this.$vs.loading.close()
              this.filtreUser();
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        listeProduit () {
            
            axios.get('https://socogetra.net/appi_socogetra/albakoos_produits_clients.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesProduit = response.data.datas;
              this.$vs.loading.close()
              this.filtreUser();
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },

        Carburant(list) {
          
          this.donneesC = list;
          this.form2.chauffeur = this.donneesC.chauffeur;
          this.form2.camion = this.donneesC.n_matricule;
          this.activePrompt3 = true;
        },

        onSubmitCarburant() {
              axios.post('https://socogetra.net/appi_socogetra/albakoos_carburant.php', this.form2)
              .then((response) => {
                  console.log(response);
                  this.listeZones();
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
  
        onSubmit() {
          console.log(this.form);
              axios.post('https://socogetra.net/appi_socogetra/albakoos_benne.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.listeZones();
                  this.activePrompt2 = false;
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

          onUpdate() {
          console.log(this.form);
              axios.put('https://socogetra.net/appi_socogetra/albakoos_benne.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.listeZones();
                  this.popupActivo3 = false;
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

        refreshData(a) {
          this.$destroy();
          this.element = a;
            console.log(this.element)
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_socogetra/albakoos_benne.php?id='+a+'?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesR = response.data.data;
              this.donnees = null;
              this.donnees = this.donneesR;
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        filterTableData(tableData) {
          this.donnees.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
          return tableData.filter(row => {
            return Object.values(row).some(value =>
              String(value).toLowerCase().includes(this.searchValue.toLowerCase())
            )
          })
        },

        generatePDF () {
          var doc = new jsPDF({
            orientation: "landscape"
          });

          // Récupérer l'élément HTML que vous voulez convertir en PDF
          const element = document.getElementById('html-to-pdf')

          // Convertir l'élément HTML en Canvas
          html2canvas(element).then(canvas => {
            // Ajouter le Canvas au document PDF
            const imgData = canvas.toDataURL('image/png')
            doc.addImage(imgData, 'PNG', 10, 10)

            // Sauvegarder le document PDF
            doc.save('example.pdf')
          })
        }
      },

      computed: {
        cacheKey() {
          return `my-component-${this.resourceId}`
        },
        dossier() {
      return this.$store.state.dossier;
        },
      },
  
      mounted() {
        this.listeZones();
        this.ordre();
        this.listeCamion();
        this.listeChauffeurs();
        this.listeClient();
        this.listeProduit();
        this.typeCamion();
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-input__inner::placeholder {
    color: #201f1f;
}
  </style>
  