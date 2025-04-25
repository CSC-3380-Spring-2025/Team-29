
import Poetrygardenlogo from '../images/Poetrygardenlogo.png'; 
import React, { useState, useEffect } from 'react';
import { db, addGarden, fetchGardens } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/aboutpage.css';
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
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

    <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-800 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold text-center text-blue-800">About Poetry Garden</h1>

      {/* Combined Section */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Inspiration & Origin</h2>
        <p className="text-base mb-2">
          The motivation for Poetry Garden came from our Git Master, <strong>Rivers</strong>, and his creative idea to create a space for lovers of poetry to collaborate or work solo.
        </p>
        <p className="text-base">
          The idea started during a Discord call when we needed a new project after our first was rejected — and thus, Poetry Garden was born. 😄
        </p>
      </section>

      {/* Team Overview */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Who We Are & What We Do</h2>
        <ul className="list-disc list-inside space-y-1 text-base mt-4">
  <li><strong>Rivers Dupaquier</strong> – Senior, Software Engineering (Git Master) – Responsible for interactive and visual components</li>
  <li><strong>Jaylen Haney</strong> – Sophomore, Software Engineering (Project Manager) – Led task management and frontend development</li>
  <li><strong>Thomas Lee</strong> – Senior, Software Engineering (Communications Lead) – Oversaw backend development and facilitated team communication</li>
  <li><strong>Julian Rodgers</strong> – Junior, Cybersecurity (Quality Assurance) – Handled bug fixes and provided development support</li>
  <li><strong>Tyler Jackson</strong> – Senior, Cybersecurity (Design Lead) – Created visual mockups and design assets</li>
</ul>

      </section> 

      {/* Why & How */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Why People Use It</h2>
        <p className="text-base">
          Poetry Garden provides a space for users to write poems and get feedback on their writing, phrasing, and composition.
        </p>
      </section>

      {/* Mission & Tech */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Mission, Vision & Technology</h2>
        <p className="text-base"><strong>Mission:</strong> To foster academic success through dedication and hard work.</p>
        <p className="text-base"><strong>Vision:</strong> To inspire creativity. They’re poets—and they don’t even know it!</p>
        <p className="text-base mt-2"><strong>Tech Used:</strong> Firebase, React, AI Art Generator, Wormhole, Uiverse</p>
      </section>
    </div>
    </div>
  );
};

export default AboutPage;