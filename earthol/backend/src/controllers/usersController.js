const db = require('../../config/database');
const redisClient = require('../../config/redis');

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const [users] = await db.query(
      'SELECT id, username, nickname, avatar, level, experience, region, created_at FROM user WHERE id = ?',
      [id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    res.json({ user: users[0] });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getOnlineUsers = async (req, res) => {
  try {
    const keys = await redisClient.keys('user:online:*');
    res.json({ count: keys.length });
  } catch (error) {
    console.error('Get online users error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};
