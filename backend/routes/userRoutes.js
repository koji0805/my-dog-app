// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 登録
router.post('/register', userController.register);
// ログイン
router.post('/login', userController.login);
// ログアウト
router.post('/logout', userController.logout);

module.exports = router;
