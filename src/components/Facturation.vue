<template>
  <div class="hello">
      <div v-if="isMobile">
        <Nav-bar style="width: 100%;"/>
        <vs-row>
          
          <vs-col vs-w="12" style="overflow:scroll; height: calc(100vh - 48px);">
            <div style="position: fixed; width: 100%; z-index: 1000;">
              <vs-card class="navbar" style="margin-bottom: -10px; border-bottom: 3px solid #f0c1c5;">
              <div style="width: 400px; float: left; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 16px;"></vs-icon> FACTURATION /</span> Dashboard
              </div>
              
              </vs-card>
            </div>
            
            <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 50px;">

              <vs-divider position="left"><img style="margin-top: 5px;" src="../assets/sogecit.png" width="100"></vs-divider>
              <el-card class="box-card" style="padding: -15px;  background-color: #fff; margin-bottom: 10px;">
                <vs-row>
                  <vs-col vs-w="6">
                    <span>Sélection date</span>
                  </vs-col>
                  <vs-col vs-w="6">
                    <input v-on:input="onSubmit()" type="date" v-model="formDate.dateBen" style="float: right">
                  </vs-col>
                </vs-row>
              </el-card>
              
              <vs-row>

                <vs-col vs-w="12" style="">
                    <el-card class="box-card" style="padding: -15px;  background-color: #ffffff57;">
                      <vs-icon icon="local_shipping" size="small" bg="#f0c1c5" style="color: #c22d39; font-size: 20px;" round></vs-icon> <span class="titre-zone">Total Livraison Import</span>
                          <vs-row class="space-zone">
                            <vs-col vs-w="12" style="display: grid;">
                              <vs-row class="space-zone">
                                <vs-col vs-w="5.5" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="local_shipping" color="white" bg="#409eff" round></vs-icon> <span class="prix-zone">{{ donneesStats.nb_voyages }} <span style="font-weight: normal;">voyages</span></span></span>
                                </vs-col>
                                <vs-col vs-w="6.5" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#efa45b" round></vs-icon> <span style="color: #009eff;" class="prix-zone">0 CFA</span></span>
                                </vs-col>
                              </vs-row>
                              
                            </vs-col>
                            
                          </vs-row>
                    </el-card>
                  </vs-col>

                  <vs-col vs-w="12" style=" margin-top: 15px">
                    <el-card class="box-card" style="padding: -15px;  background-color: #ffffff57;">
                      <vs-icon icon="filter_alt" size="small" bg="#009eff5c" style="color: #6285db; font-size: 20px;" round></vs-icon> <span class="titre-zone" v-if="donneesStats.dn_carb[0].total !== null && donneesStats.dn_carb[0].total !== undefined">Total Livraison Export</span>
                         <vs-row class="space-zone">
                            <vs-col vs-w="12" style="display: grid;">
                              <vs-row class="space-zone">
                                <vs-col vs-w="5.5" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="filter_alt" color="white" bg="#13ce66" round></vs-icon> <span class="prix-zone" v-if="donneesStats.dn_carb[0].litre !== null && donneesStats.dn_carb[0].litre !== undefined">{{ donneesStats.dn_carb[0].litre }} <span style="font-weight: normal;">litres</span></span></span>
                                </vs-col>
                                <vs-col vs-w="6.5" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#efa45b" round></vs-icon> <span style="color: #009eff;" class="prix-zone" v-if="donneesStats.dn_carb[0].prix !== null && donneesStats.dn_carb[0].prix !== undefined">{{ formatMoney(donneesStats.dn_carb[0].prix) }}</span></span>
                                </vs-col>
                              </vs-row>
                            </vs-col>
                          </vs-row>
                    </el-card>
                  </vs-col>

                  <vs-col vs-w="12" style=" margin-top: 15px">
                    <el-card class="box-card" style="padding: -15px;  background-color: #ffffff57;">
                      <vs-icon icon="payments" size="small" bg="#009eff5c" style="color: #6285db; font-size: 20px;" round></vs-icon> <span class="titre-zone">Total Dépenses</span>
                         <vs-row class="space-zone">
                            <vs-col vs-w="12" style="display: grid;">
                              <vs-row class="space-zone">
                                <vs-col vs-w="5.5" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#640064" round></vs-icon> <span class="prix-zone" v-if="donneesStats.dn_dep[0].total !== null && donneesStats.dn_dep[0].total !== undefined">{{ donneesStats.dn_dep[0].total }} <span style="font-weight: normal;">dépenses</span></span></span>
                                </vs-col>
                                <vs-col vs-w="6" style="display: grid;">
                                  <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="payments" color="white" bg="#efa45b" round></vs-icon> <span style="color: #009eff;" class="prix-zone" v-if="donneesStats.dn_dep[0].prix !== null && donneesStats.dn_dep[0].prix !== undefined">{{ formatMoney(donneesStats.dn_dep[0].prix) }}</span></span>
                                </vs-col>
                              </vs-row>
                            </vs-col>
                          </vs-row>
                    </el-card>
                  </vs-col>
                </vs-row>

                <vs-divider position="left">.</vs-divider>
                
                <el-card class="box-card" style="padding: -15px; border-radius: 20px;">
                
                <el-table
                  stripe
                  ref="multipleTable"
                  :data="donneesStats.tableau"
                  style="width: 100%; font-family: Helvetica;"
                  >
                  <el-table-column
                    type="selection"
                    width="55">
                    <img style="margin-top: 5px;" src="../assets/camionbenne.png" width="25">
                  </el-table-column>
                  <el-table-column
                    property="name"
                    label="CAMION">
                    <template slot-scope="scope">
                     
                      <el-link type="primary" @click="Borderau(scope.row)"> {{ scope.row.imatriculation }}</el-link>
                      
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="VOY"
                    property="nombre_de_bennes"
                    width="55">
                  </el-table-column>
                  
                  <el-table-column
                    label="CARB"
                    property="litre">
                    <template slot-scope="scope">
                     
                     <span>{{ scope.row.litre }} L</span>
                     
                   </template>
                  </el-table-column>
                  
                </el-table>
                </el-card>

              
              <vs-divider/>
              
            </div>
          </vs-col>
        </vs-row>
      </div>
      <div v-else class="screenUse">
        <Nav-bar style="width: 100%;"/>
        <vs-row>
          <vs-col vs-w="12" style="overflow:scroll; height: calc(100vh - 48px);">
            <div style="position: fixed; width: 100%; z-index: 1000;">
              <vs-card class="navbar" style="margin-bottom: -10px; border-bottom: 3px solid #f0c1c5;">
              <div style="width: 100%; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
                <span style="color: #C32D39;" @click="obtenirOTP()"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Facturation /</span> IMPORT
                <vs-button to="/administration/factures" color="#C32D39"  icon="list" style="padding: 5px; position: absolute; width: 150px;" @click="popupActivo2=true">Historique</vs-button>
              </div>
              <span style="float: right; margin-right: 150px;">
                
              </span>   
              </vs-card>
            </div>
            
            <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;">

                <vs-divider position="left">FACTURATION PAR ARMATEUR <b>IMPORT</b></vs-divider>
                <vs-row>

                    <vs-col vs-w="3" style="padding-right: 10px;" v-for="item in donneesArm" :key="item.armateur">
                      <el-card class="box-card" style="padding: -15px;  background-color: #ffffff57; border-bottom: 3px solid #13ce66;">
                        <vs-icon icon="local_shipping" size="small" bg="#009eff5c" style="color: #6285db; font-size: 20px;" round></vs-icon> <span class="titre-zone" @click="armateurs(item.armateur)">{{item.armateur.toUpperCase()}}</span>
                           <vs-row class="space-zone">
                              <vs-col vs-w="12" style="display: grid;">
                                <vs-row class="space-zone">
                                  <vs-col vs-w="4" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="inventory_2" color="white" bg="orange" round></vs-icon> <b style="font-size: 16px">En attente</b><br><br><br>
                                    <span class="prix-zone">{{ item.npaye }} <span style="font-weight: normal;">Tc(s)</span></span></span>
                                  </vs-col>
                                 
                                  <vs-col vs-w="4" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="done_all" color="white" bg="#13ce66" round></vs-icon> <b style="font-size: 16px">Payés</b><br><br><br>
                                      <span class="prix-zone">{{ item.paye }} <span style="font-weight: normal;">Tc(s)</span></span></span>
                                  </vs-col>

                                  <vs-col vs-w="4" style="display: grid;">
                                    <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 15px" icon="money" color="white" bg="#5e5ee7" round></vs-icon> <b style="font-size: 16px">Restant</b><br><br><br>
                                    <span class="prix-zone">{{ item.nombre - item.npaye - item.paye }} <span style="font-weight: normal;">Tc(s)</span></span></span>
                                  </vs-col>
                                </vs-row>
                              </vs-col>
                            </vs-row>
                      </el-card>
                    </vs-col>
  
                   
                  </vs-row>

                  <vs-divider position="left">.</vs-divider>



                  <table border="1" ref="exportable_table" v-show="false">
                    <tbody >
                    <tr>
                        <th>ZONE</th>
                        <th>MODE</th>
                        <th>TYPE</th>
                        <th>NOMBRE</th>
                    </tr>
                    <tr v-for="(item, i) in donneesZones" :key="i">
                      <td >{{item.zone_facturation}}</td>
                        <td>{{item.mode}}</td>
                        <td>{{item.type_c}}</td>
                        <td>{{item.nombre}}</td>
                    </tr>
                    </tbody>
                </table>

                <div style="background-color: white;">
                  <vs-row>
                    
                    <vs-col vs-w="12" style="display: grid;">
                        {{ donneesDossierss }}
                      <vs-table search max-items="20" pagination  :data="donneesDossiers" style="font-size: 12px">
                        <template slot="header">
                            <h3>RESUME DE FACTURATION <el-link type="success" @click="ExportExcel('xls')"><img src="../assets/excel.png" width="14"> EXPORTER</el-link></h3>
                        </template>
                        <template slot="thead">
                          <vs-th>
                            N° Dossier
                          </vs-th>
                          <vs-th>
                            Reception
                          </vs-th>
                          <vs-th>
                            Client
                          </vs-th>
                          <vs-th>
                            Armateur
                          </vs-th>
                          <vs-th>
                            EIR
                          </vs-th>
                          <vs-th>
                            ZONE
                          </vs-th>
                          <vs-th>
                            DECLARATION
                          </vs-th>
                          <vs-th>
                            BL
                          </vs-th>
                          <vs-th>
                            Réf/Doc
                          </vs-th>
                          <vs-th>
                            N° Fact
                          </vs-th>
                          <vs-th>
                            Somme
                          </vs-th>
                          <vs-th>
                            Paiement
                          </vs-th>
                          <vs-th>
                            Statut
                          </vs-th>
                          
                        </template>
      
                        <template slot-scope="{data}">
                          <vs-tr :state="data[indextr].badt.length >= 1000?'success':indextr == 2000?'danger':null" :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr].badt">
                              <vs-chip transparent color="danger">
                                <vs-button color="primary" type="flat"><b>{{ data[indextr].n_doc }}</b></vs-button>
                              </vs-chip>
                              <vs-button color="warning" type="flat" @click="Facturer(data[indextr].n_doc, data[indextr].client)"><b>Payé</b></vs-button>
                            </vs-td>
      
                            <vs-td style="font-size: 12px; background: #409eff2b" :data="data[indextr].username">
                              <span style="color:red; font-weight: bold;"  @click="ChangeStatut()">{{data[indextr].date_recept}}</span>
                            </vs-td>
      
                            <vs-td style="font-size: 12px" :data="data[indextr].username">
                              <b style="font-size: 11px;">{{ data[indextr].client }}</b>
                            </vs-td>
      
                            <vs-td style="font-size: 12px;" :data="data[indextr].type_c">
                              {{data[indextr].armateur}}
                            </vs-td>
      
                            <vs-td style="font-size: 12px; color: red;" :data="data[indextr].type_c">
                              {{data[indextr].nombre}}
                              <span v-if="data[indextr].nombre == data[indextr].recupere" style="color:#fab804; font-weight: bold">OK</span>
                            </vs-td>
      
                            <vs-td style="font-size: 12px;" :data="data[indextr].type_c">
                              {{data[indextr].zone_livraison}}
                            </vs-td>
      
                            <vs-td style="font-size: 12px;" :data="data[indextr].type_c">
                              <vs-button color="primary" type="flat">{{ data[indextr].n_declaration }}</vs-button>
                            </vs-td>
      
                            <vs-td style="font-size: 12px;" :data="data[indextr].type_c">
                              <vs-button color="primary" type="flat">{{ data[indextr].bl }}</vs-button>
                            </vs-td>
                            
                            <vs-td style="font-size: 12px;" :data="data[indextr].type_c">
                              {{data[indextr].reference}}
                            </vs-td>

                            <vs-td style="font-size: 12px;" :data="data[indextr].type_c">
                              {{data[indextr].n_facture}}
                            </vs-td>
                            <vs-td style="font-size: 12px;" :data="data[indextr].type_c">
                              {{data[indextr].somme}}
                            </vs-td>

                            <vs-td style="font-size: 12px;" :data="data[indextr].date_paiement">
                              {{data[indextr].date_paiement}}
                            </vs-td>

                            <vs-td style="font-size: 12px;" :data="data[indextr].type_c">
                              <span v-if="data[indextr].statut == null">Non facturé</span>
                              <span v-if="data[indextr].statut != ''"><vs-icon v-if="data[indextr].statut == 'payé'" style=" padding: 3px; font-size: 16px" icon="done_all" color="white" bg="#13ce66" round></vs-icon> <b style="font-size: 18px" v-if="data[indextr].statut == 'payé'">PAYE</b><b style="font-size: 18px" v-if="data[indextr].statut == 'Non payé'">Non Payé</b></span>
                            </vs-td>
      
                            
                            <vs-td style="font-size: 12px" :data="data[indextr].type_c">
                              <el-button type="warning" icon="el-icon-money" v-if="data[indextr].reference != null || data[indextr].n_facture != null" circle  @click="FacturerrMod(data[indextr])"></el-button>
                              <el-button type="success" icon="el-icon-money" v-else circle  @click="Facturerr(data[indextr].n_doc, data[indextr].client)"></el-button>
                              <el-button type="info" icon="el-icon-money" v-if="data[indextr].reference != null || data[indextr].n_facture != null" circle  @click="Facturepdf(data[indextr])"></el-button>
                              <el-button type="primary" icon="el-icon-view" circle  @click="Visite(data[indextr].n_doc)"></el-button>
                            </vs-td>
                          </vs-tr>
                        </template>
                      </vs-table>
                      
                     
                    </vs-col>
                    <vs-col vs-w="12" style="display: grid;">
                      
                      
                    </vs-col>
                  </vs-row>
                </div>
                
              <vs-divider/>
              
            </div>

          </vs-col>
        </vs-row>

        <vs-prompt
          @cancel="val=''"
          @accept="Facturons"
          @close="close"
          :title="'Facturation: '+ dossierClient"
          :active.sync="facturation">
          <div class="con-exemple-prompt">
              N° de la facture
            <vs-input placeholder="Référence" v-model="refFacture"/>
          </div>
        </vs-prompt>

        <vs-prompt
          @cancel="val=''"
          @accept="Facturations"
          @close="close"
          :title="'Facturation: '+ dossierClient"
          :active.sync="facturationn">
          <div class="con-exemple-prompt">
              N° de la facture
            <vs-input placeholder="Référence" v-model="Fact.ref"/>
            <vs-input placeholder="N° Facture" v-model="Fact.num"/>
            <vs-input placeholder="Somme" v-model="Fact.som"/>
          </div>
        </vs-prompt>

        <vs-prompt
          @cancel="val=''"
          @accept="FacturationsMod"
          @close="close"
          :title="'Facturation: '+ dossierClient"
          :active.sync="facturationnMod">
          <div class="con-exemple-prompt">
              N° de la facture
            <vs-input placeholder="Référence" v-model="Fact.ref"/>
            <vs-input placeholder="N° Facture" v-model="Fact.num"/>
            <vs-input placeholder="Somme" v-model="Fact.som"/>
            <vs-divider/>
            <vs-input type="date" placeholder="Date Paiement" v-model="Fact.datee"/>
            <vs-select
                  v-model="Fact.mode"
                  placeholder="Mode"
                  >
                  <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="item,index in armateur" />
                </vs-select>
            <vs-input placeholder="Reférence Paiement" v-model="Fact.refp"/>
            <vs-input placeholder="Banque" v-model="Fact.banque"/>
          </div>
        </vs-prompt>

        <vs-popup classContent="popup-example"  title="BILAN CLIENT" :active.sync="popupActivo2">
          <div>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Client</label>
                {{ ClientChoisi.client }}
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Produit</label>
                {{ ClientChoisi.produit }}
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Bons</label>
                {{ ClientChoisi.total_enregistrements }}
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Poids</label>
                {{ ClientChoisi.total_poids }}
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Prix Unitaire</label>
                <el-input style="width: 100%;" v-model="prixUnit" placeholder="Prix">
                  </el-input>
              </vs-col>
              <vs-col style="padding: 5px;" vs-justify="center" vs-align="center" vs-w="4">
                <label>Prix total</label>
                {{ ClientChoisi.total_poids * prixUnit }}
              </vs-col>
            </vs-row>
            
          </div>
         
          
          <center><vs-button style="margin: 20px; width: 300px;" @click="generateReport()" color="primary" type="filled">Enregistrer le dossier</vs-button></center>
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
                    <div style="width: 100%; padding: 10px; margin-top: 180px">
                      <div style="padding: 12px;">
                        <el-row :gutter="20">
                          <el-col :span="14"><div class="grid-content bg-purple">.</div></el-col>
                          <el-col :span="10">
                            <div class="grid-content bg-purple">
                              <div style="border: 1px solid black; text-align: center; font-family:Calibri">
                                <p style="margin-bottom: -10px">DOIT:</p>
                                <vs-divider/>
                                <p style="margin: -10px 0px">CMA CGM INLAND SERVICES CI</p>
                                <vs-divider/>
                                <p style="margin: -10px 0px">
                                <span>RCCM: Ci-ABJ-20217-B-14256</span><br>
                                <span>225 27 21 23 59 00</span><br>
                                <span>01 BP 3749 Abidjan01</span><br><br>
                                </p>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                        <p style="margin: -10px 0px"><b style="text-decoration: underline; font-family:Calibri">OBJET:</b> Facture pour livraison & récupération de conteneurs</p>
                        <el-row :gutter="20" style="margin-top: 20px">
                          <el-col :span="14">
                            <div class="grid-content bg-purple">
                              <table class="tablefact" style="margin-top: 30px; width: 100%; text-align: center; font-family:Calibri">
                                <tr>
                                  <td class="tablefacttd">NUMERO</td>
                                  <td class="tablefacttd">DATE</td>
                                  <td class="tablefacttd">REFERENCE</td>
                                </tr>
                                <tr>
                                  <td class="tablefacttd">{{infos_facture.n_doc}}</td>
                                  <td class="tablefacttd">{{ dateDuJour }}</td>
                                  <td class="tablefacttd">{{infos_facture.reference}}</td>
                                </tr>
                              </table>
                            </div>
                          </el-col>
                          <el-col :span="10"><div class="grid-content bg-purple">.</div></el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-top: 20px">
                          <el-col :span="24">
                            <div class="grid-content bg-purple">
                              <table class="tablefact" style="margin-top: 1px; width: 100%; text-align: center; font-family:Calibri">
                                <tr>
                                  <td class="tablefacttd">Désignation</td>
                                  <td class="tablefacttd">Quantité</td>
                                  <td class="tablefacttd">Prix Unitaire</td>
                                  <td class="tablefacttd">Montant HT</td>
                                </tr>
                                <tr style="padding: 15px">
                                  <td style="padding: 15px" class="tablefacttd">
                                    LIVRAISON {{infos_facture.client}} {{infos_facture.zone_livraison}} {{infos_facture.type_c}}"
                                  </td>
                                  <td class="tablefacttd">
                                    {{infos_facture.nombre}}
                                  </td>
                                  <td class="tablefacttd">
                                    {{infos_facture.prix}}
                                  </td>
                                  <td class="tablefacttd">
                                    {{infos_facture.nombre * infos_facture.prix}}
                                   </td>
                                </tr>
                              </table>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-top: 20px">
                          <el-col :span="10">
                            <div class="grid-content bg-purple">
                              <table class="tablefact" style=" width: 100%; text-align: center; font-family:Calibri">
                                <tr>
                                  <td class="tablefacttd">Code</td>
                                  <td class="tablefacttd">Base</td>
                                  <td class="tablefacttd">Taux</td>
                                  <td class="tablefacttd">Montant</td>
                                </tr>
                                <tr style="padding: 15px">
                                  <td style="padding: 15px" class="tablefacttd">
                                    TVA
                                  </td>
                                  <td class="tablefacttd">
                                    {{infos_facture.nombre * infos_facture.prix}}
                                  </td>
                                  <td class="tablefacttd">
                                    0%
                                  </td>
                                  <td class="tablefacttd">
                                    
                                   </td>
                                </tr>
                                <tr>
                                  <td class="tablefacttd">Total HT</td>
                                  <td class="tablefacttd"></td>
                                  <td class="tablefacttd"></td>
                                  <td class="tablefacttd"></td>
                                </tr>
                              </table>
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="grid-content bg-purple">
                              <table class="tablefact" style=" width: 100%; text-align: center; font-family:Calibri">
                                <tr>
                                  <td class="tablefacttd">Total HT</td>
                                  <td class="tablefacttd">Escompte</td>
                                  <td class="tablefacttd">Total TTC</td>
                                  <td class="tablefacttd">Acompte</td>
                                  <td class="tablefacttd" style="font-weight: bold">NET A PAYER</td>
                                </tr>
                                <tr>
                                  <td class="tablefacttd">{{infos_facture.nombre * infos_facture.prix}}</td>
                                  <td class="tablefacttd"></td>
                                  <td class="tablefacttd"></td>
                                  <td class="tablefacttd"></td>
                                  <td class="tablefacttd">{{infos_facture.nombre * infos_facture.prix}}</td>
                                </tr>
                              </table>
                            </div>
                          </el-col>
                        </el-row>
                        <table class="tablefact" style="margin-top: 20px; width: 100%; text-align: center; font-family:Calibri">
                                <tr>
                                  <td class="tablefacttd" style="font-weight: bold; padding: 8px; text-align: left; text-transform: uppercase">arrêtée la présente facture à la somme de : {{ convertirNombreEnLettres(montant) }} francs cfa</td>
                                </tr>
                              </table>
                      </div>
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
import { chiffresEnLettres } from '@/components/fonctions/conversion_chiffre.js';
import { get_otp } from './api';
import * as XLSX from "xlsx";
import VueHtml2pdf from 'vue-html2pdf'
import html2pdf from "html2pdf.js";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import axios from 'axios';
import NavBar from '@/components/Navbar.vue'
export default {
  name: 'HelloWorld',
  components: {
    NavBar,
    VueHtml2pdf
  },
  computed: {
    users() {
      return this.$store.state.users;
        }
      },
  data() {
    return {
      search: '',
      aconvertir: '0',
      dateDuJour: '',
      montant: '115000',
      infos_facture: '',
      refFacture: '',
      dossierRef: '',
      dossierClient: '',
      facturation: false,
      facturationn: false,
      facturationnMod: false,
      counter: false,
      prixUnit: 0,
      dateSearch: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10)
        ],
      isMobile: false,
      popupActivo2:false,
      popupActivo3:false,
      activePrompt9:false,
      select1:3,
      options1:[
        {text:'IT',value:0},
        {text:'Blade Runner',value:2},
        {text:'Thor Ragnarok',value:3},
      ],
      formDate: {
        dateBen: ''
      },
      Fact: {
        ref: '',
        num: '',
        som: '',
        doc: '',
        datee:'',
        refp: '',
        mode: '',
        banque: '',
      },
      checkTrue: true,
      donneesClient: null,
      donneesArm: null,
      donneesCliProd: null,
      checkFalse: false,
      totalVoyages:0,
      donnees: null,
      don_Clients: [{"client":"0","produit":"0","total_enregistrements":"0","total_poids":"0"}],
      don_Clients2: [{"client":"0","produit":"0","total_enregistrements":"0","total_poids":"0"}],
      don_Camion: null,
      donneesStats: {
        dn_carb: [{"total":"0","litre":"0","prix":"0"}],
        dn_dep: [{"total":"0","prix":"0"}],
        dn_voyages: [{"chauffeur":"","client":"","dossier":"0","id_ben":"0","lieu_chargement":"0","lieu_dechargement":"","n_bl":"","n_matricule":"","observation":"0","par":"0","poids":"0","prix":"0","produit":"0"}],
        dn_clients: [{"client":"0","produit":"0","total_enregistrements":"0","total_poids":"0"}],
        nb_carb: 0,
        nb_dep: 0,
        nb_voyages: 0,
        tableau: [{"camion":"0","chauffeur":"0","date_carb":"0","details":"0","id_camion":"0","id_carburant":"0","imatriculation":"0","litre":"0","marque":"0","nombre_de_bennes":"0","prix":"0"}],
      },
      donneesStatsMois: null,
      donneesStatsSemaine: null,
      donneesArmateurs: null,
      donneesSheet: null,
      elementChoisi: null,
      donneesZones: null,
      donneesCamion: null,
      ClientChoisi: {
        client: '',
        produit: '',
        total_enregistrements: '',
        total_poids: ''
      },
      donneesChauf: null,
      donneesDossiers: null,
      donneesDossierss: null,
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
        dossier: '',
        ref: '',
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
          value: "CHEQUE",
          label: "CHEQUE"
        }, {
          value: "ESPECE",
          label: "ESPECE"
        }, {
          value: "VIREMENT",
          label: "VIREMENT"
        },],
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

    convertirNombreEnLettres(valeur) {
    const enLettres = chiffresEnLettres(valeur);
    return enLettres; // Utilisez le résultat comme vous le souhaitez
      },

    choixPeriode(a) {
      this.periode = a;
      console.log(this.periode);
    },

    Visite(id) {
      this.$router.push({ name: 'AD_Details', params: { element: id } });
    },

    armateurs(id) {
      this.$router.push({ name: 'AD_Armateurs', params: { element: id } });
    },

    Facturer(id) {
      this.dossierRef = id;
      this.facturation = true;
    },

    Facturerr(id, nom) {
      this.dossierRef = id;
      this.dossierClient = nom;
      this.facturationn = true;
    },

    FacturerrMod(data) {
      this.Fact.ref = data.reference;
      this.Fact.num = data.n_facture;
      this.Fact.som = data.somme;
      this.Fact.doc = data.n_doc;
      this.Fact.refp = data.ref_paie;
      this.Fact.mode = data.mode;
      this.Fact.banque = data.banque;
      this.Fact.datee = data.date_paiement;
      this.dossierClient = data.client;
      this.facturationnMod = true;
      console.log(data);
    },

    Facturepdf(data) {
      this.detailAfacturer(data.bl);
      console.log(data)
    },

    Facturepdff() {
      this.generateReport();
      this.activePrompt9 = true;
    },

    detailAfacturer(a) {
            this.infos_facture = null,
            axios.get('https://socogetra.net/appi_socogetra/soco_bilan_finance_d.php?doc='+a+'&timestamp=' + new Date().getTime())
            .then((response) => {
              this.infos_facture = response.data.don[0];
              this.aconvertir = (this.infos_facture.nombre * this.infos_facture.prix).toString();
              setTimeout(() => {
                this.Facturepdff();// Remplacez par le nom de votre fonction
              }, 2000); 
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
    },

    Facturons () {
            this.form.dossier = this.dossierRef;
            this.form.ref = this.refFacture;
            axios.put('https://socogetra.net/appi_socogetra/soco_ordre_facture.php', this.form)
            .then((response) => {
                console.log(response);
                this.listeDossiers();
                this.popupActivo2 = false,
                this.$vs.loading.close();
                this.$notify.success({
                title: 'Dossier Facturé !',
                showClose: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.$vs.loading.close()
            });
    },

    Facturations () {
            this.Fact.doc = this.dossierRef;
            axios.post('https://socogetra.net/appi_socogetra/soco_bilan_finance.php', this.Fact)
            .then((response) => {
                console.log(response);
                this.listeDossiers();
                this.popupActivo2 = false,
                this.$vs.loading.close();
                this.$notify.success({
                title: 'Dossier Facturé !',
                showClose: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.$vs.loading.close()
            });
    },

    FacturationsMod () {
            axios.put('https://socogetra.net/appi_socogetra/soco_bilan_finance.php', this.Fact)
            .then((response) => {
                console.log(response);
                this.listeDossiers();
                this.popupActivo2 = false,
                this.$vs.loading.close();
                this.$notify.success({
                title: 'Dossier Facturé !',
                showClose: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.$vs.loading.close()
            });
    },

    listeDossiers () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_socogetra/soco_bilan_finance.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesDossiers = response.data.data;
              this.donneesArm = response.data.don;
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

    listeZones2 () {
          
          axios.get('https://socogetra.net/appi_sococit/albakoos_produits_clients.php?timestamp=' + new Date().getTime())
          .then((response) => {
            this.donneesClient = response.data.data;
            this.$vs.loading.close()
            this.filtreUser();
          }, (error) => {
            console.log(error);
            this.$vs.loading.close()
          });
      },

      ExportExcel(type, fn, dl) {
          var elt = this.$refs.exportable_table;
          var wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
          return dl ?
            XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
          XLSX.writeFile(wb, fn || ((this.name + '.'|| 'SheetJSTableExport.') + (type || 'xlsx')));
        },

      Stats() {
            this.$vs.loading({
              type: 'point',
            });
            axios.get('https://socogetra.net/appi_sococit/albakoos_stats.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.totalVoyages = 0;
              this.donneesStats = response.data;
              this.don_Clients = response.data.dn_clients;
              this.don_Clients.forEach((item) => {
                this.totalVoyages = this.totalVoyages + parseInt(item.total_enregistrements);
              })
              console.log(this.don_Clients);
              this.$vs.loading.close();
            }, (error) => {
              console.log(error);
              this.$vs.loading.close();
            });
          },

          bilanArmateur () {
          this.$vs.loading({
          type:'point',
          })
          axios.get('https://socogetra.net/appi_socogetra/soco_bilan_armateur.php?timestamp=' + new Date().getTime())
          .then((response) => {
            this.donneesArmateurs = response.data.data;
            console.log(this.donneesArmateurs);
            this.$vs.loading.close()
          }, (error) => {
            console.log(error);
            this.$vs.loading.close()
          });
      },

      bilanZone () {
          this.$vs.loading({
          type:'point',
          })
          axios.get('https://socogetra.net/appi_socogetra/soco_bilan_zone.php?timestamp=' + new Date().getTime())
          .then((response) => {
            this.donneesZones = response.data.data;
            console.log(this.donneesArmateurs);
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

          fetch('https://socogetra.net/appi_sococit/albakoos_produits_clients_date.php?date_db=' + dte_db + '&date_fn=' + dte_fn + '&timestamp=' + new Date().getTime())
          .then(response => response.json())
          .then(data => {
            this.donneesClient = data.data;
            this.$vs.loading.close()
          });

          axios
              .get('https://socogetra.net/appi_sococit/albakoos_stats_date.php?date_db=' + dte_db + '&date_fn=' + dte_fn + '&timestamp=' + new Date().getTime())
              .then(response => (this.don_Clients = response.data.dn_clients))

      },

      StatsMonth () {
          this.$vs.loading({
          type:'point',
          })
          axios.get('https://socogetra.net/appi_sococit/albakoos_stats_month.php?timestamp=' + new Date().getTime())
          .then((response) => {
            this.donneesStatsMois = response.data;
            this.$vs.loading.close()
          }, (error) => {
            console.log(error);
            this.$vs.loading.close()
          });
      },

      StatsWeek () {
          this.$vs.loading({
          type:'point',
          })
          axios.get('https://socogetra.net/appi_sococit/Albakoos_stats_week.php?timestamp=' + new Date().getTime())
          .then((response) => {
            this.donneesStatsSemaine = response.data;
            this.$vs.loading.close()
          }, (error) => {
            console.log(error);
            this.$vs.loading.close()
          });
      },

      listeDossier () {
          this.$vs.loading({
          type:'point',
          })
          axios.get('https://socogetra.net/appi_sococit/albakoos_dossier_sbtl.php?timestamp=' + new Date().getTime())
          .then((response) => {
            this.donnees = response.data.data;
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

      listeZones () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://socogetra.net/appi_sococit/albakoos_zones.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesZones = response.data.data;
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        showClient(client) {
          this.ClientChoisi = client;
          console.log(this.ClientChoisi);
          this.popupActivo2 = true
        },

        generateReport () {
          this.$refs.html2Pdf.generatePdf()
          this.popupActivo2 = false;
          this.activePrompt9 = true;
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
            axios.get('https://socogetra.net/appi_sococit/albakoos_chauffeurs.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesChauf = response.data.data;
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        Borderau(element) {
          this.$router.push({ name: 'camion_mobile', params: { element: element } });
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
            axios.get('https://socogetra.net/appi_sococit/albakoos_camion.php?timestamp=' + new Date().getTime())
            .then((response) => {
              this.donneesCamion = response.data.data;
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
              this.$vs.loading.close()
            });
        },

        sheet () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://docs.google.com/spreadsheets/d/1hsitLRk83_0P5yJQUC6A9dNB8OQ2HfOI-9BGfy0VF3g/edit#gid=0')
            .then((response) => {
              this.donneesSheet = response.data.data;
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

        async obtenirOTP() {
          const numero = '0153676062'; // Remplacez par le numéro de téléphone

          try {
            const rep = await get_otp(numero);
            if (rep === 'ok') {
              console.log('Code OTP envoyé avec succès');
              // Faites ce que vous voulez si le code OTP a été envoyé avec succès
            } else {
              console.log('Erreur lors de l\'envoi du code OTP');
              // Faites ce que vous voulez si une erreur s'est produite lors de l'envoi du code OTP
            }
          } catch (error) {
            console.error('Erreur lors de la requête :', error);
            // Gérez les erreurs
          }
        },

      onSubmit() {
            this.donneesStats = [];


            fetch('https://socogetra.net/appi_sococit/albakoos_stats.php', {
              method: 'POST',
              body: JSON.stringify(this.formDate),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
              console.log(response);
              this.don_Clients = response.dn_clients;
              console.log(this.don_Clients)
              return response.json();
            })
            .then(data => {
              this.donneesStats = data;
              this.don_Clients = data.dn_clients;
              console.log(this.don_Clients)
              this.$vs.loading.close();
              this.$notify.success({
                title: 'Dossier OK!',
                message: 'Dossier Crée',
                showClose: false
              });
            })
            .catch(error => {
              console.log(error);
              this.$vs.loading.close();
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
      lala() {
          const livraisons = ['livraison1', 'livraison2', 'livraison3', 'livraison4', 'livraison5', 'livraison6', 'livraison7', 'livraison8', 'livraison9','livraison10','livraison11','livraison12','livraison13','livraison14', 'livraison15', 'livraison16', 'livraison17', 'livraison18', 'livraison19', 'livraison20', 'livraison21', 'livraison22','livraison23', 'livraison24', 'livraison25'];
const chauffeurs = ['chauffeur1', 'chauffeur2', 'chauffeur3', 'chauffeur4', 'chauffeur5',];
const camions = ['camion1', 'camion2', 'camion3', 'camion4'];

// initialisation de la liste de livraisons planifiées
let livraisonsPlanifiees = [];
// initialisation de la liste des voyages
// initialisation de la liste de livraisons planifiées par chauffeur
let livraisonsPlanifieesParChauffeur = {};

// boucle pour planifier les livraisons
for (let i = 0; i < livraisons.length; i++) {
  // si toutes les livraisons ont été planifiées, arrêter la boucle
  if (livraisonsPlanifiees.length === livraisons.length) {
    break;
  }

  // trouver le prochain camion disponible
  let camionDisponible = null;
  for (let j = 0; j < camions.length; j++) {
    let camion = camions[j];
    let nbLivraisons = livraisonsPlanifiees.filter(l => l.camion === camion).length;
    if (nbLivraisons < 3) {
      camionDisponible = camion;
      break;
    }
  }

  // trouver le prochain chauffeur disponible pour ce camion
  let chauffeurDisponible = null;
  for (let j = 0; j < chauffeurs.length; j++) {
    let chauffeur = chauffeurs[j];
    let livraisonsDuChauffeur = livraisonsPlanifiees.filter(l => l.chauffeur === chauffeur);
    if (livraisonsDuChauffeur.length === 0 || livraisonsDuChauffeur[livraisonsDuChauffeur.length - 1].camion === camionDisponible) {
      chauffeurDisponible = chauffeur;
      break;
    }
  }

  // planifier la livraison avec le camion et le chauffeur disponibles
  let livraison = {
    livraison: livraisons[i],
    camion: camionDisponible,
    chauffeur: chauffeurDisponible
  };

  livraisonsPlanifiees.push(livraison);

  // ajouter la livraison planifiée au chauffeur correspondant
  if (livraisonsPlanifieesParChauffeur[chauffeurDisponible]) {
    livraisonsPlanifieesParChauffeur[chauffeurDisponible].push(livraison);
  } else {
    livraisonsPlanifieesParChauffeur[chauffeurDisponible] = [livraison];
  }
}

// afficher la liste des livraisons planifiées par chauffeur
for (let chauffeur in livraisonsPlanifieesParChauffeur) {
  console.log(`Voyages planifiés pour ${chauffeur}:`);
  let voyages = livraisonsPlanifieesParChauffeur[chauffeur];
  let i = 1;
  for (let j = 0; j < voyages.length; j += 3) {
    console.log(`Voyage ${i}:`);
    for (let k = j; k < j + 3 && k < voyages.length; k++) {
      console.log(`- ${voyages[k].livraison} avec ${voyages[k].camion}`);
    }
    i++;
  }
}
        },


        getData() {
          const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA1REVBNjlBOUIxODE4RjI3RkIxNUQ2QzQ2QkI0NEU0IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2FjY291bnQubmF2aXMuY29tIiwibmJmIjoxNjg0MTAzMjY3LCJpYXQiOjE2ODQxMDMyNjcsImV4cCI6MTY4NDExMDQ2NywiYXVkIjpbImNvbXBhbnljbG91ZC1wdWJsaWNhcGkiLCJodHRwczovL2FjY291bnQubmF2aXMuY29tL3Jlc291cmNlcyJdLCJzY29wZSI6WyJjb21wYW55Y2xvdWQtcHVibGljYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdLCJjbGllbnRfaWQiOiJTbWFydEFjY2Vzcy1BcHAiLCJzdWIiOiI4NDVmNTIzYS0xMTBjLTQ4NjQtODVkNC1hYzE3NzlkN2YxZDAiLCJhdXRoX3RpbWUiOjE2ODQxMDMyNjYsImlkcCI6ImxvY2FsIiwiZW1haWwiOiJzYWtvbmVAc29jb2dldHJhLm5ldCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InNha29uZUBzb2NvZ2V0cmEubmV0Iiwiam9pbmRhdGUiOiIwNS8wMy8yMDIzIDEwOjI1IiwicGljdHVyZSI6Imh0dHBzOi8vaW1hZ2VzLmFjY291bnQubmF2aXMuY29tL2VmZmVjNmUyLTIzNWQtNDNjMy05YmVmLTNlNTBkZDM0MmEwMS8xMDAucG5nIiwiZ2l2ZW5fbmFtZSI6IlNBS09ORSIsImZhbWlseV9uYW1lIjoiT3VtYXIiLCJzaWQiOiJFMkE2QzU4RkVDQzM0MDlFNjk4NDUzMURGNjc4RUMxQyJ9.rPA25RdckhXhl5sWBjVhI-C-8rIu3dX-w9zP2rk1Kwfpw8ED9LYV3J8d2sQknShx8vGTaZwSCiQLC55KNM1mi1b603uH8QEqz-Pb1Ql-wNWv_5NHIDdEG7d45G2KEX_CNjKBnNHS6agoatJbbjHQymdxmaudwQRqDJo9-mDXsG_ZUwD-vjYFQKvFqBzVJricJZiwrDAZXXIp9Yc2AvOVFsQs3DHXHk8GmY98q3-qt_Dfbr1UiJM-iejYzCO-dAa-YX2D78XK0UG9ejMcwKB1jBXpt0TgLMSHKIKcQSGVX5qPj_IHBB_dFgf3nNmrCz7mgoe4p1BCWHuItfk2iF7ccg'
          axios.get('https://api-smartaccess.cotedivoireterminal.com/smartaccess/api/gateway/vessel/visits', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'accountIdentifier': 'takt',
              'accountType': 'Haulier',
              'partnerAccountIdentifier': 'cit',
              'appIdentifier': 'smrtaccess',
              'Authorization': 'Bearer '+token,
            }
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        }
    },

    mounted() {
      const date = new Date();
      this.dateDuJour = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      fetch('https://socogetra.net/appi_sococit/albakoos_stats.php?timestamp=' + new Date().getTime())
      .then(response => response.json())
      .then(data => {
        this.don_Clients = data.dn_clients;
        this.don_Camion = data.don_Camion;
        console.log(data)
      })
      .catch(error => {
        console.error(error);
      });

      this.bilanArmateur();
      this.bilanZone();
      this.lala();
      this.getData();
      this.sheet();
      this.listeDossiers();

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input__inner::placeholder {
    color: #201f1f;
}

table {
  border-collapse: collapse;
}
</style>
