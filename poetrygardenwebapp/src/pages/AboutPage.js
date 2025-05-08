import Poetrygardenlogo from '../images/Poetrygardenlogo.png';
import React, { useState, useEffect } from 'react';
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
    return (React.createElement("div", null,
        React.createElement("nav", { className: "navbar" },
            React.createElement("div", { className: "navbar-logo" },
                React.createElement("img", { src: Poetrygardenlogo, alt: "Logo", className: "logo" })),
            React.createElement("div", { className: "navbar-links" },
                React.createElement("a", { href: "/" }, "Home"),
                React.createElement("a", { href: "/communitypage" }, "Community"),
                React.createElement("a", { href: "/tournament" }, "Tournament"),
                React.createElement("a", { href: "/mygarden" }, "My Garden"),
                React.createElement("a", { href: "/about" }, "About"),
                user && (React.createElement("div", { className: "user-info" },
                    React.createElement("span", { className: "user-email" }, user.email),
                    React.createElement("button", { className: "logout-button", onClick: async () => {
                            await handleLogout();
                        } }, "Logout"))))),
        React.createElement("div", { className: "max-w-4xl mx-auto p-6 space-y-6 text-gray-800 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md" },
            React.createElement("h1", { className: "text-4xl font-bold text-center text-blue-800" }, "About Poetry Garden"),
            React.createElement("section", { className: "bg-white p-4 rounded-lg shadow" },
                React.createElement("h2", { className: "text-2xl font-semibold text-blue-600 mb-2" }, "Inspiration & Origin"),
                React.createElement("p", { className: "text-base mb-2" },
                    "The motivation for Poetry Garden came from our Git Master, ",
                    React.createElement("strong", null, "Rivers"),
                    ", and his creative idea to create a space for lovers of poetry to collaborate or work solo."),
                React.createElement("p", { className: "text-base" }, "The idea started during a Discord call when we needed a new project after our first was rejected \u2014 and thus, Poetry Garden was born. \uD83D\uDE04")),
            React.createElement("section", { className: "bg-white p-4 rounded-lg shadow" },
                React.createElement("h2", { className: "text-2xl font-semibold text-blue-600 mb-2" }, "Who We Are & What We Do"),
                React.createElement("ul", { className: "list-disc list-inside space-y-1 text-base mt-4" },
                    React.createElement("li", null,
                        React.createElement("strong", null, "Rivers Dupaquier"),
                        " \u2013 Senior, Software Engineering (Git Master) \u2013 Responsible for interactive and visual components"),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Jaylen Haney"),
                        " \u2013 Sophomore, Software Engineering (Project Manager) \u2013 Led task management and frontend development"),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Thomas Lee"),
                        " \u2013 Senior, Software Engineering (Communications Lead) \u2013 Oversaw backend development and facilitated team communication"),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Julian Rodgers"),
                        " \u2013 Junior, Cybersecurity (Quality Assurance) \u2013 Handled bug fixes and provided development support"),
                    React.createElement("li", null,
                        React.createElement("strong", null, "Tyler Jackson"),
                        " \u2013 Senior, Cybersecurity (Design Lead) \u2013 Created visual mockups and design assets"))),
            React.createElement("section", { className: "bg-white p-4 rounded-lg shadow" },
                React.createElement("h2", { className: "text-2xl font-semibold text-blue-600 mb-2" }, "Why People Use It"),
                React.createElement("p", { className: "text-base" }, "Poetry Garden provides a space for users to write poems and get feedback on their writing, phrasing, and composition.")),
            React.createElement("section", { className: "bg-white p-4 rounded-lg shadow" },
                React.createElement("h2", { className: "text-2xl font-semibold text-blue-600 mb-2" }, "Mission, Vision & Technology"),
                React.createElement("p", { className: "text-base" },
                    React.createElement("strong", null, "Mission:"),
                    " To foster academic success through dedication and hard work."),
                React.createElement("p", { className: "text-base" },
                    React.createElement("strong", null, "Vision:"),
                    " To inspire creativity. They\u2019re poets\u2014and they don\u2019t even know it!"),
                React.createElement("p", { className: "text-base mt-2" },
                    React.createElement("strong", null, "Tech Used:"),
                    " Firebase, React, AI Art Generator, Wormhole, Uiverse")))));
};
export default AboutPage;
