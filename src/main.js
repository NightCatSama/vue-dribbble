import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router/router'

Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
	router,
	el: '#app',
	template: '<App/>',
	components: { App }
})
