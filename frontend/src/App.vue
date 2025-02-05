<template>
  <div>
    <h1>Dog Image App</h1>
    <nav>
      <router-link to="/">Home</router-link> | 
      <router-link to="/login">Login</router-link> | 
      <router-link to="/register">Register</router-link> | 
      <!-- ↓ログイン中のみ表示するとよい-->
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      // 例: トークンがあればログイン中と見なすシンプルな例
      isLoggedIn: !!localStorage.getItem('token')
    };
  },
  methods: {
    async logout() {
      try {
        await axios.post('http://localhost:5001/api/users/logout');
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
