import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RedirectLayer from "./RedirectLayer.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RedirectLayer/>,
        children: [
            {
                path: "login",
                element: <Login/>,
                errorElement: <div>404</div>,
            },
            {
                path: "home",
                element: <Dashboard/>,
                errorElement: <div>404</div>,
            }
        ]

    }
]);

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);