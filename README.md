# CampusFound - Lost & Found Portal

**CampusFound** is a full-stack web application designed to help university students and staff report, track, and reclaim lost items on campus. Built with the **MERN Stack** (MongoDB, Express, React, Node.js), it features secure authentication, image handling, and automated email notifications for item claims.



## 🚀 Features

- **Authentication & Security**
  - Secure login/signup via **Clerk Authentication**.
  - Domain restriction (e.g., restricted to `@rguktsklm.ac.in` emails).
  - Phone number synchronization for better contactability.

- **Item Management**
  - **Report Lost/Found Items:** Easy form to post items with details (Date, Location, Category).
  - **Image Upload:** Integration with **Cloudinary** for image storage.
  - **Browse & Filter:** Search items by category, type (Lost vs. Found), or status.
  - **My Posts:** Manage your reported items (View, Delete, Mark as Received).

- **Claims & Communication**
  - **Secure Claims:** Non-owners can click "I Found This" or "Claim Item".
  - **Automated Emails:** Backend uses **Nodemailer** to send structured emails to the poster with the claimer's contact info.
  - **Visual Status:** Items can be marked as "Claimed/Received" by the owner to close the loop.

- **User Profile**
  - View personal statistics (Total reports, Active, Solved).
  - Manage contact information.

## 🛠️ Technology Stack

**Frontend:**
- **React.js (Vite)** - Fast frontend framework.
- **Tailwind CSS** - Modern styling and responsive design.
- **Clerk React** - Authentication management.
- **Lucide React** - Beautiful iconography.
- **Framer Motion** - Smooth UI animations.
- **Axios** - API requests.

**Backend:**
- **Node.js & Express** - RESTful API server.
- **MongoDB & Mongoose** - NoSQL database for flexible data storage.
- **Cloudinary** - Cloud image management.
- **Nodemailer** - Email delivery service.

## 📂 Project Structure

```
CampusFound/
├── frontend/          # React Client Application
│   ├── src/
│   │   ├── components/# Reusable UI components (Navbar, ItemCard, etc.)
│   │   ├── pages/     # Page views (Home, Dashboard, ItemDetails, etc.)
│   │   └── utils/     # Helper functions (api.js, etc.)
│   └── ...
├── backend/           # Node.js API Server
│   ├── models/        # Mongoose Database Models (User, Item)
│   ├── routes/        # API Endpoints (auth, items, claims)
│   ├── utils/         # Services (emailService, cloud storage)
│   └── server.js      # Entry point
└── README.md
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas URL)
- Cloudinary Account
- Clerk Account
- Gmail Account (for Nodemailer with App Password)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd CampusFound
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following keys:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
npm start
# OR for development
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend folder and install dependencies:
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the client:
```bash
npm run dev
```

## 🌐 Usage
1.  Open your browser at `http://localhost:5173`.
2.  Sign up using your university email.
3.  Browse existing lost/found items on the Dashboard.
4.  Use the **"Report Item"** button to post something you've lost or found.
5.  Check **"My Posts"** to manage your listings.

---
Developed for **RGUKT Srikakulam** Campus Community.
