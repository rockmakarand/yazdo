/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {  collection, addDoc,  } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "./firebase-config";
//import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";


export default function Homed() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/lap";
    });
  };
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
   
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  const handlePublish = () => 
  {
    if (!formData.name || !formData.description ) {
      alert("Please fill all the fields");
      return;
    }

   

   
        setFormData({
          name: "",
          description: "",
         
        });

      
          const articleRef = collection(db, "doctors");
          addDoc(articleRef, {
            name: formData.name,
            description: formData.description,
           
          })
            .then(() => {
              alert("Details added successfully", { type: "success" });
              
            })
            .catch((err) => {
              alert("Error adding Details", { type: "error" });
            });
        
      }
   

  return (
    <div className="ff" style={{ position: "fixed" }}>
      {!user ? (
        <>
          <h2>
            <Link to="/lap">Login to create a Bio</Link>
          </h2>
          Don't have an account? <Link to="/signup1">Signup</Link>
        </>
      ) : (
        <>
        <button onClick={signUserOut} > <b style={{fontSize:18}}>Log Out</b></button>
          <Link to="/patients">View Your Patients</Link>
        <h2>{user.displayName}</h2>
        <h2>{user.email}</h2>
        
            <h2>Enter Your Details to get viewed by patients</h2>
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br/>
          <br/>

          {/* description */}
          <label htmlFor="">Specialisations</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
<br/>

          {/* image */}
         
          <br/>
          <button
            className="ol"
            onClick={handlePublish}
          >
            Publish
          </button>
        </>
      )}
    </div>
  );
}