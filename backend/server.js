// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB(); // MongoDB接続

const app = express();
app.use(cors());
app.use(express.json());

// ユーザー関連のAPI
app.use('/api/users', userRoutes);

// 犬の画像API取得エンドポイント(必要であればバックエンドで代理で叩く場合)
app.get('/api/dog-image', async (req, res) => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '犬画像取得に失敗しました' });
  }
});

const PORT = process.env.PORT || 30034;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
