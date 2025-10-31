# 🔐 Dual Authentication System - Implementation Guide

## Overview
CampusFound now has **TWO separate authentication systems**:
1. **Normal Users** (Students) - Can report items, make claims, view their posts
2. **Admins** - Can manage all items, add/edit/delete items

---

## ✅ Backend Complete

### API Endpoints Created

#### User Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new student user
- `POST /api/auth/login` - Login student user
- `GET /api/auth/me` - Get current user profile

#### Admin Authentication (`/api/admin`)
- `POST /api/admin/register` - Register admin (first time only)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current admin profile

#### Items Management (`/api/items`)
- `GET /api/items` - Get all items (public)
- `GET /api/items/:id` - Get single item (public)
- `POST /api/items` - Create item (admin only)
- `PUT /api/items/:id` - Update item (admin only)
- `DELETE /api/items/:id` - Delete item (admin only)

#### Claims Management (`/api/claims`)
- `POST /api/claims` - Create claim (user only)
- `GET /api/claims/my` - Get user's claims (user only)
- `GET /api/claims/item/:itemId` - Get item claims
- `PUT /api/claims/:id` - Update claim status

#### Contact Form (`/api/contact`)
- `POST /api/contact` - Submit contact form (public)

---

## 🔄 Frontend Status

### ✅ Completed
1. **AuthContext** - Updated to support both user and admin authentication
2. **Login Page** - User login (fixed to use `userLogin`)
3. **Admin Login Page** - Separate admin login
4. **Home Page** - Landing page
5. **Dashboard** - Browse items page
6. **Contact Form** - Working contact form
7. **Admin Dashboard** - Manage items (admin only)
8. **ItemForm** - Add/Edit items (admin only)

### 🚧 Need to Create
1. **Register Page** - Needs update for user registration
2. **My Posts Page** - View user's reported items
3. **My Claims Page** - View user's claims on items
4. **Profile Page** - User profile management
5. **Report Item Page** - Create new lost/found item reports
6. **Item Details Page** - View single item with claim option
7. **Updated Navbar** - Show different menus for user vs admin

---

## 🎨 Navigation Structure

### For Not Logged In Users:
- Home
- Browse Items
- Contact
- **Login** (User Login)
- **Admin Login** (Separate button)

### For Logged In Students:
- Home
- Browse Items
- **Report Item** (Create lost/found report)
- **My Posts** (View their reports)
- **My Claims** (Claims they made)
- **Profile** (Their profile)
- Contact
- Logout

### For Logged In Admins:
- Home
- Browse Items
- **Admin Dashboard** (Manage all items)
- **Add Item** (Quick add)
- Admin Profile
- Contact
- Logout

---

## 📝 User Registration Requirements

Users must provide:
- **Name** - Full name
- **Email** - Must be @rguktsklm.ac.in format
- **Password** - Minimum 6 characters
- **Student ID** - Required and unique
- **Phone** - Optional

---

## 🔑 Token Management

### User Session
- Token stored in: `localStorage.getItem('userToken')`
- Used for: Creating items, making claims, viewing posts

### Admin Session  
- Token stored in: `localStorage.getItem('adminToken')`
- Used for: Managing all items, approving claims

---

## 🚀 Next Steps to Complete

### 1. Update Navbar
```jsx
// Show different options based on authentication
{user ? (
  // User menu: Report Item, My Posts, My Claims, Profile, Logout
) : admin ? (
  // Admin menu: Admin Dashboard, Profile, Logout
) : (
  // Public menu: Login, Admin Login
)}
```

### 2. Create Missing Pages
- `/register` - User registration
- `/report` - Report lost/found item (protected, user only)
- `/my-posts` - User's posts (protected, user only)
- `/my-claims` - User's claims (protected, user only)
- `/profile` - User profile (protected, user only)
- `/items/:id` - Item details with claim button

### 3. Update App Routing
```jsx
{/* User Routes - Protected */}
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route path="/report" element={<ProtectedRoute><ReportItem /></ProtectedRoute>} />
<Route path="/my-posts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
<Route path="/my-claims" element={<ProtectedRoute><MyClaims /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
<Route path="/items/:id" element={<ItemDetails />} />

{/* Admin Routes - Protected */}
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminProtectedRoute>...</AdminProtectedRoute>} />
```

