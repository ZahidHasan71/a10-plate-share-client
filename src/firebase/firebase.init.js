// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPpoIFPzcy-odPqrJVqR2SwLZ0I22Xjb4",
  authDomain: "a10-plate-share.firebaseapp.com",
  projectId: "a10-plate-share",
  storageBucket: "a10-plate-share.firebasestorage.app",
  messagingSenderId: "374743002099",
  appId: "1:374743002099:web:ee5c4e00ea7c9dcfd24086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;