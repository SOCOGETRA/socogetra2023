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
                <div style="width: 500px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> Camions
                </div>
                <span style="float: right; margin-right: 150px;">
                      <vs-button color="#C32D39"  icon="add_location" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2=true">Nouveau Camion</vs-button>
                  </span>
                 
                </vs-card>
              </div>
              
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;">
                <el-card class="box-card" style="padding: -15px; border-radius: 20px;">
                            <h2 style="font-weight: bold;">Liste des Camions</h2>
                            <el-table
                                ref="multipleTable"
                                :data="donnees"
                                style="width: 100%; font-family: Helvetica;"
                                >
                                <el-table-column
                                type="selection"
                                width="55">
                                </el-table-column>
                                <el-table-column
                                label="Imatriculation">
                                <template slot-scope="scope">
                                    <el-tag
                                    type="info"
                                    effect="plain">
                                    {{ scope.row.imatriculation }}
                                    </el-tag>
                                </template>
                                </el-table-column>
                                <el-table-column
                                property="name"
                                label="Marque">
                                <template slot-scope="scope">
                                    <el-tag
                                    effect="dark"
                                    type="primary">
                                    {{ scope.row.marque }}
                                    </el-tag>
                                </template>
                                </el-table-column>
                                <el-table-column
                                property="name"
                                label="Marque">
                                <template slot-scope="scope">
                                  {{ scope.row.details }}
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
                title="Nouveau Camion"
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

                    <label>Date de Naissance</label>
                    <el-input style="width: 100%;" type="date" v-model="form.date_nais" placeholder=">Date de Naissance">
                    </el-input>

                    <label>Lieu de Naissance</label>
                    <el-input style="width: 100%;" v-model="form.lieu_nais" placeholder="Lieu de Naissance">
                    </el-input>

                    <label>Permis</label>
                    <el-input style="width: 100%;" v-model="form.permis" placeholder="Permis">
                    </el-input>

                    <label>Email</label>
                    <el-input style="width: 100%;" v-model="form.email" placeholder="Email">
                    </el-input>

                    <label>Contact</label>
                    <el-input style="width: 100%;" v-model="form.contact" placeholder="Contact">
                    </el-input>

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

                  </div>
                </div>
                </vs-prompt>
        </div>
       
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SideBar from '@/components/Sidebar.vue'
  import NavBar from '@/components/Navbar.vue'
  export default {
    name: 'HelloWorld',
    components: {
      SideBar,
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
        chargeFichier : 0,
        chargeFichier2 : 0,
        activePrompt2:false,
        activePrompt3:false,
        popupActivo3:false,
        select1:3,
        options1:[
          {text:'IT',value:0},
          {text:'Blade Runner',value:2},
          {text:'Thor Ragnarok',value:3},
        ],
        donnees: null,
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
          nom_prenom: '',
          date_nais: '',
          lieu_nais: '',
          contact: '',
          email: '',
          permis: '',
          fichier_permis: '',
          fichier_piece: '',
          par: 1,
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
        separateThousands(number) {
            let val = parseInt(number)
            return val.toLocaleString('fr-FR');
        },
        listeCamion () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_socogetra/soco_camion.php?timestamp=' + new Date().getTime())
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
            axios.get('https://socogetra.net/appi_socogetra/albakoos_chauffeurs.php')
            .then((response) => {
              this.donneesChauf = response.data.data;
              this.$vs.loading.close()
              this.filtreUser();
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },
  
        onSubmit() {
              axios.post('https://socogetra.net/appi_socogetra/soco_camion.php', this.form2)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Enregistré avec succès!',
                  message: 'Camion ajouté',
                  showClose: false
                  });
                  this.listeCamion();
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },
        
          onSubmitChauffeur() {
              axios.post('https://socogetra.net/appi_socogetra/albakoos_chauffeurs.php', this.form)
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
        this.listeCamion();
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-input__inner::placeholder {
    color: #201f1f;
}
  </style>
  