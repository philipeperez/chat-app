import Vue from 'vue';
import Vuex, { MutationTree, StoreOptions } from 'vuex';
import { RootState } from '@/store/types';
import {User} from "@/types";
import 'socket.io-client';

Vue.use(Vuex);

const mutations: MutationTree<RootState> = {
  setNewUser(state: RootState, newUser: User) {
    state.user = newUser;
  },
  setSocket(state: RootState, socket: SocketIOClient.Socket) {
    state.socket = socket;
  }
};

const store: StoreOptions<RootState> = {
  state: {
    user: null,
    socket: null
  },
  mutations,
};

export default new Vuex.Store<RootState>(store);
