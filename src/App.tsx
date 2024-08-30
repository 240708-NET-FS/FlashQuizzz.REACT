// import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import React from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyCardsPage from "./pages/MyCardsPage/MyCardsPage";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import DashboardPage from "./pages/DashboardPage/DashboardPage";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Menu />
        <main className="flex-grow-1">
          <div className="container mt-5 mb-5">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/my-cards" element={<MyCardsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/" element={<MyCardsPage />} />
            </Routes>
          </div>
        </main>
      <Footer />
      </div>
    </Router>
    // <BrowserRouter>
    //   <nav>
    //     <Link to="/">Home </Link>
    //     <Link to="/register">Register </Link>
    //     <Link to="/login">Login </Link>
    //     <Link to="/my-cards">My Cards </Link>
    //   </nav>

    //   <Routes>
    //     {/* Landing page */}
    //     <Route path="/" element={<LandingPage />} />
    //     {/* Registration page */}
    //     <Route path="/register" element={<RegisterPage />} />
    //     {/* Login page */}
    //     <Route path="/login" element={<LoginPage />} />
    //     {/* View all cards page */}
    //     <Route path="/my-cards" element={<MyCardsPage />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
