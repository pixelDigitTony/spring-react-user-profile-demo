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
                children: [
                    {
                        path: "guestAccess1",
                        element: <div>Guest Access 1</div>,
                        errorElement: <div>404</div>,
                    },
                    {
                        path: "guestAccess2",
                        element: <div>Guest Access 2</div>,
                        errorElement: <div>404</div>,
                    },
                    {
                        path: "officerAccess1",
                        element: <div>Officer Access 1</div>,
                        errorElement: <div>404</div>,
                    },
                    {
                        path: "officerAccess2",
                        element: <div>Officer Access 2</div>,
                        errorElement: <div>404</div>,
                    },
                    {
                        path: "adminAccess1",
                        element: <div>Admin Access 1</div>,
                        errorElement: <div>404</div>,
                    },
                    {
                        path: "adminAccess2",
                        element: <div>Admin Access 2</div>,
                        errorElement: <div>404</div>,
                    }
                ]
            }
        ]

    }
]);

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);