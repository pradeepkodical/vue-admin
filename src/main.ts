import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import i18n from './plugins/vueI18n';
import { UserInfo } from "./services/users";

Vue.config.productionTip = false;

Vue.filter('initials', (user: UserInfo) => {
  return `${user.firstName ? user.firstName[0] : user.userName[0]}${user.lastName ? user.lastName[0] : user.userName[0]}`;
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
