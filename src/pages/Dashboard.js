import { useState } from "react";

import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../auth/actions/userActions";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Dashboard = ({logoutUser, user}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return(
        <div className="container">
            <Navbar openSidebar={openSidebar}/>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} logoultUser={logoutUser} user={user} navigate={navigate}/>
        </div>
    )
}

const mapStateToProps = ({session}) => ({
    user: session.user
});

export default connect(mapStateToProps, {logoutUser})(Dashboard);