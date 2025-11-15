import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ProductDetails = () => {
    const product = useLoaderData();

    const {
        foodName,
        foodImage,
        quantity,
        pickupLocation,
        expireDate,
        additionalNotes,
        donatorName,
        email,
        donatorImage,
        foodStatus
    } = product;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Image Section */}
                <img
                    src={foodImage}
                    alt={foodName}
                    className="rounded-lg w-full h-80 object-cover shadow-md"
                />

                {/* Info Section */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{foodName}</h2>
                    {/* Donator Info */}
                    <div className="flex items-center gap-4 mt-6 bg-gray-50 p-4 rounded-lg">
                        <img
                            src={donatorImage}
                            alt={donatorName}
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-800">{donatorName}</p>
                            <p className="text-xs text-gray-500">{email}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-2"><strong>Quantity:</strong> {quantity}</p>
                    <p className="text-gray-600 mb-2"><strong>Pickup Location:</strong> {pickupLocation}</p>
                    <p className="text-gray-600 mb-2"><strong>Expires:</strong> {expireDate}</p>
                    <p className="text-gray-600 mb-4"><strong>Notes:</strong> {additionalNotes}</p>

                    {/* Status Badge */}
                    <div className="mt-6">
                        <span className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${foodStatus === 'available'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {foodStatus === 'available' ? 'Available' : 'Not Available'}
                        </span>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg mt-4 pointer">Request Food</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;