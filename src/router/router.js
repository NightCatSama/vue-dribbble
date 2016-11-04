/*
 * 路由配置
 */
import VueRouter from 'vue-router'
const routes = [{
	path: '/',
	component: resolve => require(['../views/index.vue'], resolve)
}]

const router = new VueRouter({
	routes,
	mode: 'history'
})

router.beforeEach((to, from, next) => {
	if (to.path !== '/') {
		next('/')
	}
	else {
		next()
	}
})

export default router
