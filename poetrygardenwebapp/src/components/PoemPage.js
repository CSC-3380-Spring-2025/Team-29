import React from "react";
import Header from "../components/Header";
import PoemForm from "../components/PoemForm";
import HandlePoemSubmit from "../Utilities/HandlePoemSubmit";
import PoemLogic from "../components/PoemLogic";
import getFlowerImage from "../Utilities/GetFlowerImage";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const PoemPage = ({ title, filterPoems }) => {
    const { newPoem, setNewPoem, poems, setPoems, garden, setGarden, user, setUser, selectedPoem, setSelectedPoem, showForm, setShowForm, navigate, } = PoemLogic();
    // Handle input changes for the poem form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPoem((prev) => ({ ...prev, [name]: value }));
    };
    // Handle poem submission
    const handlePoemSubmit = async () => {
        try {
            await HandlePoemSubmit({
                newPoem,
                user,
                setPoems,
                setGarden,
                setShowForm,
                setNewPoem,
            });
        }
        catch (err) {
            console.error("Failed to submit poem:", err);
        }
    };
    // Handle flower click to open modal
    const handleFlowerClick = (poem) => {
        setSelectedPoem(poem);
    };
    // Close the modal
    const closeModal = () => {
        setSelectedPoem(null);
    };
    // Handle user logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            navigate("/");
        }
        catch (err) {
            console.error("Logout failed:", err);
        }
    };
    return (React.createElement("div", { className: "poem-page" },
        React.createElement(Header, { user: user, handleLogout: handleLogout }),
        React.createElement("div", { className: "page-padding" },
            React.createElement("h1", null, title),
            React.createElement("div", { className: "garden-box" },
                React.createElement("div", { className: "garden-header" },
                    React.createElement("button", { className: "toggle-button", onClick: () => setShowForm(!showForm) }, showForm ? "-" : "+")),
                showForm && (React.createElement(PoemForm, { newPoem: newPoem, handleInputChange: handleInputChange, handlePoemSubmit: handlePoemSubmit, getFlowerImage: getFlowerImage })),
                React.createElement("div", { className: "poem-flower-grid" }, filterPoems(poems).map((poem) => (React.createElement("div", { key: poem.id, className: "flower-wrapper" },
                    React.createElement("img", { src: getFlowerImage(poem.placeholder), alt: poem.theme, className: "flower-icon", onClick: () => handleFlowerClick(poem) }),
                    React.createElement("span", { className: "tooltip" }, poem.title)))))),
            selectedPoem && (React.createElement("div", { className: "modal-overlay", onClick: closeModal },
                React.createElement("div", { className: "modal-content", onClick: (e) => e.stopPropagation() },
                    React.createElement("h2", null, selectedPoem.title),
                    React.createElement("p", null,
                        React.createElement("strong", null, "Poem:"),
                        " ",
                        selectedPoem.content),
                    React.createElement("p", null,
                        React.createElement("strong", null, "Theme:"),
                        " ",
                        selectedPoem.theme),
                    React.createElement("button", { onClick: closeModal }, "Close")))))));
};
export default PoemPage;
