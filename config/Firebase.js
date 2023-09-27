// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgNijhmZ8y_tdtE4bnqaoKsj6P0jNkFME",
  authDomain: "test-50529.firebaseapp.com",
  projectId: "test-50529",
  storageBucket: "test-50529.appspot.com",
  messagingSenderId: "340380028944",
  appId: "1:340380028944:web:2483ca0d4c55c06b187a95",
  measurementId: "G-698XFK5Q1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const customerCollectionRef = collection(db,"customers")