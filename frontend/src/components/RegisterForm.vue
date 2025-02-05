<!-- frontend/src/components/RegisterForm.vue -->
<template>
    <div>
      <h2>ユーザー登録</h2>
      <div>
        <label>Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <button @click="register">Register</button>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RegisterForm',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        message: ''
      };
    },
    methods: {
      async register() {
        try {
          const payload = {
            username: this.username,
            email: this.email,
            password: this.password
          };
          const res = await axios.post('http://localhost:5001/api/users/register', payload);
          this.message = res.data.message;
          // 登録が成功したらログイン画面へ移動など
          this.$router.push('/login');
        } catch (error) {
          this.message = error.response?.data?.message || '登録に失敗しました';
        }
      }
    }
  };
  </script>
  