<style scoped></style>

<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat>
      <v-toolbar-title>Login Form</v-toolbar-title>
    </v-toolbar>
    <v-form v-model="valid" @submit.prevent="login" class="pa-3">
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
      <v-btn :loading="isLoading" type="submit" block color="success">Login</v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Login extends Vue {
    @Prop({default: false}) readonly isLoading!: Boolean;
    private valid: Boolean = false;
    private user: string = '';
    private nameRules: Function[] = [
      (v: string | null): boolean | string => !!v || 'Username is required',
      (v: string | null): boolean | string => (!!v && v.length <= 20) || 'Username must be less than 20 characters',
    ];

    // get user(): string | null {
    //   if (this.$store.state.user) {
    //     return this.$store.state.user.name;
    //   }
    //   return ''
    // }
    //
    // set user(newUser: string | null) {
    //   this.$store.commit('setNewUser', {name: newUser});
    // }

    public login(): void {
      if (this.valid) {
        this.$emit('login', this.user)
        // this.$router.push('/chat');
      }
    }
  }
</script>
