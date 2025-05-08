//src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginSigninPage from "./pages/LoginSigninPage.tsx";
import CommunityPage from "./pages/CommunityPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx"; 
import TournamentPage from "./pages/TournamentPage.tsx"; 
import MyGardenPage from "./pages/MyGardenPage.tsx";
import AboutPage from "./pages/AboutPage.tsx"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginSigninPage />} />
        <Route path="/communitypage" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/tournament" element={<TournamentPage />} /> 
        <Route path="/mygarden" element={<MyGardenPage />} /> 
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default  App;
