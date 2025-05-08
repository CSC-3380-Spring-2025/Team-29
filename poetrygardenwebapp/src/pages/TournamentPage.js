import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
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
    return (_jsx("div", { children: _jsxs("nav", { className: "navbar", children: [_jsx("h2", { className: "navbar-title", children: "Poetry Garden" }), _jsxs("div", { className: "navbar-links", children: [_jsx("a", { href: "/", children: "Home" }), _jsx("a", { href: "/community", children: "Community" }), _jsx("a", { href: "/tournament", children: "Tournament" }), _jsx("a", { href: "/mygarden", children: "My Garden" }), _jsx("a", { href: "/about", children: "About" }), user && _jsx("span", { className: "user-email", children: user.email })] })] }) }));
};
export default TournamentPage;
