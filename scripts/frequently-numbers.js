import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { firestoreDB, initFirebase } from '../firebaseConfig.js'; 

 const container = document.getElementById("frequentNumbersContainer");
const dataStatus = document.querySelector(".frequent-numbers-list .fn-data-status");
const dateUpdate = document.querySelector(".frequent-numbers-list .date-updated");

if (dataStatus) {
    dataStatus.textContent = "Fetching frequent numbers. Please wait...";
    dataStatus.style.display = "block";
}

export async function fetchFrequentNumbers() {
    try {
        await initFirebase();
        const db = firestoreDB();
        const snapshot = await getDocs(collection(db, "frequentNumbers"));

        if (!container) {
            console.warn("⚠️ frequentNumbersContainer not found in DOM");
            return;
        }

        const gameOrder = ["diamond", "peoples", "bingo", "metro", "international", "gold", "06", "jackpot", 
            "club master", "super", "tota", "mark-ii", "vag", "enugu", "lucky", "fairchance", "royal", 
            "monday special", "lucky-g", "midweek", "fortune", "bonanza", "premier king", "national", "aseda"
        ];
        const gameMap = {};

        snapshot.forEach(doc => {
            const gameName = doc.id;
            const { topNumbers, updatedAt } = doc.data();
            gameMap[gameName] = {topNumbers, updatedAt};
        });

        gameOrder.forEach(gameName => {
            const data = gameMap[gameName];
            if (!data) return;

            const gameBlock = document.createElement("section");
            gameBlock.className = "game-block";

            if (dateUpdate) {
                dateUpdate.textContent = `Last updated: ${new Date(data.updatedAt).toLocaleDateString()}`
            }
            const gameNumbers = data.topNumbers
                .map(num => `<span class="num">${num}</span>`)
                .join(" ");

            gameBlock.innerHTML = `
                <h3>${gameName.toUpperCase()}</h3>
            
                <article class="number-list">
                   ${gameNumbers}
                </article>
            `;

            container.appendChild(gameBlock);
        })
    } catch (err) {
        console.error("🔥 Failed to fetch frequent numbers:", err);

        if (dataStatus) {
            if (err.message.includes("Failed to fetch firebase config")) {
                dataStatus.textContent = "Server Error: Store configuration failed. Please try again later";
            } else if (err.message.includes("Failed to fetch") || err instanceof TypeError) {
                dataStatus.textContent = "Network error: Connection was closed or unreachable.";
            } else {
                dataStatus.textContent = "Unable to load frequent numbers. Please try again.";
            } 
        
            dataStatus.style.display = "block";
        }
        
    } finally {
        if (dataStatus && !container.hasChildNodes()) {
            // No data rendered, likely due to error — keep message visible
            dataStatus.style.display = "block";
        } else if (dataStatus) {
            // Data rendered successfully — hide status
            dataStatus.style.display = "none";
        }
    }
}