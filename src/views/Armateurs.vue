<template>
    <div class="hello">
        <div class="screenUse">
          <Nav-bar style="width: 100%;"/>
          <vs-row>
            <vs-col vs-w="12" style="overflow:scroll; height: calc(100vh - 48px);">
              <div style="position: fixed; width: 100%; z-index: 1000;">
                <vs-card class="navbar" style="margin-bottom: -10px; border-bottom: 3px solid #f0c1c5;">
                <div style="width: 530px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> <b>POINT {{$route.params.element}}</b>
                </div>
                <span style="float: right; margin-right: 150px;">
                      <vs-button color="#C32D39"  icon="add" style="padding: 5px; position: absolute; width: 150px;" @click="popupActivo2=true">Créer un ordre</vs-button>
                  </span>
                  <span style="float: right; margin-right: 520px;">
                    <vs-button color="#C32D39"  icon="print" style="padding: 5px; position: absolute; width: 150px;" @click="generateReport">Imprimer</vs-button>
                </span>
                </vs-card>
              </div>
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 90px;">
                  <el-card class="box-card" style="padding: -15px; border-radius: 10px;">
                    <span><b>{{ donnees.length }} Conteneurs</b> - <el-link type="success" @click="ExportExcel('xls')"><img src="../assets/excel.png" width="14"> Excel</el-link></span>
                    <table border="1" ref="exportable_table" v-show="false">
                      <tbody >
                      <tr>
                          <th>DATE DE RECEPTION</th>
                          <th>N CONTENEUR</th>
                          <th>BL</th>
                          <th>DECLARATION</th>
                          <th>TYPES</th>
                          <th>STATUT</th>
                          <th>MODE</th>
                          <th>LIEU</th>
                          <th>BADT</th>
                          <th>DO</th>
                          <th>SORTIE</th>
                          <th>RECUPERER</th>
                          <th>ARMATEUR</th>
                          <th>CLIENT</th>
                          <th>CONTACT</th>
                      </tr>
                      <tr v-for="(item, i) in donnees" :key="i">
                        <td>{{item.n_conteneur}}</td>
                          <td>{{item.n_conteneur}}</td>
                          <td>{{item.bl}}</td>
                          <td>{{item.n_declaration}}</td>
                          <td>{{item.type_c}}</td>
                          <td>{{item.statut}}</td>
                          <td>{{item.mode}}</td>
                          <td>{{item.zone_livraison}}</td>
                          <td>{{item.badt}}</td>
                          <td>{{item.do}}</td>
                          <td>{{item.sortie_port}}</td>
                          <td>{{item.date_recup}}</td>
                          <td>{{item.armateur}}</td>
                          <td>{{item.client}}</td>
                          <td>{{item.observation}}</td>
                      </tr>
                      </tbody>
                  </table>
                    <vs-table search max-items="20" pagination  :data="donnees" style="font-size: 12px">
                    <template slot="header">
                      <h3>
                        HISTORIQUE IMPORT
                      </h3>
                    </template>
                    <template slot="thead">
                      <vs-th>
                        Date Reception
                      </vs-th>
                      <vs-th>
                        N° Dossier
                      </vs-th>
                      <vs-th>
                        Conteneur
                      </vs-th>
                      <vs-th>
                        Types
                      </vs-th>
                      <vs-th>
                        Nb Tcs
                      </vs-th>
                      <vs-th>
                        N° Déclaration
                      </vs-th>
                      <vs-th>
                        BL
                      </vs-th>
                      <vs-th>
                        Statut/Mode
                      </vs-th>
                      <vs-th>
                        Armateur
                      </vs-th>
                      <vs-th>
                        Client
                      </vs-th>
                      <vs-th>
                        Camion
                      </vs-th>
                      <vs-th>
                        Chauffeur
                      </vs-th>
                      <vs-th>
                        Zone Livr
                      </vs-th>
                      <vs-th>
                        Zone Fact
                      </vs-th>
                      <vs-th>
                        BADT
                      </vs-th>
                      <vs-th>
                        DO
                      </vs-th>
                      <vs-th>
                        Sortie
                      </vs-th>
                      <vs-th>
                        Recup
                      </vs-th>
                      <vs-th>
                        Action
                      </vs-th>
                    </template>
  
                    <template slot-scope="{data}">
                      <vs-tr :state="data[indextr].sejour.length >= 1000?'success':indextr == 2000?'danger':null" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="data[indextr].date_recept">
                        <span style="color: blue; font-size: 12px; text-align: center" @click="Borderau(data[indextr])">{{data[indextr].date_recept}}</span>
                        </vs-td>
  
                        <vs-td style="font-size: 12px; background: #409eff2b" :data="data[indextr].username">
                          <span style="color:red; font-weight: bold; text-align: center"  @click="ChangeStatut()">{{data[indextr].n_doc}}</span>
                        </vs-td>
  
                        <vs-td style="font-size: 12px" :data="data[indextr].username">
                          <b style="color: blue">{{data[indextr].n_conteneur}}</b>
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].type_c}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].nbre_tcs}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; color: red; text-align: center" :data="data[indextr].username">
                          {{data[indextr].n_declaration}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].bl}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                        
                        <span  v-if="data[indextr].statut == 'SCANNER'" style="color: red">{{data[indextr].statut}}<span v-if="data[indextr].mode == 'AC'" style="color: black; font-weight: bold">/AC</span><span v-else style="color: black; font-weight: bold">/REM</span></span>
                        <span v-else style="color: green">{{data[indextr].statut}}<span v-if="data[indextr].mode == 'AC'" style="color: black; font-weight: bold">/AC</span><span v-else style="color: black; font-weight: bold">/REM</span></span> 
                      </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].armateur}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].client}}
                        </vs-td>
                        
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].camion}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].chauffeur}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].zone_livraison}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].zone_facturation}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].badt}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].do}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].sortie_port}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].date_recup}}
                        </vs-td>
  
                        
                        <vs-td style="font-size: 12px" :data="data[indextr].do">
                          <el-button type="primary" icon="el-icon-edit" circle @click="modifBon(data[indextr])"></el-button>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
  
  
  
                 
                  </el-card>
  
                
                <vs-divider/>
                
              </div>
            </vs-col>
          </vs-row>
  
          <vs-popup classContent="popup-example"  title="Nouvelle Ordre" :active.sync="popupActivo2">
            <div>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date de Réception</label>
                  <el-input   type="date" v-model="form.date_recept" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Conteneur</label>
                  <el-input v-model="form.n_conteneur" placeholder="N° Conteneur">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Type TC</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.type_c"
                    >
                    <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in type_cont" />
                  </vs-select>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Déclaration</label>
                  <el-input v-model="form.n_declaration" placeholder="N° Déclaration">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>BL</label>
                  <el-input v-model="form.bl" placeholder="N° BL">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N DOSSIER</label>
                  <el-input v-model="form.n_doc" placeholder="N° BL">
                  </el-input>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Armateur</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.armateur"
                    >
                      <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in armateur" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Client</label>
                  <el-input style="width: 100%;" v-model="form.client" placeholder="Nom client">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Contact Client</label>
                  <el-input style="width: 100%;" v-model="form.observation" placeholder="Nom client">
                  </el-input>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Zone de livraison</label>
                  <vs-select
                    @change="handleSelectChange($event)"
                    style="width: 100%;"
                    v-model="form.zone_livraison"
                    >
                      <vs-select-item :key="index" :value="item.zone_livraison" :text="item.zone_livraison" v-for="item,index in donneesZones" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Zone de facturation</label>
                  <el-input disabled  style="width: 100%;" v-model="form.zone_facturation" placeholder="ZONE">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Mode</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.mode"
                    >
                      <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in Modes" />
                  </vs-select>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="6">
                  <label>Camion</label>
                  <el-input v-model="form.camion" placeholder="N° Conteneur" >
                  </el-input>
                  
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="6">
                  <label>Chauffeur</label>
                  <el-input v-model="form.chauffeur" placeholder="N° Conteneur" >
                  </el-input>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>BADT</label>
                  <el-input   type="date" v-model="form.badt" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>DO</label>
                  <el-input   type="date" v-model="form.do" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Statut</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.statut"
                    >
                      <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in statutt" />
                  </vs-select>
                </vs-col>
              </vs-row>
              
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Transitaire</label>
                  <el-input style="width: 100%;" v-model="form.transitaire" placeholder="Transitaire"></el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                  <label>Observation</label>
                  <el-input  type="textarea" v-model="form.observation" placeholder="Observation">
                  </el-input>
                </vs-col>
                
              </vs-row>
              
            </div>
           
            
            <center><vs-button style="margin: 20px; width: 300px;" @click="onSubmit()" color="primary" type="filled">Enregistrer l'ordre</vs-button></center>
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
  
  
  
          <vs-prompt
          title="'Conteneur : '"
          @accept="ChangeStatut"
          @close="close"
          :active.sync="programme">
           <div class="con-exemple-prompt">
            <div >
              <center>Choisir la date de livraison</center>
              <center>
                <el-input type="date" v-model="programmer" placeholder="Date de Réception">
                </el-input>
              </center>
            </div>
            <div >
              <center>Choisir le Statut</center>
              <center>
                <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="programmer"
                    >
                    <vs-select-item :key="index" :value="item.label" :text="item.value" v-for="item,index in donneesStatut" />
                  </vs-select>
              </center>
            </div>
            
           
             
           </div>
         </vs-prompt>
  
  
         <vs-popup classContent="popup-example"  title="Modification Ordre" :active.sync="popupActivo5">
            <div>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date de Réception</label>
                  <el-input   type="date" v-model="form.date_recept" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Conteneur</label>
                  <el-input v-model="form.n_conteneur" placeholder="N° Conteneur">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Type TC</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.type_c"
                    >
                    <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in type_cont" />
                  </vs-select>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Déclaration</label>
                  <el-input v-model="form.n_declaration" placeholder="N° Déclaration">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>BL</label>
                  <el-input v-model="form.bl" placeholder="N° BL">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N DOSSIER</label>
                  <el-input v-model="form.n_doc" placeholder="N° BL">
                  </el-input>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Armateur</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.armateur"
                    >
                      <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in armateur" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Client</label>
                  <el-input style="width: 100%;" v-model="form.client" placeholder="Nom client">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Contact Client</label>
                  <el-input style="width: 100%;" v-model="form.navire" placeholder="Nom client">
                  </el-input>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Zone de livraison</label>
                  <vs-select
                    @change="handleSelectChange($event)"
                    style="width: 100%;"
                    v-model="form.zone_livraison"
                    >
                      <vs-select-item :key="index" :value="item.zone_livraison" :text="item.zone_livraison" v-for="item,index in donneesZones" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Zone de facturation</label>
                  <el-input disabled  style="width: 100%;" v-model="form.zone_facturation" placeholder="ZONE">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Mode</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.mode"
                    >
                      <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in Modes" />
                  </vs-select>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="6">
                  <label>Camion</label>
                  <el-input v-model="form.camion" placeholder="N° Conteneur" >
                  </el-input>
                  
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="6">
                  <label>Chauffeur</label>
                  <el-input v-model="form.chauffeur" placeholder="N° Conteneur" >
                  </el-input>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>BADT</label>
                  <el-input   type="date" v-model="form.badt" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>DO</label>
                  <el-input   type="date" v-model="form.do" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Statut</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.statut"
                    >
                      <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in statutt" />
                  </vs-select>
                </vs-col>
              </vs-row>
  
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>SORTIE</label>
                  <el-input   type="date" v-model="form.sortie_port" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>RECUPERATION</label>
                  <el-input   type="date" v-model="form.date_recup" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>RESTITUTION</label>
                  <el-input style="width: 100%;" v-model="form.restitution" placeholder="Lieu de restitution">
                  </el-input>
                </vs-col>
              </vs-row>
              
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Transitaire</label>
                  <el-input style="width: 100%;" v-model="form.transitaire" placeholder="Transitaire"></el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                  <label>Observation</label>
                  <el-input  type="textarea" v-model="form.observation" placeholder="Observation">
                  </el-input>
                </vs-col>
                
              </vs-row>
              
            </div>
           
            
            <center><vs-button style="margin: 20px; width: 300px;" @click="onUpdate()" color="primary" type="filled">Enregistrer l'ordre</vs-button></center>
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
          
  
          <vue-html2pdf
                  :show-layout="false"
                  :float-layout="true"
                  :enable-download="true"
                  :preview-modal="true"
                  :paginate-elements-by-height="1100"
                  filename="hee hee"
                  :pdf-quality="2"
                  :manual-pagination="false"
                  pdf-format="a4"
                  pdf-orientation="portrait"
                  pdf-content-width="800px"
    
                  @progress="onProgress($event)"
                  @hasStartedGeneration="hasStartedGeneration()"
                  @hasGenerated="hasGenerated($event)"
                  ref="html2Pdf"
              >
                  <section slot="pdf-content">
                    <div style="width: 19.5cm; margin-left: .5cm; font-size: 12px; margin-top: 20px" id="html-to-pdf" ref="content">
                      <div style="width: 100%; padding: 10px">
                        <div style="float: left; display: block;">
                          <img src="../assets/socogetra.jpeg" width="90">
                        </div>
                        <div style="float: left; padding: 12px;">
                          <p style="font-weight: bold; font-size: 27px; font-family: 'Nunito Sans', sans-serif; text-align: center">BORDEREAU DE LIVRAISON CONTENEUR</p>
                        </div>
                      </div>
                      .
                      <div>
                        <vs-divider style="font-family: 'Nunito Sans', sans-serif;">{{ elementChoisi.date_recept }}</vs-divider>
                      </div>
    
                      <div style="text-align: left; font-family: 'Nunito Sans', sans-serif;" v-if="elementChoisi != null">
                        <vs-row >
                          <vs-col vs-w="4.5" style="padding: 5px; font-size: 12px;">
                            <el-input placeholder="" v-model="elementChoisi.n_conteneur">
                              <template slot="prepend">CONTENEUR</template>
                            </el-input>
                            
                          </vs-col>
                          <vs-col vs-w="3" style="padding: 5px">
                            <el-input placeholder="" v-model="elementChoisi.type_c">
                              <template slot="prepend">TYPE</template>
                            </el-input>
                            
                          </vs-col>
                          <vs-col vs-w="4.5" style="padding: 5px">
                            <el-input placeholder="" v-model="elementChoisi.observation">
                              <template slot="prepend">Code Chargement</template>
                            </el-input>
                          </vs-col>
                        </vs-row>
                        <vs-row style="padding-top: 10px; font-family: 'Nunito Sans', sans-serif;">
                          <vs-col vs-w="4.5" style="padding: 5px">
                            <el-input placeholder="" v-model="elementChoisi.n_declaration">
                              <template slot="prepend">N° DECLARAT°</template>
                            </el-input>
                          </vs-col>
    
                          <vs-col vs-w="3.5" style="padding: 5px">
                            <el-input placeholder="" v-model="elementChoisi.statut">
                              <template slot="prepend">ST</template>
                            </el-input>
                          </vs-col>
    
                          <vs-col vs-w="4" style="padding: 5px">
                            <el-input placeholder="" v-model="elementChoisi.mode">
                              <template slot="prepend">LIVRAISON</template>
                            </el-input>
                          </vs-col>
                      
                        </vs-row>
                        <vs-row style="padding-top: 10px">
                          <vs-col vs-w="4" style="padding: 5px; font-family: 'Nunito Sans', sans-serif;">
                            <b style="font-size: 14px;">CLIENT : </b> 
                            <span style="color: rgb(41, 41, 41); font-size: 14px;">{{ elementChoisi.client }}</span>
                          </vs-col>
                          <vs-col vs-w="4" style="padding: 5px">
                            <b style="font-size: 14px;">TRANSITAIRE : </b> 
                            <span style="color: rgb(41, 41, 41); font-size: 14px;">{{ elementChoisi.transitaire }}</span>
                          </vs-col>
                          <vs-col vs-w="4" style="padding: 5px">
                            <b style="font-size: 14px;">ARMATEUR : </b> 
                            <span style="color: rgb(41, 41, 41); font-size: 14px;">{{ elementChoisi.armateur }}</span>
                          </vs-col>
                          
                        </vs-row>
                        <vs-row style="padding-top: 10px">
                          <vs-col vs-w="4" style="padding: 5px">
                            <b style="font-size: 14px;">Zone de livraison : </b> 
                            <span style="color: rgb(41, 41, 41); font-size: 14px;">{{ elementChoisi.zone_livraison }}</span>
                          </vs-col>
                          <vs-col vs-w="4" style="padding: 5px">
                            <b style="font-size: 14px;">CHAUFFEUR : </b> 
                            <span style="color: rgb(41, 41, 41); font-size: 14px;">{{ elementChoisi.chauffeur }}</span>
                          </vs-col>
                          <vs-col vs-w="4" style="padding: 5px">
                            <b style="font-size: 14px;">CAMION : </b> 
                            <span style="color: rgb(41, 41, 41); font-size: 14px;">{{ elementChoisi.camion }}</span>
                          </vs-col>
                          
                        </vs-row>
                      </div>
    
                      <div style="margin-top: 20px;">
                        <center style="padding: 10px; font-size: 17px; text-decoration: underline; font-family: 'Nunito Sans', sans-serif;">CODE AVARIES</center>
                        <table style="width: 100%;">
                          <tr>
                            <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                            <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                            <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                            <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                            <td style="border:1px solid black; text-align: left; padding: 10px"></td>
                          </tr>
                        </table>
                      </div>
                      
                      <div style="margin-top: 20px;">
                        <img src="../assets/bordereau_suit.jpg" width="100%">
                      </div>
    
                      <div style="margin-top: 20px; font-family: 'Nunito Sans', sans-serif;">
                        <vs-row>
                          <vs-col vs-w="6" style="padding: 5px; border: 1px solid gray; padding-bottom: 40px;">
                            <center><span style="font-weight: bold;">SIGNATURE COMMIS</span></center>
                            <center><span>( Nom et Prenom )</span></center>
                            
                          </vs-col>
                          <vs-col vs-w="6" style="padding: 5px; border: 1px solid gray;">
                            <center><span style="font-weight: bold;">SIGNATURE CLIENT</span></center>
                            <center><span>( Nom, Prenom & Date )</span></center>
                            
                          </vs-col>
                        </vs-row>
                      </div>
                      <b style="font-family: 'Nunito Sans', sans-serif;"><span>NB : Votre adresse de récupération à adresser à l'armateur et nous mettre en copie sur le : <span style="color:darkblue">info@socogetra.net</span></span></b>
                    
                    </div>
                  </section>
              </vue-html2pdf>
        </div>
       
    </div>
  </template>
  
  <script>
  import * as XLSX from "xlsx";
  import VueHtml2pdf from 'vue-html2pdf'
  import html2pdf from "html2pdf.js";
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas';
  import axios from 'axios';
  import NavBar from '@/components/Navbar.vue'
  export default {
    name: 'HelloWorld',
    computed: {
          dossier() {
            return this.$store.state.dossier;
          },
        },
    components: {
      NavBar,
      VueHtml2pdf
    },
    data() {
      return {
        selected:[],
        programme: false,
        programmer: '',
        search: '',
        popupActivo2:false,
        popupActivo3:false,
        activePrompt9:false,
        select1:3,
        popupActivo5:false,
        options1:[
          {text:'IT',value:0},
          {text:'Blade Runner',value:2},
          {text:'Thor Ragnarok',value:3},
        ],
        checkTrue: true,
        checkFalse: false,
        donnees: null,
        elementChoisi: {
          date_recept: ''
        },
        donneesZones: null,
        donneesCamion: null,
        armateur: [{
              value: "Medlog",
              label: "Medlog"
            }, {
              value: "CMA CGM",
              label: "CMA CGM"
            }, {
              value: "PIL",
              label: "PIL"
            },{
              value: "Maersk",
              label: "Maersk"
            }, {
              value: "Arkas Sogena",
              label: "Arkas Sogena"
            }, {
              value: "MSC",
              label: "MSC"
            }],
        donneesArmateurs: null,
        donneesOrdre: null,
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
        donneesDossiers: null,
        form: {
          date_recept: '',
          n_doc: '',
          n_conteneur: '',
          type_c: '',
          nbre_tcs: 1,
          n_declaration: '',
          bl: '',
          statut: '',
          armateur: '',
          client: '',
          camion: '',
          chauffeur: '',
          zone_livraison: '',
          zone_facturation: '',
          badt: '',
          do: '',
          mode: '',
          navire: '',
          sortie_port: '',
          sejour: '',
          date_requete: '',
          date_recup: '',
          entree_parc: '',
          transitaire: '',
          observation: '',
          restitution: '',
          },
          donneesStatut:[{
            value: 'EN_ROUTE',
            label: 'EN_ROUTE'
          }, {
            value: 'LIVRE',
            label: 'LIVRE'
          }, {
            value: 'A PROGRAMMER',
            label: ''
          }],
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
          }],
          type_cont: [{
            value: "20",
            label: "20"
          },{
            value: "40",
            label: "40"
          }],
          statutt: [{
            value: "VAD",
            label: "VAD"
          },{
            value: "DST",
            label: "DST"
          }, {
            value: "CIRCUIT VERT",
            label: "CIRCUIT VERT"
          }, {
            value: "CIRCUIT JAUNE",
            label: "CIRCUIT JAUNE"
          }, {
            value: "CIRCUIT ROUGE",
            label: "CIRCUIT ROUGE"
          }, {
            value: "SCANNER",
            label: "SCANNER"
          }],
          Modes: [{
            value: "AC",
            label: "AC"
          },{
            value: "REM",
            label: "REM"
          }],
        tableData: [{
            date: '2016-05-03',
            name: 'TRAORE Oumar',
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
      tableRowClassName({row, rowIndex}) {
          if (row.sejour === '') {
            return 'warning-row';
          } else if (row.sejour === 'EN_ROUTE') {
            return 'cours-row';
          } else if (row.sejour === 'LIVRE') {
            return 'success-row';
          }
          console.log(rowIndex)
          return '';
        },
        ordre () {
              this.$vs.loading({
              type:'point',
              })
              fetch('https://socogetra.net/appi_socogetra/soco_dossier_ordres_id.php?ordre='+this.dossier+'&timestamp=' + new Date().getTime())
              .then(response => response.json())
              .then(data => {
                this.donneesOrdre = data.data;
                console.log(this.donneesOrdre);
                this.$vs.loading.close();
              })
              .catch(error => {
                console.log(error);
                this.$vs.loading.close();
              });
          },
          ExportExcel(type, fn, dl) {
            var elt = this.$refs.exportable_table;
            var wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
            return dl ?
              XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
            XLSX.writeFile(wb, fn || ((this.name + '.'|| 'SheetJSTableExport.') + (type || 'xlsx')));
          },
        listeDossier () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_socogetra/soco_ordre_armateur.php?armateur=' + this.$route.params.element + '&timestamp=' + new Date().getTime())
            .then((response) => {
              this.donnees = response.data.data;
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },
        
  
        fullscream() {
          var element = document.body;
          // Demande le mode plein écran pour l'élément sélectionné
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
          }
        },
  
        exitscream() {
          var element = document.body;
  
          // Demande le mode plein écran pour l'élément sélectionné
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
          }
        },
  
        listeZones () {
              this.$vs.loading({
              type:'point',
              })
              axios.get('https://socogetra.net/appi_socogetra/albakoos_zones.php?timestamp=' + new Date().getTime())
              .then((response) => {
                this.donneesZones = response.data.data;
                this.$vs.loading.close()
              }, (error) => {
                console.log(error);
                this.$vs.loading.close()
              });
          },
  
          modifBon(list) {
            this.form = {
            date_recept: list.date_recept,
            n_doc: list.n_doc,
            n_conteneur: list.n_conteneur,
            type_c: list.type_c,
            nbre_tcs: list.nbre_tcs,
            n_declaration: list.n_declaration,
            bl: list.bl,
            statut: list.statut,
            armateur: list.armateur,
            client: list.client,
            camion: list.camion,
            chauffeur: list.chauffeur,
            zone_livraison: list.zone_livraison,
            zone_facturation: list.zone_facturation,
            badt: list.badt,
            do: list.do,
            sortie_port: list.sortie_port,
            sejour: list.sejour,
            date_requete: list.date_requete,
            date_recup: list.date_recup,
            entree_parc: list.entree_parc,
            transitaire: list.transitaire,
            observation: list.observation,
            id_doc: list.id_doc,
            mode: list.mode
            },
            this.popupActivo5 = true;
            console.log(list)
          },
  
          generateReport () {
                this.activePrompt9 = true;
                this.$refs.html2Pdf.generatePdf()
            },
  
          exportToPDF() {
            html2pdf(document.getElementById("html-to-pdf"), {
              margin: 1,
              filename: "i-was-html.pdf",
            });
          },
  
          listeChauffeurs () {
              this.$vs.loading({
              type:'point',
              })
              axios.get('https://socogetra.net/appi_socogetra/albakoos_chauffeurs.php?timestamp=' + new Date().getTime())
              .then((response) => {
                this.donneesChauf = response.data.data;
                this.$vs.loading.close()
              }, (error) => {
                console.log(error);
                this.$vs.loading.close()
              });
          },
  
          Borderau(element) {
            this.elementChoisi = element;
            this.activePrompt9 = true;
            this.generateReport();
          },
          AProgrammer(element) {
            this.elementChoisi = element;
            this.programme = true;
          },
  
          generatePDF () {
              var doc = new jsPDF();
              
              // Récupérer l'élément HTML que vous voulez convertir en PDF
              const element = document.getElementById('html-to-pdf')
    
              // Convertir l'élément HTML en Canvas
              html2canvas(element).then(canvas => {
                // Ajouter le Canvas au document PDF avec une résolution de 300 DPI
                const imgData = canvas.toDataURL('image/png', 2.7);
                doc.addImage(imgData, 'PNG', 10, 10);
                
                // Sauvegarder le document PDF
                doc.save('example.pdf')
              })
            },
  
         // generatePDF () {
          //  var doc = new jsPDF();
  
            // Récupérer l'élément HTML que vous voulez convertir en PDF
          //  const element = document.getElementById('html-to-pdf')
  
            // Convertir l'élément HTML en Canvas
          //  html2canvas(element).then(canvas => {
              // Ajouter le Canvas au document PDF
           //   const imgData = canvas.toDataURL('image/png')
            //  doc.addImage(imgData, 'PNG', 10, 10)
  
              // Sauvegarder le document PDF
           //   doc.save('example.pdf')
          //  })
         // },
  
          listeCamion () {
              this.$vs.loading({
              type:'point',
              })
              axios.get('https://socogetra.net/appi_socogetra/soco_camion.php?timestamp=' + new Date().getTime())
              .then((response) => {
                this.donneesCamion = response.data.data;
                this.$vs.loading.close()
              }, (error) => {
                console.log(error);
                this.$vs.loading.close()
              });
          },
  
          
  
          handleSelectChange(choix) {
            console.log(choix);
            const oumarItem = this.donneesZones.find(item => item.zone_livraison === choix);
            this.form.zone_facturation = oumarItem ? oumarItem.zone_facturation : null;
          },
  
        onSubmit() {
          const mode = this.form.mode
              this.form.mode = mode;
              axios.post('https://socogetra.net/appi_socogetra/soco_ordre_fichier.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.listeDossier();
                  this.popupActivo2 = false,
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Ordre/Fichier Enregistré !',
                  showClose: false
                  });
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },
  
          ChangeStatut() {
            this.elementChoisi.sejour = this.programmer;
            axios.put('https://socogetra.net/appi_socogetra/soco_ordre_fichier.php', this.elementChoisi)
              .then((response) => {
                  console.log(response);
                  this.listeDossier();
                  this.popupActivo5 = false;
                  this.$vs.loading.close();
                  this.$notify.success({
                    title: 'Statut Modifié !',
                  showClose: false
                  });
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },
        
          onUpdate() {
            let lala = this.form.date_recup;
            this.form.date_recup = lala;
              axios.put('https://socogetra.net/appi_socogetra/soco_ordre_fichier.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.listeDossier();
                  this.popupActivo5 = false;
                  this.$vs.loading.close();
                  this.$notify.success({
                    title: 'Ordre/Fichier Modifié !',
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
        this.ordre();
        this.listeDossier();
        this.listeZones();
        this.listeCamion();
        this.listeChauffeurs();
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-input__inner::placeholder {
      color: #201f1f;
  }
  .el-table .warning-row {
    background: oldlace;
  }
  
  .el-table .success-row {
    background: #f0f9eb;
  }
  </style>
  