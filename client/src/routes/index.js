import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import PlannerDashboard from '../components/planner/Dashboard.vue';
import PlannerDetails from '../components/planner/Details.vue';
import PlannerCreate from '../components/planner/Create.vue';
import GuestAll from '../components/guest/All.vue';
import NoteAll from '../components/note/All.vue';
import EventAll from '../components/event/All.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/plan', component: PlannerDashboard },
  { path: '/plan/:id', component: PlannerDetails },
  { path: '/plan/create', component: PlannerCreate },
  { path: '/:plannerId/guest', component: GuestAll },
  { path: '/:plannerId/note', component: NoteAll },
  { path: '/:plannerId/event', component: EventAll },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
