const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/profile/:id', usersController.getProfile);
router.get('/online', usersController.getOnlineUsers);

module.exports = router;
