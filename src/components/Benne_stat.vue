<template>
    <div class="abouts" style="width: 100%; height: 100vh; padding: 30px;">
       
        
        <h3 style=" color: #d2c9bf;">SOGECIT Dashbord</h3>

        <vs-row style="margin-top: 30px">
            <vs-col vs-w="3" style="padding: 5px;">
                <vs-card style="background-color: #f8c460; border-radius: 30px; padding: 10px;">
                    <h2>Voyage Journalier</h2><br>
                    <center><span style="font-size: 50px; font-weight: bold; border: 1px solid gray; border-radius: 50px; padding: 10px; ">112</span></center>
                </vs-card>
            </vs-col>
            <vs-col vs-w="6" style="padding: 5px;">
                <vs-card style="background-color: #f8c460; border-radius: 30px; padding: 5px;">
                    <vs-row>
                        <vs-col vs-w="4" style="background-color: wheat; padding: 10px; margin: 8px; border-radius: 10px;">
                            <vs-row>
                                <vs-col vs-w="12">
                                    <span style=" margin-left: 30px; "> GRAVIER</span> <span style="font-weight: bold; border-left: 3px solid gray; padding-left: 15px; font-size: 20px;">12</span>
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col vs-w="4" style="background-color: wheat; padding: 10px; margin: 8px; border-radius: 10px;">
                            <vs-row>
                                <vs-col vs-w="12">
                                    <span style=" margin-left: 30px; "> GRAVIER</span> <span style="font-weight: bold; border-left: 3px solid gray; padding-left: 15px; font-size: 20px;">12</span>
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col vs-w="4" style="background-color: wheat; padding: 10px; margin: 8px; border-radius: 10px;">
                            <vs-row>
                                <vs-col vs-w="12">
                                    <span style=" margin-left: 30px; "> GRAVIER</span> <span style="font-weight: bold; border-left: 3px solid gray; padding-left: 15px; font-size: 20px;">12</span>
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                </vs-card>
            </vs-col>
        </vs-row>

        <vs-row style="margin-top: 30px">
            
            <vs-col vs-w="12" >
                <vs-row>
                    <vs-col vs-w="2" v-for="i in 16" :key="i" style="padding: 5px;">
                        <vs-card style="background-color: #606266c7; border-radius: 30px; padding: 0px;">
                            <center><img style="margin-top: -14px;" src="../assets/uncamion.png" width="80"></center>
                            <center style=" background-color: #17171878; margin: -10px; padding: 8px;"><span style="color: wheat; letter-spacing: 4px; font-size: 18px; width: 100%;">A23J4518P</span></center>
                            <vs-row  style="margin-top: 25px;">
                                <vs-col vs-w="6" style="display: grid;">
                                <span class="prix-zone" style="color: white; font-size: 18px; text-align: center;">5000 <span style="font-size: 14px; font-weight: normal; color: wheat;">Litres</span></span>
                                <span class="sousTitre-zone" style="color: white;"><vs-icon style=" padding: 3px; font-size: 8px" icon="arrow_forward_ios" color="white" bg="#13ce66" round></vs-icon> GAZOILE</span>
                                </vs-col>
                                <vs-col vs-w="6" style="display: grid;">
                                <span class="prix-zone" style="color: white; font-size: 18px; text-align: center;">25 </span>
                                <span class="sousTitre-zone" style="color: white;"><vs-icon style=" padding: 3px; font-size: 8px" icon="arrow_forward_ios" color="white" bg="#efa45b" round></vs-icon> VOYAGE</span>
                                </vs-col>
                            </vs-row>
                        </vs-card>
                    </vs-col>
                   
                </vs-row>
            </vs-col>
            
        </vs-row>
    </div>
  </template>
  
  <script>
  //import VueHtml2pdf from 'vue-html2pdf'
  import html2pdf from "html2pdf.js";
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas';
  import axios from 'axios';
  export default {
    name: 'HelloWorld',
    components: {
    //  VueHtml2pdf
    },
    data() {
      return {
        activities: [{
          content: 'GRAVIER',
          timestamp: '12'
        }, {
          content: 'SABLE',
          timestamp: '3'
        }, {
          content: 'CLINQUER',
          timestamp: '6'
        }],
        popupActivo2:false,
        popupActivo3:false,
        activePrompt9:false,
        select1:3,
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
  
        listeDossier () {
            this.$vs.loading({
            type:'point',
            })
            axios.get('https://sarezide.com/appi/albakoos_dossier_sbtl.php?timestamp=' + new Date().getTime())
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
              axios.get('https://sarezide.com/appi/albakoos_zones.php?timestamp=' + new Date().getTime())
              .then((response) => {
                this.donneesZones = response.data.data;
                this.$vs.loading.close()
              }, (error) => {
                console.log(error);
                this.$vs.loading.close()
              });
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
              axios.get('https://sarezide.com/appi/albakoos_chauffeurs.php?timestamp=' + new Date().getTime())
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
              axios.get('https://sarezide.com/appi/albakoos_camion.php?timestamp=' + new Date().getTime())
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
              let date = new Date();
              let day = date.getDate().toString().padStart(2, '0');
              let month = (date.getMonth() + 1).toString().padStart(2, '0');
              let h = date.getMinutes().toString().padStart(2, '0');
              let randomNum = Math.floor(Math.random() * 10000).toString().padStart(2, '0');
              let code = day + month + h + randomNum;
  
              this.form.n_doc = code;
              this.form.camion = this.form.camion[0];
              this.form.chauffeur = this.form.chauffeur[0];
              axios.post('https://sarezide.com/appi/albakoos_dossier_sbtl.php', this.form)
              .then((response) => {
                  console.log(response);
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
      },
  
      mounted() {
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
  
  </style>
  