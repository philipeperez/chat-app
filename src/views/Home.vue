<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <div class="text-center mb-2">
          <h1 class="display-1">Chat App</h1>
          <h1 class="subtitle-1">A simple chat app built with Nestjs and Vuetify</h1>
        </div>
        <login :is-loading="isLoading" @login="login"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import Login from '@/components/Login.vue';
  import {User} from '../types';
  import io from 'socket.io-client';

  @Component({
    components: {
      Login,
    },
  })
  export default class Home extends Vue {
    private isLoading: Boolean = false;

    @Watch('user')
    onLogin(newUser: User | null) {
      if (!newUser) return;
      const socket: SocketIOClient.Socket = io('https://chat-app-nestjs-vue.herokuapp.com/', {query: `user=${newUser.name}`});
      this.$store.commit('setSocket', socket);
      socket.on('connect', () => {
        this.isLoading = false;
        this.$router.push('/chat');
      });
    }

    login(user: string): void {
      this.isLoading = true;
      this.$store.commit('setNewUser', {name: user});
    }

    get user(): User | null {
      return this.$store.state.user;
    }
  }
</script>
