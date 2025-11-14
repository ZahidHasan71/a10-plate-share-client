// src/pages/Register.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import axios from 'axios';
import { UserPlus } from 'lucide-react';


const Register = () => {
    const { signInWithGoogle, } = useContext(AuthContext);
    const { register, formState: { errors } } = useForm();
    const navigate = useNavigate();


    // Google Sign In (Handled in AuthProvider, includes auto-login)
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
                    <h2 className="text-3xl font-bold text-center text-orange-500 flex items-center justify-center gap-2"><UserPlus className='w-6 h-6' /> Create PlateShare Account</h2>

                    <form className='space-y-3 mt-6'>
                        {/* Name */}
                        <div>
                            <label className="label font-medium">Full Name</label>
                            <input type="text" placeholder="John Doe" className="input input-bordered w-full" {...register("name", { required: "Name is required" })} />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="label font-medium">Photo URL (Optional)</label>
                            <input type="text" placeholder="http://photo.com/me.jpg" className="input input-bordered w-full" {...register("photoUrl")} />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label font-medium">Email</label>
                            <input type="email" placeholder="example@mail.com" className="input input-bordered w-full" {...register("email", { required: "Email is required" })} />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label font-medium">Password</label>
                            <input type="password" placeholder="******" className="input input-bordered w-full" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="label font-medium">Confirm Password</label>
                            <input type="password" placeholder="******" className="input input-bordered w-full" {...register("confirmPassword", { required: "Confirm Password is required" })} />
                            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
                        </div>

                        <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700 w-full mt-4 font-semibold">Register</button>
                    </form>

                    <div className="divider text-sm">or continue with</div>

                    {/* Google Registration */}
                    <button onClick={handleGoogleSignIn} className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white w-full flex items-center justify-center gap-2">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        <span className="text-sm font-semibold">Register with Google</span>
                    </button>

                    <p className="text-sm text-center mt-4">
                        Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;