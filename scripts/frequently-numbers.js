import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { firestoreDB, initFirebase } from '../firebaseConfig.js'; 

window.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("frequentNumbersContainer");

    try {
        await initFirebase();
        const db = firestoreDB();
        const snapshot = await getDocs(collection(db, "frequentNumbers"));

        snapshot.forEach(doc => {
            const gameName = doc.id;
            const { topNumbers, updatedAt } = doc.data();

            const gameBlock = document.createElement("div");
            gameBlock.className = "game-block";
            gameBlock.innerHTML = `
                <h3>${gameName.upperCase()}</h3>
                <p>Updated: ${new Date(updatedAt).toLocaleDateString()}</p>

                <article class="number-list">
                    ${topNumbers.map(num => `
                        <span class="num">${num}</span>).join(" ")
                        `
                    )}
                </article>
            `;

            container.appendChild(gameBlock);
        })
    } catch (err) {
        console.error("🔥 Failed to fetch frequent numbers:", err);
    }
});
