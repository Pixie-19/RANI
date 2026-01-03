
import { Lesson, Language } from './types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    welcome: "Welcome to Rani",
    login_subtitle: "Learn digital skills easily",
    phone_placeholder: "Enter Mobile Number",
    login_btn: "Start Learning",
    admin_link: "Admin",
    my_progress: "My Progress",
    start_lesson: "Start Lesson",
    next: "Next",
    back: "Back",
    finish: "Finish",
    quiz: "Quiz",
    submit: "Submit",
    score: "Your Score",
    congrats: "Congratulations!",
    retry: "Try Again",
    lesson_completed: "Lesson Completed!",
    scan_qr: "Scan QR Code",
    enter_amount: "Enter Amount",
    pay: "Pay",
    pin_enter: "Enter UPI PIN",
    success: "Payment Successful!",
    check_balance: "Check Balance",
    find_center: "Find CSC Center",
    choose_language: "Choose Language",
    continue: "Continue",
    use_pin: "Use Demo PIN",
    incorrect_pin: "Incorrect PIN. Try 1234",
    correct_ans: "Correct!",
    wrong_ans: "Incorrect",
    next_question: "Next Question",
    finish_quiz: "Finish Quiz",
    nav_lessons: "Lessons",
    nav_sim: "Sim",
    nav_more: "More",
    translate_sentence: "Translate this sentence",
    check: "Check",
    correct_msg: "Excellent!",
    wrong_msg: "Correct solution:",
    english_course: "English Course",
    english_desc: "Learn from scratch",
    start_path: "Start Path",
    unit: "Unit",
    locked: "Locked"
  },
  hi: {
    welcome: "रानी में आपका स्वागत है",
    login_subtitle: "आसानी से डिजिटल कौशल सीखें",
    phone_placeholder: "मोबाइल नंबर दर्ज करें",
    login_btn: "सीखना शुरू करें",
    admin_link: "व्यवस्थापक",
    my_progress: "मेरी प्रगति",
    start_lesson: "पाठ शुरू करें",
    next: "अगला",
    back: "पीछे",
    finish: "समाप्त",
    quiz: "प्रश्नोत्तरी",
    submit: "जमा करें",
    score: "आपका स्कोर",
    congrats: "बधाई हो!",
    retry: "पुनः प्रयास करें",
    lesson_completed: "पाठ पूरा हुआ!",
    scan_qr: "QR कोड स्कैन करें",
    enter_amount: "राशि दर्ज करें",
    pay: "भुगतान करें",
    pin_enter: "UPI पिन दर्ज करें",
    success: "भुगतान सफल!",
    check_balance: "बैलेंस चेक करें",
    find_center: "CSC केंद्र खोजें",
    choose_language: "भाषा चुनें",
    continue: "आगे बढ़ें",
    use_pin: "डेमो पिन का प्रयोग करें",
    incorrect_pin: "गलत पिन। 1234 का प्रयास करें",
    correct_ans: "सही!",
    wrong_ans: "गलत",
    next_question: "अगला प्रश्न",
    finish_quiz: "क्विज़ समाप्त करें",
    nav_lessons: "पाठ",
    nav_sim: "सिम",
    nav_more: "अधिक",
    translate_sentence: "इस वाक्य का अनुवाद करें",
    check: "जाँच करें",
    correct_msg: "बहुत बढ़िया!",
    wrong_msg: "सही उत्तर:",
    english_course: "अंग्रेजी कोर्स",
    english_desc: "शुरुआत से सीखें",
    start_path: "शुरू करें",
    unit: "इकाई",
    locked: "बंद है"
  },
  bn: {
    welcome: "রানীতে স্বাগতম",
    login_subtitle: "সহজেই ডিজিটাল দক্ষতা শিখুন",
    phone_placeholder: "মোবাইল নম্বর দিন",
    login_btn: "শেখা শুরু করুন",
    admin_link: "অ্যাডমিন",
    my_progress: "আমার অগ্রগতি",
    start_lesson: "पाठ শুরু করুন",
    next: "পরবর্তী",
    back: "পেছনে",
    finish: "সমাপ্ত",
    quiz: "কুইজ",
    submit: "জমা দিন",
    score: "আপনার স্কোর",
    congrats: "অভিনন্দন!",
    retry: "আবার চেষ্টা করুন",
    lesson_completed: "पाठ সম্পন্ন হয়েছে!",
    scan_qr: "QR কোড স্ক্যান করুন",
    enter_amount: "টাকার পরিমাণ লিখুন",
    pay: "পেমেন্ট করুন",
    pin_enter: "UPI পিন দিন",
    success: "পেমেন্ট সফল হয়েছে!",
    check_balance: "ব্যালেন্স চেক করুন",
    find_center: "CSC কেন্দ্র খুঁজুন",
    choose_language: "भाषा নির্বাচন করুন",
    continue: "চালিয়ে যান",
    use_pin: "ডেমো পিন ব্যবহার করুন",
    incorrect_pin: "ভুল পিন। 1234 চেষ্টা করুন",
    correct_ans: "সঠিক!",
    wrong_ans: "ভুল",
    next_question: "পরবর্তী প্রশ্ন",
    finish_quiz: "কুইজ শেষ করুন",
    nav_lessons: "पाठ",
    nav_sim: "সিম",
    nav_more: "আরও",
    translate_sentence: "এই বাক্যটি অনুবাদ করুন",
    check: "যাচাই করুন",
    correct_msg: "চমৎকার!",
    wrong_msg: "সঠিক উত্তর:",
    english_course: "ইংরেজি কোর্স",
    english_desc: "শুরু থেকে শিখুন",
    start_path: "শুরু করুন",
    unit: "ইউনিট",
    locked: "বন্ধ"
  }
};

