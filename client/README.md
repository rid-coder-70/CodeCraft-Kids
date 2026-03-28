# CodeCraft Kids - Frontend Ecosystem (Client)

The vibrant, interactive interface of CodeCraft Kids is where learning transforms into adventure! This modern, minimalist "Kiwi" dashboard ensures students (6-15) can seamlessly navigate lessons, the code playground, and the community.

---

## Key Learning Modules

### Python Island Map
Our core adventure map uses a Sequential Level Locking System. Students must complete one level's challenge to unlock the next, earning Gems and Badges as proof of their progress.

### The Python Lab (v2.0)
A high-performance "Try-it-Yourself" IDE with:
*   Prism.js Highlighting: Real-time syntax coloring for Python keywords like print, for, in.
*   Skulpt Execution: Fast, client-side Python 3 runner that works in the browser.
*   Dual-Pane UI: Split-screen design for code and terminal output, just like professional developer tools.

### The Adventure Shop
A gamified marketplace where students spend Coding Gems on hats, pets, and character skins to personalize their learning experience.

### Daily Streaks & Milestones
Integrated engagement tracking that rewards consecutive days of practice and major learning achievements with special visual cues.

---

## Specialized UI Architecture

*   React 19 & Vite: Optimized for sub-second loading and real-time state management.
*   Framer Motion: Smooth, high-fidelity animations for sidebars, modals, and content transitions.
*   Tailwind 4 & "Kiwi" System: Custom-engineered design tokens using nature-calm greens.
*   React Joyride: An automated, interactive onboarding tour to welcome every new student.
*   Axios: Dedicated service layer for all RESTful API communication.

---

## 📦 Deployment & Setup

1.  **Navigate to the Client Directory**:
    ```bash
    cd client
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure API (config.js)**:
    Ensure your `src/config.js` is correctly pointing to the backend:
    ```javascript
    export const API_BASE = "http://localhost:5000";
    ```

4.  **Launch Dashboard**:
    ```bash
    npm run dev
    ```

---

## Component Guidelines
All components follow the "Kiwi" Minimalist Standard:
*   Maximum use of common utility classes in Tailwind.
*   Focus on Card-based Layouts and Gentle Animations.
*   All interactive elements must be accessible and kid-friendly with larger tap targets.

---
*Fueling the next generation of digital pioneers!*
