// backend/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB へ接続しました');
  } catch (error) {
    console.error('MongoDB接続エラー: ', error);
    process.exit(1);
  }
};

module.exports = connectDB;
