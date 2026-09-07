# 🌊 Streamify

> A full-stack **language exchange** web app — connect with language partners worldwide, chat in real time, and practice together through video calls.

![Streamify Banner](https://img.shields.io/badge/Streamify-Language%20Exchange%20App-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PC9zdmc+)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Stream](https://img.shields.io/badge/Stream-005FFF?style=flat&logo=stream&logoColor=white)](https://getstream.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure signup, login, and logout with httpOnly cookies
- 🧑‍💼 **Onboarding Flow** — Set your native language, learning language, bio, and profile picture
- 👥 **Friend System** — Send and accept friend requests; browse recommended language partners
- 💬 **Real-Time Chat** — Powered by [Stream Chat](https://getstream.io/chat/) with typing indicators, reactions, and threads
- 📞 **Video Calls** — 1-on-1 video calling via Stream Video SDK
- 🎨 **32 UI Themes** — Powered by DaisyUI — switch themes from the navbar
- 🌍 **25 Languages** — Native and learning language support with flag emojis
- 📱 **Responsive Design** — Mobile-first layout with sidebar navigation on desktop

---

## 🖥️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JSON Web Tokens (JWT)** | Authentication |
| **bcryptjs** | Password hashing |
| **cookie-parser** | HTTP cookie middleware |
| **Stream Chat SDK** | Server-side chat token generation |
| **dotenv** | Environment variable management |
| **nodemon** | Dev server auto-restart |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **TanStack Query v5** | Server state & data fetching |
| **Axios** | HTTP client |
| **Zustand** | Global UI state (theme) |
| **Stream Chat React** | Real-time chat components |
| **TailwindCSS v4** | Utility-first CSS |
| **DaisyUI** | Tailwind component library |
| **Lucide React** | Icon set |
| **React Hot Toast** | Toast notifications |

---

## 📁 Project Structure

```
Serdinos-streamify-app/
├── package.json                  # Root convenience scripts
├── .env.example                  # Environment variable template
├── .gitignore
│
├── backend/
│   ├── package.json
│   ├── .env                      # ⚠️ Not committed — see setup below
│   └── src/
│       ├── server.js             # Express app entry point
│       ├── lib/
│       │   ├── db.js             # MongoDB connection
│       │   ├── stream.js         # Stream Chat client
│       │   └── utils.js          # JWT token helper
│       ├── models/
│       │   ├── User.model.js     # User schema
│       │   └── FriendRequest.model.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── user.controller.js
│       │   └── chat.controller.js
│       ├── routes/
│       │   ├── auth.route.js
│       │   ├── user.route.js
│       │   └── chat.route.js
│       └── middleware/
│           └── auth.middleware.js
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── .env                      # ⚠️ Not committed — see setup below
    └── src/
        ├── main.jsx              # App entry (BrowserRouter + QueryClient)
        ├── App.jsx               # Routes & auth guards
        ├── index.css             # Tailwind + DaisyUI imports
        ├── lib/
        │   ├── axios.js          # Axios instance
        │   └── utils.js          # Language flags & constants
        ├── store/
        │   └── useThemeStore.js  # Zustand theme store
        ├── hooks/
        │   ├── useAuthUser.js
        │   ├── useSignUp.js
        │   ├── useLogin.js
        │   └── useLogout.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Layout.jsx
        │   ├── FriendCard.jsx
        │   └── NoFriendsFound.jsx
        └── pages/
            ├── SignUpPage.jsx
            ├── LoginPage.jsx
            ├── OnboardingPage.jsx
            ├── HomePage.jsx
            ├── NotificationsPage.jsx
            └── ChatPage.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)
- [Stream](https://getstream.io/) account (free tier works — create a Chat app)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yared2124/Serdinos-streamify-app.git
cd Serdinos-streamify-app
```

---

### 2. Configure Environment Variables

#### Backend — `backend/.env`

```env
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/streamify?retryWrites=true&w=majority
JWT_SECRET_KEY=your_super_secret_jwt_key_here
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

#### Frontend — `frontend/.env`

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

> **Note:** `STREAM_API_KEY` is the same value used in both files. The `STREAM_API_SECRET` is **backend only** and should never be exposed to the browser.

---

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 4. Run the App

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server starts on http://localhost:5001
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# App opens on http://localhost:5173
```

---

## 🌐 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|---|
| `POST` | `/signup` | ❌ | Create a new account |
| `POST` | `/login` | ❌ | Log in |
| `POST` | `/logout` | ❌ | Log out (clears cookie) |
| `POST` | `/onboarding` | ✅ | Complete profile setup |
| `GET`  | `/me` | ✅ | Get current user |

### Users — `/api/users`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|---|
| `GET` | `/` | ✅ | Get recommended users (not yet friends) |
| `GET` | `/friends` | ✅ | Get your friends list |
| `GET` | `/friend-requests` | ✅ | Get incoming & accepted requests |
| `GET` | `/outgoing-friend-requests` | ✅ | Get sent pending requests |
| `POST` | `/friend-request/:id` | ✅ | Send a friend request |
| `PUT` | `/friend-request/:id/accept` | ✅ | Accept a friend request |

### Chat — `/api/chat`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|---|
| `GET` | `/token` | ✅ | Get a Stream Chat user token |

---

## 🗺️ Page Routes (Frontend)

| Path | Page | Protected |
|---|---|:---:|
| `/signup` | Sign Up | ❌ |
| `/login` | Login | ❌ |
| `/onboarding` | Complete Profile | ✅ |
| `/` | Home (friends + recommendations) | ✅ |
| `/notifications` | Friend Requests | ✅ |
| `/chat/:id` | Direct Message Chat | ✅ |

---

## 🔒 Authentication Flow

```
User signs up
     │
     ▼
Server hashes password (bcrypt)
Creates MongoDB user
Creates Stream Chat user
Sets JWT as httpOnly cookie (7 days)
     │
     ▼
React reads /api/auth/me on every page load
     │
    ┌┴──────────────────────┐
    │                       │
  Logged in               Not logged in
    │                       │
  isOnboarded?           → /login
    │
  ┌─┴──────┐
  Yes      No
  │        │
  /       /onboarding
```

---

## 🎨 Themes

Streamify supports **8 built-in DaisyUI themes** switchable from the navbar:

`light` · `dark` · `cupcake` · `cyberpunk` · `synthwave` · `retro` · `night` · `dracula`

Theme preference is persisted in `localStorage` via Zustand.

---

## 🌍 Supported Languages

English · Spanish · French · German · Mandarin · Japanese · Korean · Portuguese ·
Russian · Arabic · Hindi · Italian · Dutch · Turkish · Polish · Swedish · Norwegian ·
Danish · Finnish · Greek · Czech · Romanian · Hungarian · Ukrainian · Amharic

---

## 🛠️ Scripts

From the **root** directory:

```bash
npm run dev:backend    # Start backend with nodemon
npm run dev:frontend   # Start Vite frontend dev server
npm run build          # Install all deps + build frontend for production
npm run start          # Start backend only (production)
```

From **`backend/`**:

```bash
npm run dev   # nodemon src/server.js
```

From **`frontend/`**:

```bash
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint check
```

---

## 📦 Deployment

### Build for Production

```bash
npm run build
```

This installs all dependencies and builds the React app into `frontend/dist/`.

### Environment Setup on Your Host

Set the same backend `.env` variables in your hosting platform (Railway, Render, Heroku, etc.) and set `NODE_ENV=production`.

For **frontend deployment** (Vercel, Netlify), set:
```env
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 📸 App Screenshots

> _Coming soon — run the app locally to see it in action!_

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Serdinos** — [@yared2124](https://github.com/yared2124)

---

<div align="center">
  Made with ❤️ and ☕ — Happy language learning! 🌍
</div>
