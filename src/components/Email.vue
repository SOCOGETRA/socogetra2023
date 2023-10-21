<template>
    <div class="hello">
        <div class="screenUse">
          
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
   
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
            arrayBuffer: null,
            filelist: null,
            sheett:null,
            messages: [],
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

  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  