<template>
    <div class="hello">
        <div class="screenUse">
          <Nav-bar style="width: 100%;"/>
          <vs-row>
            <vs-col vs-w="12" style="overflow:scroll; height: calc(100vh - 48px);">
              <div style="position: fixed; width: 100%; z-index: 1000;">
                <vs-card class="navbar" style="margin-bottom: -10px; border-bottom: 3px solid #f0c1c5;">
                <div style="width: 800px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration /</span> Comptabilité
                  <el-date-picker
                    v-model="dateSearch"
                    type="daterange"
                    range-separator="à"
                    start-placeholder="Date de début"
                    end-placeholder="Date de fin">
                  </el-date-picker>
                  <el-button icon="el-icon-search" circle @click="searchDate()"></el-button>
                </div>
                <span style="float: right; margin-right: 150px;" v-if="users.id == 1 || users.id == 9">
                      <vs-button color="#C32D39"  icon="paid" style="padding: 5px; position: absolute; width: 150px;" @click="popupActivo2=true">Nouvelle dépense</vs-button>
                  </span>
                  <span style="float: right; margin-right: 350px;" v-if="users.id == 1 || users.id == 9">
                      <vs-button color="#67c23a"  icon="paid" style="padding: 5px; position: absolute; width: 180px;" @click="popupActivoCaisse=true">Incrémenter la caisse</vs-button>
                  </span>
                  <span style="float: right; margin-right: 520px;">
                      <vs-button color="#C32D39"  icon="print" style="padding: 5px; position: absolute; width: 150px;" @click="generateReport">Imprimer</vs-button>
                  </span>
                </vs-card>
              </div>
              
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 80px;">
                <vs-row>

                  <vs-col vs-w="2" style="padding-right: 10px;">
                    <el-card class="box-card" style="padding: -15px;  background-color: #ffffff57; border-bottom: 3px solid #13ce66;">
                         <vs-row class="space-zone">
                            <vs-col vs-w="12" style="display: grid;">
                              <vs-row class="space-zone">
                                <vs-col vs-w="12" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 25px" icon="money" color="white" bg="red" round></vs-icon> <b style="font-size: 16px">TOTAL DEPENSES</b><br><br><br>
                                    <span class="prix-zone"> <span style="font-weight: normal; font-size: 20px; font-weight: bold">{{ totalPrix[0].total_depense | devise('XOF') }}</span></span></span>
                                </vs-col>
                              </vs-row>
                            </vs-col>
                          </vs-row>
                    </el-card>
                  </vs-col>
                  
                  <vs-col vs-w="10" style="padding-right: 10px;">
                    <el-card class="box-card" style="padding: -15px;  background-color: #ffffff57; border-bottom: 3px solid #13ce66;">
                         <vs-row class="space-zone">
                            <vs-col vs-w="12" style="display: grid;">
                              <vs-row class="space-zone">
                                <vs-col vs-w="2" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 25px" icon="local_shipping" color="white" bg="orange" round></vs-icon> <b style="font-size: 16px">CAMION</b><br><br><br>
                                    <span class="prix-zone"> <span style="font-weight: normal; font-size: 20px; font-weight: bold">{{ totalSalaireok | devise('XOF') }}</span></span></span>
                                </vs-col>
                                <vs-col vs-w="2" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 25px" icon="devices" color="white" bg="#5e5ee7" round></vs-icon> <b style="font-size: 16px">BUREAUTIQUE</b><br><br><br>
                                    <span class="prix-zone"> <span style="font-weight: normal; font-size: 20px; font-weight: bold">{{ totalVehicule[0].total_depense | devise('XOF') }}</span></span></span>
                                </vs-col>
                                <vs-col vs-w="2" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 25px" icon="confirmation_number" color="white" bg="#13ce66" round></vs-icon> <b style="font-size: 16px">LAISSER-PASSER</b><br><br><br>
                                    <span class="prix-zone"> <span style="font-weight: normal; font-size: 20px; font-weight: bold">{{ totalCarburant[0].total_depense | devise('XOF') }}</span></span></span>
                                </vs-col>
                                <vs-col vs-w="2" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 25px" icon="paid" color="white" bg="gray" round></vs-icon> <b style="font-size: 16px">ROUTE/RATION</b><br><br><br>
                                    <span class="prix-zone"> <span style="font-weight: normal; font-size: 20px; font-weight: bold">{{totalVehicules[0].total_depense | devise('XOF') }}</span></span></span>
                                </vs-col>
                                <vs-col vs-w="2" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 25px" icon="local_police" color="white" bg="blue" round></vs-icon> <b style="font-size: 16px">POLICE/MAIRIE</b><br><br><br>
                                    <span class="prix-zone"> <span style="font-weight: normal; font-size: 20px; font-weight: bold">{{ totalFrais[0].total_depense | devise('XOF') }}</span></span></span>
                                </vs-col>
                                <vs-col vs-w="2" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 25px" icon="local_gas_station" color="white" bg="#13ce66" round></vs-icon> <b style="font-size: 16px">CARBURANT</b><br><br><br>
                                    <span class="prix-zone"> <span style="font-weight: normal; font-size: 20px; font-weight: bold">{{ totalDivers[0].total_depense | devise('XOF') }} {{ totalDivers[0].total_depense/totalPrix[0].total_depense }}</span></span></span>
                                </vs-col>
                              </vs-row>
                            </vs-col>
                          </vs-row>
                    </el-card>
                  </vs-col>
                 
                </vs-row>
                <vs-row>


