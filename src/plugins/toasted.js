import Toasted from "vue-toasted";
import Vue from "vue";

Vue.use(Toasted, {
  position: "bottom-center",
  duration: 3000,
  className: "elevation-12"
});

const errorConfig = {
  type: "error",
  icon: "error"
};

Vue.toasted.register("defaultError", "Erro, tente novamente!", errorConfig);
