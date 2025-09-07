import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-SERVICE.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";

let firestore;

export async function initFirebase(appName = "basicUserWebApp") {
    try {
        const res = await fetch(`https://firebase-config-key.netlify.app/.netlify/functions/htmlProject?app=${appName}`);
        if (!res.ok) throw new Error ("Failed to fetch firebase config");

        const firebaseConfig = await res.json();
        if (!firebaseConfig.projectId) throw new Error("Missing project Id");

        const app = initializeApp(firebaseConfig);
        firestore = getFirestore(app);
        const analytics = getAnalytics(app);

        console.log("✅ Firebase initialized with App Check");
  } catch (error) {
    console.error("🔥 Firebase init failed:", error)
  }
}

export function firestoreDB() {
    return firestore;
}