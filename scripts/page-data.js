import { Auth } from "../firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { fetchFrequentNumbers } from "./frequently-numbers.js";
import { fetchClassificationChart } from "./classification-data.js"; 

const main = document.querySelector("#main-el");

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(Auth(), (user) => {
        if (!user) {
            window.location.href = "index.html";
        }

        fetchFrequentNumbers();
        fetchClassificationChart();
    })
})

window.addEventListener("offline", () => {
    showErrorMessage("No internet connection. Please check your network.");
});

window.addEventListener("online", () => {
    let errorPara = document.getElementById("error-message");
    errorPara.style.display = "none";
    main.style.display = "block";
});

window.addEventListener("firebaseInitFailed", (e) => {
    console.error("🔥 Firebase init failed:", e.detail.message);
    showErrorMessage("Server Error: Store configuration failed. Please try again later.");
})