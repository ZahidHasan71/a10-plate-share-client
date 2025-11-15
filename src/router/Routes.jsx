// src/router/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AvailableFoods from "../pages/AvailableFoods";
import Register from "../pages/Register";
import Login from "../pages/Login";
import FoodDetails from "../pages/FoodDetails";
import AddFood from "../pages/AddFood";
import ManageMyFoods from "../pages/ManageMyFoods";
import MyFoodRequests from "../pages/MyFoodRequests";
import UpdateFood from "../pages/UpdateFood";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            // Public Routes
            {
                index: true,
                element: <Home />
            },
            {
                path: "/available-foods",
                element: <AvailableFoods />

            },
            {
                path: "/food-details/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/foods/${params.id}`),
                element: <PrivateRoute><FoodDetails /></PrivateRoute>
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },

            // Protected Routes
            {
                path: "/add-food",
                element: <PrivateRoute><AddFood /></PrivateRoute>
            },
            {
                path: "/manage-my-foods",
                element: <PrivateRoute><ManageMyFoods /></PrivateRoute>
            },
            {
                path: "/update-food/:id",
                element: <PrivateRoute><UpdateFood /></PrivateRoute>
            },
            {
                path: "/my-food-requests",
                element: <PrivateRoute><MyFoodRequests /></PrivateRoute>
            },
        ],
    },
    // Fallback for non-matching paths outside MainLayout
    {
        path: "*",
        element: <NotFoundPage />,
    }
]);

export default router;