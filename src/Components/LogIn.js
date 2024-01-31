import React, { useState } from "react";
import "./LogIn.css";
import { loginUser } from "../Services/UserService";

function LogIn({ handleCloseClick, handleSuccessfulLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();

    const error = await loginUser(username, password);

    if (error) {
      // Log in failed logic
      setErrorMessage(error);
      console.log("Login failed");
    } else {
      // No error, log in successful logic
      console.log("Login successful");
      setErrorMessage("");
      handleSuccessfulLogin(username); // Update the parent component's state
      handleCloseClick();
    }
  };

  return (
    <div className="lg">
      <form onSubmit={handleLogIn} className="form_popup">
        <label>Username:</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <button type="button" onClick={handleCloseClick}>
          Close
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LogIn;
