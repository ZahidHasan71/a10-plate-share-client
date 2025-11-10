import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Upload } from 'lucide-react';

// ✅ ১. ছবিটিকে 'import' করুন।
// ধরে নিলাম ছবিটি src/assets/banner-img.png এ আছে
import bannerImage from '../assets/banner-img.png';

const Banner = () => {

    return (
        <div className="relative min-h-[650px] bg-gray-50 flex items-center justify-center overflow-hidden">

            {/* Background Gradient & Shape */}
            <div className="absolute inset-0 bg-linear-to-br from-orange-50 to-gray-100 opacity-90"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-200 transform skew-x-12 origin-top-right -translate-x-1/4 opacity-30"></div>

            <div className="max-w-[1400px] mx-auto px-6 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text and CTAs (Left Side) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">
                        Fight Hunger, Reduce Waste
                    </p>
                    <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                        Bridging the Gap: <span className="text-orange-600">Share Food</span>, Build Community.
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-xl lg:max-w-none">
                        PlateShare connects surplus food with those in need, creating a powerful solution for a stronger, more sustainable world. Every share makes a difference.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <Link
                            to="/available-foods"
                            className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 text-lg"
                        >
                            <Search className="h-5 w-5" />
                            Find Available Meals
                        </Link>
                        <Link
                            to="/add-food"
                            className="px-8 py-4 border-2 border-orange-500 text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300 inline-flex items-center gap-2 text-lg"
                        >
                            <Upload className="h-5 w-5" />
                            Donate Your Surplus
                        </Link>
                    </div>
                </motion.div>

                {/* Image (Right Side) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden lg:flex justify-center"
                >
                    <div className="w-[550px] h-[450px] bg-gray-200 rounded-3xl shadow-2xl overflow-hidden relative border-4 border-white">
                        <img
                            src={bannerImage}
                            alt="Hands sharing a plate of food, symbolizing food donation"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-linear-to-t from-gray-50 to-transparent"></div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Banner;