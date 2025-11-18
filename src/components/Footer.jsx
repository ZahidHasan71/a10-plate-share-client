import React from 'react';
import { Link } from 'react-router-dom';
import { BsTwitterX } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { UtensilsCrossed } from 'lucide-react';


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 p-12 shadow-2xl border-t border-gray-800">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* 1. Logo & Mission */}
                <aside className="col-span-1">
                    <Link to="/" className="flex items-center gap-2 text-3xl font-extrabold text-white transition duration-300 hover:text-orange-400">
                        <UtensilsCrossed className="h-6 w-6 text-green-600" />
                        <span>
                            Plate<span className="text-orange-400">Share</span>
                        </span>
                    </Link>
                    <p className="mt-4 text-sm max-w-xs text-gray-400 leading-relaxed">
                        Sharing surplus food with the community to reduce waste, fight hunger, and build a stronger, more sustainable world.
                    </p>
                </aside>

                {/* 2. Quick Links */}
                <nav className="col-span-1">
                    <h6 className="text-xl font-semibold text-white mb-4 border-b border-orange-400 pb-1 inline-block">Quick Links</h6>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/" className="text-gray-400 hover:text-orange-400 transition duration-200 block">Home</Link>
                        </li>
                        <li>
                            <Link to="/available-foods" className="text-gray-400 hover:text-orange-400 transition duration-200 block">Available Foods</Link>
                        </li>
                        <li>
                            <Link to="/add-food" className="text-gray-400 hover:text-orange-400 transition duration-200 block">Add Food</Link>
                        </li>
                        <li>
                            <Link to="/login" className="text-gray-400 hover:text-orange-400 transition duration-200 block">Login / Register</Link>
                        </li>
                    </ul>
                </nav>

                {/* 3. Contact Information */}
                <nav className="col-span-1">
                    <h6 className="text-xl font-semibold text-white mb-4 border-b border-orange-400 pb-1 inline-block">Contact Info</h6>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <MdEmail className="text-orange-400 h-5 w-5 mt-1 shrink-0" />
                            <span className="text-gray-400">contact@plateshare.com</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <IoMdCall className="text-orange-400 h-5 w-5 mt-1 shrink-0" />
                            <span className="text-gray-400">+880 1234-567890</span>
                        </li>
                        <li className="text-gray-400 mt-4 pt-2">
                            123 Community Drive, Waste-Free City, Earth
                        </li>
                    </ul>
                </nav>

                {/* 4. Connect With Us (Social Media) */}
                <nav className="col-span-1">
                    <h6 className="text-xl font-semibold text-white mb-4 border-b border-orange-400 pb-1 inline-block">Connect With Us</h6>
                    <div className="flex gap-5">
                        <a href="#" className="text-gray-400 hover:text-orange-400 transition duration-300 transform hover:scale-110" aria-label="Facebook">
                            <BsFacebook />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-orange-400 transition duration-300 transform hover:scale-110" aria-label="Twitter">
                            <BsTwitterX />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-orange-400 transition duration-300 transform hover:scale-110" aria-label="Instagram">
                            <BsInstagram />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-orange-400 transition duration-300 transform hover:scale-110" aria-label="LinkedIn">
                            <BsLinkedin />
                        </a>
                    </div>
                </nav>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-12 border-t border-gray-800 pt-6 text-center text-sm">
                <p className="text-gray-500">
                    © 2025 PlateShare. All rights reserved. Made with <span className="text-red-500 font-bold text-lg">❤️</span> for the community.
                </p>
            </div>
        </footer>
    );
};

export default Footer;