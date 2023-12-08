import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Logout from '../components/auth/Logout.vue';
import PlannerDashboard from '../components/planner/Dashboard.vue';
import PlannerCreate from '../components/planner/Create.vue';
import PlannerUpdate from '../components/planner/Update.vue';
import PlannerDetails from '../components/planner/Details.vue';
import GuestAll from '../components/guest/All.vue';
import NoteAll from '../components/note/All.vue';
import EventAll from '../components/event/All.vue';
import CostsAll from '../components/budget/All.vue';
import TaskAll from '../components/checklist/task/All.vue';
import ArticlesAll from '../components/blog/All.vue';
import ArticleDetails from '../components/blog/Details.vue';
import FavouriteArticle from '../components/user/FavouriteArticle.vue';
import NotFound from '../components/NotFound.vue';
import { isAdmin, isGuest, isUser } from '../guards/preGuards.js';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, beforeEnter: isGuest },
  { path: '/register', component: Register, beforeEnter: isGuest },
  { path: '/logout', component: Logout, beforeEnter: isUser },
  { path: '/plan', component: PlannerDashboard, beforeEnter: isUser },
  { path: '/plan/create', component: PlannerCreate, beforeEnter: isUser },
  { path: '/plan/edit/:id', component: PlannerUpdate, beforeEnter: isUser },
  { path: '/plan/:id', component: PlannerDetails, beforeEnter: isUser },
  { path: '/:plannerId/guest', component: GuestAll, beforeEnter: isUser },
  { path: '/:plannerId/note', component: NoteAll, beforeEnter: isUser },
  { path: '/:plannerId/event', component: EventAll, beforeEnter: isUser },
  { path: '/:plannerId/budget', component: CostsAll, beforeEnter: isUser },
  { path: '/:plannerId/checklist', component: TaskAll, beforeEnter: isUser },
  { path: '/blog', component: ArticlesAll },
  { path: '/blog/:id', component: ArticleDetails, beforeEnter: isUser },
  { path: '/user/favourite-article', component: FavouriteArticle, beforeEnter: isUser },
  { path: '/administration', component: () => import('../components/administration/Dashboard.vue'), beforeEnter: isAdmin },
  { path: '/administration/articles/create', component: () => import('../components/administration/blog/Create.vue'), beforeEnter: isAdmin },
  { path: '/administration/articles/edit/:id', component: () => import('../components/administration/blog/Update.vue'), beforeEnter: isAdmin },
  { path: '/administration/categories', component: () => import('../components/administration/category/All.vue'), beforeEnter: isAdmin },
  { path: '/administration/categories/create', component: () => import('../components/administration/category/Create.vue'), beforeEnter: isAdmin },
  { path: '/administration/categories/edit/:id', component: () => import('../components/administration/category/Update.vue'), beforeEnter: isAdmin },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
