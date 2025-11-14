import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center py-12">
            <Loader className="h-10 w-10 animate-spin text-green-600" />
            <span className="ml-3 text-lg text-gray-600">Loading data...</span>
        </div>
    );
};

export default LoadingSpinner;