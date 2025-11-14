// src/layout/MainLayout.jsx
import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

const MainLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="grow">
                {isLoading ? (
                    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <Outlet />
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;