import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Icon from './components/AppIcon.vue'
import { pageReveal } from './utils/motion'
// import './styles/main.less'

Vue.config.productionTip = false
Vue.component('AppIcon', Icon)
Vue.directive('page-reveal', pageReveal)
new Vue({ router, render: (h) => h(App) }).$mount('#app')
