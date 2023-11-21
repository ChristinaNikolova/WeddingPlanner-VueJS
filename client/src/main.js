import { createApp } from 'vue';
import router from './routes/index';
import './styles/index.css';
import App from './App.vue';
import Jumbotron from './components/Jumbotron.vue';
import AppInput from './components/shared/inputs/AppInput.vue';
import ClientError from './components/shared/errors/ClientError.vue';

const app = createApp(App);
app.use(router);
app.component('Jumbotron', Jumbotron);
app.component('AppInput', AppInput);
app.component('ClientError', ClientError);
app.mount('#app');
