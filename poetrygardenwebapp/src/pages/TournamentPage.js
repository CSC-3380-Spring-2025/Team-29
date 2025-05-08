import React, { useState, useEffect } from 'react';
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
    return (React.createElement("div", null,
        React.createElement("nav", { className: "navbar" },
            React.createElement("h2", { className: "navbar-title" }, "Poetry Garden"),
            React.createElement("div", { className: "navbar-links" },
                React.createElement("a", { href: "/" }, "Home"),
                React.createElement("a", { href: "/community" }, "Community"),
                React.createElement("a", { href: "/tournament" }, "Tournament"),
                React.createElement("a", { href: "/mygarden" }, "My Garden"),
                React.createElement("a", { href: "/about" }, "About"),
                user && React.createElement("span", { className: "user-email" }, user.email)))));
};
export default TournamentPage;
