// src/pages/AddFood.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // useNavigate ইম্পোর্ট করা হয়েছে

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); // ভ্যারিয়েবল ডিক্লেয়ার করা হয়েছে

    const handleAddFood = (e) => {
        e.preventDefault();
        const form = e.target;

        // 1. ফর্ম থেকে ডেটা সংগ্রহ
        const foodName = form.foodName.value;
        const foodImage = form.foodImage.value;
        const foodQuantity = parseInt(form.foodQuantity.value);
        const pickupLocation = form.pickupLocation.value;
        const expireDate = form.expireDate.value;
        const additionalNotes = form.additionalNotes.value;

        // 2. ডোনেশনকারীর তথ্য Context থেকে নেওয়া
        const donatorName = user?.displayName || "Unknown Donor";
        const donatorEmail = user?.email || "unknown@example.com";
        const donatorPhotoURL = user?.photoURL || "";

        const newFood = {
            foodName,
            foodImage,
            foodQuantity,
            pickupLocation,
            expireDate,
            additionalNotes,
            donatorName,
            donatorEmail,
            donatorPhotoURL,
            foodStatus: "available",
            createdAt: new Date().toISOString(),
        };

        // 3. সার্ভারে ডেটা পোস্ট করা
        fetch("http://localhost:5000/foods", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newFood),
        })
            .then((res) => res.json())
            .then((data) => {
                // সার্ভার থেকে insertedId পেলে সফল
                if (data.insertedId) {
                    // REQUIRED: SweetAlert দেখাবে
                    Swal.fire({
                        title: "Success!",
                        text: "Food added successfully!",
                        icon: "success",
                    });

                    // REQUIRED: ইনপুট ফিল্ড Blank হয়ে যাবে
                    form.reset();

                    // ✅ ESLint Warning ফিক্স করা হলো: 'navigate' ব্যবহার করা হলো
                    navigate("/manage-my-food");

                } else {
                    Swal.fire({
                        title: "Failed!",
                        text: "Server rejected the request.",
                        icon: "error"
                    });
                }
            })
            .catch((error) => {
                console.error("Fetch Error:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Could not connect to the server or network error occurred.",
                    icon: "error"
                });
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl my-10">
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Share Your  Food</h2>

            <form onSubmit={handleAddFood} className="space-y-6">

                {/* Food Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Food Name</label>
                        <input
                            type="text"
                            name="foodName"
                            placeholder="e.g., Leftover Biryani"
                            className="mt-1 block w-full input input-bordered"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Food Image URL</label>
                        <input
                            type="url"
                            name="foodImage"
                            placeholder="Image link of the food"
                            className="mt-1 block w-full input input-bordered"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity (Servings)</label>
                        <input
                            type="number"
                            name="foodQuantity"
                            placeholder="Number of people it can serve"
                            className="mt-1 block w-full input input-bordered"
                            min="1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                            type="date"
                            name="expireDate"
                            className="mt-1 block w-full input input-bordered"
                            required
                        />
                    </div>
                </div>

                {/* Pickup Location & Notes */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                        <input
                            type="text"
                            name="pickupLocation"
                            placeholder="Full pickup address"
                            className="mt-1 block w-full input input-bordered"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Additional Notes / Instructions</label>
                        <textarea
                            name="additionalNotes"
                            placeholder="Any special instructions for the requester?"
                            className="mt-1 block w-full textarea textarea-bordered h-24"
                            required
                        ></textarea>
                    </div>
                </div>

                {/* Donator Info (Readonly) */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Donator Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Donator Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full input input-bordered bg-gray-100 cursor-not-allowed"
                                value={user?.displayName || "Loading..."}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500">Donator Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full input input-bordered bg-gray-100 cursor-not-allowed"
                                value={user?.email || "Loading..."}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full btn bg-orange-500 hover:bg-green-600 text-white text-lg font-semibold border-0">
                    Add Food to Share
                </button>

            </form>
        </div>
    );
};

export default AddFood;