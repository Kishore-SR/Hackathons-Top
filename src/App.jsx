import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import {Tools} from "./pages/Tools/Tools";
import Profile  from "./pages/Profile/Profile";
import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/tools" element={<Tools/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Navbar />
        </div>
      </Router>
    </HelmetProvider>
  );
};