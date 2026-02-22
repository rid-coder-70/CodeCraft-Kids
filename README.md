# 🎮 CodeCraft-Kids 

Welcome to **CodeCraft-Kids**, an immersive and kid-friendly Learning Management System (LMS) designed to make learning Python and coding concepts a fun-filled adventure! 🚀

## 🌟 Features

-  **Super Kid-Friendly UI**: Bright colors, playful gradients, and "Comic Sans MS" font for a welcoming experience.
- 🐼 **Animated Companions**: Meet our cute bouncing pandas, dancing cats, and twinkling stars that guide you through your journey.
- 🎮 **Gamified Learning**: Interactive games and challenges built with Phaser to keep kids engaged.
- 📊 **Progress Tracking**: Colorful dashboards to stay on top of your learning achievements.
- 🚀 **Smooth Animations**: Powered by Framer Motion for a lively and responsive feel.
- 🦄 **Kid-Safe & Friendly Errors**: Whimsical error messages that turn mistakes into learning opportunities.

## 🛠️ Tech Stack

### Frontend
- **React 19 (Vite)**: Modern UI library for a fast and snappy experience.
- **Tailwind CSS 4**: For beautiful, responsive, and kid-friendly designs.
- **Framer Motion**: Powering smooth and playful animations like bouncing pandas.
- **Phaser 3**: The engine behind our interactive and fun coding games.
- **React Router 7**: Seamless navigation between the dashboard and games.
- **Zod**: Robust form validation to ensure smooth signups.
- **Axios**: Reliable API communication with our backend.
- **Canvas-Confetti**: Adding celebratory sparks when kids complete tasks! 🎊
- **React Icons**: A vast library of playful icons.

### Backend
- **Node.js & Express 5**: Modern and high-performance backend server.
- **MongoDB & Mongoose**: Flexible and secure data storage for user profiles and progress.
- **JWT (JsonWebToken)**: Secure session management.
- **Bcryptjs**: Strong password hashing for user safety.
- **Multer**: Handling uploads for user profiles or project assets.
- **Cors**: Enabling secure communication between frontend and backend.
- **Dotenv**: Managing environment variables securely.

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.
- MongoDB instance (local or Atlas).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rid-coder-70/CodeCraft-Kids
   cd CodeCraft-Kids
   ```

2. **Frontend Setup**:
   ```bash
   cd client
   npm install
   ```

3. **Backend Setup**:
   ```bash
   cd ../Server
   npm install
   ```

4. **Environment Configuration**:
   - In the `Server` directory, copy `.env.example` to a new file named `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and provide your own values for `MONGODB_URI` and `JWT_SECRET`.

### Running the App

1. **Start the Backend Server**:
   ```bash
   cd Server
   npm run dev
   ```

2. **Start the Frontend Client**:
   ```bash
   cd client
   npm run dev
   ```

Visit `http://localhost:5173` to start your coding adventure! 🎉

## 🎨 Visual Style
The project has undergone a complete transformation to match the energy of kids' games. 🐼✨ Everything from the backgrounds to the buttons is designed to be **bright, engaging, and fun!**

---
Made with ❤️ for the next generation of coders! 🚀🌈✨

