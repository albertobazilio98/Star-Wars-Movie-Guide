<template>
  <v-app>
    <v-img
      :src="require('@/images/bg.jpg')"
    >
    <div>
      <v-toolbar color="primary">
        <v-toolbar-title> Star Wars </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="openLanguageDialog" outline round color="white"> 
          {{ language }}? 
        </v-btn>
      </v-toolbar>
      <div>
        <v-container>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 lg6>
              <v-card>
                <v-data-table
                  dark
                  disable-initial-sort
                  :headers="headers"
                  :items="movies"
                  item-key="episode"
                  hide-actions
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
                  <template v-slot:expand="props">
                    <v-card flat>
                      <v-card-text> Diretor: {{ props.item.director }}</v-card-text>
                    </v-card>
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <template>
            </template>
          </v-layout>

          <v-layout row justify-center>
            <v-dialog v-model="languageDialog" max-width="600px">
              <v-card style="background: linear-gradient(to top, #424242, #212121)">
                <v-card-title>
                  <span class="headline" style="color: #FAC223">Select your specie</span>
                </v-card-title>
                <v-container
                  fluid
                  grid-list-lg
                  fill-height
                >
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-hover>
                        <v-card
                          slot-scope="{ hover }"
                          :class="`elevation-${hover ? 24 : 2}`"
                          @click="wookiee = false, openLanguageDialog()"
                        >
                          <v-img
                            :src="require('@/images/Jedi.png')"
                            class="grey darken-4"
                          ></v-img>
                          <v-card-title class="title">Jedi</v-card-title>
                        </v-card>
                      </v-hover>
                    </v-flex>

                    <v-flex xs6>
                      <v-hover>
                        <v-card
                          slot-scope="{ hover }"
                          :class="`elevation-${hover ? 24 : 2}`"
                        >
                          <v-img
                            :src="require('@/images/wookieeDeactivated.png')"
                            class="grey darken-4"
                          ></v-img>
                          <v-card-title class="title">Wookiee (Not Working :/) </v-card-title>
                        </v-card>
                      </v-hover>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-dialog>
          </v-layout>

          <v-layout row justify-center>
            <v-dialog v-model="detailsDialog" max-width="600px">
              <v-card style="background: linear-gradient(to top, #424242, #212121)">
                <v-card-title>
                  <span class="headline" style="color: #FAC223">{{ this.movie.title }}</span>
                </v-card-title>
                <v-container
                  fluid
                  grid-list-lg
                  fill-height
                >
                  <v-layout>
                    <v-flex xs6>

                    </v-flex>
                    <v-flex xs6>
                      
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
    wookiee: false,
    languageDialog: true,
    detailsDialog: false,
    headers: [
      { text: "espisódio",  value: "episode", width: "10" },
      { text: "Título",     value: "title"   },
      { text: "",           value: "actions" }
    ],
    movie: {},
    movies: [],
    roman: ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"]
  }),
  computed: {
    language() {
      return this.wookiee
        ? "Jedi"
        : "wookiee";
    }
  },
  methods: {
    openDetailsDialog (item) {
      this.movie = item;
      this.detailsDialog = !this.detailsDialog;
    },
    openLanguageDialog () {
      this.languageDialog = !this.languageDialog;
    },
    async listMovies() {
      try {
        //if (!this.wookiee){
        let response = await find("json");
        this.movies = response.data.results;
        /*} else {
          let response = await find("wookiee");
          this.movies = response.data.rcwochuanaoc;
          console.log(response)
        }*/
      } catch (e) {
        this.movies = {};
      }
    },
    customSort(items, index, isDescending) {
      items.sort((a, b) => {
        if (index === 'episode_id') {
          if (isDescending) {
            return b.calories - a.calories;
          } else {
            return a.calories - b.calories;
          }
        }
      });
      return items;
    }
  },
  created() {
    this.listMovies();
  },
  watch: {
    wookiee:{
      handler(value){
        this.listMovies();
        return value;
      }
    }
  }
};
</script>



