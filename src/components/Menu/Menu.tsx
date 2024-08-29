import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { url } from '../../url.json';

function Menu() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem('userObject') ? true : false);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  useEffect(() => {
      // Check local storage for an auth token or user data
      const userToken = localStorage.getItem('userObject');
      if (userToken) {
          setIsAuthenticated(true);
      } else {
          setIsAuthenticated(false);
      }
  }, []); // Empty dependency array ensures this runs once on mount

  // const handleLogin = () => {
  //     // Simulate login
  //     setIsAuthenticated(true);
  // };

  const handleLogout = async () => {
      // Simulate logout
      try {
        // Retrieve the token from local storage
        const userObject = localStorage.getItem('userObject');
        let userToken, accessToken = "";

        if (!userObject) {
            console.error('No user token found in local storage.');
            return;
        }else{
          userToken = JSON.parse(userObject);
          console.log('User token retrieved from local storage:', userToken);
          accessToken = userToken.accessToken.toString();
          console.log(typeof accessToken);
        }

        // Make a POST request to the /logout endpoint with the token in the Authorization header
        const response = await axios.post(url +'/api/user/logout', null, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.status === 200) {
            console.log('Logout successful.');
            // Clear the user token from local storage
            localStorage.removeItem('userObject');
            console.log('LocalStorage userObject destroyed...');

            setIsAuthenticated(false);

            // Set the state to trigger the redirect
            setRedirectToLogin(true);
        } else {
            console.error('Logout failed:', response.status, response.statusText);
            alert('Logout failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        alert('Error during logout. Please try again.');
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  const myLiStyle = {
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
  };
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FlashQuizzz</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          {!isAuthenticated ? (
                <>
                  <li className="nav-item" style={{display: "flex", flexDirection: "row", alignItems: "center",}}>
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item" style={{display: "flex", flexDirection: "row", alignItems: "center",}}>
                    <Link className="nav-link" to="/register">Signup</Link>
                  </li>
                </>
            ) : (
                <>
                  <li>
                    &nbsp;
                  </li>
                </>
            )}
            
            <li className="nav-item" style={{display: "flex", flexDirection: "row", alignItems: "center",}}>
              <Link className="nav-link" to="/my-cards">Flashcards</Link>
            </li>
            {isAuthenticated ? (
                <>
                  <li className="nav-item" style={{display: "flex", flexDirection: "row", alignItems: "center",}}>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item" style={{display: "flex", flexDirection: "row", alignItems: "center",}}>
                    <Link className="nav-link" onClick={handleLogout} to={''}>
                      <button type="button" className="btn btn-danger">Logout</button>
                    </Link>
                </li>
                </>
            ) : (
                <>
                    <li>
                        &nbsp;
                    </li>
                </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
