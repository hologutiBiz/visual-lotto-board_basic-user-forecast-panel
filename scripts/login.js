import { initFirebase, firestoreDB,  Auth } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async () => {
    await initFirebase();

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const loginError = document.getElementById("loginError");

        try {
            const userCredential = await signInWithEmailAndPassword(Auth(), email, password);
            const user = userCredential.user;

            const userRef = doc(firestoreDB(), "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                loginError.textContent = "User not found";
                throw new Error("User not found");
            }

            const role = userSnap.data().role;
            if (role === "free") {
                loginError.textContent = 'Access denied. Upgrade your account "Basic" or "Pro" to continue.';
                loginError.style.display = "block";
                return;
            }

            loginError.style.display = "none";
            console.log("Login successful");
            window.location.href = "/page.html";
        } catch (err) {
            console.error("Login failed.", err.message);
            loginError.textContent = err.message.includes("auth")
                ? "Invalid email or password"
                : err.message;
            loginError.style.display = "block";
        }
    });
});