<!--
                  <vs-col vs-w="3" style="padding-right: 10px;">
                      <el-card class="box-card" style="padding: -15px;  background-color: #c1c5f014;">
                        <vs-icon icon="payments" size="small" bg="#009eff5c" style="color: #6285db; font-size: 20px;" round></vs-icon> <span class="titre-zone">CAISSE -  {{ donneesCaisse[0].total_caisse }}</span>
                            <vs-row class="space-zone">
                              <vs-col vs-w="12" style="display: grid;">
                                <vs-row class="space-zone">
                                  
                                  <vs-col vs-w="6.5" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#efa45b" round></vs-icon> <span style="color: #009eff;" class="prix-zone">{{donneesCaisse[0].total_caisse - totalPrix[0].total_depense}} CFA</span></span>
                                  </vs-col>
                                </vs-row>
                               
                               
                              </vs-col>
                              
                            </vs-row>
                      </el-card>
                    </vs-col>
-->
                  

                    
                  </vs-row>

                  <vs-divider position="left">LISTE DES DEPENSES  <b></b></vs-divider>
                  
                  <el-card class="box-card" style="padding: -15px; border-radius: 20px; width:70%; margin: 0 auto">
                    <vs-table search max-items="20" pagination  stripe :data="donnees" style="font-size: 16px">
                      <template slot="header">
                        <h3>
                          Listes des dépenses
                        </h3>
                      </template>
                      <template slot="thead">
                        <vs-th>
                          Date
                        </vs-th>
                        <vs-th>
                          Type
                        </vs-th>
                        <vs-th>
                          Vehicule / Chauffeur
                        </vs-th>
                        <vs-th>
                          Motif
                        </vs-th>
                        <vs-th>
                          Somme
                        </vs-th>
                        <vs-th>
                          Action
                        </vs-th>
                      </template>

                      <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                          <vs-td :data="data[indextr].email">
                          <span style="color: blue; font-size: 16px">{{data[indextr].date_dep}}</span>
                          </vs-td>

                          <vs-td style="font-size: 16px" :data="data[indextr].username">
                            {{data[indextr].type_dep}}
                          </vs-td>

                          <vs-td
                            label="Vehicule" style="font-size: 16px">
                                {{ data[indextr].matricule }} <span v-if="data[indextr].recu.length >= 2 ">/ {{ data[indextr].recu }}</span>
                          </vs-td>

                          <vs-td style="font-size: 16px" :data="data[indextr].id">
                            {{data[indextr].motif}}
                          </vs-td>

                          <vs-td style="font-size: 16px" :data="data[indextr].id">
                            {{formatMoney(data[indextr].somme)}}
                          </vs-td>
                          <vs-td style="font-size: 16px" :data="data[indextr].id">
                            <el-button type="primary" icon="el-icon-edit" circle @click="modifBon(data[indextr])"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="supBon(data[indextr].id_depense)"></el-button>
                          </vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                 
                  </el-card>
  
                
                <vs-divider/>
                
              </div>
            </vs-col>
          </vs-row>
  
          <vs-popup classContent="popup-example"  title="Nouvelle dépense" :active.sync="popupActivo2">
            <div>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date de la dépense</label>
                  <el-input   type="date" v-model="depensesInfos.date_dep" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Type de dépense</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="depensesInfos.type_dep"
                    >
                    <vs-select-item :key="index" :value="item.text" :text="item.text" v-for="item,index in depensest" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4" v-if="depensesInfos.type_dep == 'CAMION' || depensesInfos.type_dep == 'CARBURANT' || depensesInfos.type_dep == 'LAISSER_PASSER' || depensesInfos.type_dep == 'ROUTE/RATION'">
                  <label>Camion</label>
                  <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="depensesInfos.matricule"
                    >
                    <vs-select-item :key="index" :value="item.imatriculation" :text="item.imatriculation" v-for="item,index in donneesCamion" />
                  </vs-select>
                  
                </vs-col>
                
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4" v-if="depensesInfos.type_dep == 'SALAIRE'">
                  <label>Employé</label>
                  <el-input v-model="depensesInfos.matricule" placeholder="Nom & Prenom">
                  </el-input>
                  
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4" v-if="depensesInfos.type_dep == 'LAISSER_PASSER'">
                  <label>Chauffeur</label>
                  
                  <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="depensesInfos.recu"
                    >
                    <vs-select-item :key="index" :value="item.nom_prenom" :text="item.nom_prenom" v-for="item,index in donneesChauf" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Somme</label>
                  <el-input v-model="depensesInfos.somme" placeholder="Somme">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8" v-if="depensesInfos.type_dep !== 'LAISSER_PASSER'">
                  <label>Motif</label>
                  <el-input v-model="depensesInfos.motif" placeholder="informations">
                  </el-input>
                </vs-col>
              </vs-row>
            </div>
           
            
            <center><vs-button style="margin: 20px; width: 300px;" @click="onSubmit()" color="primary" type="filled">Enregistrer la dépense</vs-button></center>
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

          <vs-popup classContent="popup-example"  title="Modification dépense" :active.sync="popupActivo22">
            <div>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date de la dépense</label>
                  <el-input   type="date" v-model="depensesInfos.date_dep" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Type de dépense</label>
                  <vs-select
                    style="width: 100%;"
                    v-model="depensesInfos.type_dep"
                    >
                    <vs-select-item :key="index" :value="item.text" :text="item.text" v-for="item,index in depensest" />
                  </vs-select>
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4" v-if="depensesInfos.type_dep == 'CAMION' || depensesInfos.type_dep == 'CARBURANT' || depensesInfos.type_dep == 'LAISSER_PASSER' || depensesInfos.type_dep == 'ROUTE/RATION'">
                  <label>Camion {{ form.camion }}</label>
                  <vs-select
                    style="width: 100%;"
                    placeholder="Search and select"
                    class="selectExample"
                    label-placeholder="Autocomplete"
                    autocomplete
                    v-model="depensesInfos.matricule"
                    >
                    <vs-select-item :key="index" :value="item.imatriculation" :text="item.imatriculation" v-for="item,index in donneesCamion" />
                  </vs-select>
                  
                </vs-col>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4" v-if="depensesInfos.type_dep == 'CHAUFFEUR'">
                  <label>Chauffeur</label>
                  
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
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4" v-if="depensesInfos.type_dep == 'SALAIRE'">
                  <label>Employé</label>
                  <el-input v-model="depensesInfos.matricule" placeholder="Nom & Prenom">
                  </el-input>
                  
                </vs-col>
                
              </vs-row>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Somme</label>
                  <el-input v-model="depensesInfos.somme" placeholder="Somme">
                  </el-input>
                </vs-col>
                
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="8">
                  <label>Motif</label>
                  <el-input v-model="depensesInfos.motif" placeholder="informations">
                  </el-input>
                </vs-col>
              </vs-row>
            </div>
           
            
            <center><vs-button style="margin: 20px; width: 300px;" @click="onUpdate()" color="primary" type="filled">Modifier la dépense</vs-button></center>
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

          <vs-popup classContent="popup-example"  title="Nouveau dossier" :active.sync="popupActivoCaisse">
            <div>
              <vs-row>
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                  <label>Date de la dépense</label>
                  <el-input  type="date" v-model="caisseData.date" placeholder="Date de Réception">
                  </el-input>
                </vs-col>
                
                <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4" >
                  <label>Somme</label>
                  <el-input v-model="caisseData.somme" placeholder="Somme">
                  </el-input>
                  
                </vs-col>
                
              </vs-row>
              
            </div>
           
            <center><vs-button style="margin: 20px; width: 300px;" @click="onSubmitCaisse()" color="primary" type="filled">Ajouter à la caisse</vs-button></center>
            
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
              pdf-orientation="landscape"
              pdf-content-width="1000px"

              @progress="onProgress($event)"
              @hasStartedGeneration="hasStartedGeneration()"
              @hasGenerated="hasGenerated($event)"
              ref="html2Pdf"
          >
              <section slot="pdf-content">
                <div>
                  <div style="width: 29.5cm; margin-left: .5cm; margin-top: 20px;" id="html-to-pdf">
                    <div style="width: 100%; padding: 10px">
                      <div style="float: left; display: block;">
                        <img src="../assets/socogetra.jpeg" width="80">
                      </div>
                      <div style="float: left; padding: 12px;">
                        <span style="font-weight: bold; font-size: 19px; font-family: 'Nunito Sans', sans-serif;">LISTE DES DEPENSES - <span><b> </b></span><span style="color: red; font-size: 18px">( total dépenses - <b>{{ totalPrix[0].total_depense}} CFA</b> )</span></span>
                      </div>
                    </div>
                  .
                    <h2></h2>
                    <vs-divider/>
                    <vs-row style="width: 29cm;">


                      <!--
                                        <vs-col vs-w="3" style="padding-right: 10px;">
                                            <el-card class="box-card" style="padding: -15px;  background-color: #c1c5f014;">
                                              <vs-icon icon="payments" size="small" bg="#009eff5c" style="color: #6285db; font-size: 20px;" round></vs-icon> <span class="titre-zone">CAISSE -  {{ donneesCaisse[0].total_caisse }}</span>
                                                  <vs-row class="space-zone">
                                                    <vs-col vs-w="12" style="display: grid;">
                                                      <vs-row class="space-zone">
                                                        
                                                        <vs-col vs-w="6.5" style="display: grid;">
                                                          <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#efa45b" round></vs-icon> <span style="color: #009eff;" class="prix-zone">{{donneesCaisse[0].total_caisse - totalPrix[0].total_depense}} CFA</span></span>
                                                        </vs-col>
                                                      </vs-row>
                                                     
                                                     
                                                    </vs-col>
                                                    
                                                  </vs-row>
                                            </el-card>
                                          </vs-col>
                      -->
                                          <vs-col vs-w="4" style="padding-right: 10px;">
                                            <el-card class="box-card" style="padding: -15px;  background-color: #c1c5f014;">
                                              <vs-icon icon="payments" size="small" bg="#ff000073" style="color: #970303; font-size: 20px;" round></vs-icon> <span class="titre-zone">DEPENSES / CHARGES</span>
                                                  <vs-row class="space-zone">
                                                    <vs-col vs-w="12" style="display: grid;">
                                                      <vs-row class="space-zone">
                                                        
                                                        <vs-col vs-w="12" style="display: grid;">
                                                          <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#efa45b" round></vs-icon> <span style="color: #ef665b;" class="prix-zone">{{totalPrix[0].total_depense}} CFA</span></span>
                                                        </vs-col>
                                                      </vs-row>
                                                     
                                                     
                                                    </vs-col>
                                                    
                                                  </vs-row>
                                            </el-card>
                                          </vs-col>
                      
                                          <vs-col vs-w="8" style="padding-right: 10px;">
                                            <el-card class="box-card" style="padding: -15px;  background-color: #c1c5f014;">
                                              <vs-icon icon="filter_alt" size="small" bg="#009eff5c" style="color: #6285db; font-size: 20px;" round></vs-icon> <span class="titre-zone">CATEGORIES DES DEPENSES</span>
                                                 <vs-row class="space-zone">
                                                    <vs-col vs-w="12" style="display: grid;">
                                                      <vs-row class="space-zone">
                                                        <vs-col vs-w="2" style="display: grid;">
                                                          <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 12px" icon="payments" color="white" bg="#13ce66" round></vs-icon> <span style="color: #13ce66; font-size: 12px;" class="prix-zone">BUREAUTIQUE : {{ totalVehicule[0].total_depense}} CFA</span></span>
                                                        </vs-col>
                                                        <vs-col vs-w="2" style="display: grid;">
                                                          <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 12px" icon="payments" color="white" bg="#ef665b" round></vs-icon> <span style="color: #ef665b; font-size: 12px;" class="prix-zone"> POLICE/MAIRIE : {{totalFrais[0].total_depense}} CFA</span></span>
                                                        </vs-col>
                                                        <vs-col vs-w="2" style="display: grid;">
                                                          <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 12px" icon="payments" color="white" bg="green" round></vs-icon> <span style="color: green; font-size: 12px;" class="prix-zone"> CARBURANT : {{totalDivers[0].total_depense}} CFA</span></span>
                                                        </vs-col>
                                                        <vs-col vs-w="2" style="display: grid;">
                                                          <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 12px" icon="payments" color="white" bg="purple" round></vs-icon> <span style="color: purple; font-size: 12px;" class="prix-zone"> FRAIS ROUTE/RATION : {{totalVehicules[0].total_depense}} CFA</span></span>
                                                        </vs-col>
                                                        <vs-col vs-w="2" style="display: grid;">
                                                          <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 12px" icon="payments" color="white" bg="#000" round></vs-icon> <span style="color: black; font-size: 12px;" class="prix-zone"> LAISER PASSER : {{totalCarburant[0].total_depense}} CFA</span></span>
                                                        </vs-col>
                                                        <vs-col vs-w="2" style="display: grid;">
                                                          <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 12px" icon="payments" color="white" bg="#000" round></vs-icon> <span style="color: black; font-size: 12px;" class="prix-zone"> CAMION : {{totalSalaire[0].total_depense}} CFA</span></span>
                                                        </vs-col>
                                                      </vs-row>
                                                    </vs-col>
                                                  </vs-row>
                                            </el-card>
                                          </vs-col>
                      
                                          
                                        </vs-row>
                    <vs-divider/>
                    <el-table
                          ref="multipleTable"
                          :data="donnees"
                          stripe
                          style="font-size: 10px; margin-left: 1px; font-family: Helvetica; width: 29.5cm"
                          @selection-change="handleSelectionChange">
                          <el-table-column
                            type="selection"
                            width="55">
                            <img style="margin-top: 5px;" src="../assets/camionbenne.png" width="20">
                          </el-table-column>
                          <el-table-column
                              width="110"
                              property="name"
                              label="Date">
                              <template slot-scope="scope">
                              <el-link type="primary" style="font-size:12px"><i class="el-icon-document"></i> {{ scope.row.date_dep }}</el-link>
                              </template>
                          </el-table-column>
                          <el-table-column
                            width="160"
                            label="Type Dépenses">
                            <template slot-scope="scope">
                                {{ scope.row.type_dep }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            width="160"
                            label="Vehicule">
                            <template slot-scope="scope">
                                {{ scope.row.matricule }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            width="310"
                            label="Motif">
                            <template slot-scope="scope">
                                {{ scope.row.motif }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            width="160"
                            label="Somme">
                            <template slot-scope="scope">
                              <b>{{ formatMoney(scope.row.somme) }}</b>
                            </template>
                          </el-table-column>
                          
                        </el-table>
                  </div>
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
    users() {
      return this.$store.state.users;
        }
      },
      filters: {
      devise(valeur, devise) {
        const options = {
          style: 'currency',
          currency: devise,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        };
        return valeur.toLocaleString('fr-FR', options);
      },
    },
    components: {
      NavBar,
      VueHtml2pdf
    },
    data() {
      return {
        dateSearch: [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10)
          ],
        depensesInfos:{
          date_dep: '',
          somme: '',
          motif: '',
          remis: '',
          recu: '',
          matricule: '',
          type_dep: '',
        },
        popupActivo2:false,
        popupActivo22:false,
        popupActivoCaisse:false,
        popupActivo3:false,
        activePrompt9:false,
        select1:3,
        depensest:[
          {text:'CAMION',value:0},
          {text:'CARBURANT',value:1},
          {text:'BUREAUTIQUE',value:2},
          {text:'ROUTE/RATION',value:3},
          {text:'POLICE/MAIRIE',value:4},
          {text:'DIVERS',value:5},
          {text:'LAISSER_PASSER',value:6},

        ],
        caisseData: {
          date: '',
          somme: ''
        },
        checkTrue: true,
        checkFalse: false,
        donnees: null,
        donneesCaisse: null,
        totalPrix: null,
        totalSalaire: null,
        totalSalaireok: 0,
        totalDivers: null,
        totalFrais: null,
        totalCarburant: null,
        totalVehicule: null,
        totalVehicules: null,
        totalCamion: null,
        elementChoisi: null,
        donneesZones: null,
        donneesCamion: null,
        donneesChauf: null,
        deadline3: Date.now(),
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
        deletebon: '',
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
          sortie_port: '',
          sejour: '',
          date_requete: '',
          date_recup: '',
          entree_parc: '',
          transitaire: '',
          observation: ''
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
            value: "20 'OPEN",
            label: "20 'OPEN"
          }, {
            value: "40 'OPEN",
            label: "40 'OPEN"
          }, {
            value: "20 'FLAT",
            label: "20 'FLAT"
          },{
            value: "40 'FLAT",
            label: "40 'FLAT"
          }, {
            value: "20 'DRY",
            label: "20 'DRY"
          }, {
            value: "40 'DRY",
            label: "40 'DRY"
          }, {
            value: "20 'FRIGO",
            label: "20 'FRIGO"
          }, {
            value: "40 'FRIGO",
            label: "40 'FRIGO"
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

      modifBon(list) {
        console.log(list)
        this.depensesInfos = {
          date_dep: list.date_dep,
          somme: list.somme,
          motif: list.motif,
          remis: list.remis,
          recu: list.recu,
          matricule: list.matricule,
          type_dep: list.type_dep,
          id_depense: list.id_depense,
        },
          this.popupActivo22 = true;
          
        },

        supBon(id) {
        this.deletebon = id;
        this.$vs.dialog({
        color:'danger',
        title: `Suppression`,
        text: 'Êtes vous sûre de vouloir supprimer ?',
        accept:this.onDelete
      })
          
        },
  
      listeDepenses () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_socogetra/albakoos_depenses.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donnees = response.data.data;
              this.totalPrix = response.data.total;
              this.totalSalaire = response.data.salaire;
              this.totalSalaireok = response.data.salaire[0].total_depense;
              this.totalVehicule = response.data.vehicule;
              this.totalFrais = response.data.frais;
              this.totalCarburant = response.data.carburant;
              this.totalDivers = response.data.divers;
              this.totalVehicules = response.data.vehicules;
              this.totalPrix = response.data.total;
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        listeCaisse () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_sococit/albakoos_caisse.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesCaisse = response.data.caisse;
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },


        searchDate () {
            this.$vs.loading({
            type:'point',
            })
            const year = this.dateSearch[0].getFullYear();
            const month = String(this.dateSearch[0].getMonth() + 1).padStart(2, '0');
            const day = String(this.dateSearch[0].getDate()).padStart(2, '0');

            const year2 = this.dateSearch[1].getFullYear();
            const month2 = String(this.dateSearch[1].getMonth() + 1).padStart(2, '0');
            const day2 = String(this.dateSearch[1].getDate()).padStart(2, '0');

            let dte_db = `${year}-${month}-${day}`;
            let dte_fn = `${year2}-${month2}-${day2}`;

            axios
                .get('https://socogetra.net/appi_socogetra/albakoos_depense_periode.php?date_db=' + dte_db + '&date_fn=' + dte_fn + '&timestamp=' + new Date().getTime())
                .then(response => (
                  this.donnees = response.data.data,
              this.totalPrix = response.data.total,
              this.totalSalaire = response.data.salaire,
              this.totalSalaireok = response.data.salaire[0].total_depense,
              this.totalVehicule = response.data.vehicule,
              this.totalFrais = response.data.frais,
              this.totalCarburant = response.data.carburant,
              this.totalDivers = response.data.divers,
              this.totalVehicules = response.data.vehicules,
              this.totalPrix = response.data.total,
              this.$vs.loading.close()))

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
              }, (error) => {
                console.log(error);
                this.$vs.loading.close()
              });
          },

          formatMoney(value) {
            const numberValue = parseFloat(value.replace(/ /g, '').replace(/,/g, '.'));
            if (isNaN(numberValue)) {
              return '';
            }
            return numberValue.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'XOF'
            });
          },
  
          handleSelectChange(choix) {
            console.log(choix);
            const oumarItem = this.donneesZones.find(item => item.zone_livraison === choix);
            this.form.zone_facturation = oumarItem ? oumarItem.zone_facturation : null;
          },
  
        onSubmit() {
              axios.post('https://socogetra.net/appi_socogetra/albakoos_depenses.php', this.depensesInfos)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.popupActivo2 = false;
                  this.depensesInfos = {
                    date_dep: '',
                    somme: '',
                    motif: '',
                    remis: '',
                    recu: '',
                    matricule: '',
                    type_dep: '',
                  };
                  this.listeDepenses();
                  this.$notify.success({
                  title: 'Dépense !',
                  message: 'Enregistré avec Succès',
                  showClose: false
                  });
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },

          onUpdate() {
              axios.put('https://socogetra.net/appi_socogetra/albakoos_depenses.php', this.depensesInfos)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.popupActivo2 = false;
                  this.depensesInfos = {
                    date_dep: '',
                    somme: '',
                    motif: '',
                    remis: '',
                    recu: '',
                    matricule: '',
                    type_dep: '',
                  };
                  this.listeDepenses();
                  this.$notify.success({
                  title: 'Dépense !',
                  message: 'Enregistré avec Succès',
                  showClose: false
                  });
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },

          onDelete() {
              axios.delete('https://socogetra.net/appi_socogetra/albakoos_depenses.php?id='+this.deletebon)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.popupActivo2 = false;
                  this.depensesInfos = {
                    date_dep: '',
                    somme: '',
                    motif: '',
                    remis: '',
                    recu: '',
                    matricule: '',
                    type_dep: '',
                  };
                  this.listeDepenses();
                  this.$notify.success({
                  title: 'Dépense !',
                  message: 'Supprimé avec Succès',
                  showClose: false
                  });
              })
              .catch(function (error) {
                  console.log(error);
                  this.$vs.loading.close()
              });
          },


          onSubmitCaisse() {
              axios.post('https://socogetra.net/appi_sococit/albakoos_caisse.php', this.caisseData)
              .then((response) => {
                  console.log(response);
                  this.$vs.loading.close();
                  this.popupActivoCaisse = false;
                  this.listeCaisse();
                  this.$notify.success({
                  title: 'Caisse !',
                  message: 'Incrémentation',
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
        this.listeDepenses();
        this.listeCaisse();
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

  @page {
    margin-bottom: 20mm;
  }
  
  </style>
  