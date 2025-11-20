// src/pages/ManageMyFoods.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingFood, setEditingFood] = useState(null);

    // 🔥 Fetch user-added foods
    useEffect(() => {
        if (user?.email) {
            fetch(`https://a10-plate-share-server.vercel.app/foods?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setFoods(data);
                    setLoading(false);
                });
        }
    }, [user]);

    // 🔥 Delete Food
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Food will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0E9F6E",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://a10-plate-share-server.vercel.app/foods/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Food removed successfully!", "success");
                            setFoods(foods.filter(f => f._id !== _id));
                        }
                    });
            }
        });
    };

    // 🔥 Update Food Submit
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedFood = {
            foodName: form.foodName.value,
            foodImage: form.foodImage.value,
            foodQuantity: form.foodQuantity.value,
            pickupLocation: form.pickupLocation.value,
            expireDate: form.expireDate.value,
            additionalNotes: form.additionalNotes.value,
        };

        fetch(`https://a10-plate-share-server.vercel.app/foods/${editingFood._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFood),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount || data.matchedCount) {
                    Swal.fire("Updated!", "Food updated successfully!", "success");
                    setFoods(prev =>
                        prev.map(f => (f._id === editingFood._id ? { ...f, ...updatedFood } : f))
                    );
                    setEditingFood(null);
                }
            });
    };

    if (loading) return <LoadingSpinner />;


    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Manage My Foods</h2>

            {/* TABLE */}
            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
                <table className="table">
                    <thead>
                        <tr className="text-gray-700">
                            <th>SL</th>
                            <th>Food</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((food, index) => (
                            <tr key={food._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <img src={food.foodImage} className="w-12 h-12 rounded" />
                                        <span className="font-semibold">{food.foodName}</span>
                                    </div>
                                </td>
                                <td>{food.foodQuantity}</td>
                                <td><span className="badge badge-success">Available</span></td>
                                <td>
                                    <button
                                        onClick={() => setEditingFood(food)}
                                        className="btn btn-sm btn-warning mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(food._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔥 UPDATE MODAL */}
            {editingFood && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold mb-3">Update Food</h3>

                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input
                                className="input input-bordered w-full"
                                name="foodName"
                                defaultValue={editingFood.foodName}
                                required
                            />
                            <input
                                className="input input-bordered w-full"
                                name="foodImage"
                                defaultValue={editingFood.foodImage}
                                required
                            />
                            <input
                                className="input input-bordered w-full"
                                name="foodQuantity"
                                type="number"
                                min="1"
                                defaultValue={editingFood.foodQuantity}
                                required
                            />
                            <input
                                className="input input-bordered w-full"
                                name="pickupLocation"
                                defaultValue={editingFood.pickupLocation}
                                required
                            />
                            <input
                                className="input input-bordered w-full"
                                name="expireDate"
                                type="date"
                                defaultValue={editingFood.expireDate}
                                required
                            />
                            <textarea
                                className="textarea textarea-bordered w-full"
                                name="additionalNotes"
                                defaultValue={editingFood.additionalNotes}
                                required
                            ></textarea>
                            <button className="btn btn-success w-full">Update</button>
                        </form>

                        <div className="modal-action">
                            <button className="btn" onClick={() => setEditingFood(null)}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageMyFoods;