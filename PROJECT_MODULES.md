# 📦 Project Modules Documentation

This document provides a deep dive into the architecture and functionality of the key modules in **CampusFound**.

---

## 1. 🎨 Frontend Module
**Tech Stack**: React, Vite, Tailwind CSS, Framer Motion, Clerk (Auth)

### Purpose
The frontend serves as the user interface for students and admins. It is built for performance (Vite) and responsiveness (Tailwind), with a focus on smooth interactions (Framer Motion).

### Key Components
*   **`App.jsx`**: The root component. It handles routing (`react-router-dom`), global providers (Clerk, Context), and layout elements like `Navbar`, `Footer`, and the floating `CustomCursor`.
*   **`pages/Dashboard.jsx`**: The main feed. It fetches items from the backend, manages complex state for filters (search, category, type), and renders the grid of `ItemCards`.
*   **`components/ChatBot.jsx`**: A detached, floating component verified to work independently. It manages its own state (open/close, message history) and communicates directly with the `/api/chat` endpoint.
*   **`components/CustomCursor.jsx`**: A global visual enhancement. It disables the system cursor and renders a custom DOM element that tracks mouse coordinates (`mousemove` event) and uses spring physics for smooth trailing.

### Design System
*   **Tailwind CSS**: Used for 99% of styling. Custom config in `tailwind.config.js` defines brand colors (`primary-600` etc.) and fonts.
*   **Animations**: `framer-motion` handles page transitions and the "pop" effects on buttons and modals.

---

## 2. ⚙️ Backend Module
**Tech Stack**: Node.js, Express, Mongoose, Cloudinary

### Purpose
The backend is a RESTful API that manages data persistence, business logic, and integrations with external services.

### Architecture
*   **`server.js`**: The entry point. Configures middleware (CORS, Helmet, Body Parser), connects to MongoDB/Redis, and registers route prefixes.
*   **`routes/`**: Defines API endpoints.
    *   `/api/items`: CRUD for lost/found items.
    *   `/api/chat`: Endpoint for AI interactions.
    *   `/api/contact`: Handles email notifications.
*   **`controllers/`**: Contains the actual logic for each route to keep `routes` files clean.
*   **`models/`**: Mongoose schemas enforcing data structure (e.g., `Item.js` ensures every item has a title, type, and location).

### Middleware
*   **`protect`** (Clerk): Verifies authentication tokens before allowing access to private routes (like posting an item).
*   **`cache`** (Redis): Intercepts GET requests to serve data instantly from memory.

---

## 3. ⚡ Redis Caching Module
**Tech Stack**: Redis, `redis` npm package

### Function
Redis acts as an in-memory data structure store, used here as a high-speed cache database to reduce load on MongoDB.

### Workflow
1.  **Request**: User loads the Dashboard (`GET /api/items`).
2.  **Check Cache**: Middleware checks if `items:all` key exists in Redis.
    *   **Hit**: Returns JSON string from RAM immediately (< 10ms).
    *   **Miss**: Queries MongoDB (~200ms), sends response to user, AND saves the result to Redis with a 1-hour TTL (Time To Live).
3.  **Invalidation**: When a user POSTs, PUTs, or DELETEs an item, the `items:all` key is deleted. This ensures users never see stale data after an update.

---

## 4. 🤖 AI Chatbot Module (CampusBot)
**Tech Stack**: Google Gemini API (`@google/generative-ai`)

### Function
An intelligent assistant that answers natural language queries. It uses **Retrieval Augmented Generation (RAG)** principles on a small scale.

### How it Works
1.  **Context Loading**: When a request comes in, the backend fetches the 5 most recent "Found" items from MongoDB.
2.  **Prompt Engineering**: A dynamic prompt is constructed:
    ```
    "You are CampusBot... Here is the list of recently found items: [Item A, Item B]... User asked: 'I lost my phone'..."
    ```
3.  **Inference**: This prompt is sent to Google's **Gemini 2.5 Flash** model.
4.  **Response**: The AI analyzes the list. If it sees a "phone" in the list, it replies "I found a phone matching your description!". If not, it advises how to post a report.

---

## 5. 🗄️ Database Module
**Tech Stack**: MongoDB Atlas

### Function
The primary source of truth for all persistent data.

### Collections
*   **Items**: Stores lost/found reports. key fields: `type` (lost/found), `status` (active/resolved), `images` (Cloudinary URLs).
*   **Users**: Stores user profiles (synced from Clerk).
*   **Claims**: detailed records of who is claiming what item, including proof descriptions.
*   **Admins**: Special accounts with elevated privileges (managed via `scripts/createAdmin.js`).

---

## 6. 🔐 Authentication Module
**Tech Stack**: Clerk

### Function
Handles user identity securely without us needing to manage passwords or sessions manually.

### Integration
*   **Frontend**: `<ClerkProvider>` wraps the app. Components like `<SignedIn>` control UI visibility.
*   **Backend**: `ClerkExpressRequireAuth` middleware validates the JWT (JSON Web Token) sent in the headers of API requests.
