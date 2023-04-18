import React from "react";
import Navbar from "../comps/Navbar";
function About() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <h1>This page is about us
        </h1>
        <h2>
          This website is made by <a href="http://github.com/Group-6-Alpha-Henock/Alpha-Henock">Henock</a> and <a href="https://github.com/Group-6-Alpha-Henock/Alpha-Henock">Alpha</a> in collaboration.
        </h2>
      </div>
    </div>
  );
}

export default About;
