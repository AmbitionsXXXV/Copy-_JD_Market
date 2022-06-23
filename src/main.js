import Vue from 'vue';
import '@js/filters.js';
import '@js/htmlFontSize.js';
import App from './App.vue';
import router from './router';
import store from './store';
import '@js/axios.config';
import '@js/IsIphoneX';
// import VConsole from 'vconsole';

// new VConsole();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
