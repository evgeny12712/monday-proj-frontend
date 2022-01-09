import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '../views/home.vue';
import workspace from '../views/workspace.vue';
import login from '../views/login.vue';
import signup from '../views/signup.vue';
import taskUpdate from '../components/task-list/task-update.vue';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/boards',
		component: workspace,
		children: [
			{
				path: ':taskId',
				component: taskUpdate,
			},
		],
	},
	{
		path: '/login',
		component: login,
	},
	{
		path: '/signup',
		component: signup,
	},
	{
		path: '/taskUpdate',
		component: taskUpdate,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
