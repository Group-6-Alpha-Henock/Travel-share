import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import BlogPage from './Pages/BlogPage';
import About from './Pages/About';
import Login from './comps/Login';
import Signup from './comps/Signup';
import UserPosts from './comps/UserPosts';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element:<App/>,
    },
    {
        path: "/blogs",
        element:<BlogPage/>,
      },
     {
        path: "/about",
        element:<About/>,
      },
      {
        path: "/login",
        element:<Login/>,
      },
      {
        path: "/signup",
        element:<Signup/>,
      },
      {
        path: "/userPosts",
        element:<UserPosts/>,
      },
  ]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


          <RouterProvider router={router} />
      
      
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
