import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Poetrygardenlogo from '../images/Poetrygardenlogo.png';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/aboutpage.css';
import { useNavigate } from "react-router-dom";
const AboutPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null); // optional: clear local user state
            navigate("/");
        }
        catch (err) {
            console.error("Logout failed:", err);
        }
    };
    return (_jsxs("div", { children: [_jsxs("nav", { className: "navbar", children: [_jsx("div", { className: "navbar-logo", children: _jsx("img", { src: Poetrygardenlogo, alt: "Logo", className: "logo" }) }), _jsxs("div", { className: "navbar-links", children: [_jsx("a", { href: "/", children: "Home" }), _jsx("a", { href: "/communitypage", children: "Community" }), _jsx("a", { href: "/tournament", children: "Tournament" }), _jsx("a", { href: "/mygarden", children: "My Garden" }), _jsx("a", { href: "/about", children: "About" }), user && (_jsxs("div", { className: "user-info", children: [_jsx("span", { className: "user-email", children: user.email }), _jsx("button", { className: "logout-button", onClick: async () => {
                                            await handleLogout();
                                        }, children: "Logout" })] }))] })] }), _jsxs("div", { className: "max-w-4xl mx-auto p-6 space-y-6 text-gray-800 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md", children: [_jsx("h1", { className: "text-4xl font-bold text-center text-blue-800", children: "About Poetry Garden" }), _jsxs("section", { className: "bg-white p-4 rounded-lg shadow", children: [_jsx("h2", { className: "text-2xl font-semibold text-blue-600 mb-2", children: "Inspiration & Origin" }), _jsxs("p", { className: "text-base mb-2", children: ["The motivation for Poetry Garden came from our Git Master, ", _jsx("strong", { children: "Rivers" }), ", and his creative idea to create a space for lovers of poetry to collaborate or work solo."] }), _jsx("p", { className: "text-base", children: "The idea started during a Discord call when we needed a new project after our first was rejected \u2014 and thus, Poetry Garden was born. \uD83D\uDE04" })] }), _jsxs("section", { className: "bg-white p-4 rounded-lg shadow", children: [_jsx("h2", { className: "text-2xl font-semibold text-blue-600 mb-2", children: "Who We Are & What We Do" }), _jsxs("ul", { className: "list-disc list-inside space-y-1 text-base mt-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Rivers Dupaquier" }), " \u2013 Senior, Software Engineering (Git Master) \u2013 Responsible for interactive and visual components"] }), _jsxs("li", { children: [_jsx("strong", { children: "Jaylen Haney" }), " \u2013 Sophomore, Software Engineering (Project Manager) \u2013 Led task management and frontend development"] }), _jsxs("li", { children: [_jsx("strong", { children: "Thomas Lee" }), " \u2013 Senior, Software Engineering (Communications Lead) \u2013 Oversaw backend development and facilitated team communication"] }), _jsxs("li", { children: [_jsx("strong", { children: "Julian Rodgers" }), " \u2013 Junior, Cybersecurity (Quality Assurance) \u2013 Handled bug fixes and provided development support"] }), _jsxs("li", { children: [_jsx("strong", { children: "Tyler Jackson" }), " \u2013 Senior, Cybersecurity (Design Lead) \u2013 Created visual mockups and design assets"] })] })] }), _jsxs("section", { className: "bg-white p-4 rounded-lg shadow", children: [_jsx("h2", { className: "text-2xl font-semibold text-blue-600 mb-2", children: "Why People Use It" }), _jsx("p", { className: "text-base", children: "Poetry Garden provides a space for users to write poems and get feedback on their writing, phrasing, and composition." })] }), _jsxs("section", { className: "bg-white p-4 rounded-lg shadow", children: [_jsx("h2", { className: "text-2xl font-semibold text-blue-600 mb-2", children: "Mission, Vision & Technology" }), _jsxs("p", { className: "text-base", children: [_jsx("strong", { children: "Mission:" }), " To foster academic success through dedication and hard work."] }), _jsxs("p", { className: "text-base", children: [_jsx("strong", { children: "Vision:" }), " To inspire creativity. They\u2019re poets\u2014and they don\u2019t even know it!"] }), _jsxs("p", { className: "text-base mt-2", children: [_jsx("strong", { children: "Tech Used:" }), " Firebase, React, AI Art Generator, Wormhole, Uiverse"] })] })] })] }));
};
export default AboutPage;
