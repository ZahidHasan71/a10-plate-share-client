
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
            <AlertTriangle className='w-20 h-20 text-red-500 mb-6' />
            <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-8">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-10">
                Sorry, the page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <Link to="/" className="btn bg-green-600 text-white hover:bg-green-700 btn-lg font-bold">
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;