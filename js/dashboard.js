import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* FIREBASE CONFIG */
const firebaseConfig = {
    apiKey: "AIzaSyAeqE7ED6tR1VbVKET7_UXpAifwTvI0byI",
    authDomain: "smart-civic-portal-6e6d9.firebaseapp.com",
    projectId: "smart-civic-portal-6e6d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* UI */
const totalEl = document.getElementById("totalCount");
const resolvedEl = document.getElementById("resolvedCount");
const pendingEl = document.getElementById("pendingCount");
const highEl = document.getElementById("highCount");

/* GOOGLE CHART */
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(loadDashboard);

async function loadDashboard() {
    const snapshot = await getDocs(collection(db, "reports"));

    let total = 0, resolved = 0, pending = 0, high = 0;
    const categoryCount = {};

    snapshot.forEach(doc => {
        const d = doc.data();
        total++;

        if (d.status === "Resolved") resolved++;
        else pending++;

        // HIGH PRIORITY (LOGIC BASED ON CATEGORY)
        if (d.category === "Emergency / Disaster" || d.category === "Road & Transport") {
            high++;
        }

        categoryCount[d.category] = (categoryCount[d.category] || 0) + 1;
    });

    totalEl.innerText = total;
    resolvedEl.innerText = resolved;
    pendingEl.innerText = pending;
    highEl.innerText = high;

    drawCategoryChart(categoryCount);
}

function drawCategoryChart(categoryCount) {
    const rows = [["Category", "Complaints"]];
    for (const c in categoryCount) {
        rows.push([c, categoryCount[c]]);
    }

    const data = google.visualization.arrayToDataTable(rows);

    const chart = new google.visualization.PieChart(
        document.getElementById("categoryChart")
    );

    chart.draw(data, {
        title: "Civic Issues Distribution",
        pieHole: 0.4
    });
}
