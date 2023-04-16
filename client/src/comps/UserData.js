import React, { useEffect } from "react";
import axios from "axios";
import UserPosts from "./UserPosts";

const UserData = () => {
  // This useEffect hook will be called when the component is mounted (meaning, when it's first rendered)
  useEffect(() => {
    // Make a POST request to the /userData endpoint on the server
    axios
      .post(
        "http://localhost:8000/userData",
        {
          // Send the user's token in the request body
          token: window.localStorage.getItem("token"),
        },
        {
          // Set the request headers
          headers: {
            "content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        // Log the user data that we received from the server
        console.log(response.data, "user");
      })
      .catch((error) => {
        // Log any errors that occurred during the request
        console.error("Error getting user data:", error);
      });
  }, []); // Passing an empty dependency array means this hook will only be called once, when the component mounts

  return (
    <div>
      <UserPosts></UserPosts>
    </div>
  );
};

export default UserData;
