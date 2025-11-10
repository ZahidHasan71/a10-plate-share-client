import React from 'react';
import { Link } from 'react-router';

const Register = () => {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Register</h2>

                    <form>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" className="input" placeholder="Name" />
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" />
                            <label className="label">
                                <span className="label-text">Photo URL (Optional)</span>
                            </label>
                            <input type="text" placeholder="https://example.com/photo.jpg" className="input input-bordered" />
                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                        </fieldset>

                        {/* Register Button */}
                        <button className="btn btn-primary w-full">Register</button>
                    </form>

                    {/* Divider */}
                    <div className="divider">or continue with</div>

                    {/* Google Register Button */}
                    <button className="btn btn-outline w-full flex items-center justify-center gap-2">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Register with Google
                    </button>

                    {/* Login Link */}
                    <p className="text-sm text-center mt-4">
                        Already have an account? <Link href="/login" className="text-green-600 font-medium">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;