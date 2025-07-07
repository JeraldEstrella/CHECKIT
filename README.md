# 🚀 **CHECKIT**

A full-stack social posting and commenting app built with **React**, **Vite**, **Express**, **MongoDB**, and **Clerk** for seamless authentication.

---

## ✨ Features

✅ **User Authentication** – Sign up and sign in securely with Clerk
✅ **Create, Edit, and Delete Posts** – With optional image uploads (powered by ImageKit)
✅ **Threaded Comments** – Support for replies and nested discussion
✅ **Like & Dislike Posts** – Engage with posts dynamically
Undone **Draft Management** – Save and manage unfinished posts
✅ **Responsive Dashboard** – Clean sidebar navigation for desktop and mobile
✅ **User Profiles** – Manage and update your account easily

---

## 🛠 Tech Stack

**Frontend:**

* React 19 (with Vite)
* React Router
* Clerk (authentication)
* TanStack Query (data fetching & caching)
* RSuite Icons
* CSS Modules (scoped styling)

**Backend:**

* Express.js
* MongoDB (via Mongoose ODM)
* Clerk SDK (authentication & user management)
* ImageKit SDK (image uploads & CDN optimization)

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have these installed:

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB instance)
* [Clerk](https://clerk.dev/) account (for authentication)
* [ImageKit](https://imagekit.io/) account (for image hosting)

---

### 📥 Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/JeraldEstrella/CHECKIT.git
cd CHECKIT
```

#### 2️⃣ Install Dependencies

Install frontend and backend dependencies:

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

---

### 🔑 Set Up Environment Variables

Create `.env` files in both `client` and `server` folders.

**client/.env**

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_IMAGEKIT_ENDPOINT=your_imagekit_endpoint
VITE_IMAGE_PUBLIC_KEY=your_imagekit_public_key
VITE_IMAGE_PRIVATE_KEY=your_imagekit_private_key
```

**server/.env**

```
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
IMAGEKIT_ENDPOINT=your_imagekit_endpoint
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
MONGO_URL=your_mongodb_connection_string
```

---

### ▶ Run Development Servers

**Start the backend:**

```bash
cd server
npm run dev
```

**Start the frontend:**

```bash
cd client
npm run dev
```

Access the app at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Folder Structure

```
CHECKIT/
├── client/        # React frontend
│   ├── src/
│   ├── public/
│   └── ...
├── server/        # Express backend
│   ├── controllers/
│   ├── models/
│   └── ...
└── README.md
```

---

## 📜 Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start development server      |
| `npm run build` | Build frontend for production |

---

## 📖 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Built with ❤️ by [Jerald Estrella](https://github.com/JeraldEstrella)
