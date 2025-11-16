import React from 'react';
import { useLoaderData } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
const AvailableFoods = () => {

    const foods = useLoaderData();
    console.log(foods);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">All Available Foods</h2>

            {foods.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {foods.map(food => (

                        <FoodCard key={food._id} food={food} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-500">No foods are available for sharing right now.</p>
            )}
        </div>
    );
};

export default AvailableFoods;