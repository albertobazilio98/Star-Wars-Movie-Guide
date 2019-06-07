<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-toolbar-title> Star Wars </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="languageDialog" color="primary"> {{ language }}? </v-btn>
        
      </v-toolbar>
      <div>
        <v-container>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 lg6>
              <v-card>
                <v-data-table
                  :headers="headers"
                  :items="movies"
                  item-key="title"
                  class="elevation-1"
                  hide-actions
                >
                  <template v-slot:items="props">
                    <tr @click="props.expanded = !props.expanded">
                      <td class="text-xs-center">{{ props.item.episode }}</td>
                      <td>{{ props.item.title }}</td>
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
            <v-dialog v-model="dialog" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline">Select your race</span>
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
                          @click="wookie = true, languageDialog()"
                        >
                          <v-img
                            :src="require('@/images/wookie.png')"
                            class="grey darken-4"
                          ></v-img>
                          <v-card-title class="title">Wookie</v-card-title>
                        </v-card>
                      </v-hover>
                    </v-flex>

                    <v-flex xs6>
                      <v-hover>
                        <v-card
                          slot-scope="{ hover }"
                          :class="`elevation-${hover ? 24 : 2}`"
                          @click="wookie = false, languageDialog()"
                        >
                          <v-img
                            :src="require('@/images/Jedi.png')"
                            class="grey darken-4"
                          ></v-img>
                          <v-card-title class="title">Jedi</v-card-title>
                        </v-card>
                      </v-hover>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import find from "@/services/api-service";

export default {
  name: 'app',
  data: () => ({
    wookie: false,
    dialog: true,
    headers: [
      { text: "espisódio", value: "episode", width: "10%"},
      { text: "Título", value: "title"}
    ],
    movies: [],
    roman: ["I", "II", "III", "IV", "V", "VI", "VII"]
  }),
  computed: {
    language() {
      return this.wookie
        ? "Jedi"
        : "Wookie";
    }
  },
  methods: {
    languageDialog () {
      this.dialog = !this.dialog;
    },
    async listMovies() {
      try {
        let response = await find(this.wookie?"wookie":"json");
        this.movies = response.data.results;
      } catch (e) {
        this.movies = {};
      }
    }
  },
  created() {
    this.listMovies();
  }
}
</script>

