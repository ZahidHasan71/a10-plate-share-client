// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, HeartHandshake, Zap } from 'lucide-react';
import Banner from '../components/Banner';
import FeaturedFoods from '../components/FeaturedFoods';

const Home = () => {
    const MotionDiv = motion.div;

    const featureVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (

        <div >
            {/* 1. Hero Section with Animation */}
            <Banner />
            <FeaturedFoods></FeaturedFoods>
            {/* 2. Feature Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Post Food</h2>
                <p className="text-lg text-center text-gray-600 mb-8">Join our food sharing community in three simple steps</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MotionDiv
                        variants={featureVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="p-8 bg-white rounded-xl shadow-xl text-center border-t-4 border-orange-500"
                    >
                        <HeartHandshake className='w-12 h-12 text-orange-500 mx-auto mb-4' />
                        <h3 className="text-xl font-bold mb-3">Donate Easily</h3>
                        <p className="text-gray-600">Post your surplus food items with details like quantity and expiration date in minutes.</p>
                    </MotionDiv>

                    <MotionDiv
                        variants={featureVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 bg-white rounded-xl shadow-xl text-center border-t-4 border-green-600"
                    >
                        <Zap className='w-12 h-12 text-green-600 mx-auto mb-4' />
                        <h3 className="text-xl font-bold mb-3">Find Food</h3>
                        <p className="text-gray-600">Browse available food listings and send a request directly to the donor.</p>
                    </MotionDiv>

                    <MotionDiv
                        variants={featureVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.4 }}
                        className="p-8 bg-white rounded-xl shadow-xl text-center border-t-4 border-gray-800"
                    >
                        <Utensils className='w-12 h-12 text-gray-800 mx-auto mb-4' />
                        <h3 className="text-xl font-bold mb-3">Collect Food</h3>
                        <p className="text-gray-600">Contribute to a sustainable environment by ensuring good food doesn't end up in the bin.</p>
                    </MotionDiv>
                </div>
            </section>
            {/* 3. Our Mission & Community Stats Section */}
            {/* 3. Our Mission & Community Stats Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white mt-10">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center text-gray-800 mb-3"
                    >
                        Our Mission
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto"
                    >
                        PlateShare is committed to reducing food waste and building a caring community
                        where every plate matters.
                    </motion.p>

                    {/* Stats with Motion Stagger */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.2 } }
                        }}
                    >

                        {/* Card 1 */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="p-8 rounded-2xl shadow-xl bg-white/70 backdrop-blur-lg border border-orange-200 
                           hover:shadow-2xl transition-all hover:-translate-y-2"
                        >
                            <h3 className="text-5xl font-extrabold text-gray-900">5,000+</h3>
                            <p className="text-gray-600 mt-3 text-lg">Meals Donated</p>
                            <div className="mt-4 w-1/3 h-1 gradient-to-r from-orange-500 to-orange-300 rounded-full"></div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="p-8 rounded-2xl shadow-xl bg-white/70 backdrop-blur-lg border border-green-200
                           hover:shadow-2xl transition-all hover:-translate-y-2"
                        >
                            <h3 className="text-5xl font-extrabold text-gray-900">1,200+</h3>
                            <p className="text-gray-600 mt-3 text-lg">Active Donors</p>
                            <div className="mt-4 w-1/3 h-1 gradient-to-r from-green-600 to-green-400 rounded-full"></div>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="p-8 rounded-2xl shadow-xl bg-white/70 backdrop-blur-lg border border-gray-300
                           hover:shadow-2xl transition-all hover:-translate-y-2"
                        >
                            <h3 className="text-5xl font-extrabold text-gray-900">8,700+</h3>
                            <p className="text-gray-600 mt-3 text-lg">Requests Fulfilled</p>
                            <div className="mt-4 w-1/3 h-1 gradient-to-r from-gray-800 to-gray-500 rounded-full"></div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Home;