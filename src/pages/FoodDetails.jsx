import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const FoodDetails = () => {
    const food = useLoaderData();
    const {
        _id: foodId,
        foodName,
        foodImage,
        quantity,
        pickupLocation,
        expireDate,
        additionalNotes,
        donatorName,
        email,
        donatorImage,
        foodStatus
    } = food;

    const { user } = use(AuthContext);
    const requestFoodModalRef = useRef(null);
    const [requests, setRequests] = useState([]);

    // Load requests for this food
    useEffect(() => {
        fetch(`http://localhost:5000/foods/requests/${foodId}`)
            .then(res => res.json())
            .then(data => {
                console.log("request data for food", data);
                setRequests(data);
            });
    }, [foodId]);

    const handleRequestFoodOpen = () => {
        requestFoodModalRef.current.showModal();
    };

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const location = e.target.location.value;

        const newRequestFood = {
            food: foodId,                 // FIXED ✔
            requesterName: name,
            requesterEmail: email,
            requesterPhone: phone,
            requesterLocation: location,
            requesterImage: user?.photoURL || "",
            status: "pending",
        };

        fetch('http://localhost:5000/requests', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newRequestFood)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    requestFoodModalRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your request has been submitted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Clear form
                    e.target.reset();

                    // Reload request list
                    setRequests([...requests, newRequestFood]);
                }
            });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-10 items-start">

                {/* Image */}
                <img src={foodImage} alt={foodName} className="rounded-lg w-full h-100 object-cover shadow-md" />

                {/* Info */}
                <div>
                    <Link to="/" className="btn bg-green-500 text-white hover:bg-green-700 mb-6">Back to List</Link>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{foodName}</h2>

                    {/* Donator Info */}
                    <div className="flex items-center gap-4 mt-6 bg-gray-50 p-4 rounded-lg">
                        <img src={donatorImage} alt={donatorName} className="w-14 h-14 rounded-full" />
                        <div>
                            <p className="text-sm font-medium text-gray-800">{donatorName}</p>
                            <p className="text-xs text-gray-500">{email}</p>
                        </div>
                    </div>

                    <p><strong>Quantity:</strong> {quantity}</p>
                    <p><strong>Pickup Location:</strong> {pickupLocation}</p>
                    <p><strong>Expires:</strong> {expireDate}</p>
                    <p><strong>Notes:</strong> {additionalNotes}</p>

                    {/* Status */}
                    <div className="mt-6">
                        <span className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${foodStatus === 'available'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {foodStatus === 'available' ? 'Available' : 'Not Available'}
                        </span>
                    </div>

                    {/* Request Button */}
                    <button
                        onClick={handleRequestFoodOpen}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg mt-4"
                    >
                        Request Food
                    </button>

                    {/* Modal */}
                    <dialog ref={requestFoodModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box rounded-xl">

                            <form method="dialog" className="absolute right-4 top-4">
                                <button className="btn btn-sm btn-circle btn-ghost">
                                    <RxCross2 className="w-5 h-5" />
                                </button>
                            </form>

                            <h3 className="text-2xl font-bold text-orange-600 mb-4">Request Food</h3>

                            <form onSubmit={handleRequestSubmit} className="space-y-4">
                                <input type="text" name="name" className="input input-bordered w-full"
                                    defaultValue={user?.displayName} readOnly />

                                <input type="email" name="email" className="input input-bordered w-full"
                                    defaultValue={user?.email} readOnly />

                                <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full" required />

                                <input type="text" name="location" placeholder="Pickup Location" className="input input-bordered w-full" required />

                                <button type="submit" className="btn bg-orange-500 text-white w-full">Submit Request</button>
                            </form>
                        </div>
                    </dialog>
                </div>
            </div>

            {/* Requests Count */}
            <h3 className="text-2xl font-bold text-orange-600 my-5">
                Requests for this Food: <span className="text-gray-600">({requests.length})</span>
            </h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Image</th>
                            <th>Requester Name</th>
                            <th>Requester Email</th>
                            <th>Actions</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {requests.map((request, index) => (
                            <tr key={request._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user?.photoURL} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{request.requesterName}</td>
                                <td>{request.requesterEmail}</td>
                                <td>Purple</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FoodDetails;
