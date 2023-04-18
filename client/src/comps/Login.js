import React, { useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";

const Login = () => {
  // Initializing state variables using the useState hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async(e) => {
    // Preventing the default form submission behavior
    e.preventDefault();
    // Logging the current values of email and password to the console
    

    // Making a POST request to the login endpoint with email and password data
    try {
      const response = await axios.post("http://localhost:8000/login", {
       
        email,
        password
      },{method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { 'Content-Type': 'application/json'},
      });
    
      // If the response status is "ok"
      if (response.data.status === "ok") {
        // Display an alert indicating successful login
        alert("User logged in successfully!");
        // Store the user's authentication token in local storage
        window.localStorage.setItem("token", response.data.data);
        // Redirect the user to the "/userPosts" page
        window.location.href = "/userPosts";
      }
    } catch (error) {
      // If the request fails for any reason, log the error to the console
      console.error("Error", error);
      alert("Email and password doesn't match!");
    }
    
  };

  // Rendering the login form
  return (
    <div>
      <Navbar></Navbar>
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>

      <div className="mb-3 w-25 p-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3 w-25 p-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox w-25 p-3">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <div className="d-grid w-25 p-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right w-25 p-3">
        Forgot <a href="/">password?</a>
      </p>
    </form>
    </div>

  );
};

export default Login;
