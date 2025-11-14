// src/contexts/AuthProvider.jsx
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import auth from '../firebase/firebase.init';
// import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
const SERVER_URL = 'http://localhost:5000'; // ✅ তোমার সার্ভার URL

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // =========================
    // 🧩 MongoDB User Save Helper
    // =========================
    // const saveUserToDB = async (currentUser) => {
    //     if (!currentUser?.email) return;

    //     const userToSave = {
    //         email: currentUser.email,
    //         name: currentUser.displayName || 'Anonymous User',
    //         photoURL: currentUser.photoURL || '',
    //     };

    //     try {
    //         await axios.post(`${SERVER_URL}/users`, userToSave);
    //     } catch (error) {
    //         console.error("❌ Failed to save user to DB:", error.message);
    //     }
    // };

    // =========================
    // 🔐 AUTH METHODS
    // =========================

    // Email Registration createUser
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update Profile
    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        });
    };

    // sign in with Email & Password Login
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Login
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then(result => {
                // const currentUser = result.user;
                // saveUserToDB(currentUser); // ✅ DB তে ইউজার সেভ
                return result;
            })
            .catch(error => {
                setLoading(false);
                throw error;
            });
    };

    // Logout
    const signOutUser = async () => {
        setLoading(true);
        return signOut(auth);
    };

    // =========================
    //  Auth Observer
    // =========================
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser?.email) {
                // await saveUserToDB(currentUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // =========================
    // 📦 Context Value
    // =========================
    const authInfo = {
        createUser,
        updateUserProfile,
        signInUser,
        signInWithGoogle,
        signOutUser,
        user,
        loading,
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
