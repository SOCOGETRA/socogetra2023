<template>
    <div class="hello">
        <div class="screenUse">
          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
              <Side-bar style="width: 100%;"/>
            </vs-col>
            <vs-col vs-w="9">
              <div style="padding: 10px 50px">
                <h1 style="letter-spacing: 2px;">Transport</h1>
                <vs-row>
                 
                  <vs-col vs-w="8">
                      <vs-row style="margin-top: 17px;">
                        <vs-col vs-w="4" style="padding: 5px">
                          <vs-card style="background-color: white; border-bottom: 3px solid #409eff;">
                            <h4>Total Encaissé</h4><br>
                            <vs-icon icon="payments" color="primary" style="font-size: 16px;"></vs-icon>
                            <span style="font-weight: bold; font-size: 19px;"> 2 245 350 F</span>
                          </vs-card>
                        </vs-col>
                        <vs-col vs-w="4" style="padding: 5px">
                          <vs-card style="background-color:white;  border-bottom: 3px solid #ec5c7e;">
                            <h4>Dépenses maintenance</h4><br>
                            <vs-icon icon="insights" color="#13ce66" style="font-size: 16px;"></vs-icon>
                            <span style="font-weight: bold; font-size: 19px;"> 2 245 350 F</span>
                          </vs-card>
                        </vs-col>
                        <vs-col vs-w="4" style="padding: 5px">
                          <vs-card style="background-color:white;  border-bottom: 3px solid #13ce66;">
                            <h4>Solde</h4><br>
                            <vs-icon icon="insights" color="#13ce66" style="font-size: 16px;"></vs-icon>
                            <span style="font-weight: bold; font-size: 19px;"> 2 245 350 F</span>
                          </vs-card>
                        </vs-col>
                      </vs-row>
                  </vs-col>
                </vs-row>
                <vs-divider/>
                <h2>Véhicules</h2>
                <vs-row style="margin-top: 30px;">
                    <vs-col  vs-w="3" style="padding: 3px;">
                        <vs-card style="text-align: center; border: 2px solid #13ce66;">
                            <vs-icon icon="done_all" size="small" color="#13ce66" style="position: absolute; margin-left: 50px"></vs-icon>
                            <vs-icon icon="directions_car" size="large" color="#13ce66"></vs-icon><br>
                            <span style="font-size: 14px;">Véhicule 1</span><br>
                            <span style="font-size: 12px; font-weight: bold;">Plaque  : <span style="letter-spacing: 3px; color: blue;">21J4A29</span></span>
                            <vs-divider/>
                            <div style="display: grid; text-align: left;">
                               
                                <span style="font-size: 12px;">Chauffeur  : SAKONE Oumar</span>
                                <span style="font-size: 12px;">Contact  : 01 01 01 01 01</span><br>
                                <el-link type="primary" icon="el-icon-paperclip">Pièce du Chauffeur</el-link>
                            </div>
                            
                        </vs-card>
                    </vs-col>
                    <vs-col  vs-w="3" style="padding: 3px;">
                        <vs-card style="text-align: center;">
                            <vs-icon icon="close" size="small" color="orange" style="position: absolute; margin-left: 50px"></vs-icon>
                            <vs-icon icon="directions_car" size="large" color="orange"></vs-icon><br>
                            <span style="font-size: 14px;">Véhicule 2</span><br>
                            <span style="font-size: 12px; font-weight: bold;">Plaque  : <span style="letter-spacing: 3px; color: blue;">21J4A29</span></span>
                            <vs-divider/>
                            <div style="display: grid; text-align: left;">
                               
                                <span style="font-size: 12px;">Chauffeur  : SAKONE Oumar</span>
                                <span style="font-size: 12px;">Contact  : 01 01 01 01 01</span><br>
                                <el-link icon="el-icon-paperclip">Pièce du Chauffeur</el-link>
                            </div>
                            
                        </vs-card>
                    </vs-col>
                    <vs-col  vs-w="3" style="padding: 3px;">
                        <vs-card style="text-align: center;">
                            <vs-icon icon="close" size="small" color="orange" style="position: absolute; margin-left: 50px"></vs-icon>
                            <vs-icon icon="directions_car" size="large" color="orange"></vs-icon><br>
                            <span style="font-size: 14px;">Véhicule 3</span><br>
                            <span style="font-size: 12px; font-weight: bold;">Plaque  : <span style="letter-spacing: 3px; color: blue;">21J4A29</span></span>
                            <vs-divider/>
                            <div style="display: grid; text-align: left;">
                               
                                <span style="font-size: 12px;">Chauffeur  : SAKONE Oumar</span>
                                <span style="font-size: 12px;">Contact  : 01 01 01 01 01</span><br>
                                <el-link icon="el-icon-paperclip">Pièce du Chauffeur</el-link>
                            </div>
                            
                        </vs-card>
                    </vs-col>
                    
                </vs-row>
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
       
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  