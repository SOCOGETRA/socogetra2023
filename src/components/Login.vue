<template>
    <div class="hello">
        <div style="background: #13ce66; height: 100vh; width: 100%; position: absolute;">
            <vs-card class="sidebarr" style="width: 300px; margin-top: 150px;">
            <div>
                <vs-row>
                    <vs-col  vs-w="9">
                        <img src="../assets/sako.png" height="35">
                    </vs-col>
                    <vs-col  vs-justify="center" vs-align="center" vs-w="3">
                        <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/businessman.png" style="border-radius: 50%; float: right;" width="35">
                    </vs-col>
                </vs-row>
            </div>
            <div>
                <vs-divider/>
                <el-input
                    placeholder="Identifiant"
                    prefix-icon="el-icon-search"
                    v-model="input2">
                </el-input>
                <el-input
                    style="margin-top: 15px;"
                    placeholder="Mot de Passe"
                    prefix-icon="el-icon-search"
                    v-model="input2">
                </el-input>
            </div>
          

           
            <div style="margin-top: 20px">
                <el-button type="primary" style="width: 100%;">Connexion</el-button>
                
            </div>

            </vs-card>
        </div>
        
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'SideBar',
    data() {
      return {
        value2: true,
        form: {
            nom: 'a',
            prenom: 's',
            email: 'q',
            pass: 'q',
            statut: 'q',
            photo: 'q',
            titre: 'q',
            droit: 'a',
            contact: 'a',
            lieu: 'a',
        }
      }
    },
    methods: {
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
            axios.post('https://autre.sarezide.com/albakoos_user.php', formData)
            .then((response) => {
                console.log(response);
                this.$vs.loading.close();
                this.$notify.success({
                title: 'Enregistrement OK!',
                message: 'Votre résidence à été enregistré',
                showClose: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.$vs.loading.close()
            });
        }
    },
    mounted() {
        this.onSubmit();
    }
  }
  </script>
  https://autre.sarezide.com/sarezide_get_ville.php
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  