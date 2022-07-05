import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
//import { toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


export default function Lap() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.code, { type: "error" });
    }
  };
  const handleLogin1 = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/homed");
    } catch (error) {
      alert(error.code, { type: "error" });
    }
  };
  return (
    <div className="border p-3 bg-light mx-auto"
    style={{maxWidth:400, marginTop:60}}
    >
      <h1>Login as Patient</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login as Patient
      </button>
      <h2>New Patient ?<Link to="/signup">Click to register</Link></h2>
      <br/>
      <br/>
      <h1>Login as Doctor</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleLogin1}>
        Login as Doctor
        
      </button>
      
      <h2>New Doctor ?<Link to="/signup1">Click to register</Link></h2>

    </div>
  );
}