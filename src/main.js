import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebaseConfig from './config/firebase';
import firebase from 'firebase';
import 'firebase/firestore';
import VueYouTubeEmbed from 'vue-youtube-embed';
import FormattedDate from './filters/formattedDate';
import { createBus } from './helpers/eventBus';

Vue.config.productionTip = false;

Vue.use(VueYouTubeEmbed);

Vue.filter('formatdate', FormattedDate);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

Vue.$db = db;

createBus();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch('LOAD_BOOKS');
  }
}).$mount('#app');
