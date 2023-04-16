import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  // Initializing state variables using the useState hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Preventing the default form submission behavior
    e.preventDefault();
    // Logging the current values of email and password to the console
    console.log(email, password);

    // Making a POST request to the login endpoint with email and password data
    axios
      .post("http://localhost:8000/login", {
        email,
        password,
      })
      .then((res) => {
        // If the response status is "ok"
        if (res.data.status === "ok") {
          // Display an alert indicating successful login
          alert("User logged in successfully!");
          // Store the user's authentication token in local storage
          window.localStorage.setItem("token", res.data.data);
          // Redirect the user to the "/userPosts" page
          window.location.href = "/userPosts";
        }
      })
      .catch((error) => {
        // If the request fails for any reason, log the error to the console
        console.error("Error:", error);
      });
  };

  // Rendering the login form
  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
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

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="/">password?</a>
      </p>
    </form>
  );
};

export default Login;
