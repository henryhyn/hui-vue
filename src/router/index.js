import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/commons/Home';
import About from '@/pages/commons/About';
import Contact from '@/pages/commons/Contact';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/about', name: 'About', component: About},
    {path: '/contact', name: 'Contact', component: Contact}
  ]
});
