<!-- frontend/src/views/Home.vue -->
<template>
    <div>
      <h2>Home</h2>
      <button @click="fetchDogImage">犬画像を表示</button>
      <div v-if="dogImage">
        <img :src="dogImage" alt="Dog Image" style="max-width: 300px;">
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Home',
    data() {
      return {
        dogImage: null
      }
    },
    methods: {
      async fetchDogImage() {
        try {
          // 直接 dog.ceo を叩く場合
          // const res = await axios.get('https://dog.ceo/api/breeds/image/random');
  
          // バックエンド経由の場合
          const res = await axios.get('http://localhost:5001/api/dog-image');
          this.dogImage = res.data.message;
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  </script>
  