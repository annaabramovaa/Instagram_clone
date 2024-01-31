import React, { useState } from "react";
import "./Header.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

function Header() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const handleLogInClick = () => {
    setIsLogInOpen(true);
    setIsSignUpOpen(false);
  };

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
    setIsLogInOpen(false);
  };

  const handleCloseClick = () => {
    setIsLogInOpen(false);
    setIsSignUpOpen(false);
  };

  const handleSuccessfulLogin = (username) => {
    setIsLoggedIn(true);
    setLoggedInUsername(username);
    handleCloseClick();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUsername("");
    sessionStorage.removeItem("loggedInUser");
  };

  return (
    <div className="header">
      <div className="header_logo">
        <PhotoCameraIcon className="header_logoImage" fontSize="large" />
        <h2 className="header_title">Instagram</h2>
      </div>

      {isLoggedIn ? (
        <div className="header-logged-in">
          <span className="username">{loggedInUsername}</span>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="header-button">
          <button className="logIn" onClick={handleLogInClick}>
            Log In
          </button>
          <button className="signUp" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
      )}

      {isLogInOpen && (
        <LogIn
          handleSuccessfulLogin={handleSuccessfulLogin}
          handleCloseClick={handleCloseClick}
        />
      )}
      {isSignUpOpen && <SignUp handleCloseClick={handleCloseClick} />}
    </div>
  );
}

export default Header;
