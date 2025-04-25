
import Poetrygardenlogo from '../images/Poetrygardenlogo.png'; 
import React, { useState, useEffect } from 'react';
import { db, addGarden, fetchGardens } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/aboutpage.css';
import { useNavigate } from "react-router-dom";

const TournamentPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
        return () => unsubscribe();
      }, []);
      const handleLogout = async () => {
          try {
            await signOut(auth);
            setUser(null); // optional: clear local user state
            navigate("/");
          } catch (err) {
            console.error("Logout failed:", err);
          }
        };

  return (

 <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Poetrygardenlogo} alt="Logo" className="logo" />
        </div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/communitypage">Community</a>
          <a href="/tournament">Tournament</a>
          <a href="/mygarden">My Garden</a>
          <a href="/about">About</a>
          {user && (
  <div className="user-info">
   <span className="user-email"onClick={() => navigate("/profile")} 
   
   >{user.email}</span>
    
      <button
        className="logout-button"
        onClick={async () => {
          await handleLogout();
          
        }}
    >
      Logout
    </button>
    
  </div>
)}
        </div>
      </nav>

   </div>
  );
};

export default TournamentPage;