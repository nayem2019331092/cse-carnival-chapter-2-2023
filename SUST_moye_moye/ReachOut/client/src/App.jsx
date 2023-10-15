import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuthContext } from "./contexts/authContext";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Community from "./pages/Community";
import Help from "./pages/Help";
import Expert from "./pages/Expert";
import { AnimatePresence } from "framer-motion";
import Assessment from "./pages/Assessment";

function App() {
  const location = useLocation();
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <Navbar />
      <ToastContainer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />

          {isLoggedIn === true && (
            <>
              <Route path="/community" element={<Community />} />
              <Route path="/help" element={<Help />} />
              <Route path="/expert" element={<Expert />} />
              <Route path="/assessment" element={<Assessment />} />
            </>
          )}
          {isLoggedIn === false && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
