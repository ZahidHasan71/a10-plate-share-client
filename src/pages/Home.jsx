// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, HeartHandshake, Zap } from 'lucide-react';
import Banner from '../components/Banner';

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

            {/* 2. Feature Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
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
                        <h3 className="text-xl font-bold mb-3">Quick Requests</h3>
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
                        <h3 className="text-xl font-bold mb-3">Reduce Waste</h3>
                        <p className="text-gray-600">Contribute to a sustainable environment by ensuring good food doesn't end up in the bin.</p>
                    </MotionDiv>
                </div>
            </section>
        </div>
    );
};

export default Home;