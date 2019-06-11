import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#FAC223",
    secondary: "#9E9E9E",
    accent: colors.indigo.base // #3F51B5
  }
});
