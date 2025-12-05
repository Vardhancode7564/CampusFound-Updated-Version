const { ClerkExpressRequireAuth, clerkClient } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

// Middleware to verify Clerk Token and Sync User to MongoDB
const protect = async (req, res, next) => {
  try {
    const clerkAuth = ClerkExpressRequireAuth();

    // Execute Clerk middleware first
    clerkAuth(req, res, async (err) => {
       if (err) {
         return res.status(401).json({ success: false, message: 'Unauthenticated', error: err.message });
       }
       
       // 2. Sync User to MongoDB
       try {
         const { userId } = req.auth; // Clerk User ID
         
         if (!userId) {
            return res.status(401).json({ success: false, message: 'No User ID found in token' });
         }

         // Check if user exists in DB by Clerk ID
         let user = await User.findOne({ clerkId: userId });

         if (!user) {
           // Fallback: Check if user exists by Email (for legacy/first-time sync)
           const clerkUser = await clerkClient.users.getUser(userId);
           const email = clerkUser.emailAddresses[0]?.emailAddress;

           // Domain Restriction
           if (!email.endsWith('@rguktsklm.ac.in')) {
             return res.status(403).json({ success: false, message: 'Access Denied: Domain not allowed' });
           }

           user = await User.findOne({ email });

           if (user) {
             // User exists but hasn't synced Clerk ID yet - Update them
             user.clerkId = userId;
             await user.save();
           } else {
             // User doesn't exist - Create new one
             const name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User';
             
             user = await User.create({
               clerkId: userId,
               name,
               email,
               studentId: `TEMP_${Date.now()}_${Math.floor(Math.random() * 1000)}`, // Unique Placeholder
               phone: clerkUser.phoneNumbers && clerkUser.phoneNumbers.length > 0 ? clerkUser.phoneNumbers[0].phoneNumber : '',
               role: 'student'
             });
           }
         }
         
         // Attach user to request
         req.user = user;
         req.admin = user.role === 'admin' ? user : null;
         
         next();
         
       } catch (syncError) {
         console.error("User Sync Error:", syncError);
         return res.status(500).json({ success: false, message: 'User Sync Failed' });
       }
    });

  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

module.exports = { protect };
