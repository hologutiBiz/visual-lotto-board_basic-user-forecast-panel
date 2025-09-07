import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";

let auth, firestore;

export async function initFirebase(appName = "basicUserWebApp") {
    try {
        const res = await fetch(`https://firebase-config-key.netlify.app/.netlify/functions/htmlProject?app=${appName}`);
        if (!res.ok) throw new Error ("Failed to fetch firebase config");

        const firebaseConfig = await res.json();
        if (!firebaseConfig.projectId) throw new Error("Missing project Id");

        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        firestore = getFirestore(app);
        const analytics = getAnalytics(app);

        console.log("✅ Firebase initialized ");
  } catch (error) {
    console.error("🔥 Firebase init failed:", error)
    throw error;
  }
}

export function firebaseAuth() {
  return auth;
}

export function firestoreDB() {
    return firestore;
}