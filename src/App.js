/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import Lap from "./Lap";
import React,{ useState } from "react";
import Signup from "./Signup";
import Signup1 from "./Signup1";
import Homed from "./Homed";
import {signOut} from 'firebase/auth'
import {  auth } from "./firebase-config";
import Patients from "./Patients";
import Appo from "./Appo";



function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/lap";
    });
  };

  

  return (
    <Router>
     
      

        {!auth ? (
          <Link to="/lap"> Login </Link>
         

        ) : (
          <>
           
            
          </>
        )}
     
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/homed" element={<Homed isAuth={isAuth} />} />
        <Route path="/patients" element={<Patients isAuth={isAuth} />} />
        <Route path="/appo" element={<Appo isAuth={isAuth} />} />



        
        <Route path="/lap" element={<Lap setIsAuth={setIsAuth} />} />
        <Route path="/signup" element={<Signup setIsAuth={setIsAuth} />} />
        <Route path="/signup1" element={<Signup1 setIsAuth={setIsAuth} />} />

      </Routes>
    </Router>
  );
}

export default App;