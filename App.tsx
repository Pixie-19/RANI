
import React, { useState, useEffect, useContext, createContext } from 'react';
import { User, Language, Lesson } from './types';
import { getCurrentUser, login, logout, saveProgress, getAllUsersMock } from './services/authService';
import { TRANSLATIONS, LESSONS } from './constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { 
    Smartphone, IndianRupee, ScanLine, Wallet, Zap, Landmark, BookOpen, 
    Trophy, CreditCard, Settings, Home, User as UserIcon, Crown, ChevronLeft, 
    Search, Check, X, ArrowRight, Menu, LogOut, CheckCircle, GraduationCap,
    Grid, Banknote, QrCode, Monitor, Flame, Sun, MessageCircle, Lock
} from 'lucide-react';

// --- Context ---
interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  setLanguageSelected: (s: boolean) => void;
  t: (key: string) => string;
  updateProgress: (lessonId: string, score?: number, xpGained?: number) => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// --- Sound Helper ---
const playSound = (type: 'correct' | 'wrong') => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    try {
        const ctx = new AudioContext();
        
        if (type === 'correct') {
            // Cheerful, satisfying "Ding" (Layered Sine + Triangle with pitch bend)
            const t = ctx.currentTime;
            
            // Layer 1: Main High Ping (Sine) - slides up slightly for energy
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(587.33, t); // D5
            osc1.frequency.exponentialRampToValueAtTime(1174.66, t + 0.1); // D6 (Octave jump)
            
            gain1.gain.setValueAtTime(0, t);
            gain1.gain.linearRampToValueAtTime(0.3, t + 0.02); // Fast attack
            gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.6); // Long resonant tail
            
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start(t);
            osc1.stop(t + 0.6);

            // Layer 2: Warmth/Texture (Triangle) - slightly delayed for "sparkle"
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(880, t + 0.05); // A5 (Major 5th relative to D)
            
            gain2.gain.setValueAtTime(0, t + 0.05);
            gain2.gain.linearRampToValueAtTime(0.1, t + 0.07);
            gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(t + 0.05);
            osc2.stop(t + 0.6);

        } else {
            // "Thud" / Error Sound (Low Sawtooth with Lowpass Filter)
            const t = ctx.currentTime;
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, t); // Low pitch
            osc.frequency.linearRampToValueAtTime(80, t + 0.3); // Pitch drops
            
            // Filter out the buzz to make it a dull thud
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(600, t);
            filter.frequency.linearRampToValueAtTime(100, t + 0.3);

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(t);
            osc.stop(t + 0.3);
        }
    } catch (e) {
        console.error("Audio playback failed", e);
    }
};

// --- Shadcn-style Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
    <div onClick={onClick} className={`bg-white border-2 border-black rounded-xl shadow-neobrutalism transition-all active:shadow-neobrutalism-sm active:translate-x-[2px] active:translate-y-[2px] ${className}`}>
        {children}
    </div>
);

const Button: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'black' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "w-full py-4 px-6 rounded-xl font-bold text-lg transition-all active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2";
  
  const variants = {
    primary: "bg-white text-black shadow-neobrutalism hover:bg-gray-50 active:shadow-neobrutalism-sm",
    secondary: "bg-gray-100 text-black border-black shadow-neobrutalism hover:bg-gray-200 active:shadow-neobrutalism-sm",
    black: "bg-black text-white border-black shadow-neobrutalism hover:bg-zinc-900 active:shadow-neobrutalism-sm",
    outline: "bg-transparent text-black border-black hover:bg-gray-50",
    ghost: "bg-transparent text-gray-500 border-transparent shadow-none active:shadow-none hover:text-black active:translate-x-0 active:translate-y-0"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed shadow-none' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input 
        {...props}
        className={`flex h-12 w-full rounded-xl border-2 border-black bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`}
    />
);

// --- Icon Helper ---
const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    const icons: Record<string, any> = {
        'smartphone': Smartphone,
        'banknote': Banknote,
        'qr-code': QrCode,
        'wallet': Wallet,
        'zap': Zap,
        'landmark': Landmark,
        'indian-rupee': IndianRupee,
        'scan-line': ScanLine, 
        'graduation-cap': GraduationCap,
        'sun': Sun,
        'message-circle': MessageCircle,
        'user': UserIcon
    };
    const LucideIcon = icons[name] || Smartphone;
    return <LucideIcon className={className} />;
};

const BottomNav: React.FC<{ tab: 'home' | 'profile'; setTab: (t: 'home' | 'profile') => void }> = ({ tab, setTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4 pb-6 flex justify-around items-center z-20 w-full max-w-md mx-auto rounded-t-3xl">
      <button 
        onClick={() => setTab('home')}
        className={`flex flex-col items-center gap-1 transition-all ${tab === 'home' ? 'text-black scale-105' : 'text-gray-400'}`}
      >
        <Home className="w-6 h-6" strokeWidth={tab === 'home' ? 3 : 2} />
        <span className="text-[10px] font-bold tracking-wide uppercase">Home</span>
      </button>
      
      {/* Floating Action Button Aesthetic */}
      <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center -mt-8 border-4 border-white shadow-neobrutalism transform rotate-3">
         <Crown className="text-white w-7 h-7" />
      </div>

      <button 
        onClick={() => setTab('profile')}
        className={`flex flex-col items-center gap-1 transition-all ${tab === 'profile' ? 'text-black scale-105' : 'text-gray-400'}`}
      >
        <UserIcon className="w-6 h-6" strokeWidth={tab === 'profile' ? 3 : 2} />
        <span className="text-[10px] font-bold tracking-wide uppercase">Profile</span>
      </button>
    </div>
  );
};

// --- Custom Graphics for Black Bank look ---
const AppLogo = () => (
  <div className="relative w-48 h-48 mx-auto mb-8 flex flex-col items-center justify-center">
     <div className="relative w-full h-full flex items-center justify-center">
        {/* Background decorative squares */}
        <div className="absolute w-28 h-28 bg-gray-200 border-2 border-black rounded-3xl rotate-12 translate-x-3"></div>
        <div className="absolute w-28 h-28 bg-white border-2 border-black rounded-3xl -rotate-6 -translate-x-3"></div>
        
        {/* Main Logo Container - Matches Bottom Nav Style */}
        <div className="relative w-28 h-28 bg-black rounded-3xl flex items-center justify-center border-4 border-white shadow-neobrutalism transform rotate-3 z-10">
            <Crown className="text-white w-12 h-12" strokeWidth={2.5} />
        </div>
     </div>
     
     {/* Pagination dots */}
     <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 flex gap-2">
        <div className="w-2 h-2 bg-black rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
     </div>
  </div>
);

