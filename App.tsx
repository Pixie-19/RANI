
import React, { useState, useEffect, useContext, createContext } from 'react';
import { User, Language, Lesson } from './types';
import { getCurrentUser, login, logout, saveProgress, getAllUsersMock } from './services/authService';
import { TRANSLATIONS, LESSONS } from './constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { 
    Smartphone, IndianRupee, ScanLine, Wallet, Zap, Landmark, BookOpen, 
    Trophy, CreditCard, Settings, Home, User as UserIcon, Crown, ChevronLeft, 
    Search, Check, X, ArrowRight, Menu, LogOut, CheckCircle, GraduationCap,
    Grid, Banknote, QrCode
} from 'lucide-react';

// --- Context ---
interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  setLanguageSelected: (s: boolean) => void;
  t: (key: string) => string;
  updateProgress: (lessonId: string, score?: number) => void;
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
const CubeGraphic = () => (
  <div className="relative w-48 h-48 mx-auto mb-8">
     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-black rotate-45 border-2 border-white z-20 rounded-xl flex items-center justify-center">
         <Smartphone className="text-white w-10 h-10 -rotate-45" />
     </div>
     <div className="absolute top-12 left-8 w-24 h-24 bg-white border-2 border-black rotate-45 z-10 rounded-xl"></div>
     <div className="absolute top-12 right-8 w-24 h-24 bg-white border-2 border-black rotate-45 z-10 rounded-xl"></div>
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
          <CubeGraphic />
          
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

          <Button onClick={() => {}} variant="ghost" className="text-xs mt-4">
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

    const chartData = [
        { name: 'W1', score: 10 },
        { name: 'W2', score: 25 },
        { name: 'W3', score: 15 },
        { name: 'W4', score: 30 },
    ];

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

            {/* Tabs */}
            <div className="flex gap-2 p-1 border-2 border-black rounded-full mb-6">
                {['Weekly', 'Monthly', 'Yearly'].map((tab, idx) => (
                    <button key={tab} className={`flex-1 py-2 rounded-full text-xs font-bold transition-colors ${idx === 1 ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Chart Card */}
            <Card className="p-6 h-64 relative">
                <div className="absolute top-4 right-4 bg-white border-2 border-black px-2 py-1 rounded-lg text-xs font-bold shadow-neobrutalism-sm">
                    + {totalScore} pts
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#000000" fontSize={10} tickLine={false} axisLine={false} />
                         <Bar dataKey="score" fill="#ffffff" stroke="#000000" strokeWidth={2} radius={[4, 4, 4, 4]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* Stats Grid - mimicking transaction list style */}
            <div className="space-y-4">
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

// 3. Dashboard (Home)
const Dashboard: React.FC<{ setRoute: (r: string) => void }> = ({ setRoute }) => {
  const { user, t, language } = useApp();
  const [tab, setTab] = useState<'home' | 'profile'>('home');

  const nextLessonIndex = LESSONS.findIndex(l => !user?.completedLessons.includes(l.id));
  const activeLesson = nextLessonIndex !== -1 ? LESSONS[nextLessonIndex] : LESSONS[0];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="p-6 pb-2 sticky top-0 bg-white/90 backdrop-blur z-10 flex justify-between items-center">
         <div>
             <p className="text-sm font-medium text-gray-500">Welcome,</p>
             <h1 className="text-xl font-bold">{user?.name}</h1>
         </div>
         <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold border-2 border-black shadow-neobrutalism-sm">
            {user?.name.charAt(0)}
         </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-32 space-y-8 mt-4">
      {tab === 'profile' ? (
          <ProfileView />
      ) : (
          <>
            {/* Hero Card */}
            <Card className="relative w-full aspect-[1.6] p-6 flex flex-col justify-between overflow-hidden">
                {/* Decorative Pattern lines */}
                <div className="absolute -right-10 -top-10 w-40 h-40 border-2 border-black rounded-full opacity-20"></div>
                <div className="absolute right-10 bottom-[-20px] w-20 h-20 border-2 border-black rounded-full opacity-20"></div>

                <div className="flex justify-between items-start z-10">
                    <div className="w-12 h-8 border-2 border-black rounded-md flex items-center justify-center bg-gray-100">
                        <div className="w-8 h-4 border border-gray-400 rounded-sm"></div>
                    </div>
                    <span className="font-bold text-lg italic tracking-tighter">RANI</span>
                </div>

                <div className="z-10">
                    <p className="text-sm font-medium text-gray-500 mb-1">Up Next</p>
                    <h2 className="text-2xl font-bold leading-tight">{activeLesson.title[language]}</h2>
                    <div className="flex gap-2 mt-2">
                         {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 bg-black rounded-full"></div>)}
                    </div>
                </div>

                <div className="flex justify-between items-end z-10">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-500">Student</p>
                        <p className="font-bold">{user?.name}</p>
                    </div>
                    <button 
                         onClick={() => setRoute(`lesson/${activeLesson.id}`)}
                         className="bg-black text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                    >
                        Start
                    </button>
                </div>
            </Card>

            {/* Action Grid */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { icon: BookOpen, label: 'Lessons', route: '' },
                    { icon: Trophy, label: 'Quiz', route: '' },
                    { icon: CreditCard, label: 'Sim', route: '' },
                    { icon: Settings, label: 'More', route: '' }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group">
                        <button className="w-14 h-14 bg-white border-2 border-black rounded-2xl flex items-center justify-center text-xl shadow-neobrutalism-sm group-hover:shadow-neobrutalism transition-all group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-none">
                            <item.icon className="w-6 h-6" />
                        </button>
                        <span className="text-xs font-bold text-gray-600">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Lessons Grid */}
            <div>
                <h3 className="text-lg font-bold mb-4">Your Lessons</h3>
                <div className="grid grid-cols-2 gap-4">
                    {LESSONS.map((lesson, index) => {
                        const isCompleted = user?.completedLessons.includes(lesson.id);
                        return (
                            <Card 
                                key={lesson.id}
                                onClick={() => setRoute(`lesson/${lesson.id}`)}
                                className={`
                                    p-5 aspect-square flex flex-col justify-between cursor-pointer relative bg-white group
                                    ${isCompleted ? 'bg-gray-50' : ''}
                                `}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                        <Icon name={lesson.icon} className="w-5 h-5" />
                                    </div>
                                    {isCompleted && (
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

// 4. Simulations 
// Keeping simulations mostly as is but wrapping in the new aesthetic container
const SimulationView: React.FC<{ type: string; onComplete: () => void }> = ({ type, onComplete }) => {
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

// 5. Lesson Player
const LessonPlayer: React.FC<{ lessonId: string; close: () => void }> = ({ lessonId, close }) => {
  const { t, language, updateProgress } = useApp();
  const lesson = LESSONS.find(l => l.id === lessonId);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => { 
    setSelectedOption(null); 
    setShowFeedback(false); 
  }, [currentStepIndex, quizIndex]);

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
    if (optionIndex === lesson.quiz[quizIndex].correctIndex) setScore(s => s + 1);
  };

  const handleNextQuestion = () => {
     if (quizIndex < lesson.quiz.length - 1) setQuizIndex(prev => prev + 1);
     else updateProgress(lessonId, score);
  };

  if (quizMode && quizIndex >= lesson.quiz.length) {
     return (
         <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center text-black">
             <div className="w-32 h-32 bg-white border-2 border-black rounded-full flex items-center justify-center mb-6 shadow-neobrutalism">
                 <Trophy className="w-16 h-16" />
             </div>
             <h2 className="text-4xl font-extrabold mb-2">{t('congrats')}</h2>
             <p className="text-xl text-gray-500 mb-10 font-medium">{t('score')}: {score} / {lesson.quiz.length}</p>
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

  const updateProgress = (lessonId: string, finalScore?: number) => {
      if (!user) return;
      const updatedUser = { ...user };
      if (!updatedUser.completedLessons.includes(lessonId)) updatedUser.completedLessons.push(lessonId);
      if (finalScore !== undefined) updatedUser.quizScores[lessonId] = finalScore;
      setUser(updatedUser);
      saveProgress(updatedUser);
      setCurrentRoute('home');
  };

  const logoutUser = () => { setUser(null); setLanguageSelected(false); logout(); }

  const contextValue = { user, setUser, language, setLanguage, setLanguageSelected, t, updateProgress, logoutUser };

  let content;
  if (!user) {
      if (!languageSelected) content = <LanguageSelectionPage />;
      else content = <LoginPage />;
  } else if (currentRoute === 'home') content = <Dashboard setRoute={setCurrentRoute} />;
  else if (currentRoute === 'admin') content = <AdminDashboard goBack={() => setCurrentRoute('home')} />;
  else if (currentRoute.startsWith('lesson/')) {
      const lessonId = currentRoute.split('/')[1];
      content = <LessonPlayer lessonId={lessonId} close={() => setCurrentRoute('home')} />;
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
