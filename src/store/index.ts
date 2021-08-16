import Vue from 'vue';
import Vuex from 'vuex';
import progress from "./modules/progress";
import users from "./modules/users";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store<any>({
  modules: {
    progress,
    users
  },
  strict: debug,
});

export default store;