// --- Pages ---

// 0. Language Selection Page
const LanguageSelectionPage: React.FC = () => {
  const { setLanguage, setLanguageSelected } = useApp();

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setLanguageSelected(true);
    localStorage.setItem('rani_language', lang);
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-white text-black relative">
       {/* Top decoration */}
       <div className="mt-8 mb-4">
         <div className="text-center">
            <h3 className="font-medium text-lg mb-1">Hello,</h3>
            <h1 className="text-3xl font-bold">Welcome to Rani</h1>
         </div>
       </div>

       <div className="flex-1 flex flex-col justify-center">
          <AppLogo />
          
          <div className="text-center mb-10">
              <h2 className="text-xl font-bold mb-3">Choose Your Language</h2>
              <p className="text-gray-500 text-sm leading-relaxed px-4">
                 Select a language to start your digital literacy journey. We support multiple local languages.
              </p>
          </div>

          <div className="space-y-3">
            {[
                { id: 'en', label: 'English' },
                { id: 'hi', label: 'हिंदी (Hindi)' },
                { id: 'bn', label: 'বাংলা (Bengali)' }
            ].map((lang) => (
                <Button 
                    key={lang.id} 
                    onClick={() => handleSelectLanguage(lang.id as Language)}
                    variant="primary"
                    className="justify-between group"
                >
                    <span>{lang.label}</span>
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                    </span>
                </Button>
            ))}
          </div>
       </div>
    </div>
  );
};

