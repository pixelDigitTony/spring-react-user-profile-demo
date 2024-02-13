import './css/Dashboard.css';
import TopBar from "../components/TopBar.tsx";
import SideMenu from "../components/SideMenu.tsx";
import {Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <div className={"topBar"}>
                <TopBar/>
            </div>
            <div className={"navBar"}>
                <SideMenu/>
            </div>
            <div className={"content"}>
                <Outlet/>
            </div>
        </>
    );

};

export default Dashboard;