import { fetchFrequentNumbers } from "./frequently-numbers.js";
import { fetchClassificationChart } from "./classification-data.js"; 

document.addEventListener("DOMContentLoaded", () => {
    fetchFrequentNumbers();
    fetchClassificationChart();
})

window.addEventListener("offline", () => {
    showErrorMessage("You are offline. Connection your internet, and wait for page to refresh.");
});

window.addEventListener("online", () => {
    let errorPara = document.getElementById("error-message");
    errorPara.style.display = "none";
    window.location.reload();
});