// 1. Login Page
const LoginPage: React.FC = () => {
  const { setUser, language, t, setLanguageSelected } = useApp();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    const user = await login(phone, language);
    setUser(user);
    setLoading(false);
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    // Create a guest user object directly
    const guestUser: User = {
        id: 'guest',
        phone: '0000000000',
        name: 'Guest User',
        language: language,
        completedLessons: [],
        quizScores: {},
        isAdmin: false,
        xp: 0,
        streak: 1
    };
    // Simulate slight delay
    setTimeout(() => {
        setUser(guestUser);
        setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-white text-black">
      <div className="flex justify-between items-center mt-2 mb-8">
          <button onClick={() => setLanguageSelected(false)} className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm uppercase tracking-widest">{language === 'en' ? 'Login' : 'लॉग इन'}</span>
          <div className="w-10"></div> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-10 text-center">
           <div className="w-20 h-20 bg-black mx-auto rounded-2xl rotate-12 mb-6 border-2 border-black shadow-neobrutalism flex items-center justify-center">
              <UserIcon className="text-white w-10 h-10 -rotate-12" />
           </div>
           <h1 className="text-3xl font-bold mb-2">{t('welcome')}</h1>
           <p className="text-gray-500">{t('login_subtitle')}</p>
        </div>

        <div className="space-y-6 mt-auto mb-10">
          <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-2">Mobile Number</label>
              <div className="relative">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="999 999 9999"
                    className="pl-16 text-xl font-bold h-16"
                    maxLength={10}
                    autoFocus
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 pointer-events-none">
                      +91
                  </div>
              </div>
          </div>
          
          <Button onClick={handleLogin} disabled={phone.length < 10 || loading} variant="black">
            {loading ? '...' : t('login_btn')}
          </Button>

          <Button onClick={handleGuestLogin} variant="ghost" className="text-xs mt-4">
             Skip Introduction
          </Button>
        </div>
      </div>
    </div>
  );
};

// 2. Profile View
const ProfileView: React.FC = () => {
    const { user, setUser, t, language, setLanguage, logoutUser } = useApp();
    const completedCount = user?.completedLessons.length || 0;
    const totalScore = Object.values(user?.quizScores || {}).reduce((a: number, b: number) => a + b, 0);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        if (user) {
            const updatedUser = { ...user, language: lang };
            setUser(updatedUser);
            saveProgress(updatedUser);
        }
    };

    return (
        <div className="p-6 space-y-6 pb-32 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="font-bold text-lg">My Profile</h2>
                <button onClick={logoutUser} className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-neobrutalism-sm">
                    <LogOut className="w-4 h-4 ml-1" />
                </button>
            </div>

            {/* Overview Section */}
            <div className="space-y-4">
                 <h3 className="font-bold text-lg">Overview</h3>
                 <div className="grid grid-cols-2 gap-4">
                     <Card className="p-4 flex flex-col items-center justify-center gap-2">
                         <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-500">
                            <Flame className="w-5 h-5 text-orange-600 fill-orange-600" />
                         </div>
                         <div className="text-center">
                            <p className="text-2xl font-black">{user?.streak || 1}</p>
                            <p className="text-xs font-bold text-gray-500 uppercase">Day Streak</p>
                         </div>
                     </Card>
                     
                     <Card className="p-4 flex flex-col items-center justify-center gap-2">
                         <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-yellow-500">
                            <Zap className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                         </div>
                         <div className="text-center">
                            <p className="text-2xl font-black">{user?.xp || 0}</p>
                            <p className="text-xs font-bold text-gray-500 uppercase">Total XP</p>
                         </div>
                     </Card>
                 </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-4 pt-2">
                <h3 className="font-bold text-lg">Your Stats</h3>
                
                <Card className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Lessons Completed</p>
                            <p className="text-xs text-gray-500">Keep learning</p>
                        </div>
                    </div>
                    <span className="font-bold text-lg">{completedCount}</span>
                </Card>

                <Card className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Total Quiz Score</p>
                            <p className="text-xs text-gray-500">Good job!</p>
                        </div>
                    </div>
                    <span className="font-bold text-lg">{totalScore}</span>
                </Card>
            </div>

             {/* Language Settings */}
             <div className="space-y-2 mt-8">
                <h3 className="font-bold text-lg">Language</h3>
                <div className="grid grid-cols-3 gap-2">
                    {['en', 'hi', 'bn'].map((lang) => (
                        <button 
                            key={lang}
                            onClick={() => handleLanguageChange(lang as Language)}
                            className={`py-3 border-2 rounded-xl text-sm font-bold transition-all ${language === lang ? 'bg-black text-white border-black shadow-neobrutalism' : 'bg-white text-black border-black hover:bg-gray-50'}`}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 3. New English Pathway Component
const EnglishPathway: React.FC<{ setRoute: (r: string) => void }> = ({ setRoute }) => {
    const { user, t, language } = useApp();
    const englishLessons = LESSONS.filter(l => l.id.startsWith('e_'));
    
    // Check progress
    // A lesson is unlocked if it's the first one OR the previous one is completed
    const isUnlocked = (index: number) => {
        if (index === 0) return true;
        const prevId = englishLessons[index - 1].id;
        return user?.completedLessons.includes(prevId);
    };

    return (
        <div className="min-h-screen bg-white text-black pb-32">
             <div className="sticky top-0 z-20 bg-white border-b-2 border-black px-4 py-4 flex items-center gap-4">
                 <button onClick={() => setRoute('home')} className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                 </button>
                 <h1 className="text-xl font-black">{t('english_course')}</h1>
             </div>

             <div className="flex flex-col items-center py-12 relative max-w-xs mx-auto">
                 {/* SVG Path Background */}
                 <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    {/* Draw dashed lines connecting nodes */}
                    {englishLessons.map((_, i) => {
                        if (i === englishLessons.length - 1) return null;
                        // Calculate simplified coordinates for snake layout
                        const x1 = i % 2 === 0 ? 50 : 270; // Center-ish
                        const y1 = 40 + (i * 140);
                        const x2 = (i + 1) % 2 === 0 ? 50 : 270;
                        const y2 = 40 + ((i + 1) * 140);
                        // Using a bezier curve for smooth path
                        return (
                            <path 
                                key={i}
                                d={`M ${160 + (i % 2 === 0 ? -40 : 40)} ${y1+50} C ${160 + (i % 2 === 0 ? -40 : 40)} ${y1 + 100}, ${160 + ((i + 1) % 2 === 0 ? -40 : 40)} ${y2 - 50}, ${160 + ((i + 1) % 2 === 0 ? -40 : 40)} ${y2}`} 
                                stroke={isUnlocked(i+1) ? "#000" : "#d1d5db"} 
                                strokeWidth="4" 
                                strokeDasharray="10,10"
                                fill="none"
                            />
                        );
                    })}
                 </svg>

                 {englishLessons.map((lesson, index) => {
                     const locked = !isUnlocked(index);
                     const completed = user?.completedLessons.includes(lesson.id);
                     const offset = index % 2 === 0 ? '-ml-20' : 'ml-20'; // Zigzag effect
                     
                     return (
                         <div key={lesson.id} className={`relative z-10 mb-20 ${offset} flex flex-col items-center group`}>
                             <button
                                 onClick={() => !locked && setRoute(`lesson/${lesson.id}`)}
                                 disabled={locked}
                                 className={`
                                    w-24 h-24 rounded-full flex items-center justify-center border-4 relative transition-all active:scale-95
                                    ${locked 
                                        ? 'bg-gray-200 border-gray-300 text-gray-400' 
                                        : (completed 
                                            ? 'bg-yellow-400 border-black text-black shadow-neobrutalism' 
                                            : 'bg-black text-white border-black shadow-neobrutalism')
                                    }
                                 `}
                             >
                                 {locked ? <Lock className="w-8 h-8" /> : (completed ? <Check className="w-10 h-10" strokeWidth={3} /> : <Icon name={lesson.icon} className="w-8 h-8" />)}
                                 
                                 {/* Shine effect for active uncompleted */}
                                 {!locked && !completed && (
                                     <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
                                 )}
                             </button>
                             
                             {/* Label */}
                             <div className="absolute top-28 bg-white border-2 border-black px-3 py-1 rounded-lg shadow-[2px_2px_0_0_rgba(0,0,0,1)] whitespace-nowrap z-20">
                                 <p className="text-xs font-bold uppercase tracking-wider">{t('unit')} {index + 1}</p>
                                 <p className="font-bold text-sm">{lesson.title[language]}</p>
                             </div>
                         </div>
                     )
                 })}
             </div>
        </div>
    );
};

// 4. Dashboard (Home)
const Dashboard: React.FC<{ setRoute: (r: string) => void }> = ({ setRoute }) => {
  const { user, t, language, setUser } = useApp();
  const [tab, setTab] = useState<'home' | 'profile'>('home');

  // English Entry
  const showEnglishCard = language !== 'en';
    
  // Filter lessons - Exclude English path lessons from the main "Your Lessons" grid and Hero card
  const digitalLiteracyLessons = LESSONS.filter(l => !l.id.startsWith('e_'));
  
  // Determine active lesson for Hero
  let activeLesson = digitalLiteracyLessons.find(l => l.id === user?.lastActiveLessonId);
  if (!activeLesson) {
     const nextLessonIndex = digitalLiteracyLessons.findIndex(l => !user?.completedLessons.includes(l.id));
     activeLesson = nextLessonIndex !== -1 ? digitalLiteracyLessons[nextLessonIndex] : digitalLiteracyLessons[digitalLiteracyLessons.length - 1];
  }
  
  // Safety check
  if (!activeLesson && digitalLiteracyLessons.length > 0) activeLesson = digitalLiteracyLessons[0];
  
  const allCompleted = user?.completedLessons.length === digitalLiteracyLessons.length && !user?.lastActiveLessonId;
  const isCompleted = user?.completedLessons.includes(activeLesson?.id || '');

  const handleLessonStart = (lessonId: string) => {
    if (user) {
        const updatedUser = { ...user, lastActiveLessonId: lessonId };
        setUser(updatedUser);
        saveProgress(updatedUser);
    }
    setRoute(`lesson/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b-2 border-black px-6 py-4 flex justify-between items-center">
         <div>
             <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Welcome,</p>
             <h1 className="text-2xl font-black">{user?.name}</h1>
         </div>
         <button 
            onClick={() => setTab('profile')} 
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold border-2 border-black shadow-neobrutalism-sm active:scale-95 transition-transform"
         >
            {user?.name.charAt(0)}
         </button>
      </div>

      {/* Content */}
      <div className="px-6 pb-32 space-y-8 mt-4">
      {tab === 'profile' ? (
          <ProfileView />
      ) : (
          <>
            {/* Hero Card */}
            {activeLesson && (
            <div className="relative w-full aspect-[1.35] bg-white border-2 border-black rounded-[2rem] p-7 flex flex-col justify-between overflow-hidden shadow-neobrutalism">
                {/* Decorative Pattern lines */}
                <div className="absolute right-[-20%] top-[-10%] w-[80%] h-[120%] rounded-full border-[1px] border-gray-200 opacity-60 pointer-events-none"></div>
                <div className="absolute right-[10%] bottom-[-30%] w-[60%] h-[80%] rounded-full border-[1px] border-gray-200 opacity-60 pointer-events-none"></div>

                {/* Top Row */}
                <div className="flex justify-between items-start z-10">
                    <div className="w-14 h-11 bg-blue-50 border-2 border-black rounded-xl flex items-center justify-center">
                         <Icon name={activeLesson.icon} className="w-6 h-6 text-blue-600 stroke-[2.5]" />
                    </div>
                    <span className="font-black text-xl italic tracking-tighter text-black">RANI</span>
                </div>

                {/* Middle Content */}
                <div className="z-10 mt-2">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mb-2 uppercase">
                        {isCompleted ? 'Completed' : (allCompleted ? 'Completed' : 'Up Next')}
                    </p>
                    <h2 className="text-3xl font-black leading-tight text-black mb-4 line-clamp-2">
                        {activeLesson.title[language]}
                    </h2>
                    
                    {/* Colored Dots */}
                    <div className="flex gap-3">
                         <div className="w-3 h-3 rounded-full bg-[#3b82f6] border border-black"></div>
                         <div className="w-3 h-3 rounded-full bg-[#ef4444] border border-black"></div>
                         <div className="w-3 h-3 rounded-full bg-[#eab308] border border-black"></div>
                         <div className="w-3 h-3 rounded-full bg-[#22c55e] border border-black"></div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex justify-between items-center z-10">
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mb-1 uppercase">Student</p>
                        <p className="font-bold text-black text-lg">{user?.name}</p>
                    </div>
                    <button 
                         onClick={() => handleLessonStart(activeLesson!.id)}
                         className="bg-black text-white pl-6 pr-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-transform active:scale-95 flex items-center gap-2 group border-2 border-black"
                    >
                        {isCompleted ? 'REVIEW' : (allCompleted ? 'REVIEW' : 'START')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
            )}

            {/* Action Grid */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: BookOpen, label: t('nav_lessons'), route: '' },
                    { icon: Trophy, label: t('quiz'), route: '' },
                    // Sim removed
                    { icon: Settings, label: t('nav_more'), route: '' }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group">
                        <button className="w-14 h-14 bg-white border-2 border-black rounded-2xl flex items-center justify-center text-xl shadow-neobrutalism-sm group-hover:shadow-neobrutalism transition-all group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-none">
                            <item.icon className="w-6 h-6" />
                        </button>
                        <span className="text-xs font-bold text-gray-600">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* English Course Special Card (Path Entry) */}
            {showEnglishCard && (
                <div className="mt-4">
                    <Card 
                        onClick={() => setRoute('english-path')}
                        className="p-5 flex items-center justify-between bg-black text-white cursor-pointer group relative overflow-hidden shadow-neobrutalism"
                    >
                        {/* Decorative background circle */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-zinc-800 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black border-2 border-white group-hover:rotate-12 transition-transform">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg leading-tight">{t('english_course')}</h4>
                                <p className="text-zinc-400 text-xs font-bold mt-1">{t('english_desc')}</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black relative z-10 group-hover:translate-x-1 transition-transform">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </Card>
                </div>
            )}

            {/* Lessons Grid (Excluding English) */}
            <div>
                <h3 className="text-lg font-bold mb-4">Your Lessons</h3>
                <div className="grid grid-cols-2 gap-4">
                    {digitalLiteracyLessons.map((lesson, index) => {
                        const isLessonCompleted = user?.completedLessons.includes(lesson.id);
                        return (
                            <Card 
                                key={lesson.id}
                                onClick={() => handleLessonStart(lesson.id)}
                                className={`
                                    p-5 aspect-square flex flex-col justify-between cursor-pointer relative bg-white group
                                    ${isLessonCompleted ? 'bg-gray-50' : ''}
                                `}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                        <Icon name={lesson.icon} className="w-5 h-5" />
                                    </div>
                                    {isLessonCompleted && (
                                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <p className="text-gray-500 text-xs font-bold mb-1">Unit {index + 1}</p>
                                    <h4 className="font-bold text-sm leading-tight line-clamp-2">{lesson.title[language].split('.')[1] || lesson.title[language]}</h4>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {user?.isAdmin && (
               <Button onClick={() => setRoute('admin')} variant="outline" className="mt-4">Admin Dashboard</Button>
            )}
          </>
      )}
      </div>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
};

// ... (Simulations code remains same)
const SimulationView: React.FC<{ type: string; onComplete: () => void }> = ({ type, onComplete }) => {
    // ... (Simulation code remains the same)
  const { t } = useApp();
  const [step, setStep] = useState(type === 'maps' ? 0 : -1); 
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');

  const getTheme = () => {
    if (type === 'paytm') return 'bg-[#002970] text-white'; 
    if (type === 'gpay') return 'bg-white text-gray-900 border-b';
    if (type === 'maps') return 'bg-green-100';
    return 'bg-orange-500 text-white'; 
  };

  if (type === 'maps') {
     return (
         <div className="h-full flex flex-col relative bg-zinc-100 text-black">
             <div className="bg-white p-4 shadow z-10 border-b-2 border-black flex items-center gap-3">
                 <Search className="w-5 h-5 text-gray-400" />
                 <Input disabled placeholder={t('find_center')} className="h-10 border-gray-300" />
             </div>
             <div className="flex-1 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/id/10/800/800')] bg-cover"></div>
                 <div onClick={onComplete} className="relative z-10 animate-bounce cursor-pointer">
                    <div className="text-4xl text-center mb-1">📍</div>
                    <Card className="px-3 py-2 text-xs">
                        <span className="font-bold">CSC Center</span>
                        <br/>
                        <span className="text-blue-500 font-normal">Tap here</span>
                    </Card>
                 </div>
             </div>
         </div>
     )
  }

  // Wrappers for external apps simulation
  if (step === -1) {
    if (type === 'paytm') {
        return (
            <div className="h-full bg-gray-50 flex flex-col text-black font-sans">
                <div className="bg-[#00BAF2] p-4 text-white flex justify-between items-center shadow-md">
                    <span className="font-bold text-xl italic tracking-tighter">Paytm</span>
                    <div className="flex gap-3">
                        <Search className="w-6 h-6" />
                    </div>
                </div>
                <div className="p-4 bg-white m-2 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold mb-4 text-gray-700">UPI Money Transfer</h3>
                    <div className="flex justify-between text-center">
                        <div onClick={() => setStep(0)} className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className="w-14 h-14 bg-[#002970] rounded-full flex items-center justify-center text-white shadow-lg group-active:scale-95 transition-transform">
                                <ScanLine className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-bold text-gray-800">Scan & Pay</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'gpay') {
        return (
            <div className="h-full bg-white flex flex-col text-black font-sans">
                <div className="p-4 flex items-center justify-center relative">
                    <div className="w-full bg-gray-100 rounded-full h-12 flex items-center px-6 text-gray-500 font-medium">Pay friends</div>
                    <div className="w-10 h-10 bg-purple-600 rounded-full ml-3 flex items-center justify-center text-white font-bold shadow-sm">U</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">
                     <div onClick={() => setStep(0)} className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg flex items-center gap-3 cursor-pointer">
                         <ScanLine className="w-6 h-6" />
                         <span className="font-bold text-lg">Scan any QR code</span>
                     </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="h-full bg-orange-500 flex flex-col items-center justify-center text-white space-y-6 font-sans">
                <h1 className="text-5xl font-extrabold">BHIM UPI</h1>
                <button onClick={() => setStep(0)} className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold shadow-xl flex items-center gap-2">
                    <ScanLine className="w-6 h-6" /> Scan & Pay
                </button>
            </div>
        )
    }
  }

  return (
    <div className={`h-full flex flex-col text-black ${type === 'gpay' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`p-4 ${getTheme()} flex items-center shadow-md justify-between`}>
         <div className="flex items-center gap-2">
             {step > -1 && <button onClick={() => setStep(-1)} className="p-1"><ChevronLeft className="w-6 h-6" /></button>}
             <span className="font-bold text-lg uppercase tracking-wider">{type === 'upi_pay' ? 'BHIM UPI' : (type === 'gpay' ? 'Google Pay' : 'Paytm')}</span>
         </div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-8 font-sans">
        {step === 0 && (
          <>
            <div className="text-center space-y-2"><h3 className="text-2xl font-bold text-gray-800">{t('scan_qr')}</h3></div>
            <div onClick={() => setStep(1)} className="w-72 h-72 border-4 border-dashed border-gray-300 rounded-3xl flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative group">
                <ScanLine className="w-24 h-24 text-gray-300 group-hover:text-gray-400" />
                <span className="absolute bottom-8 text-sm font-bold text-gray-400 uppercase tracking-widest">Tap to Scan</span>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
             <div className="flex items-center gap-4 mb-8">
                 <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">M</div>
                 <div><p className="font-bold text-gray-900 text-xl">Merchant Store</p></div>
             </div>
             <div className="mb-8">
                 <label className="text-xs text-gray-500 mb-2 block font-bold uppercase tracking-wider">Enter Amount</label>
                 <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200">
                     <span className="text-2xl font-bold text-gray-900 mr-2">₹</span>
                     <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-transparent text-gray-900 text-3xl font-bold outline-none" placeholder="0" autoFocus />
                 </div>
             </div>
             <button onClick={() => setStep(2)} disabled={!amount} className={`w-full py-4 rounded-xl font-bold text-xl transition-all shadow-lg ${amount ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>{t('pay')} ₹{amount || '0'}</button>
          </div>
        )}

        {step === 2 && (
             <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 text-center space-y-6">
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold inline-block mb-2">Demo PIN: 1234</div>
                <h3 className="font-bold text-gray-800 text-xl">{t('pin_enter')}</h3>
                <div className="flex justify-center gap-4 my-4">
                    {[0,1,2,3].map(i => (<div key={i} className={`w-4 h-4 rounded-full border-2 transition-colors ${pin.length > i ? 'bg-gray-900 border-gray-900' : 'bg-transparent border-gray-300'}`}></div>))}
                </div>
                <div className="grid grid-cols-3 gap-4 font-bold text-xl">
                    {[1,2,3,4,5,6,7,8,9].map(n => (<button key={n} onClick={() => pin.length < 4 && setPin(p => p + n)} className="p-4 rounded-full hover:bg-gray-100">{n}</button>))}
                    <div className="col-start-2"><button onClick={() => pin.length < 4 && setPin(p => p + '0')} className="p-4 rounded-full hover:bg-gray-100">0</button></div>
                    <button onClick={() => setPin(p => p.slice(0, -1))} className="p-4 text-red-500 flex items-center justify-center"><X className="w-6 h-6" /></button>
                </div>
                <div className="mt-4 flex justify-center">
                    <button onClick={() => pin === '1234' ? setStep(3) : (alert(t('incorrect_pin')), setPin(''))} disabled={pin.length !== 4} className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl shadow-lg transition-all ${pin.length === 4 ? 'bg-green-500 scale-110' : 'bg-gray-300'}`}>
                        <Check className="w-8 h-8" />
                    </button>
                </div>
             </div>
        )}

        {step === 3 && (
            <div className="text-center space-y-6 animate-fade-in">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-xl shadow-green-200 animate-bounce">
                    <Check className="w-12 h-12" />
                </div>
                <div><h2 className="text-3xl font-extrabold text-green-600">{t('success')}</h2><p className="text-gray-500 mt-2 font-medium">Transaction ID: #839201</p></div>
                <Button onClick={onComplete} variant="black" className="mt-8">{t('finish')}</Button>
            </div>
        )}
      </div>
    </div>
  );
};

// ... (LessonPlayer code mostly remains same, just handling close)
const LessonPlayer: React.FC<{ lessonId: string; close: () => void }> = ({ lessonId, close }) => {
    // ... (LessonPlayer code remains the same)
  const { t, language, updateProgress } = useApp();
  const lesson = LESSONS.find(l => l.id === lessonId);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sessionXP, setSessionXP] = useState(0); // XP gained in this session
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Duolingo Practice State
  const [practiceSelectedIndices, setPracticeSelectedIndices] = useState<number[]>([]);
  const [practiceBank, setPracticeBank] = useState<{word: string, originalIndex: number}[]>([]);
  const [practiceCheckStatus, setPracticeCheckStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => { 
    setSelectedOption(null); 
    setShowFeedback(false); 
    
    // Init practice mode if needed
    if (lesson && lesson.steps[currentStepIndex].type === 'language_practice' && lesson.steps[currentStepIndex].practice) {
        setPracticeSelectedIndices([]);
        setPracticeCheckStatus('idle');
        const words = lesson.steps[currentStepIndex].practice!.wordBank;
        // Create bank items with original indices to handle duplicates if needed (though simple strings here)
        // Shuffle
        const bankItems = words.map((w, i) => ({ word: w, originalIndex: i }));
        // Simple shuffle
        setPracticeBank(bankItems.sort(() => Math.random() - 0.5));
    }

  }, [currentStepIndex, quizIndex, lesson]);

  if (!lesson) return null;

  const currentStep = lesson.steps[currentStepIndex];

  const nextStep = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setQuizMode(true);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    if (optionIndex === lesson.quiz[quizIndex].correctIndex) {
        setScore(s => s + 1);
        setSessionXP(xp => xp + 10); // 10 XP per correct answer
        playSound('correct');
    } else {
        playSound('wrong');
    }
  };

  const handleNextQuestion = () => {
     if (quizIndex < lesson.quiz.length - 1) {
         setQuizIndex(prev => prev + 1);
     } else {
         // Finished quiz
         const totalXP = sessionXP + 50; // 50 XP bonus for completing
         updateProgress(lessonId, score, totalXP);
     }
  };

  // Practice Handlers
  const handleAddToSentence = (item: {word: string, originalIndex: number}) => {
      if (practiceCheckStatus === 'correct') return;
      setPracticeSelectedIndices(prev => [...prev, item.originalIndex]);
      setPracticeCheckStatus('idle'); // Reset error state on change
  };

  const handleRemoveFromSentence = (originalIndex: number) => {
      if (practiceCheckStatus === 'correct') return;
      setPracticeSelectedIndices(prev => prev.filter(i => i !== originalIndex));
      setPracticeCheckStatus('idle');
  };

  const checkPracticeAnswer = () => {
      if (!currentStep.practice) return;
      const constructedSentence = practiceSelectedIndices
          .map(idx => currentStep.practice!.wordBank[idx])
          .join(' ');
      
      if (constructedSentence === currentStep.practice.correctSentence) {
          setPracticeCheckStatus('correct');
          playSound('correct');
          setSessionXP(prev => prev + 15); // More XP for translation
      } else {
          setPracticeCheckStatus('wrong');
          playSound('wrong');
      }
  };

  if (quizMode && quizIndex >= lesson.quiz.length) {
     return (
         <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center text-black">
             <div className="w-32 h-32 bg-white border-2 border-black rounded-full flex items-center justify-center mb-6 shadow-neobrutalism">
                 <Trophy className="w-16 h-16" />
             </div>
             <h2 className="text-4xl font-extrabold mb-2">{t('congrats')}</h2>
             <p className="text-xl text-gray-500 mb-2 font-medium">{t('score')}: {score} / {lesson.quiz.length}</p>
             <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-500 mb-10">
                 <Zap className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                 <span className="font-black text-yellow-800">+{sessionXP + 50} XP Earned</span>
             </div>
             <Button onClick={close} variant="black" className="max-w-xs mx-auto">{t('finish')}</Button>
         </div>
     )
  }

  // Quiz Interface
  if (quizMode) {
      const q = lesson.quiz[quizIndex];
      const isCorrect = selectedOption === q.correctIndex;
      return (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 overflow-y-auto text-black">
              <div className="flex justify-between items-center mb-10">
                  <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">Question {quizIndex + 1}/{lesson.quiz.length}</span>
                  <button onClick={close} className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                  </button>
              </div>
              <h2 className="text-2xl font-bold mb-8 leading-relaxed">{q.question[language]}</h2>
              <div className="space-y-4 mb-8">
                  {q.options.map((opt, idx) => {
                      let btnClass = "bg-white border-black hover:bg-gray-50";
                      let icon = null;
                      if (showFeedback) {
                          if (idx === q.correctIndex) { btnClass = "bg-green-100 border-green-600 font-bold"; icon = <Check className="w-5 h-5" />; }
                          else if (idx === selectedOption) { btnClass = "bg-red-100 border-red-600 font-bold"; icon = <X className="w-5 h-5" />; }
                          else { btnClass = "opacity-50 border-gray-300"; }
                      }
                      return (
                        <button key={idx} onClick={() => handleOptionSelect(idx)} disabled={showFeedback}
                            className={`w-full p-5 text-left border-2 rounded-2xl transition-all flex justify-between items-center ${btnClass}`}>
                            <span>{opt[language]}</span>
                            {icon && <span className="text-xl font-bold">{icon}</span>}
                        </button>
                      );
                  })}
              </div>
              {showFeedback && (
                  <Card className={`p-6 mb-6 ${isCorrect ? 'bg-green-50 border-green-600 text-green-800' : 'bg-red-50 border-red-600 text-red-800'}`}>
                      <p className="font-medium flex items-start gap-2">
                          {isCorrect ? <CheckCircle className="w-5 h-5 shrink-0 mt-1" /> : <X className="w-5 h-5 shrink-0 mt-1" />}
                          {q.explanation?.[language]}
                      </p>
                  </Card>
              )}
              {showFeedback && (
                  <Button onClick={handleNextQuestion} variant="black">
                      {quizIndex < lesson.quiz.length - 1 ? t('next_question') : t('finish_quiz')}
                  </Button>
              )}
          </div>
      )
  }

  // Simulation Wrapper
  if (currentStep.type === 'simulation' && currentStep.simulationType) {
      return (
          <div className="fixed inset-0 bg-background z-50 flex flex-col">
               <div className="p-4 flex justify-between items-center bg-white border-b-2 border-black">
                   <span className="font-bold text-black px-2">{currentStep.title[language]}</span>
                   <button onClick={close} className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">Exit</button>
               </div>
               <div className="flex-1 overflow-hidden bg-white relative">
                   <SimulationView type={currentStep.simulationType} onComplete={nextStep} />
               </div>
          </div>
      )
  }

  // Language Practice (Duolingo Style)
  if (currentStep.type === 'language_practice' && currentStep.practice) {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col text-black">
           <div className="h-2 bg-gray-100">
               <div className="h-full bg-green-500 transition-all duration-300 ease-out" style={{ width: `${((currentStepIndex + 1) / lesson.steps.length) * 100}%` }} />
           </div>
           
           <div className="p-4 flex justify-between items-center">
               <span className="font-bold text-gray-400 text-sm uppercase">Practice</span>
               <button onClick={close} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
                   <X className="w-6 h-6 text-gray-400" />
               </button>
           </div>

           <div className="flex-1 flex flex-col px-6 max-w-lg mx-auto w-full">
               <h2 className="text-2xl font-bold mb-6">{t('translate_sentence')}</h2>
               
               {/* Source Sentence Bubble */}
               <div className="flex items-start gap-3 mb-8">
                   <div className="w-24 h-24 relative shrink-0">
                        {/* Placeholder for Character */}
                        <div className="w-full h-full bg-purple-100 rounded-2xl border-2 border-purple-300 flex items-center justify-center">
                             <UserIcon className="w-12 h-12 text-purple-400" />
                        </div>
                   </div>
                   <div className="bg-white border-2 border-gray-200 p-4 rounded-2xl rounded-tl-none mt-4 shadow-sm relative">
                        {/* Little triangle */}
                        <div className="absolute top-0 -left-2 w-4 h-4 bg-white border-l-2 border-b-2 border-gray-200 transform rotate-45"></div>
                        <p className="text-lg font-medium">{currentStep.practice.sourceText[language]}</p>
                   </div>
               </div>

               {/* Target Sentence Area */}
               <div className="min-h-[140px] border-t-2 border-b-2 border-gray-100 py-6 mb-4 flex flex-wrap gap-2 content-start">
                   {practiceSelectedIndices.map((idx, i) => {
                       const word = currentStep.practice!.wordBank[idx];
                       return (
                           <button 
                               key={`${idx}-${i}`} 
                               onClick={() => handleRemoveFromSentence(idx)}
                               className="px-4 py-2 bg-white border-2 border-gray-300 rounded-xl shadow-[0_2px_0_0_rgba(209,213,219,1)] text-lg font-medium active:translate-y-[2px] active:shadow-none hover:bg-gray-50"
                           >
                               {word}
                           </button>
                       );
                   })}
               </div>

               {/* Word Bank */}
               <div className="flex flex-wrap gap-2 justify-center">
                   {practiceBank.map((item, i) => {
                       const isSelected = practiceSelectedIndices.includes(item.originalIndex);
                       if (isSelected) {
                           return (
                               <div key={i} className="px-4 py-2 bg-gray-200 rounded-xl text-lg font-medium text-transparent select-none h-[46px] w-[60px] opacity-50">
                                   {item.word}
                               </div>
                           )
                       }
                       return (
                           <button 
                               key={i}
                               onClick={() => handleAddToSentence(item)}
                               className="px-4 py-2 bg-white border-2 border-gray-300 rounded-xl shadow-[0_2px_0_0_rgba(209,213,219,1)] text-lg font-medium active:translate-y-[2px] active:shadow-none hover:bg-gray-50"
                           >
                               {item.word}
                           </button>
                       );
                   })}
               </div>
           </div>

           {/* Footer Action */}
           <div className={`p-6 border-t-2 ${practiceCheckStatus === 'correct' ? 'bg-[#d7ffb8] border-transparent' : (practiceCheckStatus === 'wrong' ? 'bg-[#ffdfe0] border-transparent' : 'bg-white border-gray-200')}`}>
               <div className="max-w-lg mx-auto w-full">
                    {practiceCheckStatus === 'correct' && (
                        <div className="mb-4 flex items-center gap-2 text-green-700 font-bold text-xl animate-bounce">
                            <CheckCircle className="w-8 h-8" /> {t('correct_msg')}
                        </div>
                    )}
                    {practiceCheckStatus === 'wrong' && (
                        <div className="mb-4 text-red-700">
                             <div className="font-bold text-xl flex items-center gap-2 mb-1"><X className="w-6 h-6" /> Incorrect</div>
                             <div className="text-sm font-medium ml-8">{t('wrong_msg')} {currentStep.practice.correctSentence}</div>
                        </div>
                    )}

                    {practiceCheckStatus === 'idle' ? (
                        <Button 
                            onClick={checkPracticeAnswer} 
                            variant="black" 
                            className="bg-[#58cc02] border-[#58cc02] shadow-[0_4px_0_0_#46a302] hover:bg-[#46a302] active:shadow-none active:translate-y-[4px]"
                            disabled={practiceSelectedIndices.length === 0}
                        >
                            {t('check')}
                        </Button>
                    ) : (
                        <Button 
                            onClick={nextStep} 
                            variant={practiceCheckStatus === 'correct' ? 'black' : 'black'}
                            className={`${practiceCheckStatus === 'correct' ? 'bg-[#58cc02] border-[#58cc02] shadow-[0_4px_0_0_#46a302]' : 'bg-[#ff4b4b] border-[#ff4b4b] shadow-[0_4px_0_0_#ea2b2b]'} text-white active:shadow-none active:translate-y-[4px]`}
                        >
                            {t('continue')}
                        </Button>
                    )}
               </div>
           </div>
        </div>
      );
  }

  const currentVideoUrl = currentStep.video ? (typeof currentStep.video === 'string' ? currentStep.video : currentStep.video[language]) : undefined;
  const youtubeId = currentVideoUrl ? getYoutubeId(currentVideoUrl) : null;
  const thumbnailUrl = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null;

  // Info Slide
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col text-black">
      <div className="h-2 bg-gray-100">
        <div className="h-full bg-black transition-all duration-300 ease-out" style={{ width: `${((currentStepIndex + 1) / lesson.steps.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="flex justify-between items-start mb-8">
            <h2 className="text-3xl font-extrabold">{currentStep.title[language]}</h2>
            <button onClick={close} className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <X className="w-5 h-5" />
            </button>
        </div>
        
        {currentVideoUrl ? (
          <Card className="w-full aspect-video bg-gray-100 overflow-hidden relative group p-0">
             {youtubeId ? (
                 <a 
                   href={currentVideoUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full h-full relative flex items-center justify-center group"
                 >
                   <img 
                     src={thumbnailUrl || ''} 
                     alt="Video thumbnail" 
                     className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform border-2 border-white">
                          <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                          </svg>
                      </div>
                   </div>
                 </a>
             ) : (
               <video 
                 src={currentVideoUrl} 
                 controls 
                 className="w-full h-full object-cover" 
                 poster={currentStep.image}
               />
             )}
          </Card>
        ) : currentStep.image ? (
          <Card className="w-full aspect-video bg-gray-100 overflow-hidden p-0">
            <img src={currentStep.image} alt="Instruction" className="w-full h-full object-cover opacity-90" />
          </Card>
        ) : null}

        <p className="text-xl text-gray-800 leading-relaxed font-medium">
          {currentStep.description[language]}
        </p>
      </div>

      <div className="p-6 pb-10 bg-white border-t-2 border-black">
        <div className="flex gap-4">
            {currentStepIndex > 0 && (
                <Button variant="outline" onClick={() => setCurrentStepIndex(prev => prev - 1)} className="flex-1">
                    {t('back')}
                </Button>
            )}
            <Button onClick={nextStep} variant="black" className="flex-1">
                {currentStepIndex === lesson.steps.length - 1 ? t('quiz') : t('next')}
            </Button>
        </div>
      </div>
    </div>
  );
};

// 6. Admin Dashboard (kept largely same but styled)
const AdminDashboard: React.FC<{ goBack: () => void }> = ({ goBack }) => {
    const users = getAllUsersMock();
    const totalUsers = users.length;
    const completedLessons = users.reduce((acc, u) => acc + u.completedLessons.length, 0);

    const chartData = [
        { name: 'L1', completed: users.filter(u => u.completedLessons.includes('l1_smartphone')).length },
        { name: 'L2', completed: users.filter(u => u.completedLessons.includes('l2_payments_intro')).length },
        { name: 'L3', completed: users.filter(u => u.completedLessons.includes('l3_upi_sim')).length },
    ];

    return (
        <div className="min-h-screen bg-white p-6 text-black pb-20">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={goBack} className="p-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold">Admin Console</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="p-6">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Users</p>
                    <p className="text-4xl font-extrabold mt-2">{totalUsers}</p>
                </Card>
                <Card className="p-6">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Engagements</p>
                    <p className="text-4xl font-extrabold mt-2">{completedLessons}</p>
                </Card>
            </div>
            
            <Card className="overflow-hidden mb-8 p-0">
                <h3 className="font-bold p-6 border-b-2 border-black bg-gray-50">User Directory</h3>
                <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white text-gray-500 border-b-2 border-black">
                        <tr>
                            <th className="p-4 font-normal">Name</th>
                            <th className="p-4 font-normal">Phone</th>
                            <th className="p-4 font-normal">Lang</th>
                            <th className="p-4 font-normal">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map(u => (
                            <tr key={u.id}>
                                <td className="p-4 font-medium">{u.name}</td>
                                <td className="p-4 text-gray-500">{u.phone}</td>
                                <td className="p-4 uppercase text-gray-500">{u.language}</td>
                                <td className="p-4 font-bold">{u.completedLessons.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </Card>
        </div>
    )
}

// --- Main App Logic ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [languageSelected, setLanguageSelected] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<string>('home'); 

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setLanguage(storedUser.language);
      setLanguageSelected(true);
      return;
    }
    const storedLang = localStorage.getItem('rani_language') as Language;
    if (storedLang) {
      setLanguage(storedLang);
      setLanguageSelected(true);
    }
  }, []);

  const t = (key: string) => TRANSLATIONS[language][key] || key;

  const updateProgress = (lessonId: string, finalScore?: number, xpGained?: number) => {
      if (!user) return;
      const updatedUser = { ...user };
      if (!updatedUser.completedLessons.includes(lessonId)) updatedUser.completedLessons.push(lessonId);
      if (finalScore !== undefined) updatedUser.quizScores[lessonId] = finalScore;
      
      // Update XP
      if (xpGained) {
          updatedUser.xp = (updatedUser.xp || 0) + xpGained;
      }
      
      setUser(updatedUser);
      saveProgress(updatedUser);
      // Stay on route if it's english path, else go home
      if (lessonId.startsWith('e_')) {
          setCurrentRoute('english-path');
      } else {
          setCurrentRoute('home');
      }
  };

  const logoutUser = () => { setUser(null); setLanguageSelected(false); logout(); }

  const contextValue = { user, setUser, language, setLanguage, setLanguageSelected, t, updateProgress, logoutUser };

  let content;
  if (!user) {
      if (!languageSelected) content = <LanguageSelectionPage />;
      else content = <LoginPage />;
  } else if (currentRoute === 'home') content = <Dashboard setRoute={setCurrentRoute} />;
  else if (currentRoute === 'admin') content = <AdminDashboard goBack={() => setCurrentRoute('home')} />;
  else if (currentRoute === 'english-path') content = <EnglishPathway setRoute={setCurrentRoute} />;
  else if (currentRoute.startsWith('lesson/')) {
      const lessonId = currentRoute.split('/')[1];
      const isEnglishLesson = lessonId.startsWith('e_');
      content = <LessonPlayer lessonId={lessonId} close={() => isEnglishLesson ? setCurrentRoute('english-path') : setCurrentRoute('home')} />;
  }

  return (
    <AppContext.Provider value={contextValue}>
      {/* Desktop Container Wrapper */}
      <div className="font-sans text-black w-full max-w-md mx-auto bg-white min-h-screen shadow-2xl relative border-x border-black">
         {content}
      </div>
    </AppContext.Provider>
  );
};

export default App;
