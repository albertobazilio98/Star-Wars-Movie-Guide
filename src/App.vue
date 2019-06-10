<template>
  <v-app>
    <v-img
      :src="require('@/images/bg.jpg')"
    >
    <div>
      <v-toolbar color="primary">
        <v-toolbar-title> Star Wars </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div>
        <v-container>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 lg6>
              <v-card color="#424242" dark>
                <v-card-title>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table
                  dark
                  disable-initial-sort
                  :headers="headers"
                  :items="movies"
                  hide-actions
                  :search="search"
                >
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-xs-center" style="color: #FAC223" >{{ roman[props.item.episode_id] }}</td>
                      <td>{{ props.item.title }}</td>
                      <td class="text-xs-right">
                        <v-icon
                          color="primary"
                          @click="openDetailsDialog(props.item)"
                        > 
                          info_outlined </v-icon>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <template>
            </template>
          </v-layout>

          <v-layout align-space-between justify-center row fill-height>
            <v-dialog v-model="detailsDialog" max-width="800px">
              <v-card style="background: linear-gradient(to top, #424242, #212121)">
                <v-card-title>
                  <span class="headline" style="color: #FAC223">{{ movie.title }}</span>
                </v-card-title>
                <v-container
                  fluid
                  grid-list-lg
                  fill-height
                >
                  <v-layout wrap>
                    <v-flex xs12 md6>
                      <v-card class="elevation-6">
                        <v-img
                          :src="movie.poster"
                          class="grey darken-4"
                        ></v-img>
                      </v-card>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-card class="elevation-3" color="grey">
                        <v-container>
                          <span class="headline" style="color: #FAC223">Details</span>
                          <v-divider></v-divider>
                          director: {{movie.director}}
                          <v-divider></v-divider>
                          release date: {{ movie.release_date }}
                          <v-divider></v-divider>
                          producer: {{ movie.producer }}
                        </v-container>
                      </v-card>

                      <v-container></v-container>
                      
                      <v-card>
                        <v-expansion-panel>
                          <v-expansion-panel-content style="background-color: #9E9E9E">
                            <template v-slot:header>
                              titulo
                            </template>
                            <v-data-table
                              :items="movie.characterName"
                              hide-headers
                            >
                              <template v-slot:items="props">
                                <tr style="background-color: #9E9E9E">
                                  <td>{{ props.item.name }}</td>
                                </tr>
                              </template>
                            </v-data-table>
                               

                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-card>
                      
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-container>
      </div>
    </div>
    </v-img>
  </v-app>
</template>

<script>
import find from "@/services/api-service";

export default {
  name: 'app',
  data: () => ({
    search: "",
    languageDialog: true,
    detailsDialog: false,
    headers: [
      { text: "Episode",   value: "episode", width: "10" },
      { text: "Title",     value: "title"   },
      { text: "",          value: "actions" }
    ],
    movie: {},
    movies: [],
    roman: ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"]
  }),
  methods: {
    openDetailsDialog (item) {
      this.movie = item;
      this.movie.characterName = [{name: "zé"}];
      this.movie.poster = require(`@/images/posters/${this.movie.episode_id}.jpg`);
      this.detailsDialog = !this.detailsDialog;
      this.findCharacter();
      this.movie.characterName.push({name:"joao"})
    },
    openLanguageDialog () {
      this.languageDialog = !this.languageDialog;
    },
    async listMovies() {
      try {
        let response = await find("films/");
        this.movies = response.data.results;
      } catch (e) {
        this.movies = {};
      }
    },
    async findCharacter() {
      var aux = [];
      for(var i in this.movie.characters) {
        try {
          let response = await find(this.movie.characters[i].slice(21));
          console.log(response.data)
          aux.push(response.data);
        } catch {
          this.movie.characterName.push("error");
        }
        /*find(this.movie.characters[i].slice(21))
        .then(function (response) {
          this.movie.characterName.push(response.data);
        })*/
      }
      this.movie.characterName = aux;
    }
  },
  created() {
    this.listMovies();
  }
};
</script>



