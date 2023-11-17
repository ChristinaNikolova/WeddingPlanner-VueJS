import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import PlannerDashboard from '../components/planner/Dashboard.vue';
import PlannerDetails from '../components/planner/Details.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/plan', component: PlannerDashboard },
  { path: '/plan/:id', component: PlannerDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
