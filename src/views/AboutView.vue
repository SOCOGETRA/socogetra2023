<template>
  <div class="about" style="width: 100%; height: 100vh;">
    <div class="outer">
      <div class="middle">
        <div class="inner">
          <vs-card class="login" style="width: 300px; margin: 0 auto; height: 300px;">
            <div>
              <vs-row>
                <vs-col  vs-w="9">
                  <img src="../assets/sogecit.png" height="45">
                </vs-col>
                <vs-col  vs-justify="center" vs-align="center" vs-w="3">
                    <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/businessman.png" style="border-radius: 50%; float: right;" width="35">
                </vs-col>
              </vs-row>
            </div>
            <vs-divider/>
            <el-alert
              v-show="erreur"
              :title="connexionMessage"
              type="error">
            </el-alert>
            <div style="padding-top: 10px;">
              <el-input
                style="margin-bottom: 10px;"
                placeholder="Identifiant"
                prefix-icon="el-icon-user"
                v-model="user"
                v-on:keyup.enter="onEnter">
              </el-input>

              <el-input
                placeholder="Mot de passe"
                prefix-icon="el-icon-unlock"
                show-password
                v-model="mdp"
                v-on:keyup.enter="onEnter">
              </el-input>

              <el-button icon="el-icon-key" style="width: 100%; padding: 10px; margin-top: 10px; background-color: #039eff; color: white;" type="#039eff" @click="getdata()">Connexion</el-button>
            </div>
            
          </vs-card>
        </div>
      </div>
    </div>
    
    
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data() {
    return {
      erreur:false,
      mdp: "",
      user: "",
      connexionMessage: "",
      ip: "",
      vip: "",
    }
  },
  methods: {
        onEnter() {
          alert('lala');
        },
         getdata() {
            this.$vs.loading()
            let formData = new FormData();
            formData.append('user', this.user);
            formData.append('mdp', this.mdp);

            axios.post('https://socogetra.net/appi_socogetra/db_login_verif.php', formData,)
            .then((response) => {
              this.verif(response);
              this.$vs.loading.close()
            }, (error) => {
              console.log(error);
            });
          },

          verif(data) {
            let donnees = data.data.data[0];
            this.connexionMessage = data.data.mes
            if(data.data.valide == 1) {
              if(donnees.lieu == 2) {
                this.$store.commit('Connexion', donnees);
                this.$router.push({ path: '/' });
              }
              if(donnees.lieu == 1 && this.ip == this.vip) {
                  this.$store.commit('Connexion', donnees);
                  this.$router.push({ path: '/' });
                } else {
                  this.connexionMessage = 'Vous devez être au bureau pour vous connecter';
                  this.erreur=true;
                }
            }
            if(data.data.valide == 2) {
                this.erreur=true;
              }
          },

          Ip() {
          fetch('https://api.ipify.org?format=json')
          .then(x => x.json())
          .then(({ ip }) => {
              this.ip = ip;
              console.log(this.ip);
          });
        },
    },
    mounted() {
      this.Ip();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.middle {
  display: table-cell;
  vertical-align: middle;
}

.inner {
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  /* Whatever width you want */
}
</style>
