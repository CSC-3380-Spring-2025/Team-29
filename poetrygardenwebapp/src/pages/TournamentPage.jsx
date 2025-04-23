import React, { useState, useEffect } from 'react';
import { db, addGarden, fetchGardens } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const TournamentPage = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
        return () => unsubscribe();
  }, []);
        return(
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="navbar-title">Poetry Garden</h2>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/community">Community</a>
          <a href="/tournament">Tournament</a>
          <a href="/mygarden">My Garden</a>
          <a href="/about">About</a>
          {user && <span className="user-email">{user.email}</span>}
        </div>
      </nav>
      </div>
    
    );

};

export default TournamentPage;