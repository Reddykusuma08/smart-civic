// ================= FIREBASE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyAeqE7ED6tR1VbVKET7_UXpAifwTvI0byI",
  authDomain: "smart-civic-portal-6e6d9.firebaseapp.com",
  projectId: "smart-civic-portal-6e6d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= UI =================
const trackGrid = document.getElementById("trackGrid");
const filterCategory = document.getElementById("filterCategory");
const filterStatus = document.getElementById("filterStatus");
const filterDate = document.getElementById("filterDate");

let allIssues = [];

// ================= FETCH =================
async function fetchIssues() {
  try {
    const snapshot = await getDocs(collection(db, "reports"));
    allIssues = [];

    snapshot.forEach(doc => {
      allIssues.push({
        id: doc.id,
        ...doc.data()
      });
    });

    applyFilters();
  } catch (err) {
    console.error("Firestore error:", err);
    trackGrid.innerHTML = "<p>❌ Failed to load civic issues</p>";
  }
}

fetchIssues();

// ================= FILTER =================
filterCategory.addEventListener("change", applyFilters);
filterStatus.addEventListener("change", applyFilters);
filterDate.addEventListener("change", applyFilters);

function applyFilters() {
  let filtered = [...allIssues];

  if (filterCategory.value) {
    filtered = filtered.filter(
      issue => issue.category === filterCategory.value
    );
  }

  if (filterStatus.value) {
    filtered = filtered.filter(
      issue => issue.status === filterStatus.value
    );
  }

  if (filterDate.value === "oldest") {
    filtered.sort((a, b) =>
      (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)
    );
  } else {
    filtered.sort((a, b) =>
      (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
    );
  }

  renderIssues(filtered);
}

// ================= RENDER =================
function renderIssues(data) {
  trackGrid.innerHTML = "";

  if (data.length === 0) {
    trackGrid.innerHTML = "<p>No civic issues found</p>";
    return;
  }

  data.forEach(issue => {
    const statusClass =
      issue.status === "Resolved" ? "resolved" :
        issue.status === "In Progress" ? "progress" :
          "pending";

    trackGrid.innerHTML += `
      <div class="track-card">
        <h3>${issue.category}</h3>
        <p><b>Problem:</b> ${issue.subIssue}</p>
        <p>${issue.description || "No description provided"}</p>
        <p><b>Status:</b> ${issue.status}</p>
        <p><b>Reported On:</b>
          ${issue.createdAt
        ? new Date(issue.createdAt.seconds * 1000).toLocaleString()
        : "Unknown"}
        </p>
        <span class="status ${statusClass}">
          ${issue.status}
        </span>
      </div>
    `;
  });
}