export const LESSONS: Lesson[] = [
  // --- ENGLISH PATHWAY LESSONS ---
  // Unit 1: A-E
  {
      id: "e_unit1_a_e",
      title: { en: "Alphabets A-E", hi: "वर्णमाला A-E", bn: "বর্ণমালা A-E" },
      description: { en: "Letters A, B, C, D, E", hi: "अक्षर A, B, C, D, E", bn: "অক্ষর A, B, C, D, E" },
      icon: "graduation-cap",
      steps: [
          { id: "s_a", type: "info", title: {en:"A is for Apple", hi:"A से Apple", bn:"A তে Apple"}, description: {en:"Apple", hi:"सेब", bn:"আপেল"}, image: "https://loremflickr.com/400/300/apple" },
          { id: "s_b", type: "info", title: {en:"B is for Ball", hi:"B से Ball", bn:"B তে Ball"}, description: {en:"Ball", hi:"गेंद", bn:"বল"}, image: "https://loremflickr.com/400/300/ball" },
          { id: "s_c", type: "info", title: {en:"C is for Cat", hi:"C से Cat", bn:"C তে Cat"}, description: {en:"Cat", hi:"बिल्ली", bn:"বিড়াল"}, image: "https://loremflickr.com/400/300/cat" },
          { id: "s_d", type: "info", title: {en:"D is for Dog", hi:"D से Dog", bn:"D তে Dog"}, description: {en:"Dog", hi:"कुत्ता", bn:"কুকুর"}, image: "https://loremflickr.com/400/300/dog" },
          { id: "s_e", type: "info", title: {en:"E is for Elephant", hi:"E से Elephant", bn:"E তে Elephant"}, description: {en:"Elephant", hi:"हाथी", bn:"হাতি"}, image: "https://loremflickr.com/400/300/elephant" },
          { id: "p_1", type: "language_practice", title: {en:"Practice", hi:"अभ्यास", bn:"অনুশীলন"}, description: {en:"Select 'Apple'", hi:"'Apple' चुनें", bn:"'Apple' নির্বাচন করুন"}, practice: { sourceText: {en:"Apple", hi:"सेब", bn:"আপেল"}, correctSentence: "Apple", wordBank: ["Apple", "Dog", "Cat"] } }
      ],
      quiz: [
          { id: "q1", question: {en:"What comes after A?", hi:"A के बाद क्या आता है?", bn:"A এর পরে কি আসে?"}, options: [{en:"B", hi:"B", bn:"B"}, {en:"D", hi:"D", bn:"D"}], correctIndex: 0, explanation: {en:"B comes after A.", hi:"A के बाद B आता है।", bn:"A এর পরে B আসে।"} }
      ]
  },
  // Unit 2: F-J
  {
      id: "e_unit2_f_j",
      title: { en: "Alphabets F-J", hi: "वर्णमाला F-J", bn: "বর্ণমালা F-J" },
      description: { en: "Letters F, G, H, I, J", hi: "अक्षर F, G, H, I, J", bn: "অক্ষর F, G, H, I, J" },
      icon: "graduation-cap",
      steps: [
          { id: "s_f", type: "info", title: {en:"F is for Fish", hi:"F से Fish", bn:"F তে Fish"}, description: {en:"Fish", hi:"मछली", bn:"মাছ"}, image: "https://loremflickr.com/400/300/fish" },
          { id: "s_g", type: "info", title: {en:"G is for Goat", hi:"G से Goat", bn:"G তে Goat"}, description: {en:"Goat", hi:"बकरी", bn:"ছাগল"}, image: "https://loremflickr.com/400/300/goat" },
          { id: "s_h", type: "info", title: {en:"H is for Hat", hi:"H से Hat", bn:"H তে Hat"}, description: {en:"Hat", hi:"टोपी", bn:"টুপি"}, image: "https://loremflickr.com/400/300/hat" },
          { id: "s_i", type: "info", title: {en:"I is for Ice Cream", hi:"I से Ice Cream", bn:"I তে Ice Cream"}, description: {en:"Ice Cream", hi:"आइसक्रीम", bn:"আইসক্রিম"}, image: "https://loremflickr.com/400/300/icecream" },
          { id: "s_j", type: "info", title: {en:"J is for Jug", hi:"J से Jug", bn:"J তে Jug"}, description: {en:"Jug", hi:"जग", bn:"জগ"}, image: "https://loremflickr.com/400/300/jug" },
      ],
      quiz: [
          { id: "q1", question: {en:"F is for...", hi:"F से...", bn:"F তে..."}, options: [{en:"Fish", hi:"Fish", bn:"Fish"}, {en:"Apple", hi:"Apple", bn:"Apple"}], correctIndex: 0, explanation: {en:"F is for Fish.", hi:"F से Fish होता है।", bn:"F তে Fish হয়।"} }
      ]
  },
  // Unit 3: K-O
  {
      id: "e_unit3_k_o",
      title: { en: "Alphabets K-O", hi: "वर्णमाला K-O", bn: "বর্ণমালা K-O" },
      description: { en: "Letters K, L, M, N, O", hi: "अक्षर K, L, M, N, O", bn: "অক্ষর K, L, M, N, O" },
      icon: "graduation-cap",
      steps: [
          { id: "s_k", type: "info", title: {en:"K is for Kite", hi:"K से Kite", bn:"K তে Kite"}, description: {en:"Kite", hi:"पतंग", bn:"ঘুড়ি"}, image: "https://loremflickr.com/400/300/kite" },
          { id: "s_l", type: "info", title: {en:"L is for Lion", hi:"L से Lion", bn:"L তে Lion"}, description: {en:"Lion", hi:"शेर", bn:"সিংহ"}, image: "https://loremflickr.com/400/300/lion" },
          { id: "s_m", type: "info", title: {en:"M is for Mango", hi:"M से Mango", bn:"M তে Mango"}, description: {en:"Mango", hi:"आम", bn:"আম"}, image: "https://loremflickr.com/400/300/mango" },
          { id: "s_n", type: "info", title: {en:"N is for Nest", hi:"N से Nest", bn:"N তে Nest"}, description: {en:"Nest", hi:"घोंसला", bn:"পাখির বাসা"}, image: "https://loremflickr.com/400/300/nest" },
          { id: "s_o", type: "info", title: {en:"O is for Orange", hi:"O से Orange", bn:"O তে Orange"}, description: {en:"Orange", hi:"संतरा", bn:"কমলা"}, image: "https://loremflickr.com/400/300/orange" },
      ],
      quiz: [
          { id: "q1", question: {en:"M is for...", hi:"M से...", bn:"M তে..."}, options: [{en:"Mango", hi:"Mango", bn:"Mango"}, {en:"Lion", hi:"Lion", bn:"Lion"}], correctIndex: 0, explanation: {en:"M is for Mango.", hi:"M से Mango होता है।", bn:"M তে Mango হয়।"} }
      ]
  },
  // Unit 4: P-T
  {
      id: "e_unit4_p_t",
      title: { en: "Alphabets P-T", hi: "वर्णमाला P-T", bn: "বর্ণমালা P-T" },
      description: { en: "Letters P, Q, R, S, T", hi: "अक्षर P, Q, R, S, T", bn: "অক্ষর P, Q, R, S, T" },
      icon: "graduation-cap",
      steps: [
          { id: "s_p", type: "info", title: {en:"P is for Pen", hi:"P से Pen", bn:"P তে Pen"}, description: {en:"Pen", hi:"कलम", bn:"কলম"}, image: "https://loremflickr.com/400/300/pen" },
          { id: "s_q", type: "info", title: {en:"Q is for Queen", hi:"Q से Queen", bn:"Q তে Queen"}, description: {en:"Queen", hi:"रानी", bn:"রানী"}, image: "https://loremflickr.com/400/300/queen" },
          { id: "s_r", type: "info", title: {en:"R is for Rose", hi:"R से Rose", bn:"R তে Rose"}, description: {en:"Rose", hi:"गुलाब", bn:"গোলাপ"}, image: "https://loremflickr.com/400/300/rose" },
          { id: "s_s", type: "info", title: {en:"S is for Sun", hi:"S से Sun", bn:"S তে Sun"}, description: {en:"Sun", hi:"सूरज", bn:"সূর্য"}, image: "https://loremflickr.com/400/300/sun" },
          { id: "s_t", type: "info", title: {en:"T is for Tree", hi:"T से Tree", bn:"T তে Tree"}, description: {en:"Tree", hi:"पेड़", bn:"গাছ"}, image: "https://loremflickr.com/400/300/tree" },
      ],
      quiz: [
          { id: "q1", question: {en:"S is for...", hi:"S से...", bn:"S তে..."}, options: [{en:"Sun", hi:"Sun", bn:"Sun"}, {en:"Tree", hi:"Tree", bn:"Tree"}], correctIndex: 0, explanation: {en:"S is for Sun.", hi:"S से Sun होता है।", bn:"S তে Sun হয়।"} }
      ]
  },
   // Unit 5: U-Z
  {
      id: "e_unit5_u_z",
      title: { en: "Alphabets U-Z", hi: "वर्णमाला U-Z", bn: "বর্ণমালা U-Z" },
      description: { en: "Letters U, V, W, X, Y, Z", hi: "अक्षर U, V, W, X, Y, Z", bn: "অক্ষর U, V, W, X, Y, Z" },
      icon: "graduation-cap",
      steps: [
          { id: "s_u", type: "info", title: {en:"U is for Umbrella", hi:"U से Umbrella", bn:"U তে Umbrella"}, description: {en:"Umbrella", hi:"छाता", bn:"ছাতা"}, image: "https://loremflickr.com/400/300/umbrella" },
          { id: "s_v", type: "info", title: {en:"V is for Van", hi:"V से Van", bn:"V তে Van"}, description: {en:"Van", hi:"वैन", bn:"ভ্যান"}, image: "https://loremflickr.com/400/300/van" },
          { id: "s_w", type: "info", title: {en:"W is for Watch", hi:"W से Watch", bn:"W তে Watch"}, description: {en:"Watch", hi:"घड़ी", bn:"ঘড়ি"}, image: "https://loremflickr.com/400/300/watch" },
          { id: "s_x", type: "info", title: {en:"X is for X-Ray", hi:"X से X-Ray", bn:"X তে X-Ray"}, description: {en:"X-Ray", hi:"एक्स-रे", bn:"এক্স-রে"}, image: "https://loremflickr.com/400/300/xray" },
          { id: "s_y", type: "info", title: {en:"Y is for Yak", hi:"Y से Yak", bn:"Y তে Yak"}, description: {en:"Yak", hi:"याक", bn:"ইয়াক"}, image: "https://loremflickr.com/400/300/yak" },
          { id: "s_z", type: "info", title: {en:"Z is for Zebra", hi:"Z से Zebra", bn:"Z তে Zebra"}, description: {en:"Zebra", hi:"ज़ेबरा", bn:"জেব্রা"}, image: "https://loremflickr.com/400/300/zebra" },
      ],
      quiz: [
          { id: "q1", question: {en:"Z is for...", hi:"Z से...", bn:"Z তে..."}, options: [{en:"Zebra", hi:"Zebra", bn:"Zebra"}, {en:"Yak", hi:"Yak", bn:"Yak"}], correctIndex: 0, explanation: {en:"Z is for Zebra.", hi:"Z से Zebra होता है।", bn:"Z তে Zebra হয়।"} }
      ]
  },
  {
      id: "e_unit6_greetings",
      title: { en: "Greetings", hi: "नमस्ते कहना", bn: "শুভেচ্ছা" },
      description: { en: "Learn to say Hello", hi: "हेलो बोलना सीखें", bn: "হ্যালো বলা শিখুন" },
      icon: "sun",
      steps: [
          {
              id: "p1",
              type: "language_practice",
              title: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              description: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              practice: {
                  sourceText: { en: "Hello", hi: "नमस्ते", bn: "নমস্কার" },
                  correctSentence: "Hello",
                  wordBank: ["Hello", "Bye", "Good"]
              }
          }
      ],
      quiz: [
          {
            id: "q1",
            question: { en: "What do you say in the morning?", hi: "सुबह आप क्या कहते हैं?", bn: "সকালে আপনি কী বলেন?" },
            options: [
                { en: "Good Morning", hi: "Good Morning", bn: "Good Morning" },
                { en: "Good Night", hi: "Good Night", bn: "Good Night" }
            ],
            correctIndex: 0,
            explanation: { en: "We say Good Morning.", hi: "हम Good Morning कहते हैं।", bn: "আমরা সকালে Good Morning বলি।" }
          }
      ]
  },
  {
      id: "e_unit7_intro",
      title: { en: "Intro", hi: "परिचय", bn: "ভূমিকা" },
      description: { en: "Introduce yourself", hi: "अपना परिचय दें", bn: "নিজের পরিচয় দিন" },
      icon: "user",
      steps: [
          {
              id: "p1",
              type: "language_practice",
              title: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              description: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              practice: {
                  sourceText: { en: "I am Rani", hi: "मैं रानी हूँ", bn: "আমি রানী" },
                  correctSentence: "I am Rani",
                  wordBank: ["I", "am", "Rani", "is", "are"]
              }
          },
          {
              id: "p2",
              type: "language_practice",
              title: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              description: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              practice: {
                  sourceText: { en: "My name is Sita", hi: "मेरा नाम सीता है", bn: "আমার নাম সীতা" },
                  correctSentence: "My name is Sita",
                  wordBank: ["My", "name", "is", "Sita", "Your", "am"]
              }
          }
      ],
      quiz: [
          {
            id: "q1",
            question: { en: "Translate: Mera naam...", hi: "अनुवाद करें: Mera naam...", bn: "অনুবাদ: Mera naam..." },
            options: [
                { en: "My name is...", hi: "My name is...", bn: "My name is..." },
                { en: "I name is...", hi: "I name is...", bn: "I name is..." }
            ],
            correctIndex: 0,
            explanation: { en: "Correct grammar is 'My name is'.", hi: "सही व्याकरण 'My name is' है।", bn: "সঠিক ব্যাকরণ হল 'My name is'।" }
          }
      ]
  },
  {
      id: "e_unit8_convo",
      title: { en: "Chatting", hi: "बातचीत", bn: "কথোপকথন" },
      description: { en: "Simple conversation", hi: "सरल बातचीत", bn: "সহজ কথোপকথন" },
      icon: "message-circle",
      steps: [
          {
              id: "p1",
              type: "language_practice",
              title: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              description: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              practice: {
                  sourceText: { en: "How are you?", hi: "आप कैसे हैं?", bn: "আপনি কেমন আছেন?" },
                  correctSentence: "How are you",
                  wordBank: ["How", "are", "you", "Who", "is"]
              }
          },
           {
              id: "p2",
              type: "language_practice",
              title: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              description: { en: "Translate", hi: "अनुवाद", bn: "অনুবাদ" },
              practice: {
                  sourceText: { en: "I am happy", hi: "मैं खुश हूँ", bn: "আমি খুশি" },
                  correctSentence: "I am happy",
                  wordBank: ["I", "am", "happy", "sad", "good"]
              }
          }
      ],
      quiz: [
           {
            id: "q1",
            question: { en: "Answer: How are you?", hi: "उत्तर दें: How are you?", bn: "উত্তর: How are you?" },
            options: [
                { en: "I am good", hi: "I am good", bn: "I am good" },
                { en: "I am apple", hi: "I am apple", bn: "I am apple" }
            ],
            correctIndex: 0,
            explanation: { en: "A person feels 'good' or 'bad', not 'apple'.", hi: "कोई व्यक्ति 'अच्छा' या 'बुरा' महसूस करता है, 'सेब' नहीं।", bn: "একজন ব্যক্তি 'ভালো' বা 'খারাপ' অনুভব করেন, 'আপেল' নয়।" }
          }
      ]
  },

  // --- CORE DIGITAL LITERACY LESSONS ---
  {
    id: "l1_smartphone",
    title: { en: "1. Using Your Smartphone", hi: "1. अपना स्मार्टफोन उपयोग करें", bn: "১. স্মার্টফোন ব্যবহার" },
    description: { en: "Learn tapping, swiping, and buttons", hi: "टैप, स्वाइप और बटन सीखें", bn: "ট্যাপ, সোয়াইপ এবং বোতাম শিখুন" },
    icon: "smartphone",
    steps: [
      {
        id: "s1", type: "info",
        title: { en: "Tapping", hi: "टैप करना (छूना)", bn: "ট্যাপ করা" },
        description: { en: "Touch the screen lightly with one finger to open apps or select items. Think of it like a doorbell press.", hi: "ऐप्स खोलने या आइटम चुनने के लिए स्क्रीन को एक उंगली से हल्के से छुएं।", bn: "অ্যাপ খুলতে বা আইটেম নির্বাচন করতে এক আঙুল দিয়ে আলতোভাবে স্ক্রিন স্পর্শ করুন।" },
        image: "https://picsum.photos/id/1/400/300"
      },
      {
        id: "s2", type: "info",
        title: { en: "Swiping", hi: "स्वाइप करना (सरकाना)", bn: "সোয়াইপ করা" },
        description: { en: "Slide your finger across the screen to see more content. This is like turning a page.", hi: "और देखने के लिए अपनी उंगली को स्क्रीन पर सरकाएं।", bn: "আরও দেখতে স্ক্রিনে আপনার আঙুল স্লাইড করুন। এটি পৃষ্ঠা উল্টানোর মতো।" },
        image: "https://picsum.photos/id/2/400/300",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      }
    ],
    quiz: [
      {
        id: "q1",
        question: { en: "How do you open an app?", hi: "आप कोई ऐप कैसे खोलते हैं?", bn: "আপনি কীভাবে একটি অ্যাপ খুলবেন?" },
        options: [
          { en: "Tap on it", hi: "उस पर टैप करके", bn: "এটি ট্যাপ করে" },
          { en: "Shake the phone", hi: "फोन हिलाकर", bn: "ফোন ঝাঁকিয়ে" }
        ],
        correctIndex: 0,
        explanation: { en: "Tapping is the basic way to select items.", hi: "टैप करना स्मार्टफोन पर आइटम चुनने का मूल तरीका है।", bn: "ট্যাপ করা স্মার্টফোনে আইটেম নির্বাচন করার মৌলিক উপায়।" }
      }
    ]
  },
  {
    id: "l2_payments_intro",
    title: { en: "2. Understanding UPI", hi: "2. UPI को समझना", bn: "২. UPI বোঝা" },
    description: { en: "Digital money basics and safety", hi: "डिजिटल पैसे की मूल बातें और सुरक्षा", bn: "ডিজিটাল টাকার বুনিয়াদি এবং নিরাপত্তা" },
    icon: "banknote",
    steps: [
      {
        id: "s1", type: "info",
        title: { en: "What is UPI?", hi: "UPI क्या है?", bn: "UPI কী?" },
        description: { en: "UPI allows you to send money instantly from your bank account using your phone, 24/7.", hi: "UPI आपको अपने फोन का उपयोग करके अपने बैंक खाते से तुरंत, 24/7 पैसे भेजने की अनुमति देता है।", bn: "UPI আপনাকে আপনার ফোন ব্যবহার করে ব্যাঙ্ক অ্যাকাউন্ট থেকে অবিলম্বে, 24/7 টাকা পাঠাতে দেয়।" },
        image: "https://picsum.photos/id/3/400/300",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      },
      {
        id: "s2", type: "info",
        title: { en: "UPI ID", hi: "UPI आईडी", bn: "UPI आईडी" },
        description: { en: "Your UPI ID is your digital address (e.g., rani@bank). You can share this to receive money without giving bank details.", hi: "आपकी UPI आईडी आपका डिजिटल पता है (जैसे, rani@bank)। आप बैंक विवरण दिए बिना पैसे प्राप्त करने के लिए इसे साझा कर सकते हैं।", bn: "আপনার UPI আইডি হল আপনার ডিজিটাল ঠিকানা (যেমন, rani@bank)। আপনি ব্যাঙ্কের বিবরণ না দিয়ে টাকা পেতে এটি শেয়ার করতে পারেন।" },
        image: "https://picsum.photos/id/10/400/300"
      },
      {
        id: "s3", type: "info",
        title: { en: "Never Share PIN", hi: "पिन कभी साझा न करें", bn: "পিন কখনো শেয়ার করবেন না" },
        description: { en: "Your UPI PIN is a 4 or 6 digit secret code. Never tell it to anyone, not even bank officials.", hi: "आपका UPI पिन 4 या 6 अंकों का गुप्त कोड है। इसे किसी को न बताएं, बैंक अधिकारियों को भी नहीं।", bn: "আপনার UPI পিন একটি 4 বা 6 সংখ্যার গোপন কোড। এটি কাউকে বলবেন না, এমনকি ব্যাঙ্ক কর্মকর্তাদেরও না।" },
        image: "https://picsum.photos/id/4/400/300"
      }
    ],
    quiz: [
        {
            id: "q1",
            question: { en: "Who should you share your UPI PIN with?", hi: "आपको अपना UPI पिन किसके साथ साझा करना चाहिए?", bn: "আপনার UPI পিন কার সাথে শেয়ার করা উচিত?" },
            options: [
              { en: "Family", hi: "परिवार", bn: "পরিবার" },
              { en: "No One", hi: "किसी से नहीं", bn: "किसी से नहीं" }
            ],
            correctIndex: 1,
            explanation: { en: "Your UPI PIN is secret. Sharing it allows others to take your money.", hi: "आपका UPI पिन गुप्त है। इसे साझा करने से दूसरे आपके पैसे ले सकते हैं।", bn: "আপনার UPI পিন গোপন। এটি শেয়ার করলে অন্যরা আপনার টাকা নিতে পারে।" }
        },
        {
            id: "q2",
            question: { en: "When can you send money via UPI?", hi: "आप UPI से पैसे कब भेज सकते हैं?", bn: "আপনি কখন UPI এর মাধ্যমে টাকা পাঠাতে পারেন?" },
            options: [
              { en: "Only Morning", hi: "केवल सुबह", bn: "শুধুমাত্র সকালে" },
              { en: "Anytime (24/7)", hi: "कभी भी (24/7)", bn: "যেকোনো সময় (24/7)" }
            ],
            correctIndex: 1,
            explanation: { en: "UPI works 24 hours a day, 7 days a week.", hi: "UPI सप्ताह के 7 दिन, 24 घंटे काम करता है।", bn: "UPI সপ্তাহে 7 দিন, 24 ঘন্টা কাজ করে।" }
        },
        {
            id: "q3",
            question: { en: "To receive money, what is safe to share?", hi: "पैसे प्राप्त करने के लिए, क्या साझा करना सुरक्षित है?", bn: "टাকা পেতে, কী শেয়ার করা নিরাপদ?" },
            options: [
              { en: "UPI ID", hi: "UPI आईडी", bn: "UPI आईडी" },
              { en: "UPI PIN", hi: "UPI पिन", bn: "UPI পিন" }
            ],
            correctIndex: 0,
            explanation: { en: "UPI ID is like an address to receive money. UPI PIN is a key to give money.", hi: "UPI आईडी पैसे प्राप्त करने के लिए एक पते की तरह है। UPI पिन पैसे देने की चाबी है।", bn: "UPI আইডি টাকা পাওয়ার ঠিকানার মতো। UPI পিন টাকা দেওয়ার চাবি।" }
        }
    ]
  },
{
    id: "l3_upi_sim",
    title: { en: "3. Making a Payment", hi: "3. भुगतान करना", bn: "৩. পেমেন্ট করা" },
    description: { en: "Practice sending money safely", hi: "सुरक्षित रूप से पैसे भेजने का अभ्यास करें", bn: "নিরাপদে টাকা পাঠানোর অভ্যাস করুন" },
    icon: "qr-code",
    steps: [
      {
        id: "s1", type: "info",
        title: { en: "Scanning QR", hi: "QR स्कैन करना", bn: "QR স্ক্যান করা" },
        description: { en: "To pay at a shop, look for a square code (QR Code). Open scanner and point camera at it.", hi: "दुकान पर भुगतान करने के लिए, एक चौकोर कोड (QR कोड) देखें। स्कैनर खोलें और कैमरे को उसकी ओर करें।", bn: "দোকানে পেমেন্ট করতে, একটি স্কোয়ার কোড (QR কোড) খুঁজুন। স্ক্যানার খুলুন এবং ক্যামেরাটি সেদিকে ধরুন।" },
        image: "https://picsum.photos/id/5/400/300"
      },
      {
        id: "s2", type: "simulation", simulationType: "upi_pay",
        title: { en: "Practice Now", hi: "अभी अभ्यास करें", bn: "এখন অনুশীলন করুন" },
        description: { en: "Try sending ₹50 using this simulation. Use PIN 1234.", hi: "इस सिमुलेशन का उपयोग करके ₹50 भेजने का प्रयास करें। पिन 1234 का प्रयोग करें।", bn: "এই সিমুলেশন ব্যবহার করে ₹৫০ পাঠানোর চেষ্টা করুন। পিন ১২৩৪ ব্যবহার করুন।" },
      }
    ],
    quiz: [
        {
            id: "q1",
            question: { en: "What do you scan to pay?", hi: "भुगतान करने के लिए आप क्या स्कैन करते हैं?", bn: "পেমেন্ট করতে আপনি কী স্ক্যান করেন?" },
            options: [
              { en: "Barcode", hi: "बारकोड", bn: "বারকোড" },
              { en: "QR Code", hi: "QR कोड", bn: "QR কোড" }
            ],
            correctIndex: 1,
            explanation: { en: "QR Codes (Quick Response) are the square patterns used for payments.", hi: "QR कोड (क्विक रिस्पांस) भुगतान के लिए उपयोग किए जाने वाले चौकोर पैटर्न हैं।", bn: "QR কোড (কুইক রেসপন্স) হল পেমেন্টের জন্য ব্যবহৃত স্কোয়ার প্যাটার্ন।" }
        },
        {
            id: "q2",
            question: { en: "What should you check before entering PIN?", hi: "पिन दर्ज करने से पहले आपको क्या जांचना चाहिए?", bn: "পিন দেওয়ার আগে আপনার কী পরীক্ষা করা উচিত?" },
            options: [
              { en: "Receiver's Name", hi: "प्राप्तकर्ता का नाम", bn: "প্রাপকের নাম" },
              { en: "Weather", hi: "मौसम", bn: "আবহাওয়া" }
            ],
            correctIndex: 0,
            explanation: { en: "Always ensure the name displayed matches who you want to pay.", hi: "हमेशा सुनिश्चित करें कि प्रदर्शित नाम वही है जिसे आप भुगतान करना चाहते हैं।", bn: "সর্বদা নিশ্চিত করুন যে প্রদর্শিত নামটি আপনি যাকে পেমেন্ট করতে চান তার সাথে মিলছে।" }
        },
        {
            id: "q3",
            question: { en: "What happens if you enter wrong PIN?", hi: "यदि आप गलत पिन दर्ज करते हैं तो क्या होता है?", bn: "ভুল পিন দিলে কী হবে?" },
            options: [
              { en: "Money Lost", hi: "पैसे खो जाएंगे", bn: "টাকা হারিয়ে যাবে" },
              { en: "Payment Fails", hi: "भुगतान विफल", bn: "পেমেন্ট ব্যর্থ হবে" }
            ],
            correctIndex: 1,
            explanation: { en: "The bank rejects the transaction if the PIN is incorrect. Your money is safe.", hi: "यदि पिन गलत है तो बैंक लेनदेन को अस्वीकार कर देता है। आपका पैसा सुरक्षित है।", bn: "পিন ভুল হলে ব্যাঙ্ক লেনদেন প্রত্যাখ্যান করে। আপনার টাকা নিরাপদ।" }
        }
    ]
  },
  {
    id: "l4_paytm_sim",
    title: { en: "4. Using Paytm", hi: "4. Paytm का उपयोग", bn: "৪. Paytm ব্যবহার" },
    description: { en: "Simulated Paytm experience", hi: "Paytm का अनुभव", bn: "Paytm অভিজ্ঞতা" },
    icon: "wallet",
    steps: [
       {
        id: "s0", type: "info",
        title: { en: "Watch: How to use Paytm", hi: "देखें: Paytm का उपयोग कैसे करें", bn: "দেখুন: Paytm কীভাবে ব্যবহার করবেন" },
        description: { en: "A short video guide on how to open and use Paytm for payments.", hi: "भुगतान के लिए Paytm खोलने और उपयोग करने के बारे में एक संक्षिप्त वीडियो गाइड।", bn: "পেমেন্টের জন্য Paytm খোলা এবং ব্যবহার করার একটি সংক্ষিপ্ত ভিডিও নির্দেশিকা।" },
        video: {
            en: "https://youtu.be/4GlMPJs5Wu4?si=QtzDWl0L34nz4C2V",
            hi: "https://youtu.be/4GlMPJs5Wu4?si=QtzDWl0L34nz4C2V",
            bn: "https://youtu.be/jJKuaX50yos?si=j0eE6thKzNg1YiZ_"
        }
       },
       {
        id: "s1", type: "simulation", simulationType: "paytm",
        title: { en: "Paytm Demo", hi: "Paytm डेमो", bn: "Paytm ডেমো" },
        description: { en: "Learn to check balance and pay using Paytm interface.", hi: "Paytm इंटरफ़ेस का उपयोग करके बैलेंस चेक करना और भुगतान करना सीखें।", bn: "Paytm ইন্টারফেস ব্যবহার করে ব্যালেন্স চেক এবং পেমেন্ট করতে শিখুন।" }
       }
    ],
    quiz: [
        {
            id: "q1",
            question: { en: "Can you check bank balance on Paytm?", hi: "क्या आप Paytm पर बैंक बैलेंस चेक कर सकते हैं?", bn: "আপনি কি Paytm-এ ব্যাঙ্ক ব্যালেন্স চেক করতে পারেন?" },
            options: [
                {en: "Yes", hi: "हाँ", bn: "হ্যাঁ"},
                {en: "No", hi: "नहीं", bn: "না"}
            ],
            correctIndex: 0,
            explanation: { en: "Yes, Paytm allows you to check the balance of linked bank accounts.", hi: "हाँ, Paytm आपको जुड़े हुए बैंक खातों का बैलेंस चेक करने की अनुमति देता है।", bn: "হ্যাঁ, Paytm আপনাকে লিঙ্ক করা ব্যাঙ্ক অ্যাকাউন্টগুলির ব্যালেন্স চেক করতে দেয়।" }
        },
        {
            id: "q2",
            question: { en: "Does Paytm work for all banks?", hi: "क्या Paytm सभी बैंकों के लिए काम करता है?", bn: "Paytm কি সব ব্যাঙ্কের জন্য কাজ করে?" },
            options: [
                {en: "Yes", hi: "हाँ", bn: "হ্যাঁ"},
                {en: "No", hi: "नहीं", bn: "না"}
            ],
            correctIndex: 0,
            explanation: { en: "Yes, UPI works with almost all banks in India.", hi: "हाँ, UPI भारत के लगभग सभी बैंकों के साथ काम करता है।", bn: "হ্যাঁ, UPI ভারতের প্রায় সব ব্যাঙ্কের সাথে কাজ করে।" }
        }
    ]
  },
  {
    id: "l5_gpay_sim",
    title: { en: "5. Using Google Pay", hi: "5. Google Pay का उपयोग", bn: "৫. Google Pay ব্যবহার" },
    description: { en: "Simulated GPay experience", hi: "Google Pay का अनुभव", bn: "Google Pay অভিজ্ঞতা" },
    icon: "zap",
    steps: [
       {
        id: "s0", type: "info",
        title: { en: "Watch: How to use GPay", hi: "देखें: Google Pay का उपयोग कैसे करें", bn: "দেখুন: Google Pay কীভাবে ব্যবহার করবেন" },
        description: { en: "A short video guide on using Google Pay securely.", hi: "Google Pay को सुरक्षित रूप से उपयोग करने पर एक संक्षिप्त वीडियो गाइड।", bn: "নিরাপদে Google Pay ব্যবহার করার একটি সংক্ষিপ্ত ভিডিও নির্দেশিকা।" },
        video: {
            en: "https://youtu.be/UwXzg3YShzA?si=mW9mnUYpagP7i4ek",
            hi: "https://youtu.be/UwXzg3YShzA?si=mW9mnUYpagP7i4ek",
            bn: "https://youtu.be/aLEzfBWiQ2Y?si=Fd7yfBqlbRcY9S-f"
        }
       },
       {
        id: "s1", type: "simulation", simulationType: "gpay",
        title: { en: "GPay Demo", hi: "GPay डेमो", bn: "GPay ডেমো" },
        description: { en: "Send money to a contact securely.", hi: "संपर्क को सुरक्षित रूप से पैसे भेजें।", bn: "পরিচিতিতে নিরাপদে টাকা পাঠান।" }
       }
    ],
    quiz: [
        {
            id: "q1",
            question: { en: "Is GPay linked to your bank?", hi: "क्या GPay आपके बैंक से जुड़ा है?", bn: "GPay কি আপনার ব্যাঙ্কের সাথে লিঙ্ক করা আছে?" },
            options: [
                {en: "Yes", hi: "हाँ", bn: "হ্যাঁ"},
                {en: "No", hi: "नहीं", bn: "না"}
            ],
            correctIndex: 0,
            explanation: { en: "GPay is a UPI app that links directly to your bank account.", hi: "GPay एक UPI ऐप है जो सीधे आपके बैंक खाते से जुड़ता है।", bn: "GPay একটি UPI অ্যাপ যা সরাসরি আপনার ব্যাঙ্ক অ্যাকাউন্টের সাথে লিঙ্ক করে।" }
        },
        {
            id: "q2",
            question: { en: "Is it safe to pay strangers online?", hi: "क्या ऑनलाइन अजनबियों को भुगतान करना सुरक्षित है?", bn: "অনলাইনে অপরিচিতদের পেমেন্ট করা কি নিরাপদ?" },
            options: [
                {en: "Yes", hi: "हाँ", bn: "হ্যাঁ"},
                {en: "No, verify first", hi: "नहीं, पहले सत्यापित करें", bn: "না, আগে যাচাই করুন" }
            ],
            correctIndex: 1,
            explanation: { en: "Always verify who you are paying to avoid fraud.", hi: "धोखाधड़ी से बचने के लिए हमेशा सत्यापित करें कि आप किसे भुगतान कर रहे हैं।", bn: "প্রতারণা এড়াতে আপনি কাকে পেমেন্ট করছেন তা সর্বদা যাচাই করুন।" }
        }
    ]
  },
  {
    id: "l6_gov_schemes",
    title: { en: "6. Government Schemes", hi: "6. सरकारी योजनाएं", bn: "৬. সরকারি প্রকল্প" },
    description: { en: "Find nearby services", hi: "आस-पास की सेवाएं खोजें", bn: "কাছাকাছি পরিষেবা খুঁজুন" },
    icon: "landmark",
    steps: [
      {
        id: "s1", type: "info",
        title: { en: "Common Service Centers (CSC)", hi: "कॉमन सर्विस सेंटर (CSC)", bn: "কমন সার্ভিস সেন্টার (CSC)" },
        description: { en: "CSCs are digital centers where you can apply for Aadhar, PAN card, Banking, and Insurance services.", hi: "CSC डिजिटल केंद्र हैं जहां आप आधार, पैन कार्ड, बैंकिंग और बीमा सेवाओं के लिए आवेदन कर सकते हैं।", bn: "CSC হল ডিজিটাল কেন্দ্র যেখানে আপনি আধার, প্যান কার্ড, ব্যাঙ্কিং এবং বীমা পরিষেবার জন্য আবেদন করতে পারেন।" },
        image: "https://picsum.photos/id/6/400/300"
      },
      {
        id: "s2", type: "simulation", simulationType: "maps",
        title: { en: "Find Nearby CSC", hi: "निकटतम CSC खोजें", bn: "কাছাকাছি CSC খুঁজুন" },
        description: { en: "Use map to find your nearest help center.", hi: "अपने निकटतम सहायता केंद्र को खोजने के लिए मानचित्र का उपयोग करें।", bn: "আপনার নিকটতম সাহায্য কেন্দ্র খুঁজে পেতে মানচিত্র ব্যবহার করুন।" }
      },
      {
        id: "s3", type: "info",
        title: { en: "Documents Needed", hi: "आवश्यक दस्तावेज", bn: "প্রয়োজনীয় নথি" },
        description: { en: "Always carry your Aadhar Card, Bank Passbook, and Mobile Phone when visiting a CSC.", hi: "CSC जाते समय हमेशा अपना आधार कार्ड, बैंक पासबुक और मोबाइल फोन साथ रखें।", bn: "CSC পরিদর্শন করার সময় সর্বদা আপনার আধার কার্ড, ব্যাঙ্ক পাসবুক এবং মোবাইল ফোন সাথে রাখুন।" },
        image: "https://picsum.photos/id/20/400/300"
      }
    ],
    quiz: [
        {
            id: "q1",
            question: { en: "What helps with Aadhar applications?", hi: "आधार आवेदन में क्या मदद करता है?", bn: "আধার আবেদনে কী সাহায্য করে?" },
            options: [
                {en: "CSC Center", hi: "CSC केंद्र", bn: "CSC কেন্দ্র"},
                {en: "Cinema Hall", hi: "सिनेमा हॉल", bn: "সিনেমা হল"}
            ],
            correctIndex: 0,
            explanation: { en: "CSC Centers are authorized to help with government schemes like Aadhar.", hi: "CSC केंद्र आधार जैसी सरकारी योजनाओं में मदद करने के लिए अधिकृत हैं।", bn: "CSC কেন্দ্রগুলি আধার-এর মতো সরকারি প্রকল্পে সাহায্য করার জন্য অনুমোদিত।" }
        },
        {
            id: "q2",
            question: { en: "What document is most important?", hi: "कौन सा दस्तावेज सबसे महत्वपूर्ण है?", bn: "কোন নথিটি সবচেয়ে গুরুত্বপূর্ণ?" },
            options: [
                {en: "Aadhar Card", hi: "आधार कार्ड", bn: "আধার কার্ড"},
                {en: "Movie Ticket", hi: "मूवी टिकट", bn: "মুভি টিকিট"}
            ],
            correctIndex: 0,
            explanation: { en: "Aadhar Card is the primary identity proof needed for most services.", hi: "अधिकांश सेवाओं के लिए आधार कार्ड प्राथमिक पहचान प्रमाण है।", bn: "আধার কার্ড হল বেশিরভাগ পরিষেবার জন্য প্রয়োজনীয় প্রাথমিক পরিচয় প্রমাণ।" }
        },
        {
            id: "q3",
            question: { en: "Do CSCs charge huge money?", hi: "क्या CSC बहुत पैसे लेते हैं?", bn: "CSC কি বিশাল টাকা চার্জ করে?" },
            options: [
                {en: "Yes, very expensive", hi: "हाँ, बहुत महंगा", bn: "হ্যাঁ, অনেক ব্যয়বহুল"},
                {en: "No, nominal government fee", hi: "नहीं, मामूली सरकारी शुल्क", bn: "না, নামমাত্র সরকারি ফি"}
            ],
            correctIndex: 1,
            explanation: { en: "CSCs charge low, government-fixed fees for services.", hi: "CSC सेवाओं के लिए कम, सरकार द्वारा निर्धारित शुल्क लेते हैं।", bn: "CSC পরিষেবার জন্য কম, সরকার নির্ধারিত ফি নেয়।" }
        }
    ]
  }
];
