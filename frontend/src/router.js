// frontend/src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: LoginForm },
  { path: '/register', name: 'Register', component: RegisterForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
