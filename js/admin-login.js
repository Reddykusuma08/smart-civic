import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAeqE7ED6tR1VbVKET7_UXpAifwTvI0byI",
    authDomain: "smart-civic-portal-6e6d9.firebaseapp.com",
    projectId: "smart-civic-portal-6e6d9"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login logic
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Login successful");
        window.location.href = "admin-dashboard.html";
    } catch (err) {
        console.error(err);
        alert("❌ Login failed: " + err.message);
    }
});
