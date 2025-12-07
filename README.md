# CampusFound - Lost & Found Platform

CampusFound is a modern web application designed to help university campuses manage lost and found items efficiently. It bridges the gap between students who lose items and those who find them, ensuring a streamlined process for reporting, searching, and claiming lost belongings.

![CampusFound Banner](https://via.placeholder.com/1000x300?text=CampusFound+Lost+%26+Found)

## 🚀 Features

### For Students
*   **Browse Items**: View a feed of lost and found items with filters (category, date, location).
*   **Search**: Real-time search by keywords.
*   **Report**: Post details about items you've found or lost, including images.
*   **Claim**: Initiate claims for items you believe are yours.
*   **User Dashboard**: Manage your posted items and claim status.
*   **Secure Auth**: Easy sign-in via Clerk (Google/GitHub supported).

### For Admin
*   **Dashboard**: Overview of all reported items and claims.
*   **Moderation**: Approve or delete posts.
*   **Claim Management**: Verify ownership and mark items as returned.

## 🛠️ Tech Stack

### Frontend
*   **React (Vite)**: Fast, component-based UI.
*   **Tailwind CSS**: Modern utility-first styling.
*   **Framer Motion**: Smooth animations.
*   **Clerk**: Authentication and user management.
*   **Axios**: API integration.

### Backend
*   **Node.js & Express**: Robust REST API.
*   **MongoDB & Mongoose**: Flexible document database.
*   **Redis**: High-performance caching for item feeds.
*   **Cloudinary**: Image hosting and optimization.
*   **Nodemailer**: Email notifications for contact forms.

## 🏗️ Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Atlas or local)
*   Redis (Cloud or local)
*   Cloudinary Account
*   Clerk Account

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/campusfound.git
cd campusfound
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
REDIS_URL=redis://default:password@host:port
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
```

Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_URL=https://campusfound-updated-version.onrender.com/api
```

Run the frontend:
```bash
npm run dev
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/items` | Get all items (Cached with Redis) |
| **GET** | `/api/items/:id` | Get single item details |
| **POST** | `/api/items` | Report a new item |
| **PUT** | `/api/items/:id` | Update an item |
| **DELETE** | `/api/items/:id` | Delete an item |
| **POST** | `/api/claims` | Submit a claim |
| **POST** | `/api/contact` | Submit contact form |

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
This project is licensed under the ISC License.
