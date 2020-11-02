import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/new',
		name: 'New',
		// route level code-splitting
		// this generates a separate chunk (editor.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
	},
	{
		path: '/post/:id',
		name: 'Post',
		component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue'),
	},
	{
		path: '/new/preview',
		name: 'Preview',
		props: true,
		component: () => import(/* webpackChunkName: "preview" */ '../views/Preview.vue'),
	},
	{
		path: '/user/:id',
		name: 'Blog',
		component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue'),
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
