<!-- frontend/src/components/LoginForm.vue -->
<template>
    <div>
      <h2>ログイン</h2>
      <div>
        <label>Email or Username: </label>
        <input type="text" v-model="identifier" />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" v-model="password" />
      </div>
      <button @click="login">Login</button>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginForm',
    data() {
      return {
        identifier: '', // email か username
        password: '',
        message: ''
      };
    },
    methods: {
      async login() {
        try {
          const payload = {
            email: this.identifier.includes('@') ? this.identifier : '', 
            username: !this.identifier.includes('@') ? this.identifier : '',
            password: this.password
          };
          const res = await axios.post('http://localhost:5000/api/users/login', payload);
          this.message = res.data.message;
          // JWTトークンを保存 (ローカルストレージなど)
          localStorage.setItem('token', res.data.token);
          // ログイン後にホーム画面へリダイレクトする例
          this.$router.push('/');
        } catch (error) {
          this.message = error.response?.data?.message || 'ログインに失敗しました';
        }
      }
    }
  };
  </script>
  