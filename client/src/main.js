import { createApp } from 'vue';
import router from './routes/index';
import './styles/index.css';
import App from './App.vue';
import Jumbotron from './components/Jumbotron.vue';

const app = createApp(App);
app.use(router);
app.component('Jumbotron', Jumbotron);
app.mount('#app');
