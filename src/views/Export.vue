<template>
    <div class="hello">
        <div class="screenUse">
          <Nav-bar style="width: 100%;"/>
          <vs-row>
            <vs-col vs-w="12" style="overflow:scroll; height: calc(100vh - 48px);">
              <div style="position: fixed; width: 100%; z-index: 1000;">
                <vs-card class="navbar" style="margin-bottom: -10px; border-bottom: 3px solid #f0c1c5;">
                <div style="width: 530px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> <b>EXPORT</b> / Liste des Fichiers <br>( dossier : N° <b></b> )
                </div>
                <span style="float: right; margin-right: 150px;">
                      <vs-button color="#C32D39"  icon="person_add" style="padding: 5px; position: absolute; width: 150px;" @click="popupActivo2=true">Ajouter Conteneur</vs-button>
                  </span>
                
                </vs-card>
              </div>
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 90px;">
                <el-card class="box-card" style="padding: -15px; border-radius: 10px;">
                  <vs-table search max-items="20" pagination  stripe :data="donneesbook" style="font-size: 12px">
                    <template slot="header">
                      <h3>
                        HISTORIQUE EXPORT
                      </h3>
                    </template>
                    <template slot="thead">
                      <vs-th>
                        Date Reception
                      </vs-th>
                      <vs-th>
                        N° Booking
                      </vs-th>
                      <vs-th>
                        N° Conteneur
                      </vs-th>
                      <vs-th>
                        Types
                      </vs-th>
                      <vs-th>
                        Mode
                      </vs-th>
                      <vs-th>
                        Armateur
                      </vs-th>
                      <vs-th>
                        Client / Contact
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
                        Lieu Posit
                      </vs-th>
                      <vs-th>
                        Date Posit
                      </vs-th>
                      <vs-th>
                        Observation
                      </vs-th>
                      <vs-th>
                        Déclaration
                      </vs-th>
                      <vs-th>
                        RELEVE
                      </vs-th>
                      <vs-th>
                        Action
                      </vs-th>
                    </template>
  
                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="data[indextr].date_recept">
                        <span style="color: blue; font-size: 12px; text-align: center">{{data[indextr].date_recept}}</span><br>
                        <span style="color: red; font-size: 12px; text-align: center" v-if="data[indextr].entree_terminal.length >= 5">RECUP</span>
                        </vs-td>
  
                        <vs-td style="font-size: 12px; background: #409eff2b" :data="data[indextr].username">
                          <span style="color:red; font-weight: bold; text-align: center">{{data[indextr].n_doc}}</span>
                        </vs-td>
  
                        <vs-td style="font-size: 12px" :data="data[indextr].username">
                          <b style="color: blue">{{data[indextr].n_conteneur}}</b>
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].type_c}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].mode}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; color: red; text-align: center" :data="data[indextr].username">
                          {{data[indextr].armateur}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].client}} / {{data[indextr].contact}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].camion}} / <span style="color: blue">{{data[indextr].camion2}}</span>
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].chauffeur}} / <span style="color: blue">{{data[indextr].chauffeur2}}</span>
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].zone_livraison}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].zone_facturation}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].lieu_posit}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].date_posit}}
                        </vs-td>
  
                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].observation}}
                        </vs-td>

                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].n_declaration}}
                        </vs-td>

                        <vs-td style="font-size: 12px; text-align: center" :data="data[indextr].username">
                          {{data[indextr].entree_terminal}}
                        </vs-td>
  
                        
                        <vs-td style="font-size: 12px" :data="data[indextr].mode">
                          <el-button type="primary" icon="el-icon-edit" circle @click="modifBon(data[indextr])"></el-button>
                          <el-button type="success" icon="el-icon-truck" circle @click="releveBon(data[indextr])"></el-button>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                  </el-card>
  
                
                <vs-divider/>
                
              </div>
            </vs-col>
          </vs-row>
  
          <vs-popup classContent="popup-example"  :title="'Nouveau Book - '" :active.sync="popupActivo2">
            <div>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date de Réception</label>
                  <el-input   type="date" v-model="form.date_recept" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Booking</label>
                  <el-input v-model="form.n_doc" placeholder="N° Booking" :value="donneesbook.n_doc">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Conteneur</label>
                  <el-input v-model="form.n_conteneur" placeholder="N° Conteneur">
                  </el-input>
                </vs-col>
                
              </vs-row>

              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Armateur</label>
                  <vs-select
                    @change="handleSelectChange($event)"
                    style="width: 100%;"
                    v-model="form.armateur"
                    >
                      <vs-select-item :key="index" :value="item.label" :text="item.label" v-for="item,index in armateur" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Mode</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.mode"
                    >
                    <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in mode_cont" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Type</label>
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
                  <label>Client</label>
                  <el-input style="width: 100%;" v-model="form.client" placeholder="Nom client">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="3">
                  <label>Contact</label>
                  <el-input style="width: 100%;" v-model="form.contact" placeholder="Contact">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="3">
                  <label>Zone de livraison</label>
                  <vs-select
                    @change="handleSelectChange($event)"
                    style="width: 100%;"
                    v-model="form.zone_livraison"
                    >
                      <vs-select-item :key="index" :value="item.zone_livraison" :text="item.zone_livraison" v-for="item,index in donneesZones" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="2">
                  <label>Zone factur..</label>
                  <el-input disabled  style="width: 100%;" v-model="form.zone_facturation" placeholder="ZONE">
                  </el-input>
                </vs-col>
                
              </vs-row>
              
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Camion Posit</label>
                  <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="form.camion"
                    >
                    <vs-select-item :key="index" :value="item.imatriculation" :text="item.imatriculation" v-for="item,index in donneesCamion" />
                  </vs-select>
                  
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Chauffeur Posit</label>
                  
                  <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="form.chauffeur"
                    >
                    <vs-select-item :key="index" :value="item.nom_prenom" :text="item.nom_prenom" v-for="item,index in donneesChauf" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Lieu Posit</label>
                  <el-input style="width: 100%;" v-model="form.lieu_posit" placeholder="Lieu posit">
                  </el-input>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date Posit</label>
                  <el-input   type="date" v-model="form.date_posit" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                  <label>Observation</label>
                  <el-input  type="textarea" v-model="form.observation" placeholder="Observation">
                  </el-input>
                </vs-col>
                
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

          <vs-popup classContent="popup-example"  title="Modification Booking" :active.sync="popupActivo5">
            <div>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date de Réception</label>
                  <el-input   type="date" v-model="form.date_recept" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Booking</label>
                  <el-input v-model="form.n_doc" placeholder="N° Booking" :value="donneesbook.n_doc">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Conteneur</label>
                  <el-input v-model="form.n_conteneur" placeholder="N° Conteneur">
                  </el-input>
                </vs-col>
                
              </vs-row>

              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Armateur</label>
                  <vs-select
                    @change="handleSelectChange($event)"
                    style="width: 100%;"
                    v-model="form.armateur"
                    >
                      <vs-select-item :key="index" :value="item.label" :text="item.label" v-for="item,index in armateur" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Mode</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="form.mode"
                    >
                    <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in mode_cont" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Type</label>
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
                  <label>Client</label>
                  <el-input style="width: 100%;" v-model="form.client" placeholder="Nom client">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="3">
                  <label>Contact</label>
                  <el-input style="width: 100%;" v-model="form.contact" placeholder="Contact">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="3">
                  <label>Zone de livraison</label>
                  <vs-select
                    @change="handleSelectChange($event)"
                    style="width: 100%;"
                    v-model="form.zone_livraison"
                    >
                      <vs-select-item :key="index" :value="item.zone_livraison" :text="item.zone_livraison" v-for="item,index in donneesZones" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="2">
                  <label>Zone factur..</label>
                  <el-input disabled  style="width: 100%;" v-model="form.zone_facturation" placeholder="ZONE">
                  </el-input>
                </vs-col>
                
              </vs-row>
              
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Camion Posit</label>
                  <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="form.camion"
                    >
                    <vs-select-item :key="index" :value="item.imatriculation" :text="item.imatriculation" v-for="item,index in donneesCamion" />
                  </vs-select>
                  
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Chauffeur Posit</label>
                  
                  <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="form.chauffeur"
                    >
                    <vs-select-item :key="index" :value="item.nom_prenom" :text="item.nom_prenom" v-for="item,index in donneesChauf" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Lieu Posit</label>
                  <el-input style="width: 100%;" v-model="form.lieu_posit" placeholder="Lieu posit">
                  </el-input>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date Posit</label>
                  <el-input   type="date" v-model="form.date_recept" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                  <label>Observation</label>
                  <el-input  type="textarea" v-model="form.observation" placeholder="Observation">
                  </el-input>
                </vs-col>
                
              </vs-row>
              
            </div>
           
            
            <center><vs-button style="margin: 20px; width: 300px;" @click="onUpdate()" color="primary" type="filled">Enregistrer le dossier</vs-button></center>
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

          <vs-popup classContent="popup-example"  title="RELEVAGE Booking" :active.sync="popupActivo6">
            <div>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date de Réception</label>
                  <el-input   type="date" v-model="form.date_recept" placeholder="Date de Réception" disabled>
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Booking</label>
                  <el-input v-model="form.n_doc" placeholder="N° Booking" :value="donneesbook.n_doc" disabled>
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>N° Conteneur</label>
                  <el-input v-model="form.n_conteneur" placeholder="N° Conteneur" disabled>
                  </el-input>
                </vs-col>
                
              </vs-row>

              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Armateur</label>
                  <el-input v-model="form.armateur" placeholder="N° Conteneur" disabled>
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Mode</label>
                  <el-input v-model="form.mode" placeholder="N° Conteneur" disabled>
                  </el-input>
                 
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Type</label>
                  <el-input v-model="form.type_c" placeholder="N° Conteneur" disabled>
                  </el-input>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Client</label>
                  <el-input style="width: 100%;" v-model="form.client" placeholder="Nom client" disabled>
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="3">
                  <label>Contact</label>
                  <el-input style="width: 100%;" v-model="form.contact" placeholder="Contact" disabled>
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="3">
                  <label>Zone de livraison</label>
                  <el-input v-model="form.zone_livraison" placeholder="N° Conteneur" disabled>
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="2">
                  <label>Zone factur..</label>
                  <el-input disabled  style="width: 100%;" v-model="form.zone_facturation" placeholder="ZONE">
                  </el-input>
                </vs-col>
                
              </vs-row>
              
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Camion Posit</label>
                  <el-input v-model="form.camion" placeholder="N° Conteneur" disabled>
                  </el-input>
                  
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Chauffeur Posit</label>
                  <el-input v-model="form.chauffeur" placeholder="N° Conteneur" disabled>
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Lieu Posit</label>
                  <el-input style="width: 100%;" v-model="form.lieu_posit" placeholder="Lieu posit" disabled>
                  </el-input>
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date Posit</label>
                  <el-input   type="date" v-model="form.date_recept" placeholder="Date de Réception" disabled>
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                  <label>Observation</label>
                  <el-input  type="textarea" v-model="form.observation" placeholder="Observation" disabled>
                  </el-input>
                </vs-col>
                
              </vs-row>
              
            </div>
            <vs-divider style="font-family: 'Nunito Sans', sans-serif; font-size: 16px; font-weight: bold">RELEVAGE</vs-divider>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Date Rélévage</label>
                <el-input   type="date" v-model="form.entree_terminal" placeholder="Date de Rélévage">
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>N° Déclaration</label>
                <el-input v-model="form.n_declaration" placeholder="N° Déclaration" >
                </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Navire</label>
                <el-input v-model="form.navire" placeholder="Navire">
                </el-input>
              </vs-col>
              
            </vs-row>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Camion Rélévage</label>
                <vs-select
                  style="width: 100%;"
                  placeholder="Search and select"
                  class="selectExample"
                  label-placeholder="Autocomplete"
                  autocomplete
                  v-model="form.camion2"
                  >
                  <vs-select-item :key="index" :value="item.imatriculation" :text="item.imatriculation" v-for="item,index in donneesCamion" />
                </vs-select>
                
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                <label>Chauffeur Rélévage</label>
                
                <vs-select
                  style="width: 100%;"
                  placeholder="Search and select"
                  class="selectExample"
                  label-placeholder="Autocomplete"
                  
                  autocomplete
                  v-model="form.chauffeur2"
                  >
                  <vs-select-item :key="index" :value="item.nom_prenom" :text="item.nom_prenom" v-for="item,index in donneesChauf" />
                </vs-select>
              </vs-col>
              
            </vs-row>
            
            <center><vs-button style="margin: 20px; width: 300px;" @click="Relevage()" color="primary" type="filled">Enregistrer le dossier</vs-button></center>
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
  
          <vs-popup classContent="popup-example"  title="Bordereau de livraison" :active.sync="activePrompt9">
            
            <center style="width: 21cm;">
              
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
                        <img src="../assets/logo_beldal.jpg" width="185">
                      </div>
                      <div style="float: left; padding: 12px;">
                        <span style="font-weight: bold; font-size: 19px; font-family: 'Nunito Sans', sans-serif;">BORDEREAU DE LIVRAISON CONTENEUR</span>
                      </div>
                    </div>
                    .
                    <div>
                      <vs-divider style="font-family: 'Nunito Sans', sans-serif;">03/04/2023</vs-divider>
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
                          <el-input placeholder="" value="          ">
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
  
                        <vs-col vs-w="3" style="padding: 5px">
                          <el-input placeholder="" value="SCANNER">
                            <template slot="prepend">ST</template>
                          </el-input>
                        </vs-col>
  
                        <vs-col vs-w="4.5" style="padding: 5px">
                          <el-input placeholder="" value="CHASSIS">
                            <template slot="prepend">MODE LIVRAISON</template>
                          </el-input>
                        </vs-col>
                    
                      </vs-row>
                      <vs-row style="padding-top: 10px">
                        <vs-col vs-w="4" style="padding: 5px; font-family: 'Nunito Sans', sans-serif;">
                          <b style="font-size: 14px;">CLIENT : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.client }}</span>
                        </vs-col>
                        <vs-col vs-w="4" style="padding: 5px">
                          <b style="font-size: 14px;">TRANSITAIRE : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.transitaire }}</span>
                        </vs-col>
                        <vs-col vs-w="4" style="padding: 5px">
                          <b style="font-size: 14px;">ARMATEUR : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.armateur }}</span>
                        </vs-col>
                        
                      </vs-row>
                      <vs-row style="padding-top: 10px">
                        <vs-col vs-w="4" style="padding: 5px">
                          <b style="font-size: 14px;">Zone de livraison : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.zone_livraison }}</span>
                        </vs-col>
                        <vs-col vs-w="4" style="padding: 5px">
                          <b style="font-size: 14px;">CHAUFFEUR : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.chauffeur }}</span>
                        </vs-col>
                        <vs-col vs-w="4" style="padding: 5px">
                          <b style="font-size: 14px;">CAMION : </b> 
                          <span style="color: gray; font-size: 14px;">{{ elementChoisi.camion }}</span>
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
                    <b style="font-family: 'Nunito Sans', sans-serif;"><span>NB : Votre adresse de récupération à adresser à l'armateur et nous mettre en copie sur le : <span style="color:darkblue">info.execution@sbtl.ci</span></span></b>
                  
                  </div>
                </section>
            </vue-html2pdf>
             
                    
            </center>
                  
           
          </vs-popup>
        </div>
       
    </div>
  </template>
  
  <script>
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
          users() {
            return this.$store.state.users;
          },
        },
    components: {
      NavBar,
      VueHtml2pdf
    },
    data() {
      return {
        popupActivo2:false,
        popupActivo3:false,
        activePrompt9:false,
        select1:3,
        popupActivo5:false,
        popupActivo6:false,
        options1:[
          {text:'IT',value:0},
          {text:'Blade Runner',value:2},
          {text:'Thor Ragnarok',value:3},
        ],
        checkTrue: true,
        checkFalse: false,
        donnees: null,
        elementChoisi: null,
        donneesZones: null,
        donneesCamion: null,
        donneesOrdre: null,
        donneesbook: {
          date_recept: '',
          n_doc: '',
          n_conteneur: '',
          type_c: '',
          mode: 1,
          n_declaration: '',
          lieu_posit: '',
          armateur: '',
          client: '',
          camion: '',
          chauffeur: '',
          zone_livraison: '',
          zone_facturation: '',
          chauffeur2: '',
          camion2: '',
          contact: '',
          navire: '',
          date_posit: '',
          entree_terminal: '',
          observation: '',
          agent: '',
          },
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
          date_recept: '',
          n_doc: '',
          n_conteneur: '',
          type_c: '',
          contact: '',
          mode: 1,
          n_declaration: '',
          lieu_posit: '',
          armateur: '',
          client: '',
          camion: '',
          chauffeur: '',
          zone_livraison: '',
          zone_facturation: '',
          chauffeur2: '',
          camion2: '',
          navire: '',
          date_posit: '',
          entree_terminal: '',
          observation: '',
          agent: '',
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
          }],
          type_cont: [{
            value: "20'",
            label: "20'"
          }, {
            value: "40'",
            label: "40'"
          }],
          mode_cont: [{
            value: "AC",
            label: "AC"
          }, {
            value: "Rem",
            label: "Rem"
          }],
          armateur: [{
            value: "Evergreen",
            label: "Evergreen"
          }, {
            value: "Maersk",
            label: "Maersk"
          }, {
            value: "Safmarine",
            label: "Safmarine"
          },{
            value: "Cosco",
            label: "Cosco"
          }, {
            value: "One",
            label: "One"
          }, {
            value: "PIL",
            label: "PIL"
          }, {
            value: "Oma",
            label: "Oma"
          }, {
            value: "Medlog",
            label: "Medlog"
          }, {
            value: "CMA CGM",
            label: "CMA CGM"
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
          Ntcs: 0,
          Daterecept: null,
          Ndoc : 0,
      }
    },
    methods: {
          book () {
            this.$vs.loading({
              type:'point', 
              })
              fetch('https://socogetra.net/appi_socogetra/soco_booking_id.php?book='+ this.dossier +'&timestamp=' + new Date().getTime())
                .then(response => response.json())
                .then(data => {
                this.donneesbook = data.data;
                console.log(this.donneesbook);
                this.$vs.loading.close();
                })
                .catch(error => {
                console.log(error);
                this.$vs.loading.close();
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
            produit: list.produit,
            lieu_posit: list.lieu_posit,
            armateur: list.armateur,
            client: list.client,
            camion: list.camion,
            chauffeur: list.chauffeur,
            zone_livraison: list.zone_livraison,
            zone_facturation: list.zone_facturation,
            chauffeur2: list.chauffeur2,
            camion2: list.camion2,
            navire: list.navire,
            voyages: list.voyages,
            date_posit: list.date_posit,
            poids: list.poids,
            entree_terminal: list.entree_terminal,
            autre: list.autre,
            observation: list.observation,
            id_doc: list.id_doc,
            },
            this.popupActivo5 = true;
            console.log(list)
          },

          releveBon(list) {
            this.form = {
            date_recept: list.date_recept,
            n_doc: list.n_doc,
            n_conteneur: list.n_conteneur,
            type_c: list.type_c,
            nbre_tcs: list.nbre_tcs,
            n_declaration: list.n_declaration,
            produit: list.produit,
            lieu_posit: list.lieu_posit,
            armateur: list.armateur,
            client: list.client,
            camion: list.camion,
            chauffeur: list.chauffeur,
            zone_livraison: list.zone_livraison,
            zone_facturation: list.zone_facturation,
            chauffeur2: list.chauffeur2,
            camion2: list.camion2,
            navire: list.navire,
            voyages: list.voyages,
            date_posit: list.date_posit,
            poids: list.poids,
            entree_terminal: list.entree_terminal,
            autre: list.autre,
            observation: list.observation,
            id_doc: list.id_doc,
            },
            this.popupActivo6 = true;
            console.log(list)
          },
  
          generateReport () {
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
                this.filtreUser();
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
              axios.get('https://socogetra.net/appi_socogetra/albakoos_camion.php?timestamp=' + new Date().getTime())
              .then((response) => {
                this.donneesCamion = response.data.data;
                this.$vs.loading.close()
                this.filtreUser();
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
              this.form.agent = this.users.id;
              axios.post('https://socogetra.net/appi_socogetra/soco_book.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.popupActivo2 = false,
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Ordre/Fichier Enregistré!',
                  showClose: false
                  });
                  this.book();
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },

          Relevage() {
            axios.put('https://socogetra.net/appi_socogetra/soco_book_relevage.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.popupActivo6 = false;
                  this.ordre();
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'RELEVE',
                  showClose: false
                  });
                  this.book();
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },
        
          onUpdate() {
              axios.put('https://socogetra.net/appi_socogetra/soco_book.php', this.form)
              .then((response) => {
                  console.log(response);
                  this.popupActivo5 = false;
                  this.ordre();
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Modifié avec succès !',
                  showClose: false
                  });
                  this.book();
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
        this.book();
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
  
  </style>
  