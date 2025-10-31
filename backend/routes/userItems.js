const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Item = require('../models/Item');

// Auth middleware
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

// @route   GET /api/user/items
// @desc    Get current user's items
// @access  Private
router.get('/items', protect, async (req, res) => {
  try {
    const items = await Item.find({ postedBy: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, items, count: items.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
