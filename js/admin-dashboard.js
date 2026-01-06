import { db, storage } from "./firebase.js";
import {
    collection, getDocs, updateDoc, doc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
    ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const adminList = document.getElementById("adminList");

async function loadReports() {
    const snapshot = await getDocs(collection(db, "reports"));
    adminList.innerHTML = "";

    snapshot.forEach(d => {
        const data = d.data();
        adminList.innerHTML += `
      <div class="admin-card">
        <h3>${data.category}</h3>
        <p>${data.subIssue}</p>
        <p>Status: ${data.status}</p>

        <select id="status-${d.id}">
          <option>Submitted</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <input placeholder="Solved By" id="by-${d.id}">
        <input placeholder="Department" id="dept-${d.id}">
        <input type="file" id="img-${d.id}">

        <button onclick="updateStatus('${d.id}')">Update</button>
      </div>
    `;
    });
}

window.updateStatus = async function (id) {
    const status = document.getElementById(`status-${id}`).value;
    const solvedBy = document.getElementById(`by-${id}`).value;
    const dept = document.getElementById(`dept-${id}`).value;
    const img = document.getElementById(`img-${id}`).files[0];

    let imageURL = "";

    if (img) {
        const imgRef = ref(storage, `admin/${Date.now()}_${img.name}`);
        await uploadBytes(imgRef, img);
        imageURL = await getDownloadURL(imgRef);
    }

    await updateDoc(doc(db, "reports", id), {
        status,
        solvedBy,
        department: dept,
        progressImage: imageURL,
        updatedAt: serverTimestamp()
    });

    alert("Updated");
    loadReports();
};

loadReports();
