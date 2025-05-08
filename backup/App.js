// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginSigninPage from "./pages/LoginSigninPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import TournamentPage from "./pages/TournamentPage";
import MyGardenPage from "./pages/MyGardenPage";
import AboutPage from "./pages/AboutPage";
const App = () => {
    return (React.createElement(Router, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(HomePage, null) }),
            React.createElement(Route, { path: "/signin", element: React.createElement(LoginSigninPage, null) }),
            React.createElement(Route, { path: "/communitypage", element: React.createElement(CommunityPage, null) }),
            React.createElement(Route, { path: "/profile", element: React.createElement(ProfilePage, null) }),
            React.createElement(Route, { path: "/tournament", element: React.createElement(TournamentPage, null) }),
            React.createElement(Route, { path: "/mygarden", element: React.createElement(MyGardenPage, null) }),
            React.createElement(Route, { path: "/about", element: React.createElement(AboutPage, null) }))));
};
export default App;
