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
                <div style="width: 300px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration  /</span> Utilisateurs
                </div>
                <span style="float: right; margin-right: 150px;">
                    <vs-button color="#C32D39"  icon="person_add" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2 = true">Créer utilisateur</vs-button>
                </span>
                </vs-card>
              </div>
              
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;">
                
                <el-tabs type="border-card" @tab-click="handleClick" style="margin-top: 30px;">
                  <el-tab-pane label="Utilisateurs On">
                    <h2 style="font-weight: bold;">Liste des <span style="color: #409effd1;">Utilisateurs On</span></h2>
                    
                    <el-table
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        ref="multipleTable"
                        :data="donnees_on"
                        style="width: 100%; color: black;">
                        <el-table-column
                        property="name"
                        label="Auteur">
                        <template slot-scope="scope">
                            <vs-chip>
                                <vs-avatar :src="scope.row.photo"/>
                                {{ scope.row.nom }} {{ scope.row.prenom }}
                            </vs-chip>
                          </template>
                        </el-table-column>
                        <el-table-column
                        label="Titre">
                        <template slot-scope="scope">{{ scope.row.titre }}</template>
                        </el-table-column>
                        <el-table-column
                        label="Droit">
                        <template slot-scope="scope">
                            <el-tag size="small" effect="dark" type="gray" v-if="scope.row.droit == 1"><i class="el-icon-view"></i> Lecture</el-tag>
                            <el-tag size="small" effect="dark" type="success" v-else><i class="el-icon-edit-outline"></i> Ecriture</el-tag>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="Email">
                        <template slot-scope="scope">{{ scope.row.email }}</template>
                        </el-table-column>
                        
                        

                        <el-table-column
                        label="Utilisation">
                        <template slot-scope="scope">
                            <el-tag type="warning" v-if="scope.row.lieu == 1">Utilisation Bureau</el-tag>
                            <el-tag type="success" v-if="scope.row.lieu == 2">Utilisation Partout</el-tag>
                            <el-tag type="danger" v-if="scope.row.lieu == 3">DESACTIVE</el-tag>
                        </template>
                        </el-table-column>

                       
                        <el-table-column
                        label=""
                        width="55">
                        <template slot-scope="scope">
                            <vs-dropdown vs-trigger-click>
                              <a class="a-icon" >
                                  <vs-icon icon="more_horiz" size="small" color="gray"></vs-icon>
                              </a>

                              <vs-dropdown-menu>
                                  <vs-dropdown-item @click="modifier(scope.row)" >
                                  Modifier
                                  </vs-dropdown-item>
                                  <vs-dropdown-item  @click="onDelete(scope.row.id_user, 1)">
                                  Supprimer
                                  </vs-dropdown-item>
                                  <vs-dropdown-item>
                                  Vérrouiller
                                  </vs-dropdown-item>
                              
                              </vs-dropdown-menu>
                            </vs-dropdown>
                          </template>
                        
                        </el-table-column>
                    
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="Utilisateurs Off">
                    <h2 style="font-weight: bold;">Liste des <span style="color: #409effd1;">Utilisateurs Off</span></h2>
                    
                    <el-table
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        ref="multipleTable"
                        :data="donnees_off"
                        style="width: 100%; color: black;">
                        <el-table-column
                        property="name"
                        label="Auteur">
                        <template slot-scope="scope">
                            <vs-chip>
                                <vs-avatar src="https://randomuser.me/api/portraits/men/4.jpg"/>
                                {{ scope.row.nom }} {{ scope.row.prenom }}
                            </vs-chip>
                          </template>
                        </el-table-column>
                        <el-table-column
                        label="Titre">
                        <template slot-scope="scope">{{ scope.row.titre }}</template>
                        </el-table-column>
                        <el-table-column
                        label="Droit">
                        <template slot-scope="scope">
                            <el-tag size="small" effect="dark" type="gray" v-if="scope.row.droit == 1"><i class="el-icon-view"></i> Lecture</el-tag>
                            <el-tag size="small" effect="dark" type="success" v-else><i class="el-icon-edit-outline"></i> Ecriture</el-tag>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="Email">
                        <template slot-scope="scope">{{ scope.row.email }}</template>
                        </el-table-column>
                        
                        

                        <el-table-column
                        label="Utilisation">
                        <template slot-scope="scope">
                            <el-tag type="warning" v-if="scope.row.lieu == 1">Utilisation Bureau</el-tag>
                            <el-tag type="success" v-if="scope.row.lieu == 2">Utilisation Partout</el-tag>
                            <el-tag type="danger" v-if="scope.row.lieu == 3">DESACTIVE</el-tag>
                        </template>
                        </el-table-column>

                       
                        <el-table-column
                        label=""
                        width="55">
                        <template slot-scope="scope">
                            <vs-dropdown vs-trigger-click>
                              <a class="a-icon" >
                                  <vs-icon icon="more_horiz" size="small" color="gray"></vs-icon>
                              </a>

                              <vs-dropdown-menu>
                                  <vs-dropdown-item  @click="onDelete(scope.row.id_user, 2)">
                                  Réactiver
                                  </vs-dropdown-item>
                                  
                              
                              </vs-dropdown-menu>
                            </vs-dropdown>
                          </template>
                        
                        </el-table-column>
                    
                    </el-table>
                  </el-tab-pane>
                  
                </el-tabs>
              </div>

              <vs-prompt
                title="Création d'un utilisateur"
                color="primary"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="onSubmit"
                accept-text="Créer utilisateur"
                cancel-text="Annuler"
                @close="close"
                :active.sync="activePrompt2">
                <div class="con-exemple-prompt">
                  <div style="padding: 10px 0px;">
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                          <vs-input placeholder="" label="Nom" v-model="form.nom" style="width: 100%; margin-right: 5px;"/>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                          <vs-input placeholder="" label="Prenom" v-model="form.prenom" style="width: 100%; margin-left: 5px;"/>
                        </vs-col>
                    </vs-row>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                          <vs-input placeholder="" label="Email" v-model="form.email" style="width: 100%; margin-right: 5px;"/>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                          <vs-input placeholder="" label="Contact" v-model="form.contact" style="width: 100%; margin-left: 5px;"/>
                        </vs-col>
                    </vs-row>
                    <vs-input placeholder="" label="Titre" v-model="form.titre" style="width: 100%;"/>
                    <vs-input placeholder="" label="Mot de passe" v-model="form.pass" style="width: 100%;"/>
                    <vs-select
                        class="selectExample"
                        label="Sexe"
                        v-model="form.statut"
                        >
                        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options1" />
                    </vs-select>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                            <vs-select
                                class="selectExample"
                                label="Droit"
                                v-model="form.droit"
                                >
                                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options2" />
                            </vs-select>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                            <vs-select
                                class="selectExample"
                                label="Autorisation"
                                v-model="form.lieu"
                                >
                                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options3" />
                            </vs-select>
                        </vs-col>
                        <vs-divider/>
                        <label>Photo d'identité</label><br>
                        <input @change="uploadImage($event, 'c')" type="file" placeholder="Choisir le fichier" required ref="file" name="image" id="uploadInput" class="form-control">
                        <vs-progress indeterminate color="primary" v-show="chargeFichier3 == 1">primary</vs-progress>
                            <vs-avatar size="100px" :src="form.photo"/>
                    </vs-row>
                    

                    
                  </div>
                </div>
                </vs-prompt>
                <vs-prompt
                title="Modification d'un utilisateur"
                color="primary"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="onUpdate"
                accept-text="Mettre à jour"
                cancel-text="Annuler"
                @close="close"
                :active.sync="activePrompt3">
                <div class="con-exemple-prompt">
                  <div style="padding: 10px 0px;">
                    <vs-input placeholder="" label="Nom" v-model="form.nom" style="width: 100%;"/>
                    <vs-input placeholder="" label="Prenom" v-model="form.prenom" style="width: 100%;"/>
                    <vs-input placeholder="" label="Titre" v-model="form.titre" style="width: 100%;"/>
                    <vs-input placeholder="" label="Email" v-model="form.email" style="width: 100%;"/>
                    <vs-input placeholder="" label="Contact" v-model="form.contact" style="width: 100%;"/>
                    <vs-input placeholder="" label="Mot de passe" v-model="form.pass" style="width: 100%;"/>
                    <vs-select
                        class="selectExample"
                        label="Sexe"
                        v-model="form.statut"
                        >
                        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options1" />
                    </vs-select>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                            <vs-select
                                class="selectExample"
                                label="Droit"
                                v-model="form.droit"
                                >
                                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options2" />
                            </vs-select>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                            <vs-select
                                class="selectExample"
                                label="Autorisation"
                                v-model="form.lieu"
                                >
                                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options3" />
                            </vs-select>
                        </vs-col>
                    </vs-row>
                    <label>Photo d'identité</label><br>
                        <input @change="uploadImage($event, 'c')" type="file" placeholder="Choisir le fichier" required ref="file" name="image" id="uploadInput" class="form-control">
                        <vs-progress indeterminate color="primary" v-show="chargeFichier3 == 1">primary</vs-progress>
                            <vs-avatar size="100px" :src="form.photo"/>

                    
                  </div>
                </div>
                </vs-prompt>
                
            </vs-col>
          </vs-row>
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
        form: {
            nom: '',
            prenom: '',
            email: '',
            pass: '12345678',
            statut: 1,
            photo: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png',
            titre: '',
            droit: 1,
            contact: '',
            lieu: 1,
            id_user: 0
        },
        chargeFichier3 : 0,
        url: 'https://www.alislam.org/quran/Holy-Quran-French.pdf',
        chargeFichier : 0,
        imagea: null,
        activePrompt2:false,
        activePrompt3:false,
        valMultipe:{
        value1:'',
        value2:''
      },
      options1:[
        {text:'Masculin',value:1},
        {text:'Feminin',value:2},
      ],
      options2:[
        {text:'Lecture',value:1},
        {text:'Ecriture',value:2},
      ],
      options3:[
        {text:'Bureau Uniquement',value:1},
        {text:'Bureau & Hors..',value:2},
      ],
      donnees: null,
      donnees_on: [],
      donnees_off: [],
      select1:1,
      select2:1,
      select3:1,
        deadline3: Date.now() + (new Date().setHours(17, 59, 59) - Date.now()),
        like: true,
          value1: 4154.564,
          value2: 2222,
          title: 'Growth this year',
        activeName: 'first',
        chartData: {
          labels: [ 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mais', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
          datasets: [ { data: [40, 20, 12, 33, 10, 3, 45, 41, 26, 11, 19, 26] } ]
        },
        chartOptions: {
          responsive: true
        },
        tableData: [{
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'En cours'
          }, {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'Validé'
          }, {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'En cours'
          }, {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'Annulé'
          }, {
            date: '2016-05-08',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'Validé'
          }, {
            date: '2016-05-06',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'En cours'
          }, {
            date: '2016-05-07',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
            st: 'En cours'
          }],
          size: null,
          ft: null
      }
    },
    methods: {
      uploadImage(e, a) {
        console.log('choix');
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
                  this.form.photo = null;
                  this.form.photo = res.data.url;
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
      modifier(data) {
            this.form.nom = data.nom;
            this.form.prenom = data.prenom;
            this.form.email = data.email;
            this.form.statut = data.statut;
            this.form.photo = data.photo;
            this.form.titre = data.titre;
            this.form.droit = data.droit;
            this.form.contact = data.contact;
            this.form.lieu = data.lieu;
            this.form.id_user = data.id_user;
            this.activePrompt3 = true;
        },
        Supprimer(data) {
            this.form.nom = data.nom;
            this.form.prenom = data.prenom;
            this.form.email = data.email;
            this.form.statut = data.statut;
            this.form.photo = data.photo;
            this.form.titre = data.titre;
            this.form.droit = data.droit;
            this.form.contact = data.contact;
            this.form.lieu = data.lieu;
            this.form.id_user = data.id_user;
            this.onDelete();
        },
        onSubmit() {
            axios.post('https://socogetra.net/appi_socogetra/users_albakoos.php', this.form)
            .then((response) => {
                console.log(response);
                this.listeUsers();
                this.$vs.loading.close();
                this.$notify.success({
                title: 'Enregistrement OK!',
                message: 'Utilisateur Crée',
                showClose: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.$vs.loading.close()
            });
        },
        onUpdate() {
            axios.put('https://socogetra.net/appi_socogetra/users_albakoos.php', this.form)
            .then((response) => {
                console.log(response);
                this.listeUsers();
                this.$vs.loading.close();
                this.$notify.success({
                title: 'Modification effectué !',
                message: '',
                showClose: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.$vs.loading.close()
            });
        },
        onDelete(a, s) {
            axios.delete('https://socogetra.net/appi_socogetra/users_albakoos.php?id=' + a + '&s=' + s)
            .then((response) => {
                console.log(response);
                this.$vs.loading.close();
                this.$notify.success({
                title: 'Enregistrement OK!',
                message: 'Utilisateur Crée',
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
        handleCurrentChange(row) {
            console.log(row)
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

      listeUsers () {
          this.$vs.loading({
          type:'point',
          })
          axios.get('https://socogetra.net/appi_socogetra/users_albakoos.php?timestamp=' + new Date().getTime())
          .then((response) => {
            this.donnees = response.data.data;
            this.$vs.loading.close()
            this.filtreUser();
          }, (error) => {
            console.log(error);
            this.$vs.loading.close()
          });
      },

      filtreUser() {
        console.log(this.donnees);
          this.donnees.forEach((item) => {
              console.log(item);
              if(item.lieu == '3') {
                this.donnees_off.push( item );
                console.log('a');
               
              } else {
                this.donnees_on.push( item );
              }
            })
      },

      },
      mounted() {
      this.listeUsers();
  }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  