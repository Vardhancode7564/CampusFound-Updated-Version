const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Claim = require('../models/Claim');
const Item = require('../models/Item');

// Simple auth middleware
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

// @route   POST /api/claims
// @desc    Create a new claim
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { itemId, message, verificationDetails } = req.body;

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const claim = await Claim.create({
      itemId,
      claimantId: req.userId,
      message,
      verificationDetails,
    });

    res.status(201).json({ success: true, claim });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/claims/my
// @desc    Get current user's claims
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const claims = await Claim.find({ claimantId: req.userId })
      .populate('itemId')
      .sort({ createdAt: -1 });

    res.json({ success: true, claims });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/claims/item/:itemId
// @desc    Get claims for a specific item
// @access  Private
router.get('/item/:itemId', protect, async (req, res) => {
  try {
    const claims = await Claim.find({ itemId: req.params.itemId })
      .populate('claimantId', 'name email studentId')
      .sort({ createdAt: -1 });

    res.json({ success: true, claims });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/claims/:id
// @desc    Update claim status
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    claim.status = status;
    if (status === 'approved' || status === 'rejected') {
      claim.resolvedAt = Date.now();
    }

    await claim.save();
    res.json({ success: true, claim });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
