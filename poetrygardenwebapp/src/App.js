import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginSigninPage from "./pages/LoginSigninPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import TournamentPage from "./pages/TournamentPage";
import MyGardenPage from "./pages/MyGardenPage";
import AboutPage from "./pages/AboutPage";
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/signin", element: _jsx(LoginSigninPage, {}) }), _jsx(Route, { path: "/communitypage", element: _jsx(CommunityPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/tournament", element: _jsx(TournamentPage, {}) }), _jsx(Route, { path: "/mygarden", element: _jsx(MyGardenPage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) })] }) }));
};
export default App;
