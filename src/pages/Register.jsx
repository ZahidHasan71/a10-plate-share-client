import React from 'react';
import { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
    const { signInWithGoogle } = use(AuthContext);
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
            <div>
                <h1 className="text-4xl font-bold text-center my-5">Join PlateShare</h1>
            </div>
            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Register</h2>

                    <form>
                        <fieldset className="fieldset space-y-2">
                            <label className="label">Name</label>
                            <input type="text" className="input input-bordered input-sm w-full" placeholder="Name" />

                            <label className="label">Email</label>
                            <input type="email" className="input input-bordered input-sm w-full" placeholder="Email" />

                            <label className="label">
                                <span className="label-text">Photo URL (Optional)</span>
                            </label>
                            <input type="text" placeholder="https://example.com/photo.jpg" className="input input-bordered input-sm w-full" />

                            <label className="label">Password</label>
                            <input type="password" className="input input-bordered input-sm w-full" placeholder="Password" />

                            <div>
                                <a className="link link-hover text-sm">Forgot password?</a>
                            </div>
                        </fieldset>

                        {/* Register Button */}
                        <button className="btn btn-primary btn-sm w-full mt-4">Register</button>
                    </form>

                    {/* Divider */}
                    <div className="divider text-sm">or continue with</div>

                    {/* Google Register Button */}
                    <button onClick={handleGoogleSignIn} className="btn btn-outline btn-sm w-full flex items-center justify-center gap-2">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                        <span className="text-sm">Login with Google</span>
                    </button>

                    {/* Login Link */}
                    <p className="text-sm text-center mt-4">
                        Already have an account? <Link to="/login" className="text-green-600 font-medium">Login here</Link>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Register;