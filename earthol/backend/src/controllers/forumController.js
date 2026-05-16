const db = require('../../config/database');

const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit),const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.jsonconst db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:',const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forumconst db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nconst db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.userconst db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).jsonconst db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:',const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content } = req.body;
    
    const [result] = await db.query(const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO forum_post (user_id, category_id, title, content) VALUES (const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO forum_post (user_id, category_id, title, content) VALUES (?, ?, ?, ?)',
      [userId, categoryId, title, content]
    );const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO forum_post (user_id, category_id, title, content) VALUES (?, ?, ?, ?)',
      [userId, categoryId, title, content]
    );
    
    res.status(201).json({ 
      message: '发帖成功', 
const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO forum_post (user_id, category_id, title, content) VALUES (?, ?, ?, ?)',
      [userId, categoryId, title, content]
    );
    
    res.status(201).json({ 
      message: '发帖成功', 
      postId: result.insertId 
    });
  } catch (error) {
const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO forum_post (user_id, category_id, title, content) VALUES (?, ?, ?, ?)',
      [userId, categoryId, title, content]
    );
    
    res.status(201).json({ 
      message: '发帖成功', 
      postId: result.insertId 
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO forum_post (user_id, category_id, title, content) VALUES (?, ?, ?, ?)',
      [userId, categoryId, title, content]
    );
    
    res.status(201).json({ 
      message: '发帖成功', 
      postId: result.insertId 
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getComments = async (reqconst db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO forum_post (user_id, category_id, title, content) VALUES (?, ?, ?, ?)',
      [userId, categoryId, title, content]
    );
    
    res.status(201).json({ 
      message: '发帖成功', 
      postId: result.insertId 
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
const db = require('../../config/database');

exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM forum_category ORDER BY sort_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
    `;
    let params = [];
    
    if (categoryId) {
      query += ' WHERE fp.category_id = ? ';
      params.push(categoryId);
    }
    
    query += ' ORDER BY fp.is_top DESC, fp.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [posts] = await db.query(query, params);
    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('UPDATE forum_post SET view_count = view_count + 1 WHERE id = ?', [id]);
    
    const [posts] = await db.query(`
      SELECT fp.*, u.username, u.nickname, u.avatar 
      FROM forum_post fp 
      JOIN user u ON fp.user_id = u.id 
      WHERE fp.id = ?
    `, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({ error: '帖子不存在' });
    }
    
    res.json({ post: posts[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { userId, categoryId, title, content } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO forum_post (user_id, category_id, title, content) VALUES (?, ?, ?, ?)',
      [userId, categoryId, title, content]
    );
    
    res.status(201).json({ 
      message: '发帖成功', 
      postId: result.insertId 
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: '服务器错误' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const [comments] = await db.query(`
      SELECT fc.*, u.username, u.nickname, u.avatar 
      FROM