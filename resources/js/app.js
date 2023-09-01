
import './bootstrap';
import * as Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createApp } from 'vue';


const app = createApp({});
app.use(VueAxios, axios)

import ToDo from './components/ToDo.vue';
app.component('todo', ToDo);


app.mount('#app');
