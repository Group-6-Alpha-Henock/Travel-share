import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./comps/Navbar";
import Login from "./comps/Login";
import SignUp from "./comps/Signup";
import UserPosts from "./comps/UserPosts";

function App() {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <header className="App">
          <Navbar />
        </header>
        <Routes>
        
          <Route path="/userPosts" element={<UserPosts />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
