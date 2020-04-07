import Vue from 'vue';
import Vuex, {ActionTree, MutationTree, StoreOptions} from 'vuex';
import { RootState } from '@/store/types';
import {Message, MessageType, User} from "@/types";
import io from 'socket.io-client';

Vue.use(Vuex);

const actions: ActionTree<RootState, RootState> = {
  connect ({dispatch, commit}, newUser: User) {
    const socketOptions: SocketIOClient.ConnectOpts = {
      query: `user=${newUser.name}`
    };
    const socket: SocketIOClient.Socket = io('https://chat-app-nestjs-vue.herokuapp.com/', socketOptions);
    // const socket: SocketIOClient.Socket = io('http://localhost:3000', socketOptions);
    socket.on('msgToClient', (newMessage: Message) => commit('newIncomingMessage', newMessage));
    socket.on('onlineUserlistUpdated', (onlineUsers: User[]) => commit('setOnlineUsers', onlineUsers));
    socket.on('userConnected', (msg: Message) => commit('onUserConnect', msg));
    socket.on('userDisconnected', (msg: Message) => commit('onUserDisconnect', msg));

    commit('setNewUser', newUser);
    commit('setSocket', socket);
  }
};

const mutations: MutationTree<RootState> = {
  setNewUser(state: RootState, newUser: User) {
    state.user = newUser;
  },
  setSocket(state: RootState, socket: SocketIOClient.Socket) {
    state.socket = socket;
  },
  newIncomingMessage (state: RootState, newMessage: Message) {
    newMessage.type = MessageType.Message;
    state.messages = [...state.messages, newMessage];
  },
  setOnlineUsers (state: RootState, onlineUsers: User[]) {
    state.onlineUsers = onlineUsers
  },
  onUserConnect (state: RootState, msg: Message) {
    msg.type = MessageType.UserConnected;
    state.messages = [...state.messages, msg]
  },
  onUserDisconnect (state: RootState, msg: Message) {
    msg.type = MessageType.UserDisconnected;
    state.messages.push(msg)
  }
};

const store: StoreOptions<RootState> = {
  state: {
    user: null,
    socket: null,
    messages: [],
    onlineUsers: []
  },
  mutations,
  actions
};

export default new Vuex.Store<RootState>(store);
