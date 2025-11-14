// src/pages/Login.jsx
import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LogIn, Mail } from 'lucide-react';

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Email/Password Login
    const onSubmit = (data) => {
        signInUser(data.email, data.password)
            .then(() => {
                toast.success("Login Successful!");
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message || "Login failed! Check credentials.");
            });
    };

    // Google Sign In
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {

                toast.success("Google Sign In Successful!");
                navigate('/');
                console.log(result.user);

                const newUser = {
                    email: result.user.email,
                    name: result.user.displayName,
                    photoUrl: result.user.photoURL
                }
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => console.log('data after user save', data));
            })
            .catch(error => {
                toast.error(error.message || "Google Sign In Failed!");
            });
    };

    return (
        <div className="min-h-[calc(100vh-100px)] bg-base-200 flex flex-col items-center justify-center py-10">
            <div className="card w-full max-w-md shadow-2xl bg-white">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center text-green-700 flex items-center justify-center gap-2"><LogIn className='w-6 h-6' /> Login to PlateShare</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-6'>
                        <div>
                            <label className="label font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="example@mail.com"
                                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label className="label font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="******"
                                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="btn bg-orange-500 text-white hover:bg-orange-600 w-full font-semibold">Login</button>
                    </form>

                    <div className="divider text-sm">or continue with</div>

                    {/* Google Login */}
                    <button onClick={handleGoogleSignIn} className="btn btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-full flex items-center justify-center gap-2">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        <span className="text-sm font-semibold">Login with Google</span>
                    </button>

                    {/* Registration Link */}
                    <p className="text-sm text-center mt-4">
                        Don't have an account? <Link to="/register" className="text-orange-500 font-bold hover:underline">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;