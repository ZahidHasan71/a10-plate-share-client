import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';

const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/featured-foods')
            .then(res => res.json())
            .then(data => setFeaturedFoods(data))
            .catch(err => console.error('Error fetching featured foods:', err));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Foods</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredFoods.map(featuredFood => (
                    <FoodCard key={featuredFood._id} food={featuredFood} />
                ))}
            </div>
        </div>

    );

};

export default FeaturedFoods;