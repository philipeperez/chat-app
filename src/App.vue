<style></style>

<template>
  <v-app>
    <v-content fluid>
      <router-view/>
    </v-content>
    <page-footer/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageFooter from '@/components/PageFooter.vue';

@Component({
  components: {
    PageFooter,
  }
})
export default class App extends Vue {
}
</script>
