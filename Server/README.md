# CodeCraft Kids - Secure Engine & API (Server)

The performant, RESTful core of CodeCraft Kids! This server manages all user progress, social interactions, and our proprietary gamification (Gems, Streaks, Badge awarding) logic.

---

## Architectural Highlights

### Secure Member Engine
A robust Authentication & Profile System using:
*   JWT-based Authorization: Secure, sessionless communication.
*   Bcrypt Encryption: Hashed and salted password storage.
*   Automated Profile Injection: Every new student receives a unique profile object with progress tracking.

### Gamification API (Gems & Streaks)
Real-time logic that tracks:
*   Coding Gems: Awarded (50 Gems) for every new level completed.
*   Daily Streaks: Automatic daily activity tracking (Duolingo-style) to reward consistency.
*   Badge Engine: Sequential awarding of digital badges as the student climbs the learning map.

### Social & Community Core
A moderated engine that handles:
*   Achievement Posts: Letting kids share coding milestones.
*   Interactions: Secure liking and commenting to foster social learning.

### Asset Management
Scalable image handling for avatar uploads and community posts using Multer.

---

## The Backend Tech Stack

| Layer | Tools | Responsibilities |
| :--- | :--- | :--- |
| **Logic** | Node.js & Express 5 | API Routing, Game State, Auth Flow. |
| **Database** | MongoDB & Mongoose | Profile Storage, Progress Maps, Social Feed. |
| **Security** | JWT, Bcrypt | Session Management, Hashed Passwords. |
| **Uploads** | Multer | Avatar Processing, Post Metadata Images. |

---

## Initial Backend Deployment

1.  **Navigate to the Server Directory**:
    ```bash
    cd Server
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Configuration (.env)**:
    Create a new `.env` file and define these values:
    ```bash
    MONGODB_URI=mongodb://admin:qwerty@localhost:27017/codecraft_kids?authSource=admin
    JWT_SECRET=your_super_secret_key_here
    ```

4.  **Start API Server**:
    ```bash
    node server.js
    ```

---

## Essential API Routes

*   `POST /api/auth/register` - Create student account.
*   `GET /api/auth/profile` - Fetch real-time gems/streaks/badges.
*   `PUT /api/auth/profile` - Update progress and award milestone rewards.
*   `GET /api/community` - Retrieve the social learning feed.
*   `POST /api/community/post` - Share a new coding achievement.

---
*Building the bedrock for the engineers of tomorrow!*
