import { Commit } from "vuex";

export const SET_IS_BUZY = "setIsBuzy";


interface ProgressState {
    isBuzy: boolean;
}

interface ProgressStore {
    state: ProgressState;
    commit: Commit;
}
// State object
const state = {
    isBuzy: false
} as ProgressState;

// Getter functions
const getters = {}
// Actions 
const actions = {
    show({ commit }: ProgressStore) {
        commit(SET_IS_BUZY, true);
    },
    hide({ commit }: ProgressStore) {
        commit(SET_IS_BUZY, false);
    },
}
// Mutations
const mutations = {
    [SET_IS_BUZY](state: ProgressState, value: boolean) {
        state.isBuzy = value;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}