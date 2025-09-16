import { initFirebase, Auth, firestoreDB } from "../firebaseConfig.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { fetchFrequentNumbers } from "./frequently-numbers.js";
import { fetchClassificationChart } from "./classification-data.js"; 

const main = document.querySelector("#main-el");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await initFirebase();

        onAuthStateChanged(Auth(), async (user) => {
            if (!user) {
                window.location.href = "index.html";
                return;
            }

            const userRef = doc(firestoreDB(), "users", user.uid());
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await signOut(Auth());
                window.location.href = "https://app.visuallottoboard.com/sign-up";
                return;
            }

            const subEndDate = userSnap.data().subscriptionExpiry;
            const subEnd = new Date(subEndDate);
            const today = new Date();

            const subExpired = subEnd < today;

            if (subExpired) {
                alert("Your subscription has expired. Please renew to continye.");
                await signOut(Auth());
                window.location.href = "https://app.visuallottoboard.com/subscription";
            }

            fetchFrequentNumbers();
            fetchClassificationChart();
        });
    } catch (err) {
        console.error("🔥 Firebase init failed:", err.message);
        showErrorMessage("Server Error: Store configuration failed. Please try again later.")
    }
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