# Rani - Project Summary

## 1. Executive Overview
**Rani** is a specialized Progressive Web Application (PWA) developed to bridge the digital divide for rural women in India. It functions as an offline-first educational platform focusing on two critical pillars: **Digital Financial Literacy** (UPI, Scams, Government Schemes) and **Functional English** (Basic vocabulary and conversation).

The project distinguishes itself through a **"Neo-Brutalist" design system** (High contrast, distinct borders), ensuring high visibility and clarity for users with varying levels of visual acuity or digital familiarity. It is built to run on low-end devices with spotty internet connectivity.

## 2. Architecture & Tech Stack

### High-Level Design
Rani is architected as a **Client-Side Monolith** to ensure zero-latency interactions and ease of deployment. It does not rely on a backend server for core functionality, instead utilizing browser capabilities for persistence and logic.

*   **Architecture Pattern**: Single Page Application (SPA).
*   **Offline Strategy**: Cache-First Service Worker (SW) + LocalStorage.
*   **State Management**: React Context API (Global User State).

### Technology Stack
*   **Frontend Framework**: React 18 with TypeScript (Functional Components + Hooks).
*   **Styling**: Tailwind CSS (configured for a specific Neo-Brutalist theme).
*   **Data Persistence**: Browser `localStorage` (acting as a NoSQL document store).
*   **Audio Engine**: Native Web Audio API (procedural sound generation to reduce asset size).
*   **Icons**: Lucide React.
*   **Visualization**: Recharts (for the Admin Analytics Dashboard).

### Key Components
1.  **`App.tsx`**: The central orchestrator handling routing, global state, and layout.
2.  **`LessonPlayer`**: A polymorphic component that renders Slides, Videos, Interactive Simulations, and Quizzes based on JSON configuration.
3.  **`ServiceWorker` (`sw.js`)**: Intercepts network requests to serve cached assets, ensuring the app works without data.
4.  **`AuthService`**: A mock service layer that abstracts user management and mimics network latency.

## 3. User Workflow & Features

### A. Onboarding
The entry point is designed for minimal friction:
1.  **Language Selection**: Users choose between English, Hindi, or Bengali immediately.
2.  **Identity**: Login requires only a 10-digit mobile number (simulated auth). No passwords or OTPs are strictly enforced for the prototype to lower barriers.

### B. Dashboard (The Hub)
The home screen serves as a personalized learning center:
*   **Hero Card**: Dynamically displays the "Up Next" lesson to guide the user.
*   **Navigation**: Fast access to Lessons, Quizzes, and Profile.
*   **Dual Modes**: Users can toggle between the "Digital Skills" grid and the "English Path" (a gamified, snake-like progression map).

### C. Learning Modules
The core educational content is delivered through two modes:
1.  **Linear Lessons (Digital Literacy)**:
    *   **Instruction**: Text + Image/Video content.
    *   **Simulation**: Safe, sandboxed environments mimicking real apps (Paytm, Google Pay, BHIM UPI). Users practice scanning QRs and entering PINs without financial risk.
    *   **Assessment**: Quizzes with immediate audio-visual feedback.
2.  **Gamified Path (English)**:
    *   Unlockable nodes (Unit 1, Unit 2, etc.).
    *   Drag-and-drop sentence building exercises ("Duolingo-style").

### D. Gamification & Retention
*   **XP System**: Users earn Experience Points for every interaction.
*   **Streaks**: Tracks consecutive days of learning to build habits.
*   **Audio Feedback**: Procedurally generated "Dings" and "Buzzers" provide instant gratification.

### E. Administration
A hidden **Admin Dashboard** (accessible via specific login) allows community leaders or NGOs to track user registration and engagement metrics via interactive charts.

## 4. Design Philosophy
The UI uses a **"White & Black" Neo-Brutalist** aesthetic:
*   **Backgrounds**: Clean white with subtle dot patterns.
*   **Borders**: Thick (2px/4px) black borders on all interactive elements.
*   **Shadows**: Hard, non-blurred drop shadows (`box-shadow: 4px 4px 0px 0px black`) to give depth and tactile feel.
*   **Typography**: Large, bold `Inter` font for readability.

## 5. Future Scalability
While currently a prototype, the architecture allows for:
*   **Backend Integration**: The `authService` can be swapped for a real API (Firebase/Supabase) without changing UI components.
*   **Content CMS**: Lesson JSON structures in `constants.ts` can be fetched from a remote CMS to update curriculum dynamically.
