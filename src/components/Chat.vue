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
                  <span style="color: #C32D39;"><vs-icon icon="home" size="" style="font-size: 18px;"></vs-icon> Administration  /</span> Excel
                </div>
                <span style="float: right; margin-right: 150px;">
                    <vs-button color="#C32D39"  icon="person_add" style="padding: 5px; position: absolute; width: 150px;" @click="activePrompt2 = true">Chat GPT</vs-button>
                </span>
                </vs-card>
              </div>
              <div style="padding: 10px 20px; font-family:'Karla', sans-serif; margin-top: 70px;" ref="pdfContent">
               
                <div v-for="message in messages" :key="message.id">
                    <p v-if="message.type === 'bot'">{{ message.text }}</p>
                    <p v-else>{{ message.text }}</p>
                    </div>
                    <form @submit.prevent="sendMessage">
                    <input type="text" v-model="userMessage" />
                    <button type="submit">Envoyer</button>
                    </form>
                
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
  import axios from 'axios';
  import SideBar from '@/components/Sidebar.vue'
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
            messages: [],
            userMessage: '',
            apikey: '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',
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
        async sendMessage() {
            // Ajouter le message de l'utilisateur à la liste des messages
            this.messages.push({
                id: Date.now(),
                type: 'user',
                text: this.userMessage,
            });

            // Appel à l'API ChatGPT pour obtenir une réponse
            const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: this.userMessage,
                max_tokens: 100,
                n: 1,
                stop: '\n',
            }, {
                headers: {
                Authorization: `Bearer ${this.apikey}`,
                'Content-Type': 'application/json',
                },
            });

            // Ajouter la réponse de ChatGPT à la liste des messages
            this.messages.push({
                id: Date.now(),
                type: 'bot',
                text: response.data.choices[0].text,
            });

            // Effacer le champ de saisie de l'utilisateur
            this.userMessage = '';
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
  