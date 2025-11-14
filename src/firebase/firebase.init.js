// src/firebase/firebase.init.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPpoIFPzcy-odPqrJVqR2SwLZ0I22Xjb4",
  authDomain: "a10-plate-share.firebaseapp.com",
  projectId: "a10-plate-share",
  storageBucket: "a10-plate-share.appspot.com",
  messagingSenderId: "374743002099",
  appId: "1:374743002099:web:ee5c4e00ea7c9dcfd24086"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
