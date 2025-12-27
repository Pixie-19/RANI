
import { User, Language } from '../types';

const STORAGE_KEY = 'rani_user';

// Mock Auth: Just creates a user record in local storage
export const login = async (phone: string, language: Language): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if user exists in localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.phone === phone) {
           // Update language preference on login
           parsed.language = language;
           // Backwards compatibility for existing local storage data without XP
           if (typeof parsed.xp === 'undefined') parsed.xp = 0;
           if (typeof parsed.streak === 'undefined') parsed.streak = 1;
           
           localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
           resolve(parsed);
           return;
        }
      }

      // Create new mock user
      const newUser: User = {
        id: Date.now().toString(),
        phone,
        name: "Rani User",
        language,
        completedLessons: [],
        quizScores: {},
        isAdmin: phone === '9999999999', // Mock admin phone
        xp: 100, // Sign up bonus
        streak: 1
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      resolve(newUser);
    }, 800); // Simulate network delay
  });
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  const user = JSON.parse(stored);
  // Ensure fields exist for old data
  if (typeof user.xp === 'undefined') user.xp = 0;
  if (typeof user.streak === 'undefined') user.streak = 1;
  return user;
};

export const logout = () => {
  // In a real app we might clear token, here we keep data but clear session state in context
  // For this mock, we won't delete the data so progress persists
};

export const saveProgress = (user: User) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const getAllUsersMock = (): User[] => {
   // Generates fake data for admin dashboard + the current user
   const current = getCurrentUser();
   const mockUsers: User[] = [
       { id: '1', phone: '12345', name: 'Rina', language: 'hi', completedLessons: ['l1_smartphone', 'l2_payments_intro'], quizScores: {'l1_smartphone': 1}, isAdmin: false, xp: 150, streak: 3 },
       { id: '2', phone: '67890', name: 'Sita', language: 'bn', completedLessons: ['l1_smartphone'], quizScores: {}, isAdmin: false, xp: 50, streak: 1 },
       { id: '3', phone: '11223', name: 'Gita', language: 'en', completedLessons: ['l1_smartphone', 'l2_payments_intro', 'l3_upi_sim'], quizScores: {'l3_upi_sim': 1}, isAdmin: false, xp: 300, streak: 10 },
   ];
   if (current) mockUsers.push(current);
   return mockUsers;
}
