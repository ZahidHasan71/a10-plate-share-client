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

const googleProvider = new GoogleAuthProvider();
const SERVER_URL = "http://localhost:5000";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔥 Save user into MongoDB
    const saveUserToDB = async (currentUser) => {
        const newUser = {
            email: currentUser.email,
            name: currentUser.displayName,
            photoUrl: currentUser.photoURL
        };

        await fetch(`${SERVER_URL}/users`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newUser)
        });
    };

    // Email Registration
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update profile
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
    };

    // Email login
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign In
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Logout
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                await saveUserToDB(currentUser);
            }
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        createUser,
        updateUserProfile,
        signInUser,
        signInWithGoogle,
        signOutUser,
        user,
        loading,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
