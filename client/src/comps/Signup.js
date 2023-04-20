
 import Navbar from "./Navbar";

// const SignUp = () => {
//   const [user, setUser] = useState({
//     // Define user state variable with initial values for first name, last name, email, and password
//     fname: "",
//     lname: "",
//     email: "",
//     password: "",
//   });

//   // Function called when form is submitted
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     axios // Send POST request to server with user data
//       .post("http://localhost:8000/register", user, {
//       method: 'POST',
//       body:JSON.stringify({}),
//       headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       })
//       .then((response) => {
//         // Log server response to console if successful
//         console.log(response.data, "userRegistered");
//       })
//       .catch((error) => {
//         // Log error to console if request fails
//         alert('email address already in use')
//         console.error("Error registering user:", error);
//       });
//   };

//   // Function called when input values in form are changed
//   const handleInputChange = (e) => {
//     const { name, value } = e.target; // Get name and value of input field that was changed
//     setUser((prevUser) => ({ ...prevUser, [name]: value })); // Update user state variable with new input values
//   };

//   // Return the form with input fields for first name, last name, email, and password
//   return (
//     <div>
//     
//     <form onSubmit={handleSubmit}>
//       <h3>Sign Up</h3>

//       <div className="mb-3">
//         <label>First name</label>
//         <input
//           type="text"
//           name="fname"
//           className="form-control"
//           placeholder="First name"
//           value={user.fname}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Last name</label>
//         <input
//           type="text"
//           name="lname"
//           className="form-control"
//           placeholder="Last name"
//           value={user.lname}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Email address</label>
//         <input
//           type="email"
//           name="email"
//           className="form-control"
//           placeholder="Enter email"
//           value={user.email}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           className="form-control"
//           placeholder="Enter password"
//           value={user.password}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div >
//         <button type="submit" className="btn btn-primary">
//           Sign Up
//         </button>
//       </div>
//       <p className="forgot-password text-right">
//         Already registered <a href="/sign-in">sign in?</a>
//       </p>
//     </form>
//     </div>

//   );
// };

// export default SignUp;

import { useState } from "react";

export default function RegisterPage (){
    const [fname, setFname]= useState('');
    const [lname, setLname]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    async function register (e){
        e.preventDefault();
        const Response = await fetch('http://localhost:8000/register',{
                method: 'POST',
                body: JSON.stringify({fname, lname, email, password}),
                headers: { 'Content-Type': 'application/json'},
            });
        if (Response.status === 200){
                alert('Successfully registered');
        }else{
                alert('registration failed');
        }
    }
    
   
    return(
        <div>
          <Navbar></Navbar>
            <h1 className="loginHeadline w-25 p-3">Registration</h1>
            <form className="register" onSubmit={register}>
                <input className="mb-3 w-25 p-3"
                    type="text" 
                    placeholder="First Name"
                    value={fname}
                    onChange={((e)=> setFname(e.target.value))}/><br/>
                <input className="mb-3 w-25 p-3"
                    type="text" 
                    placeholder="Last Name"
                    value={lname}
                    onChange={((e)=> setLname(e.target.value))}/><br/>
                <input className="mb-3 w-25 p-3"
                    type="text" 
                    placeholder="Username"
                    value={email}
                    onChange={((e)=> setEmail(e.target.value))}/><br/>
                <input className="mb-3 w-25 p-3"
                type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={((e)=> setPassword(e.target.value))}/><br/>
                <button className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
}