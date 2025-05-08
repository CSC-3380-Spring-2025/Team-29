import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import Poetrygardenlogo from "../images/Poetrygardenlogo.png";
const Header = ({ user, handleLogout }) => {
    return (_jsxs("nav", { className: "navbar", children: [_jsx("div", { className: "navbar-logo", children: _jsx("img", { src: Poetrygardenlogo, alt: "Logo", className: "logo" }) }), _jsxs("div", { className: "navbar-links", children: [_jsx("a", { href: "/", children: "Home" }), _jsx("a", { href: "/communitypage", children: "Community" }), _jsx("a", { href: "/tournament", children: "Tournament" }), _jsx("a", { href: "/mygarden", children: "My Garden" }), _jsx("a", { href: "/about", children: "About" }), user && (_jsxs("div", { className: "user-info", children: [_jsx(Link, { to: "/profile", className: "user-email", children: user.email }), _jsx("button", { className: "logout-button", onClick: async () => {
                                    await handleLogout();
                                }, children: "Logout" })] }))] })] }));
};
export default Header;
