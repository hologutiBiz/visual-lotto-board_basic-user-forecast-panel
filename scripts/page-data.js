import { fetchFrequentNumbers } from "./frequently-numbers.js";
import { fetchClassificationChart } from "./classification-data.js"; 

document.addEventListener("DOMContentLoaded", () => {
    fetchFrequentNumbers();
    fetchClassificationChart();
})

window.addEventListener("offline", () => {
    showErrorMessage("No internet connection. Please check your network.");
});

window.addEventListener("online", () => {
    let errorPara = document.getElementById("error-message");
    errorPara.style.display = "none";
    window.location.reload();
});

window.addEventListener("firebaseInitFailed", (e) => {
    console.error("🔥 Firebase init failed:", e.detail.message);
    showErrorMessage("Server Error: Store configuration failed. Please try again later.");
})