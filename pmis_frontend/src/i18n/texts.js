const texts = {
  en: {
    nav: {
      onboarding: 'Onboarding',
      profile: 'Profile',
      recommendations: 'Recommendations',
      internships: 'Internships',
      assistant: 'Assistant'
    },
    onboarding: {
      title: 'Welcome to PM Internship Scheme',
      subtitle: 'Let’s set up your profile for tailored internship recommendations.',
      getStarted: 'Get Started',
      next: 'Next',
      skip: 'Skip',
      steps: ['Basic Info', 'Skills & Interests', 'Upload Resume', 'Done'],
      doneTitle: 'All set!',
      doneSubtitle: 'Head over to Recommendations to see your matches.',
    },
    profile: {
      title: 'Your Profile',
      save: 'Save Profile',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      location: 'Preferred Location',
      eduLevel: 'Education Level',
      degree: 'Degree / Stream',
      skills: 'Skills (comma separated)',
      interests: 'Interests (comma separated)',
      helper: 'Provide accurate details to improve recommendation quality.',
      saved: 'Profile saved successfully!',
    },
    resume: {
      title: 'Resume Upload',
      upload: 'Upload Resume (PDF/DOC/DOCX)',
      uploading: 'Uploading...',
      success: 'Resume uploaded and parsed.',
      error: 'Failed to upload. Please try again.',
    },
    recs: {
      title: 'Recommended Internships',
      refresh: 'Refresh',
      apply: 'Apply',
      viewAll: 'View All',
      empty: 'No recommendations yet. Complete your profile and upload resume.',
    },
    internships: {
      title: 'Explore Internships',
      search: 'Search by keyword',
      filterLocation: 'Filter by location',
      apply: 'Apply',
    },
    assistant: {
      title: 'AI Assistant',
      placeholder: 'Ask me anything about internships or your profile...',
      send: 'Send',
    }
  },
  hi: {
    nav: { onboarding: 'ऑनबोर्डिंग', profile: 'प्रोफाइल', recommendations: 'सिफ़ारिशें', internships: 'इंटर्नशिप', assistant: 'सहायक' },
    onboarding: { title: 'पीएम इंटर्नशिप योजना में आपका स्वागत है', subtitle: 'आपके प्रोफाइल के आधार पर सही इंटर्नशिप खोजें।', getStarted: 'शुरू करें', next: 'आगे', skip: 'छोड़ें', steps: ['बुनियादी जानकारी', 'कौशल और रुचियाँ', 'रिज़्यूमे अपलोड', 'समाप्त'], doneTitle: 'सब तैयार!', doneSubtitle: 'अपनी सिफारिशें देखने के लिए Recommendations खोलें।' },
    profile: { title: 'आपकी प्रोफाइल', save: 'सेव करें', name: 'पूरा नाम', email: 'ईमेल', phone: 'फोन', location: 'पसंदीदा स्थान', eduLevel: 'शिक्षा स्तर', degree: 'डिग्री / स्ट्रीम', skills: 'कौशल (कॉमा से अलग)', interests: 'रुचियाँ (कॉमा से अलग)', helper: 'सटीक जानकारी दें ताकि बेहतर सिफारिशें मिलें।', saved: 'प्रोफाइल सेव हुई!' },
    resume: { title: 'रिज़्यूमे अपलोड', upload: 'रिज़्यूमे अपलोड करें (PDF/DOC/DOCX)', uploading: 'अपलोड हो रहा है...', success: 'रिज़्यूमे अपलोड और पार्स हुआ।', error: 'अपलोड विफल। पुनः प्रयास करें।' },
    recs: { title: 'अनुशंसित इंटर्नशिप', refresh: 'रीफ़्रेश', apply: 'आवेदन करें', viewAll: 'सभी देखें', empty: 'अभी सिफारिशें नहीं। प्रोफाइल पूरी करें और रिज़्यूमे अपलोड करें।' },
    internships: { title: 'इंटर्नशिप खोजें', search: 'कीवर्ड से खोजें', filterLocation: 'स्थान से फ़िल्टर करें', apply: 'आवेदन करें' },
    assistant: { title: 'AI सहायक', placeholder: 'इंटर्नशिप या प्रोफाइल पर कुछ भी पूछें...', send: 'भेजें' }
  },
  ta: { nav: { onboarding: 'ஆரம்பம்', profile: 'சுயவிவரம்', recommendations: 'பரிந்துரைகள்', internships: 'இணையப்பணிகள்', assistant: 'உதவியாளர்' }, onboarding: { title: 'PM Internship Scheme', subtitle: 'உங்களுக்கு பொருந்தும் இணையப்பணிகளை கண்டறிவோம்.', getStarted: 'தொடங்கவும்', next: 'அடுத்து', skip: 'தவிர்க்க', steps: ['அடிப்படை', 'திறன்கள்', 'ரெஸ்யூமே', 'முடிந்தது'], doneTitle: 'அனைத்தும் தயார்!', doneSubtitle: 'பரிந்துரைகளை பார்க்கவும்.' }, profile: { title: 'உங்கள் சுயவிவரம்', save: 'சேமிக்க', name: 'முழு பெயர்', email: 'மின்னஞ்சல்', phone: 'தொலைபேசி', location: 'விருப்ப இடம்', eduLevel: 'கல்வி நிலை', degree: 'படிப்பு', skills: 'திறன்கள்', interests: 'ஆர்வங்கள்', helper: 'தகவல் சரியாக இருந்தால் சிறந்த பரிந்துரைகள்.', saved: 'சேமிக்கப்பட்டது!' }, resume: { title: 'ரெஸ்யூமே', upload: 'ரெஸ்யூமே பதிவேற்று', uploading: 'பதிவேற்றம்...', success: 'வெற்றி!', error: 'தோல்வி.' }, recs: { title: 'பரிந்துரைகள்', refresh: 'மேம்படுத்து', apply: 'விண்ணப்பிக்க', viewAll: 'அனைத்தும்', empty: 'சுயவிவரம்/ரெஸ்யூமே புதுப்பிக்கவும்.' }, internships: { title: 'இணையப்பணிகள்', search: 'தேடல்', filterLocation: 'இடம்', apply: 'விண்ணப்பிக்க' }, assistant: { title: 'உதவியாளர்', placeholder: 'ஏதேனும் கேளுங்கள்...', send: 'அனுப்பு' } },
  te: { nav: { onboarding: 'ఆన్‌బోర్డింగ్', profile: 'ప్రొఫైల్', recommendations: 'సిఫార్సులు', internships: 'ఇంటర్న్‌షిప్‌లు', assistant: 'సహాయకుడు' }, onboarding: { title: 'PM ఇంటర్న్‌షిప్ పథకం', subtitle: 'మీకు సరిపోయే అవకాశాలు.', getStarted: 'ప్రారంభించండి', next: 'తర్వాత', skip: 'దాటవేయి', steps: ['మూలం', 'నైపుణ్యాలు', 'రెజ్యూమే', 'పూర్తయింది'], doneTitle: 'పూర్తయింది!', doneSubtitle: 'సిఫార్సులను చూడండి.' }, profile: { title: 'మీ ప్రొఫైల్', save: 'సేవ్', name: 'పేరు', email: 'ఈమెయిల్', phone: 'ఫోన్', location: 'స్థానం', eduLevel: 'విద్య', degree: 'డిగ్రీ', skills: 'నైపుణ్యాలు', interests: 'ఆసక్తులు', helper: 'సరికొత్త వివరాలు ఇవ్వండి.', saved: 'సేవ్ అయింది!' }, resume: { title: 'రెజ్యూమే', upload: 'అప్‌లోడ్', uploading: 'అప్‌లోడ్...', success: 'విజయం', error: 'విఫలం' }, recs: { title: 'సిఫార్సులు', refresh: 'రిఫ్రెష్', apply: 'దరఖాస్తు', viewAll: 'అన్ని', empty: 'ముందు ప్రొఫైల్/రెజ్యూమే.' }, internships: { title: 'ఇంటర్న్‌షిప్‌లు', search: 'శోధన', filterLocation: 'స్థానం', apply: 'దరఖాస్తు' }, assistant: { title: 'సహాయకుడు', placeholder: 'ఏదైనా అడగండి...', send: 'పంపండి' } },
  bn: { nav: { onboarding: 'অনবোর্ডিং', profile: 'প্রোফাইল', recommendations: 'সুপারিশ', internships: 'ইন্টার্নশিপ', assistant: 'সহকারী' }, onboarding: { title: 'পিএম ইন্টার্নশিপ স্কিম', subtitle: 'আপনার জন্য সেরা ইন্টার্নশিপ খুঁজুন।', getStarted: 'শুরু করুন', next: 'পরবর্তী', skip: 'এড়িয়ে যান', steps: ['মৌলিক', 'দক্ষতা', 'রেজিউমে', 'সম্পন্ন'], doneTitle: 'সব প্রস্তুত!', doneSubtitle: 'সুপারিশ দেখুন।' }, profile: { title: 'আপনার প্রোফাইল', save: 'সংরক্ষণ', name: 'পুরো নাম', email: 'ইমেল', phone: 'ফোন', location: 'পছন্দের স্থান', eduLevel: 'শিক্ষা স্তর', degree: 'ডিগ্রি', skills: 'দক্ষতা', interests: 'আগ্রহ', helper: 'সঠিক তথ্য দিন।', saved: 'সংরক্ষিত!' }, resume: { title: 'রেজিউমে', upload: 'আপলোড', uploading: 'আপলোড হচ্ছে...', success: 'সফল', error: 'ব্যর্থ' }, recs: { title: 'সুপারিশ', refresh: 'রিফ্রেশ', apply: 'আবেদন', viewAll: 'সব', empty: 'প্রোফাইল/রেজিউমে আপডেট করুন।' }, internships: { title: 'ইন্টার্নশিপ', search: 'খোঁজ', filterLocation: 'স্থান', apply: 'আবেদন' }, assistant: { title: 'সহকারী', placeholder: 'প্রশ্ন করুন...', send: 'পাঠান' } },
  mr: { nav: { onboarding: 'ऑनबोर्डिंग', profile: 'प्रोफाइल', recommendations: 'शिफारसी', internships: 'इंटर्नशिप', assistant: 'सहाय्यक' }, onboarding: { title: 'पीएम इंटर्नशिप योजना', subtitle: 'आपल्यासाठी सर्वोत्तम संधी शोधा.', getStarted: 'सुरू करा', next: 'पुढे', skip: 'वगळा', steps: ['मूलभूत', 'कौशल्ये', 'रेझ्युमे', 'पूर्ण'], doneTitle: 'पूर्ण!', doneSubtitle: 'शिफारसी पहा.' }, profile: { title: 'तुमची प्रोफाइल', save: 'जतन करा', name: 'पूर्ण नाव', email: 'ईमेल', phone: 'फोन', location: 'ठिकाण', eduLevel: 'शिक्षण', degree: 'पदवी', skills: 'कौशल्ये', interests: 'स्वारस्य', helper: 'योग्य माहिती द्या.', saved: 'जतन झाले!' }, resume: { title: 'रेझ्युमे', upload: 'अपलोड', uploading: 'अपलोड...', success: 'यशस्वी', error: 'अयशस्वी' }, recs: { title: 'शिफारसी', refresh: 'रिफ्रेश', apply: 'अर्ज करा', viewAll: 'सर्व', empty: 'प्रथम प्रोफाइल/रेझ्युमे.' }, internships: { title: 'इंटर्नशिप', search: 'शोधा', filterLocation: 'ठिकाण', apply: 'अर्ज करा' }, assistant: { title: 'सहाय्यक', placeholder: 'काहीही विचारा...', send: 'पाठवा' } },
};

export function getText(lang = 'en') {
  return texts[lang] || texts.en;
}
