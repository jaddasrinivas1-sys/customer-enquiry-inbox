// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfBHjHy8qz8YhOE25BkRyvJ-sDjFmJUrA",
  authDomain: "enquiry-app-2a450.firebaseapp.com",
  projectId: "enquiry-app-2a450",
  storageBucket: "enquiry-app-2a450.firebasestorage.app",
  messagingSenderId: "221846971750",
  appId: "1:221846971750:web:ad8b3b14deffa65ea8d4a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get HTML elements
const form = document.getElementById("enquiryForm");
const statusText = document.getElementById("status");

// Submit handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const messageInput = document.getElementById("message").value;

  try {
    await addDoc(collection(db, "enquiries"), {
      name: nameInput,
      email: emailInput,
      message: messageInput,
      status: "New",
      createdAt: serverTimestamp()
    });

    statusText.innerText = "✅ Enquiry sent successfully!";
    form.reset();
  } catch (err) {
    console.error(err);
    statusText.innerText = "❌ Error sending enquiry";
  }
});
