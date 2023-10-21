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
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> R.Humaines /</span> Paiements de Salaire
                 
                </div>
                <span style="float: right; margin-right: 150px;">
                      <vs-button color="#C32D39"  icon="note_add" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2=true">Ajouter employé</vs-button>
                  </span>
                  <span style="float: right; margin-right: 350px;">
                      <vs-button color="#C32D39"  icon="print" style="padding: 5px; position: absolute; width: 150px;" @click="generateReport">Imprimer</vs-button>
                  </span>
                </vs-card>
              </div>
              
              <div style="padding: 10px 5px; font-family:'Karla', sans-serif; margin-top: 80px;">
                
                  
                  <el-card class="box-card" style="padding: -15px; border-radius: 2px;" >
                  <h2 style="font-weight: bold;">Paiement/Mois </h2>
                  
                  <vs-table search maxItems="7" :pagination="true" stripe :data="donneesPaiement">
                    <template slot="header">
                      <h3>
                      </h3>
                    </template>
                    <template slot="thead">
                      <vs-th>
                        Date
                      </vs-th>
                      <vs-th>
                        Année
                      </vs-th>
                      <vs-th>
                        Mois
                      </vs-th>
                      <vs-th>
                        NB Employés
                      </vs-th>
                      <vs-th>
                        Total paiement
                      </vs-th>
                      <vs-th>
                        Statut
                      </vs-th>
                      <vs-th>
                        Action
                      </vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="data[indextr].date_paiement">
                          <el-link type="primary"><i class="el-icon-document"></i> {{data[indextr].date_paiement}}</el-link>
                          
                        </vs-td>

                        <vs-td :data="data[indextr].annee">
                          <b>{{data[indextr].annee}}</b>
                        </vs-td>

                        <vs-td :data="data[indextr].mois">
                          <b>{{data[indextr].mois}}</b>
                        </vs-td>

                        <vs-td :data="data[indextr].nb_employe">
                          {{data[indextr].nb_employe}}
                        </vs-td>

                        <vs-td :data="data[indextr].total_paiement">
                          <vs-chip transparent color="primary" style="width: 100%; text-align: left;">
                            <b>{{data[indextr].total_paiement}}</b>
                          </vs-chip>
                           
                        </vs-td>

                        <vs-td :data="data[indextr].email">
                          5
                        </vs-td>


                        <vs-td :data="data[indextr].email">
                          <el-button type="info" icon="el-icon-stopwatch" @click="allerVersComponent2(data[indextr].mois, data[indextr].annee)" circle></el-button>
                          <el-button type="primary" icon="el-icon-edit" circle @click="modifBon((data[indextr]))"></el-button>
                          <el-button type="danger" icon="el-icon-delete" circle ></el-button>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                 
                  {{elements}}
                  </el-card>
  
              </div>
            </vs-col>
          </vs-row>
  
          <vs-popup classContent="popup-example"  title="Nouveau Paiement/mois" :active.sync="activePrompt2">
          <div>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Annee</label>
                <el-input v-model="anneeEnCours" placeholder="Nom">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Mois</label>
                <el-input v-model="moisEnCours" placeholder="Prenom">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>NB Employes</label>
                <el-input v-model="donneesEmployes.length" placeholder="Prenom">
                </el-input>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Date Paiement</label>
                <el-input type="date" v-model="dateDuJour" placeholder="Date de naissance">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Total Paiement</label>
                <el-input v-model="somme" placeholder="Lieu de naissance">
                </el-input>
              </vs-col>
              
            </vs-row>
          </div>
         
          
          <center><vs-button style="margin: 20px; width: 300px;" @click="onSubmit()" color="primary" type="filled">Enregistrer l'employé</vs-button></center>
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
            color="danger"
            @cancel="valMultipe.value1='',valMultipe.value2=''"
            @accept="acceptAlert"
            @close="close"
            :is-valid="validName"
            :active.sync="activePromptAffiche">
            <div class="con-exemple-prompt">
                <center><vs-avatar  size="110px" src="https://images.freeimages.com/fic/images/icons/573/must_have/256/user.png"/></center>
                <vs-divider/>
                <h2 style="text-align: center">{{ agent.titre }}</h2>
                <p style="font-size: 20px; text-align: center;">{{ agent.nom }} {{ agent.prenom }} </p>
                <center><span style="font-size: 13px; color: blue">{{ agent.nationalite }} ( {{ agent.genre }} )</span></center>
                <vs-divider/>
                <el-input placeholder="Entrez quelque chose" disable :value="agent.date_naiss+' / '+agent.lieu_naiss">
                    <template slot="prepend">Date et Lieu Nais</template>
                </el-input>
                <el-input placeholder="Entrez quelque chose" disable :value="agent.email">
                    <template slot="prepend">Email</template>
                </el-input>
                <el-input placeholder="Entrez quelque chose" disable :value="agent.contact1+' / '+agent.contact2">
                    <template slot="prepend">Contacts</template>
                </el-input>
                <el-input placeholder="Entrez quelque chose" disable :value="agent.num_cnps">
                    <template slot="prepend">Numéro CNPS</template>
                </el-input>
                <el-input placeholder="Entrez quelque chose" disable :value="agent.adresse">
                    <template slot="prepend">Adresse</template>
                </el-input>
                <el-input v-if="afficheSalaire" placeholder="Entrez quelque chose" disable :value="agent.salaire+' CFA / '+agent.prime1+' CFA'">
                    <template slot="prepend">Salaire</template>
                </el-input>
                <el-input v-else type="password" placeholder="Entrez quelque chose" disable :value="agent.salaire+' & '+agent.prime1" :show-password="false">
                    <template slot="prepend">Salaire <span @click="afficheSalaire = true" style="color:orange; cursor: pointer; text-decoration: underline">Voir</span></template>
                </el-input>
                <el-input placeholder="Entrez quelque chose" disable :value="agent.niveau_etude+' / '+agent.domaine_etude">
                    <template slot="prepend">Diplôme</template>
                </el-input>
                <vs-alert color="danger" icon="new_releases" >
                En cas d'urgence <b>( {{ agent.prime2 }} )</b>
                </vs-alert>
            </div>
        </vs-prompt>




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
  import moment from 'moment'
  import 'moment/locale/fr'
  import VueHtml2pdf from 'vue-html2pdf'
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas';
  import axios from 'axios';
  import SideBar from '@/components/Sidebarrh.vue'
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
        genres:[
          {text:'Homme',value:0},
          {text:'Femme',value:1},
        ],
        typeEmploi:[
          {text:'Agent',value:0},
          {text:'Chauffeur',value:1},
        ],
        agent: {
            nom: '',
            prenom: '',
            genre: '',
            date_naiss: '',
            lieu_naiss: '',
            adresse: '',
            email: '',
            contact1: '',
            contact2: '',
            date_embauche: '',
            departement: '',
            titre: '',
            num_cnps: '',
            salaire: '',
            prime1: '',
            prime2: '',
            nationalite: '',
            niveau_etude: '',
            domaine_etude: '',
            type_emploie: '',
        },
        donneesEmployes: null,
        afficheSalaire: false,
        moisEnCours: '',
        anneeEnCours: '',
        dateDuJour: new Date().toISOString().substr(0, 10),
        somme: 0,


        currentPage: 1,
        pageSize: 10,
        searchValue: '',
        element: null,
        donneesChauf: null,
        donneesCamion: null,
        activePrompt2:false,
        activePromptAffiche:false,
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
            dossier: '1',
            date_ben: new Date().toISOString().substr(0, 10),
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
          allerVersComponent2(moiss, annees) {
            this.$router.push({ name: 'RH_Salaire', params: { mois: moiss, annee: annees }})
          },

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

        Affiche(list) {
            this.agent= {
            nom: list.nom,
            prenom: list.prenom,
            genre: list.genre,
            date_naiss: list.date_naiss,
            lieu_naiss: list.lieu_naiss,
            adresse: list.adresse,
            email: list.email,
            contact1: list.contact1,
            contact2: list.contact2,
            date_embauche: list.date_embauche,
            departement: list.departement,
            titre: list.titre,
            num_cnps: list.num_cnps,
            salaire: list.salaire,
            prime1: list.prime1,
            prime2: list.prime2,
            nationalite: list.nationalite,
            niveau_etude: list.niveau_etude,
            domaine_etude: list.domaine_etude,
            type_emploie: list.type_emploie,
        },
          this.activePromptAffiche = true
        },
        listeEmployes () {
              this.$vs.loading({
              type:'point',
              })
              axios.get('https://socogetra.net/appi_socogetra/soco_employes.php?timestamp=' + new Date().getTime())
              .then((response) => {
                this.donneesEmployes = response.data.data;
                    this.donneesEmployes.forEach((item) => {
                    this.somme = this.somme + parseInt(item.salaire) + parseInt(item.prime1);
                    })
                this.$vs.loading.close()
              }, (error) => {
                console.log(error);
                this.$vs.loading.close()
              });
          },

          listePaiement () {
              this.$vs.loading({
              type:'point',
              })
              axios.get('https://socogetra.net/appi_socogetra/soco_paiement.php?timestamp=' + new Date().getTime())
              .then((response) => {
                this.donneesPaiement = response.data.data;
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

        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },
  
        onSubmit() {
           this.agent= {
            annee: this.anneeEnCours,
            mois: this.moisEnCours,
            nb_employe: this.donneesEmployes.length,
            date_paiement: this.dateDuJour,
            total_paiement: this.somme,
            par: 1
            };
              axios.post('https://socogetra.net/appi_socogetra/soco_paiement.php', this.agent)
              .then((response) => {
                  console.log(response);
                  this.listeZones();
                  this.activePrompt2 = false;
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Paiement Mois Créer !',
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
              axios.put('https://sarezide.com/appi/albakoos_benne.php', this.form)
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
            axios.get('https://sarezide.com/appi/albakoos_benne.php?id='+a+'?timestamp=' + new Date().getTime())
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
        }
      },

      created() {
        moment.locale('fr')
        this.moisEnCours = moment().subtract(1, 'months').format('MMMM').toUpperCase()
        this.anneeEnCours = moment().format('YYYY')
    },
  
      mounted() {
        this.listeEmployes();
        this.listePaiement();
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-input__inner::placeholder {
    color: #201f1f;
}
  </style>
  