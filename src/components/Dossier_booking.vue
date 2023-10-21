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
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> <b>EXPORT</b> / Dossier Booking
                 
                </div>
                <span style="float: right; margin-right: 150px;">
                      <vs-button color="#C32D39"  icon="note_add" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2=true">Créer booking</vs-button>
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
                  <h2 style="font-weight: bold;">Liste Booking <el-link type="success" @click="ExportExcel('xls')"><img src="../assets/excel.png" width="14"> Excel</el-link></h2>
                  
                  <table border="1" ref="exportable_table" v-show="false">
                    <tbody >
                    <tr>
                        <th>DATE</th>
                        <th>BOOKING</th>
                        <th>ARMATEUR</th>
                        <th>NBR ORDRE</th>
                        <th>N BL</th>
                        <th>AGENT</th>
                    </tr>
                    <tr v-for="(item, i) in donnees" :key="i">
                        <td>{{item.date_doc}}</td>
                        <td>{{item.n_dossier}}</td>
                        <td>{{item.donneur_ordre}}</td>
                        <td>12</td>
                        <td>{{item.n_bl}}</td>
                        <td>{{item.agent}}</td>
                    </tr>
                    </tbody>
                </table>

                  <vs-table search maxItems="7" :pagination="true" stripe :data="donnees">
                    <template slot="header">
                      <h3>
                      </h3>
                    </template>
                    <template slot="thead">
                      <vs-th>
                        ACTION
                      </vs-th>
                      <vs-th>
                        BOOKING
                      </vs-th>
                      <vs-th>
                        DATE
                      </vs-th>
                      <vs-th>
                        ARMATEUR
                      </vs-th>
                      <vs-th>
                        NBR ORDRE(S)
                      </vs-th>
                      <vs-th>
                        N° BL
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
                        <vs-td :data="data[indextr].date_doc">
                          <vs-chip>
                            
                            <vs-button @click="donneurOrdres(data[indextr])" color="primary" type="flat">POSIT</vs-button> / <vs-button @click="donneurOrdres(data[indextr])" color="success" type="flat">RELEVAGE</vs-button>
                          </vs-chip>
                      </vs-td>

                        <vs-td :data="data[indextr].date_doc">
                            <vs-chip>
                              <i class="el-icon-document"></i> - <b style="font-size: 16px"> {{data[indextr].n_dossier}}</b>
                            </vs-chip>
                        </vs-td>

                        <vs-td :data="data[indextr].date_doc">
                           {{data[indextr].date_doc}}
                          
                        </vs-td>

                        <vs-td :data="data[indextr].date_doc">
                          <b>{{data[indextr].donneur_ordre}}</b>
                        </vs-td>

                        <vs-td :data="data[indextr].date_doc">
                          12
                        </vs-td>

                        <vs-td :data="data[indextr].date_doc">
                          <span style="width: 100%; text-align: left; color: brown">
                            {{data[indextr].n_bl}}
                          </span>
                           
                        </vs-td>

                        <vs-td :data="data[indextr].date_doc">
                          <span style="color: brown">{{data[indextr].agent}}</span>
                        </vs-td>

                        <vs-td :data="data[indextr].date_doc">
                          <el-button type="info" icon="el-icon-stopwatch" circle @click="Carburant(data[indextr])"></el-button>
                          <el-button type="primary" icon="el-icon-edit" circle  @click="modifBon((data[indextr]))"></el-button>
                          <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                  </el-card>
  
              </div>
            </vs-col>
          </vs-row>
  
          <vs-popup classContent="popup-example"  title="Nouveau Booking" :active.sync="activePrompt2">
          <div>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Date Création</label>
                <el-input   type="date" v-model="form.date_doc" placeholder="Date dossier">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Armateur</label>
                <vs-select
                  style="width: 100%;"
                  placeholder="Client"
                  class="selectExample"
                  label-placeholder="Autocomplete"
                  autocomplete
                  v-model="form.donneur_ordre"
                  >
                  <vs-select-item :key="index" :value="item.libelle" :text="item.libelle" v-for="item,index in donneesDonneurs" />
                </vs-select>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>N° Booking</label>
                <el-input v-model="form.n_dossier" placeholder="Booking">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Navire</label>
                <el-input v-model="form.n_bl" placeholder="Libelle">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Nbr TCS</label>
                <el-input v-model="form.n_tcs" placeholder="Libelle">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
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

        <vs-popup classContent="popup-example"  title="Modification de bon" :active.sync="activePromptm">
          <div>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Date Création</label>
                <el-input   type="date" v-model="form.date_doc" placeholder="Date dossier">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Armateur</label>
                <vs-select
                  style="width: 100%;"
                  placeholder="Client"
                  class="selectExample"
                  label-placeholder="Autocomplete"
                  autocomplete
                  v-model="form.donneur_ordre"
                  >
                  <vs-select-item :key="index" :value="item.libelle" :text="item.libelle" v-for="item,index in donneesDonneurs" />
                </vs-select>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>N° Booking</label>
                <el-input v-model="form.n_dossier" placeholder="Booking" disabled>
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Navire</label>
                <el-input v-model="form.n_bl" placeholder="Libelle">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Nbr TCS</label>
                <el-input v-model="form.n_tcs" placeholder="Libelle">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
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

        <vs-popup classContent="popup-example"  title="Nouveau Dossier" :active.sync="activePrompt9">
          
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
  import VueHtml2pdf from 'vue-html2pdf'
  import jsPDF from 'jspdf'
  import * as XLSX from "xlsx";
  import html2canvas from 'html2canvas';
  import axios from 'axios';
  import SideBar from '@/components/Sidebar.vue'
  import NavBar from '@/components/Navbar.vue'
  export default {
    name: 'HelloWorld',
    computed: {
    users() {
      return this.$store.state.users;
        }
      },
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
        donneesDonneurs: null,
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
          date_doc: '',
          donneur_ordre: '',
          agent: '',
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
            date_doc: new Date().toISOString().substr(0, 10),
            donneur_ordre: '',
            agent: '',
            n_dossier: '1',
            n_bl: '',
            n_tcs: '',
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
        numeroDoc() {
          const date = new Date();
          const year = date.getFullYear().toString().slice(-2);
          const month = date.getMonth() + 1; // Ajouter 1 car les mois commencent à 0
          const day = date.getDate();
          const hour = date.getHours();
          const minute = date.getMinutes();
          const second = date.getSeconds();

          // Générer un nombre aléatoire entre 10 et 99
          const randomNumber = Math.floor(Math.random() * (9 - 1 + 1) + 10);

          // Combinez les informations de date et le nombre aléatoire pour créer le code unique
          const uniqueCode = `${year}${month}${day}${hour}${minute}${second}${randomNumber}`;

          // Afficher le code unique dans la console pour vérification
          this.form.n_dossier = uniqueCode;
        },
        donneurOrdres(a) {
          this.$store.commit('Booking', a);
          this.$router.push({ path: '/administration/fichier' });
        },
        modifBon(list) {
          this.donneesC = list;
          this.activePromptm = true;
          this.form = {
            n_dossier: this.donneesC.n_dossier,
            n_bl: this.donneesC.n_bl,
            n_tcs: this.donneesC.n_tcs,
            donneur_ordre: this.donneesC.donneur_ordre,
            date_doc: this.donneesC.date_doc,
          }
        },
        ExportExcel(type, fn, dl) {
          var elt = this.$refs.exportable_table;
          var wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
          return dl ?
            XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
          XLSX.writeFile(wb, fn || ((this.name + '.'|| 'SheetJSTableExport.') + (type || 'xlsx')));
        },
        listeChauffeurs () {
              this.$vs.loading({
              type:'point',
              })
              axios.get('https://sarezide.com/appi/albakoos_chauffeurs.php?timestamp=' + new Date().getTime())
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
              axios.get('https://sarezide.com/appi/albakoos_camion.php?timestamp=' + new Date().getTime())
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
        listeOrdres () {
            this.$vs.loading({
            type:'point',
            })
            fetch('https://socogetra.net/appi_socogetra/soco_booking.php?timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(data => {
              this.donnees = data.data;
              this.$vs.loading.close();
            })
            .catch(error => {
              console.log(error);
              this.$vs.loading.close();
            });
        },
        listeDonneurs () {
            console.log(this.element)
            this.$vs.loading({
            type:'point',
            })
            fetch('https://socogetra.net/appi_socogetra/soco_donneur_ordres.php?timestamp=' + new Date().getTime())
            .then(response => response.json())
            .then(data => {
              this.donneesDonneurs = data.data;
              this.$vs.loading.close();
            })
            .catch(error => {
              console.log(error);
              this.$vs.loading.close();
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
            axios.get('https://sarezide.com/appi/albakoos_benne_date.php?date_db=' + dte_db + '&date_fn=' + dte_fn + '&timestamp=' + new Date().getTime())
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
            
            axios.get('https://sarezide.com/appi/albakoos_clients.php?timestamp=' + new Date().getTime())
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
            
            axios.get('https://sarezide.com/appi/albakoos_produits_clients.php?timestamp=' + new Date().getTime())
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
              axios.post('https://sarezide.com/appi/albakoos_carburant.php', this.form2)
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
              this.form.agent = this.users.id;
              axios.post('https://socogetra.net/appi_socogetra/soco_booking.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.listeOrdres();
                  this.activePrompt2 = false;
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Dossier Créer !',
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
  
      mounted() {
        this.listeOrdres();
        this.listeDonneurs();
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-input__inner::placeholder {
    color: #201f1f;
}
  </style>
  