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
                <vs-card class="navbar" style="margin-bottom: -10px; border-bottom: 3px solid #409effd1;">
                <div style="width: 300px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                  <span style="color: #409effd1;"><vs-icon icon="cloud" size="" style="font-size: 18px;"></vs-icon> Cloud /</span> Principale
                </div>
                <span style="float: right; margin-right: 150px;">
                    <vs-button color="primary"  icon="add" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2 = true">Nouveau dossier</vs-button>
                </span>
                </vs-card>
              </div>
              
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;">
                <vs-row>
                    <vs-col vs-w="4.3" style="padding-right: 10px;">
                      <el-card class="box-card" style="padding: -15px;">
                        <vs-icon icon="folder_open" size="small" bg="#409effd1" style="color: white; font-size: 20px;" round></vs-icon> <span class="titre-zone">Dossier(s)</span>
                            <vs-row class="space-zone">
                              <vs-col vs-w="6" style="display: grid;">
                                <span class="prix-zone">16</span>
                              </vs-col>
                            </vs-row>
                      </el-card>
                    </vs-col>
                    <vs-col vs-w="7.7" style="padding-right: 10px;">
                      <el-card class="box-card" style="padding: -15px;  background-color: #f0c1c514;">
                        <vs-icon icon="folder_open" size="small" bg="#409effd1" style="color: white; font-size: 20px;" round></vs-icon> <span class="titre-zone">Fichiers</span> - <span >312 fichier(s)</span>
                            <vs-row class="space-zone" style="margin-bottom: -11px;">
                              <vs-col vs-w="12" style="display: flex;">
                                <span class="sousTitre-zone" style=""><img src="../../assets/word.png" width="20"> 8% Word</span>
                                <span class="sousTitre-zone" style=""><img src="../../assets/excel.png" width="20"> 8% Excel</span>
                                <span class="sousTitre-zone" style=""><img src="../../assets/pdf.png" width="20"> 8% PDF</span>
                              </vs-col>
                            </vs-row>
                      </el-card>
                    </vs-col>
                   
                    
                  </vs-row>
                <el-tabs type="border-card" @tab-click="handleClick" style="margin-top: 30px;">
                  <el-tab-pane label="Dossier(s) Public">
                    <h2 style="font-weight: bold;">Dossiers <span style="color: #409effd1;">Public</span></h2>
                    <el-table
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        ref="multipleTable"
                        :data="tableData"
                        style="width: 100%; color: black;"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        label=""
                        width="55">
                        <template slot-scope="scope"><img src="../../assets/folder.png" width="20" :labels="scope.row.date"></template>
                        </el-table-column>
                        <el-table-column
                        label="Dossier">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        property="name"
                        label="Auteur">
                        <vs-chip>
                                <vs-avatar src="https://randomuser.me/api/portraits/men/4.jpg"/>
                                SAKONE Oumar
                            </vs-chip>
                        </el-table-column>
                        <el-table-column
                        label="Création">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        label="Fichier">
                        <template slot-scope="scope">
                            <el-tag size="small" effect="dark" type="gray"><i class="el-icon-circle-check"></i> {{ scope.row.st }}</el-tag>
                        </template>
                        </el-table-column>
                        <el-table-column
                        property="name"
                        label="Taille"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        label=""
                        width="55">
                        <vs-dropdown vs-trigger-click>
                            <a class="a-icon" href.prevent>
                                <vs-icon icon="more_horiz" size="small" color="gray"></vs-icon>
                            </a>

                            <vs-dropdown-menu>
                                <vs-dropdown-item>
                                Rénommer
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                Supprimer
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                Vérrouiller
                                </vs-dropdown-item>
                            
                            </vs-dropdown-menu>
                            </vs-dropdown>
                        
                        </el-table-column>
                    
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="Dossier(s) Personnel">
                    <h2 style="font-weight: bold;">Dossiers <span style="color: #409effd1;">Personnel</span></h2>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        style="width: 100%; color: black;"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        label=""
                        width="55">
                        <template slot-scope="scope"><img src="../../assets/folder.png" width="20" :labels="scope.row.date"></template>
                        </el-table-column>
                        <el-table-column
                        label="Dossier">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        property="name"
                        label="Auteur">
                        <vs-chip>
                                <vs-avatar src="https://randomuser.me/api/portraits/men/4.jpg"/>
                                SAKONE Oumar
                            </vs-chip>
                        </el-table-column>
                        <el-table-column
                        label="Création">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        label="Fichier">
                        <template slot-scope="scope">
                            <el-tag size="small" effect="dark" type="gray"><i class="el-icon-circle-check"></i> {{ scope.row.st }}</el-tag>
                        </template>
                        </el-table-column>
                        <el-table-column
                        property="name"
                        label="Taille"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        label=""
                        width="55">
                        <vs-dropdown vs-trigger-click>
                            <a class="a-icon" href.prevent>
                                <vs-icon icon="more_horiz" size="small" color="gray"></vs-icon>
                            </a>

                            <vs-dropdown-menu>
                                <vs-dropdown-item>
                                Rénommer
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                Supprimer
                                </vs-dropdown-item>
                                <vs-dropdown-item>
                                Vérrouiller
                                </vs-dropdown-item>
                            
                            </vs-dropdown-menu>
                            </vs-dropdown>
                        
                        </el-table-column>
                    
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="Dossier(s) Vérrouillé">Rôle</el-tab-pane>
                </el-tabs>
              </div>

              <vs-prompt
                title="Nouveau dossier"
                color="primary"
                @cancel="valMultipe.value1='',valMultipe.value2=''"
                @accept="acceptAlert"
                accept-text="Créer dossier"
                cancel-text="Annuler"
                @close="close"
                :is-valid="validName"
                :active.sync="activePrompt2">
                <div class="con-exemple-prompt">
                <span>Création d'un <b>nouveau dossier</b>.</span>
                  <div style="padding: 10px 0px;">
                    <vs-input placeholder="Nom du dossier" v-model="valMultipe.value1"/>
                    <vs-select
                        class="selectExample"
                        label="Autorisation"
                        v-model="select1"
                        >
                        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options1" />
                    </vs-select>

                    
                  </div>
                </div>
                </vs-prompt>

            </vs-col>
          </vs-row>
        </div>
       
    </div>
  </template>
  
  <script>
  import SideBar from '@/components/Sidebarb.vue'
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
        valMultipe:{
        value1:'',
        value2:''
      },
      options1:[
        {text:'Tout le monde',value:1},
        {text:'Moi uniquement',value:2},
        {text:'Vérrouiller',value:3},
      ],
      select1:1,
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
      }
    },
    methods: {
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
        }

      }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  