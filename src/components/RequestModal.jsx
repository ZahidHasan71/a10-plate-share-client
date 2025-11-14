// src/components/RequestModal.jsx
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DollarSign, MapPin, MessageCircle } from 'lucide-react';

const RequestModal = ({ food, closeModal }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Mutation for submitting the request
    const requestMutation = useMutation({
        mutationFn: (requestData) => {
            return axiosSecure.post('/requests', requestData);
        },
        onSuccess: () => {
            toast.success("Food Request Submitted Successfully!");
            // FoodDetails page re-fetch করার জন্য query invalidate
            queryClient.invalidateQueries(['foodDetails', food._id]);
            queryClient.invalidateQueries(['myFoodRequests']); // My Food Requests page update
            closeModal();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to submit request. Please try again.");
        },
    });

    const onSubmit = (data) => {
        // Prevent requesting own food
        if (user.email === food.donorEmail) {
            toast.error("You cannot request your own food.");
            closeModal();
            return;
        }

        const requestData = {
            foodId: food._id,
            foodName: food.foodName,
            donorEmail: food.donorEmail,
            requesterEmail: user.email,
            requesterName: user.displayName,
            requestDate: new Date().toISOString(),
            pickupLocation: food.pickupLocation, // Original pickup location
            // Fields from the form
            requestLocation: data.requestLocation,
            contactNo: data.contactNo,
            whyNeedFood: data.whyNeedFood,
        };

        requestMutation.mutate(requestData);
    };

    return (
        <dialog id="request_modal" className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box bg-white p-6">
                <h3 className="font-bold text-2xl text-green-700 border-b pb-2 mb-4">Request Food: {food.foodName}</h3>

                {/* Food & Donor Info (Read-only) */}
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg mb-4 text-sm">
                    <p className='flex items-center gap-2 font-medium'><MapPin className='w-4 h-4 text-orange-500' /> **Pickup Location:** {food.pickupLocation}</p>
                    <p className='flex items-center gap-2 font-medium'><DollarSign className='w-4 h-4 text-green-600' /> **Est. Cost:** $0.00 (Shared Food)</p>
                    <p className='text-xs text-gray-500'>**Donor Email:** {food.donorEmail}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    {/* Requester Info (Read-only) */}
                    <input type="text" value={user.email} readOnly className="input input-bordered w-full text-gray-500" />

                    {/* Location Input */}
                    <div>
                        <label className="label font-medium">Your Current Location</label>
                        <input
                            type="text"
                            placeholder="Your current location"
                            className={`input input-bordered w-full ${errors.requestLocation ? 'input-error' : ''}`}
                            {...register("requestLocation", { required: "Location is required" })}
                        />
                        {errors.requestLocation && <span className="text-red-500 text-xs">{errors.requestLocation.message}</span>}
                    </div>

                    {/* Contact No. */}
                    <div>
                        <label className="label font-medium">Contact No.</label>
                        <input
                            type="tel"
                            placeholder="e.g. 017xxxxxxxx"
                            className={`input input-bordered w-full ${errors.contactNo ? 'input-error' : ''}`}
                            {...register("contactNo", { required: "Contact Number is required" })}
                        />
                        {errors.contactNo && <span className="text-red-500 text-xs">{errors.contactNo.message}</span>}
                    </div>

                    {/* Why Need Food Text Area */}
                    <div>
                        <label className="label font-medium">Why I Need This Food</label>
                        <textarea
                            placeholder="Briefly explain why you need this food."
                            className={`textarea textarea-bordered w-full ${errors.whyNeedFood ? 'textarea-error' : ''}`}
                            {...register("whyNeedFood", { required: "Reason is required" })}
                        ></textarea>
                        {errors.whyNeedFood && <span className="text-red-500 text-xs">{errors.whyNeedFood.message}</span>}
                    </div>

                    <div className="modal-action">
                        <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700" disabled={requestMutation.isLoading}>
                            {requestMutation.isLoading ? 'Submitting...' : 'Confirm Request'}
                        </button>
                        <button type="button" onClick={closeModal} className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default RequestModal;