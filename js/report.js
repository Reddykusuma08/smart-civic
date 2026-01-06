// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyAeqE7ED6tR1VbVKET7_UXpAifwTvI0byI",
  authDomain: "smart-civic-portal-6e6d9.firebaseapp.com",
  projectId: "smart-civic-portal-6e6d9",
  storageBucket: "smart-civic-portal-6e6d9.appspot.com",
  messagingSenderId: "689342834550",
  appId: "1:689342834550:web:22780895516a80af9bc57"
};

// ================= INIT =================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ================= GLOBAL STATE =================
let map, marker;
let selectedLat = null;
let selectedLng = null;
let currentLanguage = localStorage.getItem("lang") || "en";
let selectedCategoryKey = null;
let successAudio = null;

// ================= GOOGLE MAP =================
window.initMap = function () {
  const center = { lat: 17.385044, lng: 78.486671 };

  map = new google.maps.Map(document.getElementById("map"), {
    center,
    zoom: 12
  });

  marker = new google.maps.Marker({ map });

  map.addListener("click", e => {
    selectedLat = e.latLng.lat();
    selectedLng = e.latLng.lng();
    marker.setPosition(e.latLng);
  });
};

// ================= TRANSLATIONS =================
const translations = {
  en: {
    listening: "Listening...",
    voiceCaptured: "Voice captured",
    success: "Your complaint has been registered successfully",
    error: "Please complete all steps",
    categories: {
      road: "Road & Transport",
      water: "Water Supply",
      electricity: "Electricity",
      garbage: "Garbage & Sanitation",
      drainage: "Drainage & Sewage",
      safety: "Street Safety",
      public: "Public Facilities",
      pollution: "Pollution & Noise",
      animal: "Animal Issues",
      emergency: "Emergency / Disaster"
    }
  },
  te: {
    listening: "వింటోంది...",
    voiceCaptured: "వాయిస్ నమోదు అయింది",
    success: "మీ ఫిర్యాదు విజయవంతంగా నమోదు చేయబడింది",
    error: "దయచేసి అన్ని దశలను పూర్తి చేయండి",
    categories: {
      road: "రోడ్లు & రవాణా",
      water: "నీటి సరఫరా",
      electricity: "విద్యుత్",
      garbage: "చెత్త & పారిశుధ్యం",
      drainage: "డ్రెయినేజ్ & మురుగు",
      safety: "వీధి భద్రత",
      public: "ప్రజా సౌకర్యాలు",
      pollution: "కాలుష్యం & శబ్దం",
      animal: "జంతు సమస్యలు",
      emergency: "అత్యవసరం / విపత్తు"
    }
  },
  hi: {
    listening: "सुन रहा है...",
    voiceCaptured: "आवाज़ दर्ज की गई",
    success: "आपकी शिकायत सफलतापूर्वक दर्ज की गई",
    error: "कृपया सभी चरण पूरे करें",
    categories: {
      road: "सड़क और परिवहन",
      water: "जल आपूर्ति",
      electricity: "बिजली",
      garbage: "कचरा और स्वच्छता",
      drainage: "जल निकासी",
      safety: "सड़क सुरक्षा",
      public: "सार्वजनिक सुविधाएँ",
      pollution: "प्रदूषण और शोर",
      animal: "पशु समस्याएँ",
      emergency: "आपातकाल / आपदा"
    }
  }
};

// ================= AUDIO =================
function initSuccessAudio() {
  if (!successAudio) {
    successAudio = new Audio(`../assets/audio/success-${currentLanguage}.mp3`);
  }
}

// ================= CATEGORY SELECT =================
window.selectCategory = function (key) {
  selectedCategoryKey = key;

  document.getElementById("selectedCategory").innerText =
    translations[currentLanguage].categories[key];
};

// ================= VOICE INPUT =================
const voiceBtn = document.getElementById("voiceBtn");
const voiceStatus = document.getElementById("voiceStatus");
const descBox = document.getElementById("description");

if ("webkitSpeechRecognition" in window && voiceBtn) {
  const rec = new webkitSpeechRecognition();
  rec.lang =
    currentLanguage === "te" ? "te-IN" :
      currentLanguage === "hi" ? "hi-IN" : "en-IN";

  voiceBtn.onclick = () => {
    rec.start();
    voiceStatus.innerText = translations[currentLanguage].listening;
  };

  rec.onresult = e => {
    descBox.value = e.results[0][0].transcript;
    voiceStatus.innerText = translations[currentLanguage].voiceCaptured;
  };
}

// ================= SUBMIT =================
document.getElementById("reportForm").addEventListener("submit", async e => {
  e.preventDefault();
  initSuccessAudio();

  if (!selectedCategoryKey || selectedLat === null) {
    alert(translations[currentLanguage].error);
    return;
  }

  const subIssue = document.getElementById("subIssue").value;
  const description = descBox.value || "";
  const imageInput = document.getElementById("image");

  let imageURL = "";

  if (imageInput.files.length) {
    const imgRef = ref(
      storage,
      `reports/${Date.now()}_${imageInput.files[0].name}`
    );
    await uploadBytes(imgRef, imageInput.files[0]);
    imageURL = await getDownloadURL(imgRef);
  }

  await addDoc(collection(db, "reports"), {
    categoryKey: selectedCategoryKey,
    categoryLabel: translations[currentLanguage].categories[selectedCategoryKey],
    language: currentLanguage,
    subIssue,
    description,
    imageURL,
    location: { lat: selectedLat, lng: selectedLng },
    status: "Submitted",
    createdAt: serverTimestamp()
  });

  successAudio.play();
  alert(translations[currentLanguage].success);

  e.target.reset();
  selectedCategoryKey = null;
  selectedLat = selectedLng = null;
  marker.setPosition(null);
});
