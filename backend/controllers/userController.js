// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // 必要項目チェック(未入力があればエラーを返す)
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'すべて入力してください' });
    }

    // 同一メールアドレスやユーザーネームの重複チェック
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: '既に同じメールアドレスかユーザー名が存在します' });
    }

    // パスワードをハッシュ化して保存
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'ユーザー登録が完了しました' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'サーバーエラー' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // とりあえずメールアドレスかユーザーネームでログインできるようにする例
    if ((!email && !username) || !password) {
      return res.status(400).json({ message: 'メールアドレス(またはユーザー名)とパスワードを入力してください' });
    }

    // ユーザ検索(メールアドレス or ユーザー名)
    const user = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (!user) {
      return res.status(401).json({ message: 'ユーザーが見つかりません' });
    }

    // パスワード照合
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'パスワードが違います' });
    }

    // JWT発行
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    return res.status(200).json({
      message: 'ログイン成功',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'サーバーエラー' });
  }
};

exports.logout = async (req, res) => {
  try {
    // フロント側でトークンを削除するだけでもOK
    // ここでは単純にメッセージを返す例
    return res.status(200).json({ message: 'ログアウトしました' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'サーバーエラー' });
  }
};
