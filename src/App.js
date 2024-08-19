import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { connect } from 'react-redux';

import AuthRoute from "./components/AuthRoute";
import BasicRoute from "./components/BasicRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import AdminArea from "./pages/AdminArea";
import Profile from "./pages/Profile";
import SolarPlants from "./pages/SolarPlants";
import SolarPlantDetail from "./pages/SolarPlantDetail";
import Download from "./pages/Download";
import Contract from "./pages/Contract";

const App = ({ checked }) => {
  return (
    <Router>
      {
        checked && (
          <Routes>
            <Route path="/" element={<BasicRoute><Home /></BasicRoute>} />
            <Route path="/login" element={<BasicRoute><Login /></BasicRoute>}/>
            <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>}/>
            <Route path="/admin-area" element={<AuthRoute><AdminArea /></AuthRoute>} />
            <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
            <Route path="/clients" element={<AuthRoute><Clients /></AuthRoute>}/>
            <Route path="/clients/client/:id/solar-plants" element={<AuthRoute><SolarPlants /></AuthRoute>}/>
            <Route path="/clients/client/:clientId/solar-plant/:id" element={<AuthRoute><SolarPlantDetail /></AuthRoute>}/>
            <Route path="/downloadPdf/:clientId/:id/:url" element={<AuthRoute><Download /></AuthRoute>} />
            <Route path="/contratos" element={<AuthRoute><Contract /></AuthRoute>} />
          </Routes>
        )
      }

    </Router>
  )
}

const mapStateToProps = ({ session }) => ({
  checked: session.checked
});

export default connect(mapStateToProps)(App);
