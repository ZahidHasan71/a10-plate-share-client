import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    // 🔍 Fetch foods with optional search
    const fetchFoods = (search = '') => {
        setLoading(true);
        fetch(`https://a10-plate-share-server.vercel.app/foods?search=${search}`)
            .then(res => res.json())
            .then(data => {
                setFoods(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchFoods(); // Initial load
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFoods(searchText);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">All Available Foods</h2>

            {/* 🔍 Search Bar */}
            <form onSubmit={handleSearch} className="flex justify-center mb-10">
                <input
                    type="text"
                    placeholder="Search by food name..."
                    className="input input-bordered w-full max-w-xs"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="submit" className="btn ml-2 bg-orange-500 text-white">Search</button>
            </form>

            {/* 🔄 Loading Spinner */}
            {loading ? (
                <div className="text-center text-xl py-10">Loading...</div>
            ) : foods.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {foods.map(food => (
                        <FoodCard key={food._id} food={food} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-500">No foods found for your search.</p>
            )}
        </div>
    );
};

export default AvailableFoods;