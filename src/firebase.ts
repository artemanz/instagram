// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdtXOymstgFEGmhdQ8S0vdgG0SBoHmOqs",
  authDomain: "instagram-cefa6.firebaseapp.com",
  projectId: "instagram-cefa6",
  storageBucket: "instagram-cefa6.appspot.com",
  messagingSenderId: "623548860302",
  appId: "1:623548860302:web:f60a2dff337058b51f46df",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);
const storage = getStorage();

export { firebase, db, auth, storage };
