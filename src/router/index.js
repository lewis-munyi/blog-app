import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/test',
		name: 'Test',
		component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
	},
	{
		path: '/edit',
		name: 'EditBlog',
		component: () => import(/* webpackChunkName: "editblog" */ '../views/EditBlog.vue'),
	},
	{
		path: '/user/:id/blog',
		name: 'Blog',
		component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue'),
	},
	{
		path: '/create',
		name: 'CreateBlog',
		component: () => import(/* webpackChunkName: "createblog" */ '../views/CreateBlog.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
