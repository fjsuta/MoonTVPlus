const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/categories', forumController.getCategories);
router.get('/posts', forumController.getPosts);
router.get('/posts/:id', forumController.getPost);
router.post('/posts', forumController.createPost);
router.get('/posts/:id/comments', forumController.getComments);
router.post('/posts/:id/comments', forumController.createComment);
router.post('/posts/:id/like', forumController.likePost);
router.post('/posts/:id/favorite', forumController.favoritePost);

module.exports = router;
