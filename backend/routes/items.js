const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Item = require('../models/Item');
const { protect } = require('../middleware/auth');
const { cacheItems, clearCache, CACHE_TTL } = require('../middleware/cache');
const { getRedisClient } = require('../config/redis');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   GET /api/items
// @desc    Get all items
// @access  Public
// @access  Public
router.get('/', cacheItems, async (req, res) => {
  try {
    const { type, category, status, search } = req.query;
    let query = {};

    if (type) query.type = type;
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await Item.find(query).sort({ createdAt: -1 });

    // Set cache if key exists (from middleware)
    if (req.cacheKey) {
      try {
        const client = await getRedisClient();
        // storage for 1 hour
        await client.setEx(req.cacheKey, CACHE_TTL, JSON.stringify({ success: true, count: items.length, items }));
      } catch (err) {
        console.error('Redis set cache error:', err);
      }
    }

    res.json({ success: true, count: items.length, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/items/:id
// @desc    Get single item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('postedBy', 'name email clerkId');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ success: true, item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/items
// @desc    Create new item (users and admin)
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { type, title, description, category, location, date, contactEmail, contactPhone } = req.body;

    let imageURL = '';
    let imagePublicId = '';

    if (req.file) {
      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'campus-found' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      imageURL = result.secure_url;
      imagePublicId = result.public_id;
    }

    console.log('Creating item for user:', req.user.clerkId);
    
    const item = await Item.create({
      type,
      title,
      description,
      category,
      location,
      date: date || Date.now(),
      imageURL,
      imagePublicId,
      postedBy: req.user.clerkId,
      contactInfo: {
        email: contactEmail,
        phone: contactPhone,
      },
    });

    // Clear cache when new item is added
    await clearCache('items:*');

    res.status(201).json({ success: true, item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/items/:id
// @desc    Update item (admin only)
// @access  Private
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const { type, title, description, category, location, date, status, contactEmail, contactPhone } = req.body;

    // Update fields
    if (type) item.type = type;
    if (title) item.title = title;
    if (description) item.description = description;
    if (category) item.category = category;
    if (location) item.location = location;
    if (date) item.date = date;
    if (status) item.status = status;
    if (contactEmail) item.contactInfo.email = contactEmail;
    if (contactPhone) item.contactInfo.phone = contactPhone;

    // Handle image upload
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (item.imagePublicId) {
        await cloudinary.uploader.destroy(item.imagePublicId);
      }

      // Upload new image
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'campus-found' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      item.imageURL = result.secure_url;
      item.imagePublicId = result.public_id;
    }

    await item.save();
    
    // Clear cache on update
    await clearCache('items:*');
    
    res.json({ success: true, item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete item (admin only)
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check ownership
    // Allow if user is owner OR if user is admin
    // Checking against clerkId string
    if (item.postedBy !== req.user.clerkId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    // Delete image from Cloudinary if exists
    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    await Item.findByIdAndDelete(req.params.id);
    
    // Clear cache on delete
    await clearCache('items:*');
    
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
