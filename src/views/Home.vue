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

    login(user: string): void {
      this.isLoading = true;
      this.$store.dispatch('connect', {name: user});
    }

    @Watch('connected')
    onSocketConnect (newVal: Boolean | undefined): void {
      if (newVal) {
        this.isLoading = false;
        this.$router.push('/chat');
      }
    }

    get connected (): Boolean | undefined {
      return this.$store.state.socket?.connected
    }
  }
</script>
