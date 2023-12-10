import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './routes/index';
import './styles/index.css';
import App from './App.vue';
import Jumbotron from './components/Jumbotron.vue';
import AppInput from './components/shared/inputs/AppInput.vue';
import AppSelect from './components/shared/inputs/AppSelect.vue';
import AppTextArea from './components/shared/inputs/AppTextArea.vue';
import FormButton from './components/shared/buttons/Form.vue';
import AddButton from './components/shared/buttons/Add.vue';
import LinkButton from './components/shared/buttons/Link.vue';
import ClientError from './components/shared/errors/ClientError.vue';
import ServerError from './components/shared/errors/ServerError.vue';
import Loading from './components/shared/Loading.vue';
import { useAuthStore } from './store/auth';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const store = useAuthStore();
store.getPersistedProfile();

app.component('Jumbotron', Jumbotron);
app.component('AppInput', AppInput);
app.component('AppSelect', AppSelect);
app.component('AppTextArea', AppTextArea);
app.component('FormButton', FormButton);
app.component('AddButton', AddButton);
app.component('LinkButton', LinkButton);
app.component('ClientError', ClientError);
app.component('ServerError', ServerError);
app.component('Loading', Loading);
app.mount('#app');
