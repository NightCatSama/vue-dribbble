/*
 * 路由配置
 */
import VueRouter from 'vue-router'
const routes = [{
	path: '/vue-dribbble/dist',
	redirect: '/'
}, {
	path: '/',
	component: resolve => require(['../views/index.vue'], resolve)
}]

const router = new VueRouter({
	routes,
	mode: 'history'
})

router.beforeEach((to, from, next) => {
	if (to.fullPath !== '/') {
		window.location = `https://dribbble.com${to.fullPath}`
		next()
	}
	else {
		next()
	}
})

export default router
