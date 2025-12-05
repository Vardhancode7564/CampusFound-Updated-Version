const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

const { protect } = require('../middleware/auth');

// @route   GET /api/user/items
// @desc    Get current user's items
// @access  Private
router.get('/items', protect, async (req, res) => {
  try {
    console.log('Fetching items for User:', req.user._id, 'ClerkID:', req.user.clerkId);
    const items = await Item.find({ postedBy: req.user.clerkId }).sort({ createdAt: -1 });
    console.log('Found items count:', items.length);
    res.json({ success: true, items, count: items.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
