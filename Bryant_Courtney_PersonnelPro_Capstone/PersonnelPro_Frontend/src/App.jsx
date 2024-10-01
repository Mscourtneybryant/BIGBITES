import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import SignIn from './components/SignIn';
import Homepage from './components/Homepage';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import { useSelector } from 'react-redux';

const App = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <Router>
            {/* Navbar will always be visible */}
            <NavBar />

            <Routes>
                {/* Route for Login Page */}
                <Route path="/login" element={user ? <Navigate to="/home" /> : <SignIn />} />

                {/* Route for Sign Up Page */}
                <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />

                {/* Route for HomePage - Only accessible after Login */}
                <Route path="/home" element={user ? <Homepage /> : <Navigate to="/login" />} />

                {/* Default Route */}
                <Route path="*" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};
export default App;
