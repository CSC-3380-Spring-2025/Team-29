import React from 'react';
import { Link } from 'react-router-dom';
import Poetrygardenlogo from "../images/Poetrygardenlogo.png";
const Header = ({ user, handleLogout }) => {
    return (React.createElement("nav", { className: "navbar" },
        React.createElement("div", { className: "navbar-logo" },
            React.createElement("img", { src: Poetrygardenlogo, alt: "Logo", className: "logo" })),
        React.createElement("div", { className: "navbar-links" },
            React.createElement("a", { href: "/" }, "Home"),
            React.createElement("a", { href: "/communitypage" }, "Community"),
            React.createElement("a", { href: "/tournament" }, "Tournament"),
            React.createElement("a", { href: "/mygarden" }, "My Garden"),
            React.createElement("a", { href: "/about" }, "About"),
            user && (React.createElement("div", { className: "user-info" },
                React.createElement(Link, { to: "/profile", className: "user-email" }, user.email),
                React.createElement("button", { className: "logout-button", onClick: async () => {
                        await handleLogout();
                    } }, "Logout"))))));
};
export default Header;
