import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAn7iYtT50FRFxt6r4EEe9rXG4vk4MOUs",
  authDomain: "test-project-15d93.firebaseapp.com",
  projectId: "test-project-15d93",
  storageBucket: "test-project-15d93.appspot.com",
  messagingSenderId: "1007916904999",
  appId: "1:1007916904999:web:8555a4320f0c0e98e7d402"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Storage = getStorage()
const GoogleProvider = new GoogleAuthProvider();

export { auth, GoogleProvider, Storage }