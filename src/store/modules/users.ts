import { PagingFilter } from './../../models/pagingModel';
import { Commit } from "vuex";
import UserServices, { UserInfo } from '@/services/users';

export const SET_USERS = "setUsers";
export const SET_FILTER = "setFilter";


export interface UsersState {
    items: Array<UserInfo>;
    filter: PagingFilter;
}

interface UsersStore {
    state: UsersState;
    commit: Commit;
}
// State object
const state = {
    items: [] as Array<UserInfo>,
    filter: {
        pageSize: 5,
        currentPage: 1,
        totalCount: 0,
        searchText: ''
    }
} as UsersState;

// Getter functions
const getters = {}
// Actions 
const actions = {
    async getUsersByFilter({ commit }: UsersStore, filter: PagingFilter) {
        const result = await UserServices.getUsers(filter);
        const data = await result.json();
        commit(SET_USERS, data.results);
        commit(SET_FILTER, data.pagingFilter);
    },
}
// Mutations
const mutations = {
    [SET_USERS](state: UsersState, value: Array<UserInfo>) {
        state.items = value;
    },
    [SET_FILTER](state: UsersState, value: PagingFilter) {
        state.filter = value;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}