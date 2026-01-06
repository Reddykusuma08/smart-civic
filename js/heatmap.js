import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAeqE7ED6tR1VbVKET7_UXpAifwTvI0byI",
    authDomain: "smart-civic-portal-6e6d9.firebaseapp.com",
    projectId: "smart-civic-portal-6e6d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function init() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 17.385044, lng: 78.486671 },
        zoom: 11
    });

    const points = [];
    const snap = await getDocs(collection(db, "reports"));

    snap.forEach(doc => {
        const d = doc.data();
        if (d.location) {
            points.push(new google.maps.LatLng(d.location.lat, d.location.lng));
        }
    });

    new google.maps.visualization.HeatmapLayer({
        data: points,
        map,
        radius: 35
    });
}

init();
