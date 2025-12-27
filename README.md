
# Rani - Digital Literacy Platform

**Rani** is a mobile-first, offline-friendly Progressive Web App (PWA) designed to teach digital literacy and basic English to rural women in India. The application uses a high-contrast, Neo-Brutalist design language for accessibility and clarity, focusing on skills like smartphone usage, UPI payments, and government schemes.

---

## 🚀 Key Features

*   **Multilingual Support:** Full localization in English, Hindi (हिंदी), and Bengali (বাংলা).
*   **Offline First:** Built as a PWA with a Service Worker to cache assets and allow learning without an active internet connection.
*   **Interactive Simulations:** Safe, simulated environments to practice using apps like Paytm, Google Pay, and BHIM UPI without real financial risk.
*   **Gamification:** XP (Experience Points), Day Streaks, and sound effects to drive engagement.
*   **Dual Pathways:**
    1.  **Digital Literacy:** Linear lessons on practical skills.
    2.  **English Course:** A "snake-path" gamified curriculum for learning English basics.
*   **Neo-Brutalist UI:** High contrast, bold borders, and large touch targets designed for users with low digital exposure or visual impairments.

---

## 🏗️ Technical Architecture

The project is built as a Single Page Application (SPA) using React.

### Tech Stack
*   **Core:** React (Functional Components + Hooks)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (via CDN for portability)
*   **Icons:** Lucide React
*   **Charts:** Recharts (for Admin Dashboard)
*   **Persistence:** LocalStorage (Mock Database)
*   **Audio:** Native Web Audio API (custom synthesizer for sound effects, no external assets required).

### File Structure & Responsibilities

| File | Description |
| :--- | :--- |
| `index.html` | Entry point. Loads Tailwind via CDN and sets viewport meta tags for mobile. |
| `index.tsx` | Mounts the React root and registers the Service Worker. |
| `App.tsx` | **The Core Monolith.** Contains the Router logic, Layouts, Dashboard, Lesson Player, and English Path components. |
| `types.ts` | TypeScript interfaces for `User`, `Lesson`, `Step`, `Quiz`, and `AppState`. |
| `constants.ts` | Static data: `LESSONS` (curriculum content) and `TRANSLATIONS` (localization strings). |
| `services/authService.ts` | Mock backend handling Login, Signup, `localStorage` persistence, and Admin data generation. |
| `sw.js` | Service Worker logic for caching static assets and API responses for offline use. |
| `metadata.json` | Project metadata and permission requests (Camera, Microphone). |

---

## 🔄 User Flow

### 1. Onboarding
1.  **Splash/Language Select:** The user is greeted with a branding screen and asked to select their preferred language (En/Hi/Bn).
2.  **Login:** User enters a 10-digit mobile number.
    *   *Note:* No OTP is required for this demo; it simulates a login or creates a new account.
    *   *Guest Mode:* Users can skip login to explore.

### 2. The Dashboard (Home)
The main hub of the application features:
*   **Header:** User greeting and profile avatar.
*   **Hero Card ("Up Next"):** A large, visually distinct card showing the current or next lesson to keep the user focused.
*   **Quick Actions:** Icons for "Lessons", "Quiz", and "Sim" (Simulations).
*   **Course Selection:** Toggles between "Digital Literacy" (Grid view) and "English Course" (Gamified Path).

### 3. Lesson Experience (`LessonPlayer`)
When a user clicks a lesson:
1.  **Info Slide:** Image/Video + Text explanation.
2.  **Simulation (Optional):** Interactive components (e.g., a mock keypad for entering a UPI PIN).
3.  **Quiz/Practice:** Multiple-choice questions or sentence re-ordering puzzles.
4.  **Completion:** Upon finishing, the user receives XP, a sound effect plays, and progress is saved.

### 4. Simulations
Specific interactive modules designed to mimic real-world apps:
*   **UPI Pay:** Scanning a QR code, entering an amount, and entering a PIN.
*   **Maps:** Finding a nearby Common Service Center (CSC).
*   **Paytm/GPay:** Mock interfaces to build familiarity with UI patterns.

### 5. Profile & Admin
*   **Profile:** Visualizes "Streak" and "Total XP". Allows language switching and logout.
*   **Admin Console:** (Accessible via specific phone number `9999999999` or button in dev) Displays user engagement stats using charts.

---

## 🧩 Data Models

### User
```typescript
interface User {
  id: string;
  phone: string;
  name: string;
  language: 'en' | 'hi' | 'bn';
  completedLessons: string[]; // IDs of finished units
  xp: number;
  streak: number;
}
```

### Lesson
```typescript
interface Lesson {
  id: string;
  title: Record<Language, string>; // Localized titles
  steps: Step[]; // Array of Info/Sim/Practice steps
  quiz: QuizQuestion[];
}
```

---

## 🎨 UI/UX Design System

The app utilizes a **Neo-Brutalist** aesthetic defined by:

*   **Borders:** `border-2 border-black` on almost all containers and buttons.
*   **Shadows:** Hard, non-blurred shadows (`box-shadow: 4px 4px 0px 0px black`).
*   **Colors:**
    *   Background: White / Light Gray dots.
    *   Accents: High saturation colors (Yellow, Green, Blue) for status indicators.
    *   Typography: `Inter` font, heavy weights (Bold/Black) for headers.
*   **Interactivity:** Buttons depress (translate X/Y) when clicked to provide tactile feedback.

---

## 🛠️ Setup & Running

Since this is a standard React setup:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
3.  **Build for Production:**
    ```bash
    npm run build
    ```

**Note on Service Worker:** The `sw.js` is located in the root. In a production Vite build, this should be moved to the `public/` directory or handled via a PWA plugin.
