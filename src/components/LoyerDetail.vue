<template>
    <div class="hello">
        <div class="screenUse">
          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
              <Side-bar style="width: 100%;"/>
            </vs-col>
            <vs-col vs-w="9">
              <div style="padding: 10px 50px">
                <h1 style="letter-spacing: 2px;">Historique Loyer</h1>
               
                <vs-row style="margin-top: 30px;">
                    <vs-col  vs-w="3" style="padding: 3px;">
                        <vs-card style="text-align: center; border: 2px solid #13ce66;">
                            <vs-icon icon="done_all" size="small" color="#13ce66" style="position: absolute; margin-left: 50px"></vs-icon>
                            <vs-icon icon="directions_car" size="medium" color="#13ce66"></vs-icon><br>
                            <span style="font-size: 14px;">SAKONE Oumar</span><br>
                            <span style="font-size: 12px; font-weight: bold;">I Caméra  : <span style="letter-spacing: 3px; color: blue;">A10</span></span>
                            
                        </vs-card>
                    </vs-col>
                    <vs-col  vs-w="1" style="padding: 3px;">
                        
                    </vs-col>
                    <vs-col  vs-w="8" style="padding: 3px;">
                        <div style="margin-top: 50px;">
                            <vs-button color="success" type="line" icon="paid" style="margin: 10px;">Paiement</vs-button>
                            
                            <vs-button color="dark" type="line" icon="sort" style="margin: 10px;">Maintenances <el-badge :value="12" class="item"></el-badge></vs-button>
                            <vs-button color="dark" type="line" icon="menu" style="margin: 10px;">Chauffeur</vs-button>
                        </div>
                        
                    </vs-col>
                    
                </vs-row>

                <vs-divider/>
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="Mois">
                    <template >
                        <span style="letter-spacing: 1px; color: gray; font-weight: bold;">Janvier</span>
                        </template>
                    
                    </el-table-column>
                    
                    <el-table-column
                    label="Statut">
                        <template >
                            <i style="color: #13ce66; font-weight: bold;">Payé </i>
                            <vs-icon icon="done" size="small" color="#13ce66" ></vs-icon>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="Date">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="Somme">
                    <template >
                            <i style=" font-weight: bold;">18 000 CFA </i>
                            <vs-icon icon="payments" size="small" ></vs-icon>
                        </template>
                    </el-table-column>
                    
                    <el-table-column
                    label="Action">
                    <template>
                        <el-button @click="handleClick" type="text" size="small">Detail</el-button>
                        <el-button type="text" size="small" style="color: orangered;">Annuler</el-button>
                    </template>
                    </el-table-column>
                </el-table>
              </div>
            </vs-col>
          </vs-row>
        </div>
    </div>
  </template>
  
  <script>
 import SideBar from '@/components/Sidebar.vue'
  export default {
    name: 'HelloWorld',
    components: {
      SideBar
    },
  
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }]
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  