### 4. Color Consistency
All buttons and links should use **indigo** theme:
- Primary buttons: `bg-indigo-600 hover:bg-indigo-700`
- Links: `text-indigo-600 hover:text-indigo-700`
- Icons: `text-indigo-600`

---

## 🎯 Testing Checklist

### User Flow
- [ ] User can register with @rguktsklm.ac.in email
- [ ] User can login
- [ ] User can browse items
- [ ] User can report lost item
- [ ] User can report found item
- [ ] User can claim an item
- [ ] User can view their posts
- [ ] User can view their claims
- [ ] User can edit profile
- [ ] User can logout

### Admin Flow
- [ ] Admin can login separately
- [ ] Admin can view all items in dashboard
- [ ] Admin can add new item
- [ ] Admin can edit item
- [ ] Admin can delete item
- [ ] Admin can filter items
- [ ] Admin can logout

---

## 📦 Files Modified/Created

### Backend
- ✅ `models/User.js` - User model
- ✅ `models/Admin.js` - Admin model
- ✅ `models/Item.js` - Item model
- ✅ `models/Claim.js` - Claim model
- ✅ `models/Contact.js` - Contact model
- ✅ `routes/auth.js` - User authentication
- ✅ `routes/admin.js` - Admin authentication
- ✅ `routes/items.js` - Items CRUD
- ✅ `routes/claims.js` - Claims management
- ✅ `routes/contact.js` - Contact form
- ✅ `server.js` - Updated with all routes

### Frontend
- ✅ `context/AuthContext.jsx` - Dual auth support
- ✅ `pages/Login.jsx` - User login
- ✅ `pages/AdminLogin.jsx` - Admin login
- ✅ `pages/Home.jsx` - Landing page
- ✅ `pages/Dashboard.jsx` - Browse items
- ✅ `pages/AdminDashboard.jsx` - Admin dashboard
- ✅ `pages/ItemForm.jsx` - Add/Edit items
- ✅ `components/ContactForm.jsx` - Contact form
- ✅ `components/Navbar.jsx` - Navigation (needs update)
- 🚧 `pages/Register.jsx` - Needs update
- 🚧 `pages/ReportItem.jsx` - To create
- 🚧 `pages/MyPosts.jsx` - To create
- 🚧 `pages/MyClaims.jsx` - To create
- 🚧 `pages/Profile.jsx` - To create
- 🚧 `pages/ItemDetails.jsx` - To create

---

## 🔧 Current Database Schema

### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique, @rguktsklm.ac.in),
  password: String (hashed),
  studentId: String (required, unique),
  phone: String (optional),
  role: String (student/admin),
  createdAt: Date
}
```

### Items Collection
```javascript
{
  type: String (lost/found),
  title: String,
  description: String,
  category: String (Electronics, ID Card, etc.),
  imageURL: String (Cloudinary),
  imagePublicId: String,
  location: String,
  date: Date,
  postedBy: String (username or admin),
  status: String (active/claimed/resolved),
  contactInfo: { email, phone },
  createdAt: Date,
  updatedAt: Date
}
```

### Claims Collection
```javascript
{
  itemId: ObjectId (ref Item),
  claimantId: ObjectId (ref User),
  message: String,
  status: String (pending/approved/rejected),
  verificationDetails: String,
  createdAt: Date,
  resolvedAt: Date
}
```

---

## 🎨 Design System

### Colors
- **Primary**: Indigo (`indigo-600`)
- **Success**: Green (`green-600`)
- **Danger**: Red (`red-600`)
- **Warning**: Yellow (`yellow-600`)
- **Info**: Blue (`blue-600`)

### Button Styles
```css
Primary: bg-indigo-600 hover:bg-indigo-700 text-white
Secondary: bg-gray-200 hover:bg-gray-300 text-gray-800
Danger: bg-red-600 hover:bg-red-700 text-white
Outline: border border-indigo-600 text-indigo-600 hover:bg-indigo-50
```

---

**Status**: Backend complete ✅ | Frontend 60% complete 🚧

**Next**: Complete remaining frontend pages and update navbar for dual authentication
