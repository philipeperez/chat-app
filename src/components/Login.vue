<style scoped></style>

<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat>
      <v-toolbar-title>Login Form</v-toolbar-title>
    </v-toolbar>
    <v-form v-model="valid" @submit="login" class="pa-3">
      <v-text-field
        autofocus
        class="mb-5"
        type="text"
        prepend-icon="person"
        v-model="user"
        :rules="nameRules"
        :counter="20"
        label="Username"
        required/>
      <v-btn type="submit" block color="success">Login</v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Login extends Vue {
    private valid = false;
    private nameRules = [
      (v: string | null): boolean | string => !!v || 'Username is required',
      (v: string | null): boolean | string => (!!v && v.length <= 20) || 'Username must be less than 20 characters',
    ];

    get user(): string | null {
      return this.$store.state.user;
    }

    set user(newUser: string | null) {
      this.$store.commit('setNewUser', newUser);
    }

    login() {
      if (this.valid) {
        this.$router.push('/chat');
      }
    }
  }
</script>
