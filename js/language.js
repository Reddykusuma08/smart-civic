const translations = {
  en: {
    appName: "CivicLens",
    tagline: "Empowering citizens. Enabling smart governance.",
    description:
      "CivicLens is a citizen-centric smart civic engagement platform designed to simplify the reporting and tracking of public issues. By combining location data, multimedia inputs, and real-time dashboards, CivicLens strengthens the connection between citizens and local authorities to build transparent and responsive cities.",
    reportBtn: "Report an Issue",
    trackBtn: "Track Issue Status"
  },

  hi: {
    appName: "सिविक लेंस",
    tagline: "नागरिकों को सशक्त बनाना। स्मार्ट शासन को सक्षम करना।",
    description:
      "सिविक लेंस एक नागरिक-केंद्रित स्मार्ट नागरिक सहभागिता प्लेटफ़ॉर्म है, जिसे सार्वजनिक समस्याओं की रिपोर्टिंग और ट्रैकिंग को सरल बनाने के लिए डिज़ाइन किया गया है। स्थान डेटा, मल्टीमीडिया इनपुट और रियल-टाइम डैशबोर्ड को जोड़कर, सिविक लेंस नागरिकों और स्थानीय प्रशासन के बीच संबंध को मजबूत करता है, जिससे पारदर्शी और उत्तरदायी शहरों का निर्माण होता है।",
    reportBtn: "समस्या दर्ज करें",
    trackBtn: "समस्या की स्थिति देखें"
  },

  te: {
    appName: "సివిక్ లెన్స్",
    tagline: "పౌరులను శక్తివంతం చేస్తూ. స్మార్ట్ పాలనకు తోడ్పాటు.",
    description:
      "సివిక్ లెన్స్ అనేది పౌర కేంద్రిత స్మార్ట్ సివిక్ ఎంగేజ్‌మెంట్ వేదిక. ఇది ప్రజా సమస్యలను నివేదించడం మరియు ట్రాక్ చేయడం సులభం చేయడానికి రూపొందించబడింది. లొకేషన్ డేటా, మల్టీమీడియా ఇన్‌పుట్‌లు మరియు రియల్-టైమ్ డ్యాష్‌బోర్డ్‌లను కలిపి, సివిక్ లెన్స్ పౌరులు మరియు స్థానిక అధికారుల మధ్య అనుసంధానాన్ని బలోపేతం చేస్తుంది, తద్వారా పారదర్శకమైన మరియు స్పందనాత్మక నగరాల నిర్మాణానికి సహాయపడుతుంది.",
    reportBtn: "సమస్యను నివేదించండి",
    trackBtn: "సమస్య స్థితిని చూడండి"
  }
};

function setLanguage(lang) {
  document.getElementById("appName").innerText = translations[lang].appName;
  document.getElementById("tagline").innerText = translations[lang].tagline;
  document.getElementById("description").innerText = translations[lang].description;
  document.getElementById("reportBtn").innerText = translations[lang].reportBtn;
  document.getElementById("trackBtn").innerText = translations[lang].trackBtn;
}
