// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { LogOut, UtensilsCrossed } from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const location = useLocation();

    const handleSignOut = () => {
        signOutUser()
            .then(() => toast.success("Successfully signed out!"))
            .catch((error) => toast.error(error.message || "Logout failed."));
    };

    const navLinkClass = ({ isActive }) =>
        isActive ? "text-orange-500 font-semibold" : "text-gray-700 font-semibold";

    const mobileMenuLinks = (
        <>
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/available-foods" className={navLinkClass}>Available Foods</NavLink></li>

            {user && (
                <>
                    <li><NavLink to="/add-food" className={navLinkClass}>Add Food</NavLink></li>
                    <li><NavLink to="/manage-my-foods" className={navLinkClass}>Manage My Foods</NavLink></li>
                    <li><NavLink to="/my-food-requests" className={navLinkClass}>My Food Requests</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">

                    {/* -------- LEFT: LOGO -------- */}
                    <Link to="/" className="flex items-center gap-1 text-xl font-bold text-gray-900">
                        <UtensilsCrossed className="h-6 w-6 text-green-600" />
                        Plate<span className="text-orange-500">Share</span>
                    </Link>

                    {/* -------- DESKTOP MENU -------- */}
                    <div className="hidden lg:flex flex-1 justify-center">
                        <ul className="flex gap-6 font-semibold">
                            {mobileMenuLinks}
                        </ul>
                    </div>

                    {/* -------- DESKTOP PROFILE -------- */}
                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full ring ring-orange-500 ring-offset-2">
                                        <img src={user.photoURL || 'https://i.ibb.co/3y77wF2/default-avatar.png'} />
                                    </div>
                                </div>

                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 z-10 shadow bg-base-100 rounded-box w-52">
                                    <li className="font-bold text-gray-700 pointer-events-none p-2 border-b truncate">
                                        {user.displayName || user.email}
                                    </li>

                                    <li><NavLink to="/add-food" className={navLinkClass}>Add Food</NavLink></li>
                                    <li><NavLink to="/manage-my-foods" className={navLinkClass}>Manage My Foods</NavLink></li>
                                    <li><NavLink to="/my-food-requests" className={navLinkClass}>My Food Requests</NavLink></li>

                                    <li>
                                        <button onClick={handleSignOut} className="text-red-500">
                                            <LogOut size={14} /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login" className="btn bg-orange-500 text-white font-semibold">Login</Link>
                        )}
                    </div>

                    {/* -------- MOBILE SECTION -------- */}
                    <div className="lg:hidden flex items-center gap-3">

                        {/* --- MOBILE MENU ICON --- */}
                        {/* --- MOBILE MENU ICON --- */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle transition-transform duration-300 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 hover:text-orange-500" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </div>

                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-4 shadow-lg bg-white rounded-xl w-64 animate__animated animate__fadeInDown">
                                {mobileMenuLinks}
                            </ul>
                        </div>

                        {/* --- MOBILE PROFILE --- */}
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full ring ring-orange-500 ring-offset-2">
                                        <img src={user.photoURL || 'https://i.ibb.co/3y77wF2/default-avatar.png'} />
                                    </div>
                                </div>

                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-56">

                                    {/* User Info */}
                                    <div className="text-center border-b pb-3 mb-3">
                                        <img className="w-16 h-16 mx-auto rounded-full mb-1"
                                            src={user.photoURL || 'https://i.ibb.co/3y77wF2/default-avatar.png'} />
                                        <p className="font-semibold">{user.displayName || "User"}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>

                                    {/* Menu Links */}
                                    {mobileMenuLinks}

                                    <li className="mt-2">
                                        <button onClick={handleSignOut} className="text-red-500 w-full flex items-center gap-2">
                                            <LogOut size={14} /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login" className="btn bg-orange-500 text-white font-semibold">Login</Link>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;