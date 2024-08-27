import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyCardsPage from "./pages/MyCardsPage/MyCardsPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/register">Register </Link>
        <Link to="/login">Login </Link>
        <Link to="/my-cards">My Cards </Link>
      </nav>

      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
        {/* Registration page */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />
        {/* View all cards page */}
        <Route path="/my-cards" element={<MyCardsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
