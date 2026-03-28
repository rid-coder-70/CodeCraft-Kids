# ⚙️ CodeCraft Kids - Backend (Server)

The reliable, secure, and performant core that powers the CodeCraft Kids adventure! This RESTful API manages everything from user progress and social interactions to the gamified "Gems and Streaks" logic.

## 🚀 Key Features

*   **Authentication & Profiles**: Secure JWT-based login and registration with automated profile generation for every new student.
*   **Sequential Badge Engine**: A specialized logic that awards badges for level completion.
*   **Gamification API**: Handled real-time updates for **Coding Gems** 💎, **Daily Streaks** 🔥, and **Experience Points (XP)**.
*   **Community Core**: Full engine for creating posts, liking, and commenting to foster a social learning environment.
*   **Image Handling**: Scalable image storage and processing for avatar uploads and community posts.

## 🛠️ Tech Stack

*   **Node.js & Express**
*   **MongoDB & Mongoose** (Database)
*   **JSON Web Tokens** (Security)
*   **Multer** (File Uploads)
*   **Bcrypt.js** (Password Encryption)

## 📦 Installation

1.  **Navigate to the folder**:
    ```bash
    cd Server
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Create your `.env` file**:
    ```bash
    MONGODB_URI=mongodb://admin:qwerty@localhost:27017/codecraft_kids?authSource=admin
    JWT_SECRET=your_super_secret_key_here
    ```

4.  **Start development server**:
    ```bash
    node server.js
    ```

## 📡 API Endpoints Summary

*   `POST /api/auth/register` - Create a new account
*   `POST /api/auth/login` - Authenticate a user
*   `GET /api/auth/profile` - Fetch current user stats
*   `PUT /api/auth/profile` - Update progress, award gems/badges
*   `GET /api/community` - Fetch the social feed
*   `POST /api/community/post` - Create a new achievement post
*   `POST /api/community/comment/:postId` - Add a comment to a post

---
*Building the foundation for future devs! ⚙️💎*
