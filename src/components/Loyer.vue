<template>
  <div class="hello">
      <div class="screenUse">
        <Nav-bar style="width: 100%;"/>
        <vs-row>
          <vs-col vs-w="2.5">
            <Side-bar style="width: 100%;"/>
          </vs-col>
          <vs-col vs-w="9.5" style="overflow:scroll; height: 100vh;">
            <vs-card class="navbar">
              <h2 style="letter-spacing: 2px;">Tableau</h2>
              <div style="width: 300px; float: right; display: inline-block; margin-top: -20px; color: aliceblue;">
                <el-statistic style="color: aliceblue;" ref="statistic" @finish="hilarity" :value="deadline3" format="HH:mm:ss" time-indices>
                </el-statistic>
              </div>
            </vs-card>
            <div style="padding: 10px 20px; font-family: 'Times New Roman', Times, serif;">
              
              <el-card class="box-card" style="padding: -15px;">
                <vs-row>
                  <vs-col vs-w="3.5" style="padding-right: 10px;">
                    <span class="titre-zone">Total Estimate</span><el-badge class="mark" :value="12" type="info"/>
                    <vs-row class="space-zone">
                      <vs-col vs-w="6" style="display: grid;">
                        <span class="prix-zone">$22.4K</span>
                        <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 8px" icon="arrow_forward_ios" color="white" bg="#13ce66" round></vs-icon> ACCEPTE (2)</span>
                      </vs-col>
                      <vs-col vs-w="6" style="display: grid;">
                        <span class="prix-zone">$22.4K</span>
                        <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 8px" icon="arrow_forward_ios" color="white" bg="#efa45b" round></vs-icon> PENDING (2)</span>
                      </vs-col>
                    </vs-row>
                  </vs-col>
                  <vs-col vs-w="3.5" style="padding: 0px 10px;">
                    <span class="titre-zone">Change Order</span><el-badge class="mark" :value="12" type="info"/>
                    <vs-row class="space-zone">
                      <vs-col vs-w="6" style="display: grid;">
                        <span class="prix-zone">$22.4K</span>
                        <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 8px" icon="arrow_forward_ios" color="white" bg="#13ce66" round></vs-icon> ACCEPTE (2)</span>
                      </vs-col>
                      <vs-col vs-w="6" style="display: grid;">
                        <span class="prix-zone">$22.4K</span>
                        <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 8px" icon="arrow_forward_ios" color="white" bg="#efa45b" round></vs-icon> PENDING (2)</span>
                      </vs-col>
                    </vs-row>
                  </vs-col>
                  <vs-col vs-w="5" style="padding-left: 10px;">
                    <span class="titre-zone">Invoices</span><el-badge class="mark" :value="12" type="info"/>
                    <vs-row class="space-zone">
                      <vs-col vs-w="4" style="display: grid;">
                        <span class="prix-zone">$22.4K</span>
                        <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 8px" icon="arrow_forward_ios" color="white" bg="#13ce66" round></vs-icon> ACCEPTE (2)</span>
                      </vs-col>
                      <vs-col vs-w="4" style="display: grid;">
                        <span class="prix-zone">$22.4K</span>
                        <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 8px" icon="arrow_forward_ios" color="white" bg="#efa45b" round></vs-icon> PENDING (2)</span>
                      </vs-col>
                      <vs-col vs-w="4" style="display: grid;">
                        <span class="prix-zone">$22.4K</span>
                        <span class="sousTitre-zone"><vs-icon style=" padding: 3px; font-size: 8px" icon="arrow_forward_ios" color="white" bg="#13ce66" round></vs-icon> ACCEPTE (2)</span>
                      </vs-col>
                    </vs-row>
                  </vs-col>
                </vs-row>
               
              </el-card>

              
              <el-tabs type="border-card" @tab-click="handleClick" style="margin-top: 30px;">
                <el-tab-pane label="All Orders">
                  <vs-table search stripe :data="users">
                    <template slot="header">
                      <h3>
                        Users
                      </h3>
                    </template>
                    <template slot="thead">
                      <vs-th sort-key="id">
                        Order Id
                      </vs-th>
                      <vs-th sort-key="username">
                        Customer
                      </vs-th>
                      <vs-th sort-key="email">
                        Order
                      </vs-th>
                      <vs-th sort-key="website">
                        Delivery Date
                      </vs-th>
                      <vs-th>
                        Delivery Price
                      </vs-th>
                      <vs-th>
                        Delivery Status
                      </vs-th>
                      <vs-th>
                        Payment
                      </vs-th>
                      <vs-th>
                        -
                      </vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="data[indextr].id">
                          {{data[indextr].email}}
                        </vs-td>

                        <vs-td :data="data[indextr].username">
                          <b>{{data[indextr].name}}</b>
                        </vs-td>

                        <vs-td :data="data[indextr].email">
                          {{data[indextr].email}}
                        </vs-td>

                        <vs-td :data="data[indextr].website">
                          {{data[indextr].website}}
                        </vs-td>

                        <vs-td :data="data[indextr].price">
                          <b>{{data[indextr].price}}</b>
                        </vs-td>

                        <vs-td :data="data[indextr].email">
                          <vs-chip transparent color="primary">
                            Successful
                          </vs-chip>
                        </vs-td>

                        <vs-td :data="data[indextr].email">
                          <span style="color: gray;">delivery</span>
                        </vs-td>
                        <vs-td :data="data[indextr].email">
                          <vs-button color="primary" type="flat" icon="edit"></vs-button>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </el-tab-pane>
                <el-tab-pane label="Completed">Config</el-tab-pane>
                <el-tab-pane label="Continung">Rôle</el-tab-pane>
                <el-tab-pane label="Result">Tâche</el-tab-pane>
              </el-tabs>
              <vs-divider/>
              <h2>Bilan 2023</h2>
              
              <vs-divider/>
              <vs-row style="margin-top: 30px;">
                    <vs-col  vs-w="2" style="padding: 3px;">
                      <vs-button color="primary" type="gradient" style="width: 100%;" icon="paid">Comptabilité</vs-button>
                    </vs-col>
                    <vs-col  vs-w="2" style="padding: 3px;">
                      <vs-button color="primary" type="gradient" style="width: 100%;" icon="inventory">Stock</vs-button>
                    </vs-col>
                    <vs-col  vs-w="2" style="padding: 3px;">
                      <vs-button color="primary" type="gradient" style="width: 100%;" icon="settings">Paramètre</vs-button>
                    </vs-col>
                    
                </vs-row>
                <h2 v-for="i in 30" :key="i">Bilan 2023</h2>
            </div>
          </vs-col>
        </vs-row>
      </div>
     
  </div>
