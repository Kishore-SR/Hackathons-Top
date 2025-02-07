import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import {Tools} from "./pages/Tools/Tools";
import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/Login";
import Submit from "./pages/Submit/Submit"; 
import { About } from "./pages/About/About";

export const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/login" element={<Login />} />
            <Route path="/submit" element={<Submit />} />  
            <Route path="/about" element={<About />} />  
          </Routes>
          <Navbar />
        </div>
      </Router>
    </HelmetProvider>
  );
};