import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const MyFoodRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 Fetch user requests
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/requests?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setRequests(data);
                    setLoading(false); // ✅ Added to stop spinner
                })
                .catch(() => setLoading(false));
        }
    }, [user]);

    // 🔥 Delete request
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0E9F6E",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/requests/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire("Deleted!", "Your request has been removed.", "success");
                            setRequests(prev => prev.filter(req => req._id !== _id));
                        }
                    });
            }
        });
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Food Requests</h2>

            {requests.length > 0 ? (
                <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
                    <table className="table table-zebra">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th>SL</th>
                                <th>Donor Info</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, index) => (
                                <tr key={req._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={req.requesterImage} alt={req.requesterName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{req.requesterName}</div>
                                                <div className="text-sm text-gray-500">{req.requesterEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{req.requesterLocation || "Not Provided"}</td>
                                    <td>
                                        {req.status === "approved" ? (
                                            <span className="badge badge-success badge-sm">Approved</span>
                                        ) : req.status === "pending" ? (
                                            <span className="badge badge-warning badge-sm">Pending</span>
                                        ) : (
                                            <span className="badge badge-error badge-sm capitalize">{req.status}</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(req._id)}
                                            className="btn btn-sm btn-outline btn-error"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500 mt-10">You haven't requested any food yet.</p>
            )}
        </div>
    );
};

export default MyFoodRequests;