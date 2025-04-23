// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginSigninPage from "./pages/LoginSigninPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage"; 
import TournamentPage from "./pages/TournamentPage"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginSigninPage />} />
        <Route path="/communitypage" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/tournament" element={<TournamentPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
