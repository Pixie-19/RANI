
export type Language = 'en' | 'hi' | 'bn';

export interface User {
  id: string;
  phone: string;
  name: string;
  language: Language;
  completedLessons: string[]; // IDs of completed lessons
  quizScores: Record<string, number>; // LessonID -> Score
  isAdmin?: boolean;
}

export interface Step {
  id: string;
  type: 'info' | 'simulation' | 'quiz_intro';
  title: Record<Language, string>;
  description: Record<Language, string>;
  image?: string; // URL to illustration
  video?: string | Record<Language, string>; // URL to video clip (string or localized)
  simulationType?: 'upi_pay' | 'paytm' | 'gpay' | 'maps'; // For interactive steps
}

export interface QuizQuestion {
  id: string;
  question: Record<Language, string>;
  options: Record<Language, string>[];
  correctIndex: number;
  explanation: Record<Language, string>; // Explanation for the correct answer
}

export interface Lesson {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string; // Emoji or URL
  steps: Step[];
  quiz: QuizQuestion[];
}

export interface AppState {
  user: User | null;
  isLoading: boolean;
}