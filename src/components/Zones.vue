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
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> Zones de livraison
                </div>
                <span style="float: right; margin-right: 150px;">
                      <vs-button color="#C32D39"  icon="add_location" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2=true">Nouvelle Zone</vs-button>
                  </span>
                </vs-card>
              </div>
              
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;">
                
                  
                  <el-card class="box-card" style="padding: -15px; border-radius: 20px;">
                  <h2 style="font-weight: bold;">Liste des zones</h2>
                  <span><b>12 zones(s)</b> Abidjan</span>
                  <el-table
                    ref="multipleTable"
                    :data="donnees"
                    style="width: 100%; font-family: Helvetica;"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      label="Zone de livraison">
                      <template slot-scope="scope">
                        <el-tag
                          type="info"
                          effect="plain">
                          {{ scope.row.zone_livraison }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="name"
                      label="Zone de facturation">
                      <template slot-scope="scope">
                        <el-tag
                          effect="dark"
                          type="primary">
                          {{ scope.row.zone_facturation }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="name"
                      label="Tarif 20P Rem">
                      <template slot-scope="scope">
                        <el-link type="primary"><i class="el-icon-money"></i> {{ separateThousands(scope.row.tarif_20_rem) }} CFA</el-link>
                        
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="name"
                      label="Tarif 40P Rem">
                      <template slot-scope="scope">
                        <el-link type="primary"><i class="el-icon-money"></i> {{ separateThousands(scope.row.tarif_40_rem) }} CFA</el-link>
                        
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="name"
                      label="Tarif 20P A/C">
                      <template slot-scope="scope">
                        <el-link type="primary"><i class="el-icon-money"></i> {{ separateThousands(scope.row.tarif_20_auto) }} CFA</el-link>
                        
                      </template>
                    </el-table-column>
                    <el-table-column
                      property="name"
                      label="Tarif 40P A/C">
                      <template slot-scope="scope">
                        <el-link type="primary"><i class="el-icon-money"></i> {{ separateThousands(scope.row.tarif_40_auto) }} CFA</el-link>
                        
                      </template>
                    </el-table-column>
                   
                  </el-table>
                  </el-card>
  
              </div>
            </vs-col>
          </vs-row>
  
          <vs-prompt
                title="Nouvelle zone"
                color="danger"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="onSubmit"
                accept-text="Ajouter"
                cancel-text="Annuler"
                @close="close"
                :active.sync="activePrompt2">
                <div class="con-exemple-prompt">
                  <div style="padding: 10px 0px;">

                    <label>Zone de livraison</label>
                    <el-input style="width: 100%;" v-model="form.zone_livraison" placeholder="Zone de livraison">
                    </el-input>

                    <label>Zone de facturation</label>
                    <el-input style="width: 100%;" v-model="form.zone_facturation" placeholder="Zone de facturation">
                    </el-input>

                    <label>Tarif - 20P Remorque</label>
                    <el-input style="width: 100%;" v-model="form.tarif_20_rem" placeholder="Tarif - 20P Remorque">
                    </el-input>

                    <label>Tarif - 40P Remorque</label>
                    <el-input style="width: 100%;" v-model="form.tarif_40_rem" placeholder="Tarif - 40P Remorque">
                    </el-input>

                    <label>Tarif - 20P Auto/Charge</label>
                    <el-input style="width: 100%;" v-model="form.tarif_20_auto" placeholder="Tarif - 20P Auto/Charge">
                    </el-input>

                    <label>Tarif - 40P Auto/Charge</label>
                    <el-input style="width: 100%;" v-model="form.tarif_40_auto" placeholder="Tarif - 40P Auto/Charge">
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
        popupActivo3:false,
        select1:3,
        options1:[
          {text:'IT',value:0},
          {text:'Blade Runner',value:2},
          {text:'Thor Ragnarok',value:3},
        ],
        donnees: null,
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
          zone_livraison: '',
          zone_facturation: '',
          tarif_20_rem: '',
          tarif_40_rem: '',
          tarif_20_auto: '',
          tarif_40_auto: '',
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
        listeZones () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_socogetra/albakoos_zones.php')
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
              axios.post('https://socogetra.net/appi_socogetra/albakoos_zones.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Zone Ajouté !',
                  showClose: false
                  });
                  this.listeZones();
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
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-input__inner::placeholder {
    color: #201f1f;
}
  </style>
  