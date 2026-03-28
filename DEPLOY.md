# Deployment Guide: CodeCraft Kids

Follow this guide to deploy your project to production. We will use **Vercel** for the Frontend and **Railway** (or **Render**) for the Backend.

---

## 🎨 1. Frontend (Vercel)

Vercel is the best home for React/Vite projects.

1.  Create a free account on [vercel.com](https://vercel.com).
2.  Install the Vercel CLI (optional) or connect your GitHub repository directly.
3.  **Project Settings**:
    *   **Framework Preset**: Vite
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
    *   **Root Directory**: `client`
4.  **Environment Variables**:
    *   Add `VITE_API_URL` and set it to your deployed Backend URL (e.g., `https://api.codecraftkids.com`).
5.  **Click Deploy!**

---

## ⚙️ 2. Backend (Railway or Render)

### Option A: Railway (Paid after trial)
Railway is fast and reliable but requires a trial credit to start.

1.  Connect your GitHub on [railway.app](https://railway.app).
2.  Select the `Server` folder as the root.
3.  **Environment Variables**:
    *   `MONGODB_URI` (Use your MongoDB Atlas link)
    *   `JWT_SECRET` (Your secure key)
    *   `PORT=5000`
4.  Railway will automatically detect `node server.js` and deploy.

### Option B: Render (Free Tier)
Render offers a "Free Tier" for Web Services.

1.  Create an account on [render.com](https://render.com).
2.  Select **New > Web Service** and connect your repo.
3.  **Root Directory**: `Server`
4.  **Build Command**: `npm install`
5.  **Start Command**: `node server.js`
6.  **Environment Variables**: (Same as Railway).
*Note: Render free tier "sleeps" after 15 minutes of inactivity. The first request after a long time might take 30-60 seconds to wake up.*

---

## 🛡️ 3. Handling Post-Deployment

### CORS Issues
If you get a CORS error, ensure your backend allows the Vercel URL. Update `Server/server.js`:

```javascript
app.use(cors({
  origin: ["http://localhost:5173", "https://your-vercel-domain.com"],
  credentials: true
}));
```

### MongoDB Atlas
For production, you **must** use a cloud database like MongoDB Atlas. Do not use local `mongodb://localhost` in your production environment variables.

---
*Happy Deploying!* 🚀
