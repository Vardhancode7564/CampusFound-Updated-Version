const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/chatController');

// @route   POST /api/chat
// @desc    Chat with CampusBot
// @access  Public
router.post('/', chatWithAI);

module.exports = router;
