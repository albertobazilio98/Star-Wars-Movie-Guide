<template>
  <v-app>
    <v-img
      :src="require('@/images/bg.jpg')"
    >
    <div>
      <v-toolbar color="primary">
        <v-toolbar-title> Star Wars Movie Guide </v-toolbar-title>
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
                      <div class="text-xs-center">
                        <v-btn
                          round
                          outline
                          color="primary"
                          @click="openingCrawl = true"
                        >Opening Crawl</v-btn>
                      </div>
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
                          <v-expansion-panel-content style="background-color: #9E9E9E; color: #FAC223">
                            <template v-slot:header>
                              Characters
                            </template>
                            <v-data-table
                              :items="movie.charactersNames"
                              hide-headers
                              hide-actions
                            >
                              <template v-slot:items="props">
                                <tr style="background-color: #E0E0E0">
                                  <td>{{ props.item.data.name }}</td>
                                </tr>
                              </template>
                            </v-data-table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-card>

                      <v-card>
                        <v-expansion-panel>
                          <v-expansion-panel-content style="background-color: #9E9E9E">
                            <template v-slot:header>
                              Planets
                            </template>
                            <v-data-table
                              :items="movie.planetsNames"
                              hide-headers
                              hide-actions
                            >
                              <template v-slot:items="props">
                                <tr style="background-color: #E0E0E0">
                                  <td>{{ props.item.data.name }}</td>
                                </tr>
                              </template>
                            </v-data-table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-card>

                      <v-card>
                        <v-expansion-panel>
                          <v-expansion-panel-content style="background-color: #9E9E9E">
                            <template v-slot:header>
                              Starships
                            </template>
                            <v-data-table
                              :items="movie.starshipsNames"
                              hide-headers
                              hide-actions
                            >
                              <template v-slot:items="props">
                                <tr style="background-color: #E0E0E0">
                                  <td>{{ props.item.data.name }}</td>
                                </tr>
                              </template>
                            </v-data-table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-card>

                      <v-card>
                        <v-expansion-panel>
                          <v-expansion-panel-content style="background-color: #9E9E9E">
                            <template v-slot:header>
                              Vehicles
                            </template>
                            <v-data-table
                              :items="movie.vehiclesNames"
                              hide-headers
                              hide-actions
                            >
                              <template v-slot:items="props">
                                <tr style="background-color: #E0E0E0">
                                  <td>{{ props.item.data.name }}</td>
                                </tr>
                              </template>
                            </v-data-table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-card>

                      <v-card>
                        <v-expansion-panel>
                          <v-expansion-panel-content style="background-color: #9E9E9E">
                            <template v-slot:header>
                              Species
                            </template>
                            <v-data-table
                              :items="movie.speciesNames"
                              hide-headers
                              hide-actions
                            >
                              <template v-slot:items="props">
                                <tr style="background-color: #E0E0E0">
                                  <td>{{ props.item.data.name }}</td>
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

            <v-dialog v-model="openingCrawl" max-width="800px">
              <v-card color="black" class=".card" height="400px">
                <v-icon color="primary" @click="openingCrawl=false">close_rounded</v-icon>
                <section class="star-wars">
                  <div class="crawl">
                    <div class="title">
                      <p>Episode {{ roman[movie.espisode_id] }}</p>
                      <h1>{{ movie.title }}</h1>
                    </div>
                    <p>{{ movie.opening_crawl }}</p> 
                  </div>
                </section>
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
import axios from "axios";

export default {
  name: 'app',
  data: () => ({
    openingCrawl: false,
    search: "",
    detailsDialog: false,
    headers: [
      { text: "Episode",   value: "episode", width: "10", sortable: false},
      { text: "Title",     value: "title"   },
      { text: "",          value: "actions", sortable: false }
    ],
    movie: {},
    movies: [],
    roman: ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
    characters: [],
    aux: {
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: []
    }
  }),
  methods: {
    fixPromises() {
      this.characters = this.movie.characterName;
    },
    openDetailsDialog (item) {
      this.movie = item;
      this.movie.charactersNames = [];
      this.movie.planetsNames = [];
      this.movie.starshipsNames = [];
      this.movie.vehiclesNames = [];
      this.movie.speciesNames = [];
      this.movie.poster = require(`@/images/posters/${this.movie.episode_id}.jpg`);
      this.detailsDialog = !this.detailsDialog;
      this.findCharacter();
      this.movie.charactersNames = this.aux.characters;
      this.findPlanet();
      this.movie.planetsNames = this.aux.planets;
      this.findStarships();
      this.movie.starshipsNames = this.aux.starships;
      this.findVehicles();
      this.movie.vehiclesNames = this.aux.vehicles;
      this.findSpecie();
      this.movie.speciesNames = this.aux.species;
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
      this.aux.charactersNames = [];
      for(var i in this.movie.characters) {
        find(this.movie.characters[i].slice(21))
        .then(response => (
          this.aux.characters.push(response)
        ))
        .catch(error => (
          console.log(error)
        ))
      }
    },
    async findPlanet() {
      this.aux.planetsNames = [];
      for(var i in this.movie.planets) {
        find(this.movie.planets[i].slice(21))
        .then(response => (
          this.aux.planets.push(response)
        ))
        .catch(error => (
          console.log(error)
        ))
      }
    },
    async findStarships() {
      this.aux.starshipsNames = [];
      for(var i in this.movie.starships) {
        find(this.movie.starships[i].slice(21))
        .then(response => (
          this.aux.starships.push(response)
        ))
        .catch(error => (
          console.log(error)
        ))
      }
    },
    async findVehicles() {
      this.aux.vehiclesNames = [];
      for(var i in this.movie.vehicles) {
        find(this.movie.vehicles[i].slice(21))
        .then(response => (
          this.aux.vehicles.push(response)
        ))
        .catch(error => (
          console.log(error)
        ))
      }
    },
    async findSpecie() {
      this.aux.speciesNames = [];
      for(var i in this.movie.species) {
        find(this.movie.species[i].slice(21))
        .then(response => (
          this.aux.species.push(response)
        ))
        .catch(error => (
          console.log(error)
        ))
      }
    }
  },
  created() {
    this.listMovies();
  }
};
</script>

<style>
.card {
  width: 100%;
  height: 100%;
  background: #000;
}

.star-wars {
  display: flex;
  justify-content: center;
  position: relative;
  height: 800px;
  color: #feda4a;
  font-family: 'Pathway Gothic One', sans-serif;
  font-size: 500%;
  font-weight: 600;
  letter-spacing: 6px;
  line-height: 150%;
  perspective: 400px;
  text-align: justify;
}

.crawl {
  position: relative;
  top: 99999px;
  transform-origin: 50% 100%;
  animation: crawl 60s linear;
}

.crawl > .title {
  font-size: 90%;
  text-align: center;
}

.crawl > .title h1 {
  margin: 0 0 100px;
  text-transform: uppercase;
}

@keyframes crawl {
	0% {
    top: -100px;
    transform: rotateX(30deg)  translateZ(0);
  }
	100% { 
    top: -6000px;
    transform: rotateX(25deg) translateZ(-2500px);
  }
}
</style>




