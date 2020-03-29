<style scoped></style>

<template>
  <div>
    <v-fab-transition small>
      <v-btn
        @click="drawer = !drawer"
        small
        class="hidden-md-and-up mt-6"
        color="primary"
        dark
        absolute
        top
        right
        fab
      >
        <v-icon>list</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-navigation-drawer v-model="drawer" mobile-break-point="960" app>
      <v-toolbar slot="prepend" fixed color="success" dark dense>
        <v-spacer/>
        <v-toolbar-title>Online Users ({{ users.length }})</v-toolbar-title>
        <v-spacer/>
      </v-toolbar>


      <v-list>
        <div v-for="user in users" :key="user.id">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
  import 'reflect-metadata';
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {User} from "@/types";

  @Component({})
  export default class OnlineUserList extends Vue {
    @Prop({default: [], required: true}) readonly users!: User[];
    private drawer: Boolean | null = null
  }
</script>
