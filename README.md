# MeTube 🎬

MeTube is a full-stack video-sharing platform inspired by YouTube — built with a
**Node.js / Express / MongoDB** backend and a **React (Vite) + Tailwind CSS** frontend.
Users can register, upload and watch videos, like/comment, subscribe to channels,
build playlists, post short "tweets," and manage their content from a creator dashboard.

---

## 📝 Resume Summary

> Use this as-is under a Projects section — keep the technologies line as your keyword row.

**MeTube | Full-Stack MERN Video Sharing Platform** — [GitHub]
*Technologies: React, Vite, Node.js, Express.js, MongoDB, JWT, Axios, Multer, Cloudinary*

- Architected a full-stack video-sharing platform inspired by YouTube using the MERN stack, following a modular, scalable folder structure across frontend and backend.
- Implemented secure JWT-based authentication (access/refresh tokens) with Express middleware and MongoDB aggregation pipelines for user, video, and subscription management.
- Built a responsive React (Vite + Tailwind) frontend integrated with 8+ RESTful API modules via Axios, including multipart media uploads handled through Multer and Cloudinary.
- Validated and tested all API endpoints using Postman, applying REST best practices for routing, middleware, and centralized error handling.

---

## ✨ Features

**Authentication & Accounts**
- JWT-based auth with access + refresh tokens stored in httpOnly cookies
- Register with avatar & cover image upload (Cloudinary)
- Login, logout, silent token refresh, change password

**Videos**
- Upload video + thumbnail, with title/description
- Browse, search, sort and paginate videos
- Publish / unpublish toggle (private until published)
- Edit video details, delete video
- View counter + watch history

**Engagement**
- Like/unlike videos, comments and tweets
- Comment on videos (create, edit, delete)
- Subscribe / unsubscribe to channels
- Post short text "tweets" on your channel

**Channels**
- Public channel pages with Videos / Playlists / Tweets / Subscribed tabs
- Owner view with Edit + Upload actions
- Subscriber & subscription counts

**Playlists**
- Create, rename, delete playlists
- Add/remove videos to/from playlists

**Creator Dashboard**
- Channel stats: total views, subscribers, likes
- Manage all uploaded videos (publish toggle, edit, delete) in one table

**Account Settings**
- Update name, email, avatar, cover image
- Change password

---

## 📁 Folder Structure

```
MeTube/
├── backend/
│   ├── public/
│   │   └── temp/                  # temporary storage for multer uploads before Cloudinary push
│   ├── src/
│   │   ├── controllers/           # request handlers (business logic) per resource
│   │   ├── db/                    # MongoDB connection setup
│   │   ├── middlewares/           # auth (JWT), multer (file upload)
│   │   ├── models/                # Mongoose schemas (User, Video, Comment, Like, Playlist, Subscription, Tweet)
│   │   ├── routes/                # Express routers per resource
│   │   ├── utils/                 # ApiError, ApiResponse, asyncHandler, Cloudinary helpers
│   │   ├── app.js                 # Express app config (middleware, routes)
│   │   ├── constants.js           # shared constants (DB name, etc.)
│   │   └── index.js               # server entry point
│   ├── .env                       # environment variables (not committed)
│   ├── package.json
│   └── README.md
│
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── api/                   # axios calls, one file per backend resource
    │   ├── components/
    │   │   ├── common/            # buttons, modals, avatar, empty states, skeletons
    │   │   ├── layout/             # Header, Sidebar, MainLayout, AuthLayout, ProtectedRoute
    │   │   ├── video/              # video card/list item, upload & edit modals, like button
    │   │   ├── comment/            # comment list + item
    │   │   ├── tweet/               # tweet list + item
    │   │   ├── channel/             # channel header/tabs, subscribe button
    │   │   ├── playlist/            # playlist card, create/edit modal, save-to-playlist modal
    │   │   └── settings/            # settings tab panels
    │   ├── context/                # AuthContext (session, login/register/logout)
    │   ├── hooks/                  # usePaginatedFetch, useLikeToggle, useDebounce
    │   ├── pages/                   # one file per route/page
    │   ├── utils/                   # formatters, class-name helper, media URL resolver
    │   ├── App.jsx                  # route definitions
    │   └── main.jsx                 # app entry point
    ├── .env
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── README.md
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see [Environment Variables](#-environment-variables) below), then:

```bash
npm run dev
```

The API will start on `http://localhost:8000` (or whichever `PORT` you set) at base path `/api/v1`.

**Requirements:**
- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Cloudinary](https://cloudinary.com/) account (for video/image storage)

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # then set VITE_API_BASE_URL if it differs from the default
npm run dev
```

The app will run at `http://localhost:5173`.

**Important:** the frontend relies on httpOnly cookies for auth, so the backend's
`CORS_ORIGIN` must exactly match the frontend's origin (e.g. `http://localhost:5173`)
with `credentials: true` enabled — already configured in `app.js`.

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable                | Description                                   | Example                                      |
| ------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| `PORT`                   | Port the server listens on                     | `8000`                                        |
| `MONGODB_URI`            | MongoDB connection string (no DB name suffix)  | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `CORS_ORIGIN`            | Allowed frontend origin                        | `http://localhost:5173`                       |
| `ACCESS_TOKEN_SECRET`    | Secret used to sign access tokens               | any long random string                        |
| `ACCESS_TOKEN_EXPIRY`    | Access token lifetime                          | `1d`                                          |
| `REFRESH_TOKEN_SECRET`   | Secret used to sign refresh tokens              | any long random string                        |
| `REFRESH_TOKEN_EXPIRY`   | Refresh token lifetime                          | `10d`                                         |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary account cloud name                   | —                                              |
| `CLOUDINARY_API_KEY`     | Cloudinary API key                              | —                                              |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret                           | —                                              |

### Frontend (`frontend/.env`)

| Variable             | Description                                       | Example                        |
| --------------------- | --------------------------------------------------- | ------------------------------- |
| `VITE_API_BASE_URL`   | Base URL of the backend API, including `/api/v1`    | `http://localhost:8000/api/v1` |

---

## 📸 Screenshots

## 📸 Screenshots

| Home | Watch Page | Channel |
| ---- | ---------- | ------- |
| <img src="https://github.com/user-attachments/assets/a45bd11e-6296-452b-a7ae-45da4bec934b" width="280" /> | <img src="https://github.com/user-attachments/assets/1239d2d3-f0a9-4f8e-8705-f39ec41b2e0a" width="280" /> | <img src="https://github.com/user-attachments/assets/dd329d4c-29d2-4730-8da6-1011787cb0d2" width="280" /> |

| Dashboard | Upload Modal | Settings |
| --------- | ------------ | -------- |
| <img src="https://github.com/user-attachments/assets/664fd159-40b1-4225-85bd-8343cf549b14" width="280" /> | <img src="https://github.com/user-attachments/assets/0705e42f-e3e6-4afb-b26a-4ffcd6cf92b9" width="280" /> | <img src="https://github.com/user-attachments/assets/6b03513a-9841-43f4-8135-0412b4d20bed" width="280" /> |
---

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Cloudinary, bcrypt
**Frontend:** React 19, Vite, React Router, Tailwind CSS, Axios, React Hook Form, react-hot-toast, lucide-react

---
## 📄 

This project is open for personal and educational use. 
