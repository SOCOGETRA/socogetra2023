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
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> Dossier Bennes
                </div>
                <span style="float: right; margin-right: 150px;">
                      <vs-button color="#C32D39"  icon="person_add" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2=true">Nouveau client</vs-button>
                  </span>
                  <span style="float: right; margin-right: 350px;">
                      <vs-button color="#C32D39"  icon="add" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt3=true">Ajouter produit</vs-button>
                  </span>
                </vs-card>
              </div>
              
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;">
                <div style="background-color: white;">
                  <div style="border: 1px solid #8080802e; margin: 10px; padding: 15px;">
                          <h3>Produits par client</h3><br>
                          <div v-for="item in donneesa" :key="item.id_client">
                            <el-alert
                              :closable="false"
                              :title="item.libelle"
                              :show-icon="false"
                              type="info"
                              effect="dark">
                            </el-alert>
                            <div v-for="list in donnees" :key="list.id_prod">
                              <el-alert
                              :show-icon="false"
                              :closable="false"
                                v-if="list.client == item.libelle"
                                :title="list.libelle"
                                type="info">
                              </el-alert>
                            </div>
                            
                          </div>
                        </div>
                </div>
                  
                 
  
              </div>
            </vs-col>
          </vs-row>
  
          <vs-prompt
                title="Nouveau client"
                color="danger"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="onSubmit"
                accept-text="Ajouter"
                cancel-text="Annuler"
                @close="close"
                :active.sync="activePrompt2">
                <div class="con-exemple-prompt">
                  <div style="padding: 10px 0px;">

                    <label>Nom Client</label>
                    <el-input style="width: 100%;" v-model="form.libelle" placeholder="Nom client">
                    </el-input>
                    <label>Commentaire</label>
                    <el-input style="width: 100%;" v-model="form.commentaire" placeholder="Commentaire">
                    </el-input>

                  </div>
                </div>
          </vs-prompt>

          <vs-prompt
                title="Nouveau client"
                color="danger"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="onSubmit2"
                accept-text="Ajouter"
                cancel-text="Annuler"
                @close="close"
                :active.sync="activePrompt3">
                <div class="con-exemple-prompt">
                  <div style="padding: 10px 0px;">
                    <label>Client</label>
                    
                    <vs-select
                      style="width: 100%;"
                      placeholder="Client"
                      class="selectExample"
                      label-placeholder="Autocomplete"
                      multiple
                      autocomplete
                      v-model="form2.clients"
                      >
                      <vs-select-item :key="index" :value="item.libelle" :text="item.libelle" v-for="item,index in donneesa" />
                    </vs-select>
                    <label>Nom Client</label>
                    <el-input style="width: 100%;" v-model="form2.libelle" placeholder="Nom client">
                    </el-input>
                    <label>Commentaire</label>
                    <el-input style="width: 100%;" v-model="form2.commentaire" placeholder="Commentaire">
                    </el-input>

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
        donneesa: null,
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
            libelle: '',
            commentaires: '',
          },
        form2: {
            client: '',
            clients: '',
            libelle: '',
            commentaires: '',
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
          }],
      }
    },
    methods: {
        goToList(a) {
        this.$router.push({ name: 'liste_benne', params: { elements: a } })
        },
        separateThousands(number) {
            let val = parseInt(number)
            return val.toLocaleString('fr-FR');
        },
        listeZones () {
            
            axios.get('https://sarezide.com/appi/albakoos_clients.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesa = response.data.data;
              this.$vs.loading.close()
              this.filtreUser();
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        listeZones2 () {
            
            axios.get('https://sarezide.com/appi/albakoos_produits_clients.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donnees = response.data.data;
              this.$vs.loading.close()
              this.filtreUser();
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },
  
        onSubmit() {
              axios.post('https://sarezide.com/appi/albakoos_clients.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.donnees = null;
                  this.listeZones();
                  this.listeZones2();
                  this.$notify.success({
                  title: 'Client Ajouté!',
                  message: 'Vous avez ajouté un nouveau client',
                  showClose: false
                  });
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },
          onSubmit2() {
              this.form2.client = this.form2.clients[0];
              axios.post('https://sarezide.com/appi/albakoos_produits_clients.php', this.form2)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.donnees = null;
                  this.listeZones();
                  this.listeZones2();
                  this.$notify.success({
                  title: 'Produit Ajouté!',
                  message: 'Vous avez ajouté un nouveau produit',
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
        this.listeZones();
        this.listeZones2();
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-input__inner::placeholder {
    color: #201f1f;
}
  </style>
  