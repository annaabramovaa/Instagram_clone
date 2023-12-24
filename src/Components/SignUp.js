import React, { useState } from "react";
import "./SignUp.css";
import { addUser, checkUserExists } from "../Services/UserService";

function SignUp({ handleCloseClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!username || !password) {
      setErrorMessage("Username and password cannot be empty.");
      return;
    }

    // Check if username already exists
    const userExists = await checkUserExists(username);
    if (userExists) {
      setErrorMessage("Username already exists. Choose a different one.");
      return;
    }

    // Add new user to the database
    await addUser(username, password);

    // Set success message and close the SignUp component after 2 seconds
    setSuccessMessage("Sign Up successful");
    setTimeout(() => {
      setSuccessMessage("");
      handleCloseClick();
    }, 2000);
  };

  return (
    <div className="lg">
      <form onSubmit={handleSignUp} className="form_popup">
        <label htmlFor="username">Username:</label>
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
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleCloseClick}>
          Close
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

export default SignUp;
