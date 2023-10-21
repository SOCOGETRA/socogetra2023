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
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration  /</span> Excels
                </div>
                <span style="float: right; margin-right: 150px;">
                    <vs-button color="#C32D39"  icon="person_add" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2 = true">Créer utilisateur</vs-button>
                </span>
                </vs-card>
              </div>
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;" ref="pdfContent">
                <button @click="generatePDF">Générer PDF</button>
                <input
                    type="file"
                    v-on:change="addfile($event)"
                    placeholder="Upload file"
                    accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <input
                    type="file"
                    v-on:change="addfiles($event)"
                    placeholder="Upload file"
                    accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <el-button-group>
                  <el-button type="primary" v-for="sheet in tabledsh.SheetNames" :key="sheet" icon="el-icon-document" @click="dd(sheet)">{{sheet}}</el-button>
                </el-button-group>

                
                
                
                <el-tabs type="border-card" @tab-click="handleClick" style="margin-top: 30px;">
                  <el-tab-pane :label="tablen" v-if="tablen.length >= 1">
                    
                    <h2 v-if="sheett != null" style="font-weight: bold;">Feuille : <span style="color: #409effd1;">{{tablen}}</span></h2>
                    {{ tabled }}
                    <el-table
                    height="600"
                        :data="tabled"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        ref="multipleTable"
                        style="width: 100%; color: black;">
                        <el-table-column
                        v-for="head in ttitre.length" :key="head"
                        :property="ttitre[head-1]"
                        :label="ttitre[head-1]">
                        </el-table-column>
                        <el-table-column
                                  align="left">
                                  <template slot="header" >
                                    <el-input
                                      v-model="search"
                                      size="mini"
                                      placeholder="N°"/>
                                  </template>
                                </el-table-column>
                    
                    </el-table>
                    {{ ttitre.length }}
                    <table border="1" ref="exportable_table" v-show="false">
                        <tbody >
                        <tr>
                            <th v-for="head in ttitre.length" :key="head">{{ ttitre[head-1] }}</th>
                        </tr>
                        <tr v-for="(items, index) in tabled" :key="index">
                            <td v-for="(item, i) in items" :key="i">{{item}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <input type="text" v-model="name">
                    <button @click="ExportExcel('xls')">Export table to excel xls</button>
                    <button @click="ExportExcel('xlsx')">Export table to excel xlsx</button>
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
                    

                    
                  </div>
                </div>
                </vs-prompt>
                
            </vs-col>
          </vs-row>
        </div>
    </div>
  </template>
  
  <script>
  import html2pdf from 'html2pdf.js';
  import axios from 'axios';
  import * as XLSX from "xlsx";
  import SideBar from '@/components/Sidebar.vue'
  import { jsontoexcel } from "vue-table-to-excel";
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
            name: "",
            json: {
            data: [
            { name: "Tom", phone: "+86 01012", email: "000@gmail.com" },
            { name: "Jack", phone: "+86 01012", email: "000@gmail.com" },
            { name: "Alice", phone: "+86 01012", email: "000@gmail.com" }
            ],
            head: ["name", "phone", "email"],
            fileName: "download.xlsx"
            },
            file: File,
            arrayBuffer: null,
            filelist: null,
            sheett:null,
        form: {
            nom: '',
            prenom: '',
            email: '',
            pass: '',
            statut: 1,
            photo: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png',
            titre: '',
            droit: 1,
            contact: '',
            lieu: 1,
        },
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
      ttitre: ['entreprise'],
      tabled: null,
      tabledsh: [],
      donnees: null,
      tablen:'',
      select1:1,
      select2:1,
      select3:1,
      search: '',
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
          generatePDF() {
          const pdfContent = this.$refs.pdfContent;
          const options = {
            filename: 'mon_document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };
          html2pdf().set(options).from(pdfContent).save();
        },
        ExportExcel(type, fn, dl) {
          var elt = this.$refs.exportable_table;
          var wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
          return dl ?
            XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
          XLSX.writeFile(wb, fn || ((this.name + '.'|| 'SheetJSTableExport.') + (type || 'xlsx')));
        },
        download() {
            const { data, head, fileName } = this.json;
            jsontoexcel.getXlsx(data, head, fileName);
            },
        addfile(event) {
            this.tabled = null,
            this.ttitre = ['entreprise'],
            this.tablen = '',
            this.file = event.target.files[0];
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(this.file);
            fileReader.onload = (e) => {
                this.arrayBuffer = fileReader.result;
                var data = new Uint8Array(this.arrayBuffer);
                var arr = new Array();
                for (var i = 0; i != data.length; ++i)
                arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");
                var workbook = XLSX.read(bstr, { type: "binary" });
                console.log(workbook);
                this.tabledsh = workbook;
                var first_sheet_name = workbook.SheetNames[1];
                console.log(e);
                var worksheet = this.worksheet.Sheets[first_sheet_name];
                console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true, cellDates: true }));
                var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true, cellDates: true });
                this.filelist = [];
                console.log(arraylist);
                    this.tabled = arraylist;

                    

                    this.tablen = first_sheet_name;
                    this.ttitre = Object.keys(arraylist[0]);
                    console.log(this.ttitre);
                    console.log(this.ttitre[0]);
                    return this.tabled;
            };
            },

            addfiles(event) {
            this.tabled = null,
            this.ttitre = ['entreprise'],
            this.tablen = '',
            this.file = event.target.files[0];
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(this.file);
            fileReader.onload = (e) => {
                this.arrayBuffer = fileReader.result;
                var data = new Uint8Array(this.arrayBuffer);
                var arr = new Array();
                for (var i = 0; i != data.length; ++i)
                arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");
                var workbook = XLSX.read(bstr, { type: "binary" });
                console.log(workbook);
                this.tabledsh = workbook;
                var first_sheet_name = workbook.SheetNames[1];
                console.log(e);
                var worksheet = this.worksheet.Sheets[first_sheet_name];
                console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true, cellDates: true }));
                var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true, cellDates: true });
                this.filelist = [];
                console.log(arraylist);
                    this.tabled = arraylist;

                    

                    this.tablen = first_sheet_name;
                    this.ttitre = Object.keys(arraylist[0]);
                    console.log(this.ttitre);
                    console.log(this.ttitre[0]);
                    return this.tabled;
            };

            this.senddata();
            },

            senddata() {
              axios.post('https://socogetra.net/appi_socogetra/soco_book_fichiers.php', this.tabled)
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


            dd(a) {
                console.log(a[0]);
                var worksheet = this.tabledsh.Sheets[a];
                console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true, cellDates: true }));
                var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true , cellDates: true});
                console.log(arraylist);
                    this.tabled = arraylist;
                    this.tablen = a;
                    this.ttitre = Object.keys(arraylist[0]);
                    console.log(this.ttitre);
                    console.log(this.ttitre[0]);
                    axios.post('https://socogetra.net/appi_socogetra/export_import.php', this.tabled)
                      .then((response) => {
                          console.log(response);
                          this.listeZones();
                          this.activePrompt2 = false;
                          this.$vs.loading.close();
                          this.$notify.success({
                          title: 'Dossier OK!',
                          message: 'Dossier Crée',
                          showClose: false
                          });
                      })
                      .catch(function (error) {
                          console.log(error);
                          this.$vs.loading.close()
                      });
                      this.senddata();
            },
        onSubmit() {
            let formData = new FormData();
            formData.append('nom', this.form.nom);
            formData.append('prenom', this.form.prenom);
            formData.append('email', this.form.email);
            formData.append('pass', this.form.pass);
            formData.append('statut', this.form.statut);
            formData.append('photo', this.form.photo);
            formData.append('titre', this.form.titre);
            formData.append('droit', this.form.droit);
            formData.append('contact', this.form.contact);
            formData.append('lieu', this.form.lieu);
            axios.post('https://sarezide.com/appi/afks.php', formData)
            .then((response) => {
                this.$router.go(0);
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

        sub() {
            
          axios.post('https://sarezide.com/appi/albakoos_benne.php', this.tabled)
              .then((response) => {
                  console.log(response);
                  this.listeZones();
                  this.activePrompt2 = false;
                  this.$vs.loading.close();
                  this.$notify.success({
                  title: 'Dossier OK!',
                  message: 'Dossier Crée',
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
          axios.get('https://sarezide.com/appi/bdalbakoos_get_users.php')
          .then((response) => {
            this.donnees = response.data.data;
            this.$vs.loading.close()
            console.log(this.donnees)
          }, (error) => {
            console.log(error);
            this.$vs.loading.close()
          });
      },

        uploadImage(e, a) {
            this.chargeFichier = 1;
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
                this.chargeFichier = 2;
                let imageUrl = res.data;
                this.ft = imageUrl.format;
                this.size = imageUrl.bytes;
                if(a == 'a') {
                    this.imagea = imageUrl.public_id + '.' + imageUrl.format;
                    this.imageurla = imageUrl.url;
                }
                if(a == 'b') {
                    this.imageb = imageUrl.public_id + '.' + imageUrl.format;
                }
                if(a == 'c') {
                    this.imagec = imageUrl.public_id + '.' + imageUrl.format;
                }
                if(a == 'd') {
                    this.imaged = imageUrl.public_id + '.' + imageUrl.format;
                }
            })
            .catch(err => {
                console.log(err)
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
  