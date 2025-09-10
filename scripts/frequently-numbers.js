import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { firestoreDB, initFirebase } from '../firebaseConfig.js'; 

window.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("frequentNumbersContainer");

    try {
        await initFirebase();
        const db = firestoreDB();
        const snapshot = await getDocs(collection(db, "frequentNumbers"));

        const prefferedOrder = ["diamond", "peoples", "bingo", "metro", "international", "gold", "06", "jackpot", 
            "club master", "super", "tota", "mark-ii", "vag", "enugu", "lucky", "fairchance", "royal", 
            "monday special", "lucky-g", "midweek", "fortune", "bonanza", "premier king", "national", "aseda"
        ];
        const gameMap = {};

        snapshot.forEach(doc => {
            const gameName = doc.id;
            const { topNumbers, updatedAt } = doc.data();
            gameMap[gameName] = {topNumbers, updatedAt};
        });

        // After snapshot.forEach and rendering
loading.style.display = "none";


        prefferedOrder.forEach(gameName => {
            const data = gameMap[gameName];
            if (!data) return;

            const gameBlock = document.createElement("section");
            gameBlock.className = "game-block";

            const dateUpdate = document.querySelector(".frequent-numbers-list .date-updated");
            dateUpdate.textContent = `Last updated: ${new Date(data.updatedAt).toLocaleDateString()}`

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
    }
});
