import React from "react";
import "bootstrap/dist/css/bootstrap.css";

// import necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./comps/Navbar";
import Login from "./comps/Login";
import SignUp from "./comps/Signup";
import UserData from "./comps/UserData";
import UserPosts from "./comps/UserPosts";

function App() {
  // render the components using the defined routes
  // for some reason these routes are not working,even though the apis seems correct, the components define on the route  do not redirect me to the route and they do not get to display when you input the route on the url
  // the pages/component can only be displayed when you input them on the default Path (that is "/")
  // i could not fix it bro ,sorry , you should start form here ahah
  // your are awesome man , just so you know :)
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <header className="App">
          <Navbar />
        </header>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userPosts" element={<UserPosts />} />
          <Route exact path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
