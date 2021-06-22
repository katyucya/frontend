import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';

import UserAvatar from '@/components/UserAvatar';

Vue.component('user-avatar', UserAvatar);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
