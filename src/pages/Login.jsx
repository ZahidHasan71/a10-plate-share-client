// src/pages/Login.jsx
import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Default Login
    const onSubmit = data => {
        signInUser(data.email, data.password)
            .then(() => {
                toast.success("Login Successful!");
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err.message));
    };

    // Google Login
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Google Login Successful!");
                navigate('/');
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="min-h-screen bg-base-200 flex justify-center items-center">
            <div className="card w-full max-w-md bg-white shadow-xl">
                <div className="card-body">
                    <h2 className="text-3xl text-center font-bold text-green-600">Login to PlateShare</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">

                        <div>
                            <label className="label font-medium">Email</label>
                            <input {...register("email", { required: true })} className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label font-medium">Password</label>
                            <input type="password" {...register("password", { required: true })} className="input input-bordered w-full" />
                        </div>

                        <button type="submit" className="btn bg-orange-500 text-white w-full">Login</button>
                    </form>

                    <div className="divider">OR</div>

                    <button onClick={handleGoogleSignIn} className="btn btn-outline border-green-600 text-green-600 w-full">
                        Login with Google
                    </button>

                    <p className="text-center mt-3">
                        Don't have an account? <Link to="/register" className="text-orange-500">Register here</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;
