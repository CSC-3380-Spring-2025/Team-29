
import React from "react";
import { useNavigate } from "react-router-dom";
import Poetrygardenlogo from '../images/Poetrygardenhomepage.png';
import '../styles/homepage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    
    <div style={{ textAlign: "center", marginTop: "100px" }}>
       <img src={Poetrygardenlogo} alt="Logo" />
      <h1> </h1>
      <button className="big-button" onClick={() => navigate("/signin")}>Get Started</button>
    </div>
  );
}

export default HomePage;
