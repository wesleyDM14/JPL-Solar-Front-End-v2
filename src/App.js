import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { connect } from 'react-redux';

import Home from "./pages/Home";

const App = ({ checked }) => {
  return (
    <Router>
      {
        checked && (
          <Routes>
            <Route path="/" element={<Home />} />
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
