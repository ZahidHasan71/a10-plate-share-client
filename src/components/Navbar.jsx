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
            .then(() => {
                toast.success("Successfully signed out!");
            })
            .catch((error) => {
                console.error("Logout Error:", error);
                toast.error(error.message || "Logout failed.");
            });
    };

    const links = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>Home</NavLink></li>
            <li><NavLink to="/available-foods" className={({ isActive }) => isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>Available Foods</NavLink></li>

            {user && (
                <>
                    <li><NavLink to="/add-food" className={({ isActive }) => isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>Add Food</NavLink></li>
                    <li>
                        <NavLink
                            to="/manage-my-foods"
                            className={({ isActive }) => (isActive || location.pathname.startsWith('/update-food')) ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}
                        >
                            Manage My Foods
                        </NavLink>
                    </li>
                    <li><NavLink to="/my-food-requests" className={({ isActive }) => isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>My Food Requests</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo */}
                    <div className="flex items-center shrink-0">
                        <Link to="/" className="flex items-center gap-1 text-xl font-bold text-gray-900 hover:bg-transparent">
                            <UtensilsCrossed className="h-6 w-6 text-green-600" />
                            Plate<span className="text-orange-500">Share</span>
                        </Link>
                    </div>

                    {/* Center: Links (Desktop only) */}
                    <div className="hidden lg:flex flex-1 justify-center">
                        <ul className="flex gap-6 font-semibold text-gray-700">
                            {links}
                        </ul>
                    </div>

                    {/* Right: Avatar or Login */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2" title={user.displayName || user.email}>
                                        <img
                                            alt={user.displayName || "User"}
                                            src={user.photoURL || 'https://i.ibb.co/3y77wF2/default-avatar.png'}
                                        />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="font-bold text-gray-700 pointer-events-none p-2 border-b truncate">
                                        {user.displayName || user.email || "User"}
                                    </li>
                                    <li>
                                        <button onClick={handleSignOut} className="text-red-500">
                                            <LogOut className="h-4 w-4" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login" className="btn bg-green-600 text-white hover:bg-green-700 font-semibold">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="dropdown dropdown-end lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
                            {links}
                            {!user && <li><Link to="/login" className="text-green-600 font-bold">Login</Link></li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;