import {Button} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginApi from "../lib/LoginApi.tsx";

interface User {
    username: string;
    token?: string;
}


const Dashboard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User>({username: '', token: ''});

    useEffect(() => {
        if(!sessionStorage.getItem('user')) {
            navigate('/login', {replace: true});
        }
        setUser(JSON.parse(sessionStorage.getItem('user') as string));
    }, []);

    const handleLogout = async () => {
        try {
            const response = await LoginApi.logout();
            alert(response)
            sessionStorage.removeItem('user');
            navigate('/login', {replace: true});
        } catch (error) {
            // Handle errors, such as displaying an error message
            console.error('Logout Failed:', error);
        }
    }

    const handleDeleteUser = async () => {
        try {
            const response = await LoginApi.deleteUser(user.username);
            alert(response)
            sessionStorage.removeItem('user');
        } catch (error) {
            // Handle errors, such as displaying an error message
            console.error('Delete Failed:', error);
        }
    }

    return (
        <div>
            <h1>Welcome {user.username}</h1>
            <div className={"button-container"}>
                <Button className={"logout"} onClick={handleLogout}>
                    Logout
                </Button>
                <Button className={"deleteUserButton"} onClick={handleDeleteUser}>
                    Delete Account
                </Button>
            </div>
        </div>
    );

};

export default Dashboard;