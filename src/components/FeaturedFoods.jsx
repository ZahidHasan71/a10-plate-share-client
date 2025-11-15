import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import { Link } from 'react-router';
import LoadingSpinner from './LoadingSpinner';
import { motion } from 'framer-motion';

const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const MotionDiv = motion.div;


    useEffect(() => {
        fetch('http://localhost:5000/featured-foods')
            .then(res => res.json())
            .then(data => {
                setFeaturedFoods(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching featured foods:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }


    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Featured Foods</h2>
            <p className="text-lg text-center text-gray-600 mb-8">Discover the largest food donations available right now in your community</p>
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredFoods.map(featuredFood => (
                    <FoodCard key={featuredFood._id} food={featuredFood} />
                ))}
            </MotionDiv>
            <div className="text-center mt-20">
                <Link to="/available-foods" className=" bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded">View All Foods</Link>
            </div>
        </div>

    );

};

export default FeaturedFoods;