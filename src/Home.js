/* eslint-disable no-unused-vars */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase-config";
import { signOut } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

export default function Articles() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/lap";
    });
  };
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const articleRef = collection(db, "doctors");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <button onClick={signUserOut} > <b style={{fontSize:18}}>Log Out</b></button>

      {articles.length === 0 ? (
        <p>No Doctors found!</p>
      ) : 
      (
       
        articles.map(
          ({
            id,
            name,
            description,
            
          }) => (
            <div className="  border mt-3 p-3 w-40 bg-red " key={id}>
              
              <div className="row">
              <div className="col-9 ps-3">

             
                 <h3>Name Of the Doctor:{name}</h3>
                
                 <h3>Specialisations:{description}</h3>

                 


             </div>
               
                

                </div>


              
               
             
            </div>
          )
        )
      )}
    </div>
  );
}
