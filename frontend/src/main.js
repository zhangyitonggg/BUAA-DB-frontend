import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'
import vuetify from './plugins/vuetify.js'
import VueParticles from 'vue-particles'

Vue.config.productionTip = false

Vue.use(VueParticles)
Vue.use(ElementUI);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
