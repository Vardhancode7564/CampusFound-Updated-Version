const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Item = require('../models/Item');
const User = require('../models/User');
const { sendEmail, getClaimEmailTemplate } = require('../utils/emailService');

// @route   POST /api/claims/send-email
// @desc    Send an email to the item poster
// @access  Private
router.post('/send-email', protect, async (req, res) => {
  try {
    const { itemId, message } = req.body;

    // 1. Find the Item
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // 2. Find the Poster to get their Email
    // Since postedBy is a ClerkID (String), we must manually look up the User
    let posterEmail = item.contactInfo?.email;
    let posterName = 'Fellow Student';

    if (item.postedBy) {
       // Check if it's the admin or a user
       if (item.postedBy === 'admin') {
         // handle admin case if needed, or fallback
       } else {
         const poster = await User.findOne({ clerkId: item.postedBy });
         if (poster) {
           posterEmail = poster.email;
           posterName = poster.name;
         }
       }
    }

    if (!posterEmail) {
      // Fallback: Check if the contactInfo email was stored on the item itself (legacy)
      if (!posterEmail && item.contactInfo && item.contactInfo.email) {
         posterEmail = item.contactInfo.email;
      }
    }

    if (!posterEmail) {
      return res.status(400).json({ message: 'Poster contact information is not available.' });
    }

    // Update item object just for template rendering
    // We don't save this to DB, just mutating the doc in memory for the template function
    item.postedBy = { name: posterName, email: posterEmail };

    // 3. Prepare the email content
    const claimer = {
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone || 'Not provided'
    };

    const htmlContent = getClaimEmailTemplate(item, claimer, message);
    const subject = `CampusFound Alert: Response to "${item.title}"`;

    // 4. Send the email
    await sendEmail({
      email: posterEmail, // Use the resolved email
      subject: subject,
      html: htmlContent
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Email Send Error:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
});

module.exports = router;
