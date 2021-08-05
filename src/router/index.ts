import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 获取用户信息
const getToken = () => {
	return localStorage.getItem('token');
};

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home/Home.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/components/layout/login.vue'),
		// beforeEnter: (to, from, next) => {
		// 	const isLogin = getToken();
		// 	// 已登录状态跳登录页, 重定向至首页
		// 	if (isLogin) {
		// 		next('/');
		// 	}
		// 	next();
		// },
	},
	{
		path: '/create',
		name: 'Create',
		component: () => import('@/views/create/Create.vue'),
		meta: {
			requiredLogin: true,
		},
	},
	{
		path: '/detail/:id',
		name: 'Detail',
		component: () => import('@/views/detail/Detail.vue'),
	},
	// {
	// 	path: '/:pathMatch(.*)*',
	// 	name: '404',
	// 	component: () => import('@/components/layout/404.vue'),
	// },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const isLogin = getToken(); // 根据token是否存在判断用户是否登录
	if (!isLogin && to.meta.requiredLogin) {
		next('/login');
	} else {
		next();
	}
});

export default router;
