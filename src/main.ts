import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
// @ts-ignore
import VueMoment from 'vue-moment';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
