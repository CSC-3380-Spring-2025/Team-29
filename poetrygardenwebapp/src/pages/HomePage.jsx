
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Poetry Garden</h1>
      <button onClick={() => navigate("/signin")}>Get Started</button>
    </div>
  );
}

export default HomePage;
