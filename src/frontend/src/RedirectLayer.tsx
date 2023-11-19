import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


const RedirectLayer = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if(localStorage.getItem('user')) {
            setIsLoggedIn(true);
        }
        isLoggedIn ? navigate('/home', {replace: true}) : navigate('/login', {replace: true});
    }, []);

    return (
        <>
            <Outlet />
        </>
        );
}

export default RedirectLayer;