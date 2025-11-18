// src/pages/AddFood.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddFood = (e) => {
        e.preventDefault();
        const form = e.target;

        const foodName = form.foodName.value;
        const foodImage = form.foodImage.value;
        const foodQuantity = parseInt(form.foodQuantity.value);
        const pickupLocation = form.pickupLocation.value;
        const expireDate = form.expireDate.value;
        const additionalNotes = form.additionalNotes.value;

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
            userEmail: user.email, // ✅ Added for filtering
        };

        fetch("http://localhost:5000/foods", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newFood),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire("Success!", "Food added successfully!", "success");
                    form.reset();
                    navigate("/manage-my-foods");
                } else {
                    Swal.fire("Failed!", "Server rejected the request.", "error");
                }
            })
            .catch(() => {
                Swal.fire("Error!", "Could not connect to the server.", "error");
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl my-10">
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Share Your Food</h2>
            <form onSubmit={handleAddFood} className="space-y-6">
                {/* Food Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="foodName" type="text" required placeholder="Food Name" className="input input-bordered w-full" />
                    <input name="foodImage" type="url" required placeholder="Image URL" className="input input-bordered w-full" />
                    <input name="foodQuantity" type="number" required min="1" placeholder="Quantity" className="input input-bordered w-full" />
                    <input name="expireDate" type="date" required className="input input-bordered w-full" />
                </div>
                <input name="pickupLocation" type="text" required placeholder="Pickup Location" className="input input-bordered w-full" />
                <textarea name="additionalNotes" required placeholder="Additional Notes" className="textarea textarea-bordered w-full h-24" />
                {/* Donator Info */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-2">Donator Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={user?.displayName || "Loading..."} readOnly className="input input-bordered bg-gray-100" />
                        <input value={user?.email || "Loading..."} readOnly className="input input-bordered bg-gray-100" />
                    </div>
                </div>
                <button type="submit" className="btn bg-orange-500 hover:bg-green-600 text-white w-full text-lg font-semibold">Add Food to Share</button>
            </form>
        </div>
    );
};

export default AddFood;