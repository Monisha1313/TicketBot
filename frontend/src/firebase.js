import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCr8BxpFudwwDGaYzWw6WZC0096yZcpTQw",
  authDomain: "museum-chatbot-dcac5.firebaseapp.com",
  projectId: "museum-chatbot-dcac5",
  storageBucket: "museum-chatbot-dcac5.firebasestorage.app",
  messagingSenderId: "1057456590659",
  appId: "1:1057456590659:web:86f667285fb15e816ea9f6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();