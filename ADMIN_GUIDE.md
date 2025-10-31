# CampusFound Admin Panel Guide

## Overview
The CampusFound admin panel allows administrators to manage lost and found items, including creating, editing, and deleting items.

## Features
- ✅ Secure admin authentication with JWT
- ✅ Dashboard to view all items (lost/found)
- ✅ Filter items by type and status
- ✅ Add new lost/found items with images
- ✅ Edit existing items
- ✅ Delete items
- ✅ Upload images to Cloudinary
- ✅ Manage item status (active, claimed, resolved)

## Setup Instructions

### 1. Backend Setup

#### Update Environment Variables
Add the following to `backend/.env`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/campusfound

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (for contact form)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Frontend URL
CLIENT_URL=http://localhost:3000
```

#### Install Dependencies
```bash
cd backend
npm install
```

#### Start Backend Server
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 2. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
# Frontend will run on http://localhost:3000
```

## Creating the First Admin Account

### Option 1: Using API (Recommended)
Use Postman or curl to register the first admin:

```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@rguktsklm.ac.in",
    "password": "your_secure_password"
  }'
```

### Option 2: Using MongoDB Compass
1. Connect to your MongoDB database
2. Create a document in the `admins` collection
3. Password will be auto-hashed on first login

**Note:** After creating the first admin, you should disable the `/api/admin/register` route in production for security.

## Using the Admin Panel

### 1. Login
- Navigate to: `http://localhost:3000/admin/login`
- Enter your admin email and password
- Click "Login"

### 2. Dashboard
After successful login, you'll be redirected to the admin dashboard where you can:
- View all items (lost and found)
- Filter by type (lost/found) and status (active/claimed/resolved)
- See item details in a table format

### 3. Adding a New Item
1. Click "Add New Item" button in the dashboard
2. Fill in the form:
   - **Type**: Lost or Found
   - **Title**: Name of the item
   - **Description**: Detailed description
   - **Category**: Select from predefined categories
   - **Location**: Where the item was lost/found
   - **Date**: When it was lost/found
   - **Status**: Active, Claimed, or Resolved
   - **Contact Info**: Email and phone (optional)
   - **Image**: Upload an image (optional)
3. Click "Create Item"

### 4. Editing an Item
1. In the dashboard, click "Edit" next to the item
2. Update the desired fields
3. Click "Update Item"

### 5. Deleting an Item
1. In the dashboard, click "Delete" next to the item
2. Confirm the deletion
3. Item will be removed from database and Cloudinary

## API Endpoints

### Admin Authentication
- `POST /api/admin/register` - Register new admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current admin (requires auth)

### Items Management
- `GET /api/items` - Get all items (public)
- `GET /api/items/:id` - Get single item (public)
- `POST /api/items` - Create new item (requires admin auth)
- `PUT /api/items/:id` - Update item (requires admin auth)
- `DELETE /api/items/:id` - Delete item (requires admin auth)

## Item Categories
- Electronics
- ID Card
- Books
- Clothing
- Accessories
- Keys
- Wallet
- Bags
- Stationery
- Others

## Item Status
- **Active**: Item is currently lost or waiting to be claimed
- **Claimed**: Item has been claimed but not yet resolved
- **Resolved**: Item has been successfully returned to owner

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Token expiration (30 days)
- Rate limiting
- CORS protection
- Helmet security headers

## Troubleshooting

### Cannot Login
- Verify admin account exists in database
- Check if JWT_SECRET is set in .env
- Ensure backend server is running

### Images Not Uploading
- Verify Cloudinary credentials in .env
- Check file size (max 10MB)
- Ensure file is an image format

### Items Not Showing
- Check MongoDB connection
- Verify items exist in database
- Check browser console for errors

## Production Deployment

### Security Checklist
- [ ] Disable `/api/admin/register` route
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Use environment variables
- [ ] Enable rate limiting
- [ ] Regular database backups
- [ ] Monitor admin activities

## Support
For issues or questions, contact the development team or check the application logs.
