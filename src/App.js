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

const App = ({ checked }) => {
  return (
    <Router>
      {
        checked && (
          <Routes>
            <Route path="/" element={<BasicRoute><Home /></BasicRoute>} />
            <Route path="/login" element={<BasicRoute><Login /></BasicRoute>}/>
            <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>}/>
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
