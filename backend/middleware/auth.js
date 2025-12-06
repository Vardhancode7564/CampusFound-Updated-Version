const { ClerkExpressRequireAuth, clerkClient } = require('@clerk/clerk-sdk-node');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Middleware to verify Clerk Token OR Admin JWT
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // 1. Check for Admin Custom JWT (Bearer ...)
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            // Try verifying as Admin JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // If verification works, find the admin
            const admin = await Admin.findById(decoded.id).select('-password');
            if (admin) {
                req.admin = admin;
                req.user = admin; // For compatibility
                return next();
            }
        } catch (jwtError) {
            // Token exists but signature failed - it might be a Clerk token?
            // Clerk tokens are also Bearer tokens, but signed by Clerk.
            // jwt.verify with OUR secret will fail for Clerk tokens.
            // So we proceed to Clerk check if this fails.
        }
    }

    // 2. Fallback to Clerk Auth
    try {
        const clerkAuth = ClerkExpressRequireAuth();

        // Execute Clerk middleware
        clerkAuth(req, res, async (err) => {
           if (err) {
             return res.status(401).json({ success: false, message: 'Unauthenticated', error: err.message });
           }
           
           // 3. Sync User to MongoDB (Clerk Mode)
           try {
             // ... existing user sync logic ...
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
