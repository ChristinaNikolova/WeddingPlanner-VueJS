import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
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

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/plan', component: PlannerDashboard },
  { path: '/plan/create', component: PlannerCreate },
  { path: '/plan/edit/:id', component: PlannerUpdate },
  { path: '/plan/:id', component: PlannerDetails },
  { path: '/:plannerId/guest', component: GuestAll },
  { path: '/:plannerId/note', component: NoteAll },
  { path: '/:plannerId/event', component: EventAll },
  { path: '/:plannerId/budget', component: CostsAll },
  { path: '/:plannerId/checklist', component: TaskAll },
  { path: '/blog', component: ArticlesAll },
  { path: '/blog/:id', component: ArticleDetails },
  { path: '/user/favourite-article', component: FavouriteArticle },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
