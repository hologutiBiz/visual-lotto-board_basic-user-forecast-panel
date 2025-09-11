import { fetchFrequentNumbers } from "./frequently-numbers.js";
import { fetchClassificationChart } from "./classification-data.js"; 

document.addEventListener("DOMContentLoaded", () => {
    fetchFrequentNumbers();
    fetchClassificationChart();
})