</template>

<script>
import SideBar from '@/components/Sidebar.vue'
import NavBar from '@/components/Navbar.vue'
export default {
  name: 'HelloWorld',
  components: {
    SideBar,
    NavBar
  },
  data() {
    return {
      deadline3: Date.now() + (new Date().setHours(17, 59, 59) - Date.now()),
      like: true,
        value1: 4154.564,
        value2: 2222,
        title: 'Growth this year',
      activeName: 'first',
      users:[
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "website": "hildegard.org",
        "price": "1500 K",
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "website": "anastasia.net",
        "price": "1500 K",
      },
      {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "website": "ramiro.info",
        "price": "1500 K",
      },
      {
        "id": 4,
        "name": "Patricia Lebsack",
        "username": "Karianne",
        "email": "Julianne.OConner@kory.org",
        "website": "kale.biz",
        "price": "1500 K",
      },
      {
        "id": 5,
        "name": "Chelsey Dietrich",
        "username": "Kamren",
        "email": "Lucio_Hettinger@annie.ca",
        "website": "demarco.info",
        "price": "1500 K",
      },
      {
        "id": 6,
        "name": "Mrs. Dennis Schulist",
        "username": "Leopoldo_Corkery",
        "email": "Karley_Dach@jasper.info",
        "website": "ola.org",
        "price": "1500 K",
      },
      {
        "id": 7,
        "name": "Kurtis Weissnat",
        "username": "Elwyn.Skiles",
        "email": "Telly.Hoeger@billy.biz",
        "website": "elvis.io",
        "price": "1500 K",
      },
      {
        "id": 8,
        "name": "Nicholas Runolfsdottir V",
        "username": "Maxime_Nienow",
        "email": "Sherwood@rosamond.me",
        "website": "jacynthe.com",
        "price": "1500 K",
      },
      {
        "id": 9,
        "name": "Glenna Reichert",
        "username": "Delphine",
        "email": "Chaim_McDermott@dana.io",
        "website": "conrad.com",
        "price": "1500 K",
      },
      {
        "id": 10,
        "name": "Clementina DuBuque",
        "username": "Moriah.Stanton",
        "email": "Rey.Padberg@karina.biz",
        "website": "ambrose.net",
        "price": "1500 K",
      }
    ]
    }
  },
  methods: {
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
