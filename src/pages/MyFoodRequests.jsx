import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyFoodRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/requests?email=${user.email}`)
                .then(res => res.json())
                .then(data => setRequests(data));
        }
    }, [user]);
    const handleDelete = (_id) => {
        console.log("now delete koro");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/requests/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Request has been deleted.",
                                icon: "success"
                            });
                            const remaining = requests.filter(req => req._id !== _id);
                            setRequests(remaining);
                        }
                    }

                    );
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">My Food Requests</h2>

            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
                <table className="table">
                    {/* Head */}
                    <thead>
                        <tr className="text-gray-700">
                            <th>SL No.</th>
                            <th>Donor Info</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((req, index) => (
                            <tr key={req._id}>
                                {/* SL No. */}
                                <th>{index + 1}</th>

                                {/* Donor Info: Name + Image */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={req.requesterImage} alt={req.requesterName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{req.requesterName}</div>
                                            <div className="text-sm opacity-70">{req.requesterEmail}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Location */}
                                <td>{req.requesterLocation || "Not Provided"}</td>

                                {/* Status */}
                                <td>
                                    {req.status === "approved" ? (
                                        <span className="badge badge-success badge-sm">Approved</span>
                                    ) : req.status === "pending" ? (
                                        <span className="badge badge-warning badge-sm">Pending</span>
                                    ) : (
                                        <span className="badge badge-error badge-sm">{req.status}</span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td>
                                    <button
                                        onClick={() => handleDelete(req._id)}
                                        className="btn btn-outline btn-sm btn-error"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyFoodRequests;
