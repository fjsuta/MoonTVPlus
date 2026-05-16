const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/database');
const redisClient = require('../../config/redis');

exports.register = async (req, res) => {
  try {
    const { username, email, password, nickname } = req.body;
    
    const [existing] = await db.query(
      'SELECT id FROM user WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: '用户名或邮箱已存在' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await db.query(
      'INSERT INTO user (username, email, password, nickname) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, nickname || username]
    );
    
    const token = jwt.sign(
      { userId: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: result.insertId,
        username,
        email,
        nickname: nickname || username
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [users] = await db.query(
      'SELECT * FROM user WHERE username = ? OR email = ?',
      [username, username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }
    
    const user = users[0];
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }
    
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    await db.query(
      'UPDATE user SET last_login_at = NOW() WHERE id = ?',
      [user.id]
    );
    
    await redisClient.set(`user:online:${user.id}`, '1', { EX: 86400 });
    
    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
        level: user.level
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      await redisClient.del(`token:${token}`);
    }
    res.json({ message: '登出成功' });
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
};
