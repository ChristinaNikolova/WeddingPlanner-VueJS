import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import PlannerDashboard from '../components/planner/Dashboard.vue';
import PlannerDetails from '../components/planner/Details.vue';
import PlannerCreate from '../components/planner/Create.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/plan', component: PlannerDashboard },
  { path: '/plan/:id', component: PlannerDetails },
  { path: '/plan/create', component: PlannerCreate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
