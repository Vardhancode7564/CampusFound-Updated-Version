# 🚀 Quick Start Guide - CampusFound with Admin Panel

## 1️⃣ Update Environment Variables

Edit `backend/.env` and add:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campusfound
JWT_SECRET=your_secret_key_here_change_this

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (for contact form)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Frontend
CLIENT_URL=http://localhost:5173
```

## 2️⃣ Start MongoDB

Make sure MongoDB is running locally:
```bash
mongod
```

Or use MongoDB Atlas connection string in MONGODB_URI.

## 3️⃣ Start Backend

```bash
cd backend
npm install  # If not already done
npm run dev
```

Backend will run on **http://localhost:5000**

## 4️⃣ Create First Admin Account

In a new terminal:
```bash
cd backend
npm run create-admin
```

This creates an admin with:
- **Email**: admin@rguktsklm.ac.in
- **Password**: Admin@123
- **Username**: admin

⚠️ **Change the password after first login!**

## 5️⃣ Start Frontend

```bash
cd frontend
npm install  # If not already done
npm run dev
```

Frontend will run on **http://localhost:5173**

## 6️⃣ Access the Application

### Public Contact Form
- **URL**: http://localhost:5173/
- Anyone can submit contact forms

### Admin Panel
- **Login URL**: http://localhost:5173/admin/login
- **Credentials**: 
  - Email: admin@rguktsklm.ac.in
  - Password: Admin@123

### Admin Features
1. **Dashboard** - View all lost/found items
2. **Add Item** - Create new lost/found items with images
3. **Edit Item** - Update existing items
4. **Delete Item** - Remove items
5. **Filter** - Filter by type (lost/found) and status

## 📋 Available Routes

### Frontend Routes
- `/` - Public contact form
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard (protected)
- `/admin/items/new` - Add new item (protected)
- `/admin/items/edit/:id` - Edit item (protected)

### Backend API Routes
- `POST /api/admin/register` - Register admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current admin (protected)
- `GET /api/items` - Get all items
- `POST /api/items` - Create item (protected)
- `PUT /api/items/:id` - Update item (protected)
- `DELETE /api/items/:id` - Delete item (protected)
- `POST /api/contact` - Submit contact form

## ✅ Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] MongoDB is connected
- [ ] Can access contact form at http://localhost:5173/
- [ ] Can login to admin at http://localhost:5173/admin/login
- [ ] Can view dashboard after login
- [ ] Can add new item with image upload
- [ ] Can edit existing item
- [ ] Can delete item
- [ ] Can filter items by type and status

## 🐛 Common Issues

### Backend won't start
- Check if MongoDB is running
- Verify all environment variables in `.env`
- Check if port 5000 is available

### Frontend won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Check if port 5173 is available

### Image upload fails
- Verify Cloudinary credentials
- Check image file size (max 10MB)

### Cannot login to admin
- Ensure admin account is created
- Check JWT_SECRET is set in .env
- Verify MongoDB connection

## 📚 Next Steps

1. **Change Default Admin Password**
   - Login to admin panel
   - Change password (implement this feature if needed)

2. **Customize Admin Email**
   - Edit `backend/scripts/createAdmin.js`
   - Change email to your college email
   - Run `npm run create-admin` again

3. **Test Contact Form**
   - Submit a test contact form
   - Check if email is received
   - Verify data is stored in MongoDB

4. **Add Lost/Found Items**
   - Login to admin panel
   - Create test items
   - Upload images
   - Test editing and deleting

## 🎯 Production Deployment

Before deploying to production:

1. **Disable Public Admin Registration**
   - Comment out the `/api/admin/register` route in `backend/routes/admin.js`

2. **Use Strong Secrets**
   - Generate strong JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

3. **Enable HTTPS**
   - Use SSL certificates
   - Update CORS settings

4. **Backup Database**
   - Set up regular MongoDB backups

---

**Need Help?** Check ADMIN_GUIDE.md for detailed documentation.
