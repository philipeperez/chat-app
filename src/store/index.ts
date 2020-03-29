import Vue from 'vue';
import Vuex, { MutationTree, StoreOptions } from 'vuex';
import { RootState } from '@/store/types';
import {User} from "@/types";

Vue.use(Vuex);

const mutations: MutationTree<RootState> = {
  setNewUser(state: RootState, newUser: User) {
    state.user = newUser;
  },
};

const store: StoreOptions<RootState> = {
  state: {
    user: null,
  },
  mutations,
};

export default new Vuex.Store<RootState>(store);
