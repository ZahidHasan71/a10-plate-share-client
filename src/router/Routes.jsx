import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AvailableFoods from "../pages/AvailableFoods";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/available-foods",
                Component: AvailableFoods
            },
            {
                path: "/my-foods",
                Component: AvailableFoods
            },
            {
                path: "/add-food",
                Component: AddFood
            },
            {
                path: "/register",
                Component: Register
            }

        ],
    },
]);

export default router;