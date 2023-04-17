import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const SignUp = () => {
  const [user, setUser] = useState({
    // Define user state variable with initial values for first name, last name, email, and password
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  // Function called when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    axios // Send POST request to server with user data
      .post("http://localhost:8000/register", user, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        // Log server response to console if successful
        console.log(response.data, "userRegistered");
      })
      .catch((error) => {
        // Log error to console if request fails
        alert('email address already in use')
        console.error("Error registering user:", error);
      });
  };

  // Function called when input values in form are changed
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get name and value of input field that was changed
    setUser((prevUser) => ({ ...prevUser, [name]: value })); // Update user state variable with new input values
  };

  // Return the form with input fields for first name, last name, email, and password
  return (
    <div>
    <Navbar></Navbar>
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          name="fname"
          className="form-control"
          placeholder="First name"
          value={user.fname}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          name="lname"
          className="form-control"
          placeholder="Last name"
          value={user.lname}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={user.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          value={user.password}
          onChange={handleInputChange}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
    </div>

  );
};

export default SignUp;
