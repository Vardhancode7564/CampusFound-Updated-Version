const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @route   GET /api/auth/me
// @desc    Get current user (Syned from Clerk)
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
