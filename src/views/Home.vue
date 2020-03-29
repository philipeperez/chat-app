<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <div class="text-center mb-2">
          <h1 class="display-1">Chat App</h1>
          <h1 class="subtitle-1">A simple chat app built with Nestjs and Vuetify</h1>
        </div>
        <login/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  // @ is an alias to /src
  import {Component, Vue} from 'vue-property-decorator';
  import Login from '@/components/Login.vue';

  @Component({
    components: {
      Login,
    },
  })
  export default class Home extends Vue {
  }
</script>
