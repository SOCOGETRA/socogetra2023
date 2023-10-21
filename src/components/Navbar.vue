<template>
    <div class="hello">
          <div class="head-nav">
            <div style="width: 280px; ">
              <div style="background-color: #efb1b173; width: 200px;">
                
                <vs-dropdown>
                  <vs-button color="#c32d39" class="btn-drop" type="filled"><span><i class="el-icon-s-grid iconMenu" style="color: whitesmoke; padding: 5px 5px; font-size: 20px;"></i></span></vs-button>
                  <!-- <a href="#">Hola mundo</a> -->
                  <vs-dropdown-menu>
                    <vs-dropdown-item to="/flotte">
                      Flotte Socogetra
                    </vs-dropdown-item>
                    <vs-dropdown-item divider>
                      option 3
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
                <span style="color: whitesmoke; font-weight: bold; padding: 15px;">SOCOGETRA</span>
              </div>
            </div>
           
            <div style="width: 900px;" class="input-head" v-if="users.statut == 'DISPATCHEUR'">
              <vs-button to="/bilan" class="buttonValid" color="#DB626C" type="gradient" style="width: 110px; margin: 3px; background-color: #db626c00;" icon="home">RESUME</vs-button>
              <vs-button to="/administration/dispatche" class="buttonValid" color="#DB626C" type="gradient" style="width: 160px; margin: 3px; background-color: #db626c00;" icon="list">ENREGISTREMENT</vs-button>
            </div>
            <div style="width: 900px;" class="input-head" v-else>
              <vs-button to="/" class="buttonValid" color="#DB626C" type="gradient" style="width: 110px; margin: 3px; background-color: #db626c00;" icon="paid">IMPORT</vs-button>
              <vs-button to="/tableau_export" class="buttonValid" color="#DB626C" type="gradient" style="width: 110px; margin: 3px; background-color: #db626c00;" icon="paid">EXPORT</vs-button>
              <vs-button to="/chauffeur" class="buttonValid" color="#DB626C" type="gradient" style="width: 150px; margin: 3px; background-color: #db626c00;" icon="paid">CHAUFFEURS</vs-button>
              <vs-button to="/camion" class="buttonValid" color="#DB626C" type="gradient" style="width: 150px; margin: 3px; background-color: #db626c00;" icon="paid">CAMIONS</vs-button>
              <vs-button to="/facturation" class="buttonValid" color="#DB626C" type="gradient" style="width: 150px; margin: 3px; background-color: #db626c00;" icon="paid" v-if="users.statut == 'COMPTA' || users.statut == 'ADMIN'">FACTURATION</vs-button>
            </div>
            <div style="width: 420px; margin-left: auto; order: 2; background-color: #efb1b173;">
              
              
              <div style="float: right;">
                <span class="iconUser" style="padding: 0px 14px; float: right; font-weight: bold; color: whitesmoke; ">
                  <span style="border: 1px solid whitesmoke; border-radius: 50%; padding: 7px;">{{users.name[0] | uppercase}}{{users.prenom[0] | uppercase}}</span>
                </span>
                <span style="color: whitesmoke; font-weight: bold; padding: 12px; font-size: 12px;">{{users.name}} {{users.prenom}}</span>
              </div>
            </div>
            
          </div>
       
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    computed: {
    users() {
      return this.$store.state.users;
        }
      },
    data() {
      return {
        input4: '',
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
        }
      }
    },
    methods: {
        uppercase: function (value) {
          if (!value) return ''
          return value.toUpperCase()
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
      }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  