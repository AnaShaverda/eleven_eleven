import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0AalH0HYFz19O-W2lB2JNZo1LP35zSj0",
  authDomain: "digital-gift-app.firebaseapp.com",
  projectId: "digital-gift-app",
  storageBucket: "digital-gift-app.firebasestorage.app",
  messagingSenderId: "111188238306",
  appId: "1:111188238306:web:984d52f41d7155a0f663bb",
  measurementId: "G-LZ4EG7Y0YE",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
