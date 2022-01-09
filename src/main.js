import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Make BootstrapVue available throughout your project

// import { createApp } from 'vue';
// import { IonicVue } from '@ionic/vue';

import router from './router';
import store from './store/store';
import './styles/styles.scss';
import vClickOutside from 'v-click-outside';
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css';
Vue.use(ElementUI);
Vue.use(vClickOutside);
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(Tooltip);

// import { IonicVue } from '@ionic/vue';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

/*
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);*/
