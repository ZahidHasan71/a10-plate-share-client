// src/pages/Register.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // DEFAULT REGISTRATION (Email + Password)
    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        createUser(data.email, data.password)
            .then(() => {
                return updateUserProfile(data.name, data.photoUrl);
            })
            .then(() => {
                toast.success("Registration Successful!");
                navigate('/');
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    // Google Registration
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Google Sign In Successful!");
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-full max-w-md shadow-2xl bg-white">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center text-orange-500 flex items-center justify-center gap-2">
                        <UserPlus className='w-6 h-6' /> Create PlateShare Account
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 mt-6'>
                        <div>
                            <label className="label font-medium">Full Name</label>
                            <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full" />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>

                        <div>
                            <label className="label font-medium">Photo URL</label>
                            <input type="text" {...register("photoUrl")} className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label font-medium">Email</label>
                            <input type="email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full" />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>

                        <div>
                            <label className="label font-medium">Password</label>
                            <input type="password" {...register("password", { required: "Password required", minLength: 6 })} className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label className="label font-medium">Confirm Password</label>
                            <input type="password" {...register("confirmPassword", { required: true })} className="input input-bordered w-full" />
                        </div>

                        <button type="submit" className="btn bg-green-600 text-white w-full mt-4">Register</button>
                    </form>

                    <div className="divider">OR</div>

                    <button onClick={handleGoogleSignIn} className="btn btn-outline border-orange-500 text-orange-500 w-full">
                        Register with Google
                    </button>

                    <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-green-600">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
