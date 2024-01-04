import './css/Dashboard.css';
import TopBar from "../components/TopBar.tsx";
import SideMenu from "../components/SideMenu.tsx";

const Dashboard = () => {

    return (
        <>
            <div className={"topBar"}>
                <TopBar/>
            </div>
            <div className={"navBar"}>
                <SideMenu/>
            </div>
        </>
    );

};

export default Dashboard;