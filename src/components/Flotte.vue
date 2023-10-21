<template>
    <div class="hello">
        <div class="screenUse">
          <Nav-bar style="width: 100%;"/>
          <vs-row>
            <vs-col vs-w="12" style="overflow:scroll; height: calc(100vh - 48px);">
              <div style="position: fixed; width: 100%; z-index: 1000;">
                <vs-card class="navbar" style="margin-bottom: -10px; border-bottom: 3px solid #f0c1c5;">
                <div style="width: 500px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> Flotte personnel
                </div>
                <span style="float: right; margin-right: 180px;">
                      <vs-button color="#C32D39"  icon="add_location" style="padding: 5px; position: absolute; width: 180px;" @click="activePrompt3=true">Nouveau Contact</vs-button>
                  </span>
                 
                </vs-card>
              </div>
              
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;">
                <el-card class="box-card" style="padding: -15px; border-radius: 20px;">
                    <h2 style="font-weight: bold;">RESEAU FLOTTE</h2>
                    <el-table
                        ref="multipleTable"
                        :data="donneesChauf.filter(data => !search || data.nom_prenom.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%; font-family: Helvetica;"
                        >
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        
                        <el-table-column
                        label="Nom & Prenom">
                        <template slot-scope="scope">
                          <vs-chip>
                              <vs-avatar :src="scope.row.email"/>
                              {{ scope.row.nom_prenom }}
                          </vs-chip>
                            
                        </template>
                        </el-table-column>
                        <el-table-column
                        property="name"
                        label="Titre">
                        <template slot-scope="scope">
                            <el-tag
                            effect="dark"
                            type="primary">
                            {{ scope.row.date_nais }}
                            </el-tag>
                        </template>
                        </el-table-column>
                        <el-table-column
                        property="Contact"
                        label="Contact">
                        <template slot-scope="scope">
                            <el-tag
                            effect="success"
                            type="primary">
                            {{ scope.row.lieu_nais }}
                            </el-tag>
                        </template>
                        </el-table-column>
                       
                        
                    </el-table>
                </el-card>
                
                
                  
  
              </div>
            </vs-col>
          </vs-row>
  
          <vs-prompt
                title="Nouveau Camion"
                color="danger"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="onSubmit"
                accept-text="Ajouter"
                cancel-text="Annuler"
                @close="close"
                :active.sync="activePrompt2">
                <div class="con-exemple-prompt">
                  <div style="padding: 10px 0px;">

                    <label>Immatriculation</label>
                    <el-input style="width: 100%;" v-model="form2.imatriculation" placeholder="Immatriculation">
                    </el-input>

                    <label>Marque</label>
                    <el-input style="width: 100%;" v-model="form2.marque" placeholder="Marque">
                    </el-input>

                    <label>Informations supplémentaires</label>
                    <el-input style="width: 100%;" v-model="form2.details" placeholder="Informations supplémentaires">
                    </el-input>

                  </div>
                </div>
                </vs-prompt>
                <vs-prompt
                title="Nouveau Contact"
                color="danger"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="onSubmitChauffeur"
                accept-text="Ajouter"
                cancel-text="Annuler"
                @close="close"
                :active.sync="activePrompt3">
                <div class="con-exemple-prompt">
                  <div style="padding: 10px 0px;">

                    <label>Nom & Prenom</label>
                    <el-input style="width: 100%;" v-model="form.nom_prenom" placeholder="Nom & Prenom">
                    </el-input>

                    <vs-row>
                      <vs-col vs-w="6" style="padding-right: 2px;">
                        <label>Titre</label>
                        <el-input style="width: 100%;" v-model="form.date_nais" placeholder="Titre">
                        </el-input>
                      </vs-col>
                      <vs-col vs-w="6" style="padding-left: 2px;">
                        <label>Contact</label>
                        <el-input style="width: 100%;" v-model="form.lieu_nais" placeholder="Contact">
                        </el-input>
                      </vs-col>
                    </vs-row>

                    <vs-divider/>
                    
                  </div>
                </div>
                </vs-prompt>
                <vs-prompt
                title="Modifier Chauffeur"
                color="danger"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="onUpdateChauffeur"
                accept-text="Ajouter"
                cancel-text="Annuler"
                @close="close"
                :active.sync="activePrompt4">
                <div class="con-exemple-prompt">
                  <div style="padding: 10px 0px;">

                    <label>Nom & Prenom</label>
                    <el-input style="width: 100%;" v-model="form.nom_prenom" placeholder="Nom & Prenom">
                    </el-input>

                    <vs-row>
                      <vs-col vs-w="6" style="padding-right: 2px;">
                        <label>Date de Naissance</label>
                        <el-input style="width: 100%;" type="date" v-model="form.date_nais" placeholder=">Date de Naissance">
                        </el-input>
                      </vs-col>
                      <vs-col vs-w="6" style="padding-left: 2px;">
                        <label>Lieu de Naissance</label>
                        <el-input style="width: 100%;" v-model="form.lieu_nais" placeholder="Lieu de Naissance">
                        </el-input>
                      </vs-col>
                    </vs-row>

                    <vs-row>
                      <vs-col vs-w="6" style="padding-right: 2px;">
                        <label>Permis</label>
                        <el-input style="width: 100%;" v-model="form.permis" placeholder="Permis">
                        </el-input>
                      </vs-col>
                      <vs-col vs-w="6" style="padding-left: 2px;">
                        <label>Contact</label>
                        <el-input style="width: 100%;" v-model="form.contact" placeholder="Contact">
                        </el-input>
                      </vs-col>
                    </vs-row>

                    <vs-row>
                      <vs-col vs-w="8" style="padding-right: 2px;">
                        <label>Fichier Permis</label><br>
                        <input @change="uploadImage($event, 'a')" type="file" placeholder="Choisir le fichier" required ref="file" name="image" id="uploadInput" class="form-control">
                        <vs-progress indeterminate color="primary" v-show="chargeFichier == 1">primary</vs-progress>
                        <vs-progress :percent="100" color="primary" v-show="chargeFichier == 2">primary</vs-progress>
                        <span v-show="chargeFichier == 2"><i class="el-icon-circle-check"></i> Permis Succès</span>

                        <vs-divider/>

                        <label>Fichier Pièce d'identité</label><br>
                        <input @change="uploadImage($event, 'b')" type="file" placeholder="Choisir le fichier" required ref="file" name="image" id="uploadInput" class="form-control">
                        <vs-progress indeterminate color="primary" v-show="chargeFichier2 == 1">primary</vs-progress>
                        <vs-progress :percent="100" color="primary" v-show="chargeFichier2 == 2">primary</vs-progress>
                        <span v-show="chargeFichier2 == 2"><i class="el-icon-circle-check"></i> Pièce Succès</span>
                      </vs-col>
                      <vs-col vs-w="6" style="padding-left: 2px;">
                        
                      </vs-col>
                    </vs-row>

                    <vs-divider/>
                    <label>Photo d'identité</label><br>
                    <input @change="uploadImage($event, 'c')" type="file" placeholder="Choisir le fichier" required ref="file" name="image" id="uploadInput" class="form-control">
                    <vs-progress indeterminate color="primary" v-show="chargeFichier3 == 1">primary</vs-progress>
                        <vs-avatar size="100px" :src="form.email"/>
                    
                       
                          <label>Statut</label>
                          
                          <vs-select
                            style="width: 100%;"
                            placeholder="Search and select"
                            class="selectExample"
                            label-placeholder="Autocomplete"
                            autocomplete
                            v-model="form.par"
                            >
                            <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in Etats" />
                          </vs-select>
                          <label>Affectation</label>
                          
                          <vs-select
                            style="width: 100%;"
                            placeholder="Search and select"
                            class="selectExample"
                            label-placeholder="Autocomplete"
                            autocomplete
                            v-model="form.type_c"
                            >
                            <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in plac" />
                          </vs-select>
                        
                  </div>
                </div>
                </vs-prompt>
        </div>
       
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import NavBar from '@/components/Navbar.vue'
  export default {
    name: 'HelloWorld',
    components: {
      NavBar
    },
    props: {
      chartId: {
        type: String,
        default: 'bar-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 150
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => {}
      },
      plugins: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        colorx:'success',
        search: '',
        chargeFichier : 0,
        chargeFichier2 : 0,
        chargeFichier3 : 0,
        activePrompt2:false,
        activePrompt3:false,
        activePrompt4:false,
        popupActivo3:false,
        select1:3,
        options1:[
          {text:'IT',value:0},
          {text:'Blade Runner',value:2},
          {text:'Thor Ragnarok',value:3},
        ],
        photo: 'https://images.freeimages.com/fic/images/icons/61/dragon_soft/512/user.png',
        donnees: null,
        donneesChauf: null,
        donneesChaufAttente: null,
        donneesChaufNouveau: null,
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
          nom_prenom: '',
          date_nais: '',
          lieu_nais: '',
          contact: '',
          email: 'https://images.freeimages.com/fic/images/icons/61/dragon_soft/512/user.png',
          permis: '',
          fichier_permis: '',
          fichier_piece: '',
          par: '1',
          id_chauffeur: '',
          type_c: '',
          },
        form2: {
          imatriculation: '',
          marque: '',
          details: '',
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
          Etats: [{
            value: '1',
            label: 'Nouveau'
          }, {
            value: 'attente',
            label: 'Encours'
          }, {
            value: 'Valide',
            label: 'Valide'
          }, {
            value: 'renvoye',
            label: 'renvoye'
          }],
          plac: [{
            value: 'PL',
            label: 'Plateau'
          }, {
            value: 'AC',
            label: 'Auto-Chargeuse'
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
        modifChauf(list) {
          this.activePrompt4 = true;
          this.form = {
          nom_prenom: list.nom_prenom,
          date_nais: list.date_nais,
          lieu_nais: list.lieu_nais,
          contact: list.contact,
          email: list.email,
          permis: list.permis,
          fichier_permis: list.fichier_permis,
          fichier_piece: list.fichier_piece,
          id_chauffeur: list.id_chauffeur,
          par: list.par,
          type_c: list.type_c,
          }
        },
        separateThousands(number) {
            let val = parseInt(number)
            return val.toLocaleString('fr-FR');
        },
        listeCamion () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_socogetra/albakoos_camion.php')
            .then((response) => {
              this.donnees = response.data.data;
              this.$vs.loading.close()
              this.filtreUser();
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },
        listeChauffeurs () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_socogetra/albakoos_flotte.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesChauf = response.data.data;
              this.donneesChaufAttente = response.data.attente;
              this.donneesChaufNouveau = response.data.vide;
              this.$vs.loading.close()
              this.filtreUser();
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },
  
        onSubmit() {
              axios.post('https://socogetra.net/appi_socogetra/albakoos_camion.php', this.form2)
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
        
          onSubmitChauffeur() {
              axios.post('https://socogetra.net/appi_socogetra/albakoos_flotte.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Chauffeur Ajouté!',
                  message: '',
                  showClose: false
                  });
                  this.listeChauffeurs();
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },

          onUpdateChauffeur() {
              axios.put('https://socogetra.net/appi_socogetra/albakoos_flotte.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Modification effectué',
                  message: '',
                  showClose: false
                  });
                  this.listeChauffeurs();
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
        printYear: function () {
            return new Date().getFullYear() + 
            '' + new Date().getMonth()+ 
            '' + new Date().getDate()+
            '' + new Date().getHours()+
            '' + new Date().getMinutes()+
            '' + new Date().getMilliseconds()+
            '' + new Date().getSeconds();
      },

        uploadImage(e, a) {
            if(a === 'a') {
              this.chargeFichier = 1;
            }
            if(a === 'b') {
              this.chargeFichier2 = 1;
            }
            if(a === 'c') {
              this.chargeFichier3 = 1;
            }
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.image = files[0]; 

            let formData = new FormData();
            let uploadPreset = "dsegjq9c"
            let cloudinaryUrl = "https://api.cloudinary.com/v1_1/r-sidence-meubl-e/upload"
            this.annee = this.printYear();
            formData.append('file', this.image);
            formData.append('public_id', this.annee);
            formData.append('upload_preset', uploadPreset)

            axios.post(cloudinaryUrl, formData)
            .then(res => {
                if(a === 'a') {
                  this.chargeFichier = 2;
                  let fichierUrl = res.data;
                  this.form.fichier_permis = fichierUrl.url;
                }
                if(a === 'b') {
                  this.chargeFichier2 = 2;
                  let fichierUrl = res.data;
                  this.form.fichier_piece = fichierUrl.url;
                }
                if(a === 'c') {
                  this.chargeFichier3 = 2;
                  this.form.email = null;
                  this.form.email = res.data.url;
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
      },

      beforeRouteUpdate(to, from, next) {
        this.listeCamion();
        this.listeChauffeurs();
        next();
      },
  
      mounted() {
        this.listeChauffeurs();
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-input__inner::placeholder {
    color: #201f1f;
}
  </style>
  