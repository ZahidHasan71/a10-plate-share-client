import React from 'react';

const FoodCard = ({ food }) => {
    const { foodName,
        foodImage,
        quantity,
        pickupLocation,
        expireDate,
        donatorName,
        foodStatus,
        donatorImage

    } = food;

    return (
        <div className="card bg-white shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <figure className="px-3 pt-3 h-60 overflow-hidden">
                <img
                    src={foodImage}
                    alt={foodName}
                    className="rounded-xl object-cover w-full h-full"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-semibold text-black">{foodName}</h2>
                <div className="flex items-center space-x-2">
                    <img src={donatorImage} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <p className="text-sm font-medium text-gray-800">{donatorName}</p>
                </div>
                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                <p className="text-sm text-gray-600">Pickup: {pickupLocation}</p>
                <p className="text-sm text-gray-600">Expires: {expireDate}</p>
                <div className="card-actions">
                    {foodStatus === 'available' ? (
                        <button className="bg-green-200 hover:bg-green-600 text-green-600 px-3 py-1 rounded-2xl">Available</button>
                    ) : (
                        <button className="btn btn-warning btn-sm">Not Available</button>
                    )}
                </div>
                <button className="btn bg-orange-500 btn-md text-white">View Details</button>
            </div>
        </div>


    );
};

export default FoodCard;