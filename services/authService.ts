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
        isAdmin: phone === '9999999999' // Mock admin phone
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      resolve(newUser);
    }, 800); // Simulate network delay
  });
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
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
       { id: '1', phone: '12345', name: 'Rina', language: 'hi', completedLessons: ['l1_smartphone', 'l2_payments_intro'], quizScores: {'l1_smartphone': 1}, isAdmin: false },
       { id: '2', phone: '67890', name: 'Sita', language: 'bn', completedLessons: ['l1_smartphone'], quizScores: {}, isAdmin: false },
       { id: '3', phone: '11223', name: 'Gita', language: 'en', completedLessons: ['l1_smartphone', 'l2_payments_intro', 'l3_upi_sim'], quizScores: {'l3_upi_sim': 1}, isAdmin: false },
   ];
   if (current) mockUsers.push(current);
   return mockUsers;
}