import './css/Dashboard.css';
import {Menu, MenuProps} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginApi from "../lib/LoginApi.tsx";
import {UserOutlined} from "@ant-design/icons/lib/icons";

interface User {
    username: string;
    token?: string;
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const Dashboard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User>({username: '', token: ''});
    const [current, setCurrent] = useState('1');

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

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key as string)
        if (e.key === 'logout') {
            handleLogout().then(() =>
                navigate('/login', {replace: true}));
        }
        if (e.key === 'delete') {
            handleDeleteUser().then(() =>
                navigate('/login', {replace: true}));
        }
    };

    const items: MenuItem[] = [
        getItem(user.username ?? 'User', 'activeUser', <UserOutlined />, [
            getItem('Delete User', 'delete'),
            getItem('Logout', 'logout'),
        ]),
    ];

    return (
        <div>
            {/*<h1>Welcome {user.username}</h1>*/}
            {/*<div className={"button-container"}>*/}
            {/*    <Button className={"logout"} onClick={handleLogout}>*/}
            {/*        Logout*/}
            {/*    </Button>*/}
            {/*    <Button className={"deleteUserButton"} onClick={handleDeleteUser}>*/}
            {/*        Delete Account*/}
            {/*    </Button>*/}
            {/*</div>*/}
            <div className={"topBar"}>
                <Menu
                    theme="dark"
                    className={"topMenu"}
                    onClick={onClick}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                    disabledOverflow={true}
                />
            </div>
        </div>
    );

};

export default Dashboard;