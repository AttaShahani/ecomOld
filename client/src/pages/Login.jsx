import React, { useState } from "react";
import { loginUser } from "../redux/actions/users";

const Login = () => {

  const [formData,setFormData] = useState({email:"",password:""})

  const inputHandler = (e) =>{
    const {name,value} = e.target;
    setFormData({...formData,[name]:value})
  }

  const loginHandler = ()=>{
    const {email,password} = formData;
    const user = loginUser(email,password);
    console.log(user);
  }

  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const loginToggler = ()=>{
    setShowLogin(true)
    setShowRegister(false)
  }
  const registerToggler = ()=>{
    setShowLogin(false)
    setShowRegister(true)
  }
  return (
    <div className="authContainer">
      <div className="headings">
        <h2 onClick={loginToggler} className={`${showLogin?"activeLink":""}`}>Login</h2>
        <h2 onClick={registerToggler} className={`${showRegister?"activeLink":""}`}>Register</h2>
        <div className={`line ${showRegister?"activeLine":""}`}></div>
      </div>
      <div className="loginRegister">
        <div className={`login ${showLogin?"show":""}`}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={inputHandler}
            placeholder="Enter Your Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={inputHandler}
            placeholder="Enter Your Password"
            required
          />
          <button className="loginBtn" onClick={loginHandler}>Login</button>
        </div>
        <div className={`register ${showRegister?"show":""}`}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Your password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Your Password"
            required
          />
          <button className="registerBtn">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
