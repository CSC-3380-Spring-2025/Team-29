import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Header from "../components/Header";
import PoemForm from "../components/PoemForm";
import HandlePoemSubmit from "../Utilities/HandlePoemSubmit";
import PoemLogic from "../components/PoemLogic";
import getFlowerImage from "../Utilities/GetFlowerImage";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const PoemPage = ({ title, filterPoems }) => {
    const { newPoem, setNewPoem, poems, setPoems, garden, setGarden, user, setUser, selectedPoem: selectedPoemState, setSelectedPoem: setSelectedPoemState, showForm, setShowForm, navigate, } = PoemLogic();
    const [selectedPoem, setSelectedPoem] = useState(null);
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
                user: user ? { email: user.email || undefined } : null,
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
    return (_jsxs("div", { className: "poem-page", children: [_jsx(Header, { user: user && user.email ? { email: user.email } : null, handleLogout: handleLogout }), _jsxs("div", { className: "page-padding", children: [_jsx("h1", { children: title }), _jsxs("div", { className: "garden-box", children: [_jsx("div", { className: "garden-header", children: _jsx("button", { className: "toggle-button", onClick: () => setShowForm(!showForm), children: showForm ? "-" : "+" }) }), showForm && (_jsx(PoemForm, { newPoem: newPoem, handleInputChange: handleInputChange, handlePoemSubmit: handlePoemSubmit, getFlowerImage: getFlowerImage })), _jsx("div", { className: "poem-flower-grid", children: filterPoems(poems).map((poem) => (_jsxs("div", { className: "flower-wrapper", children: [_jsx("img", { src: getFlowerImage(poem.placeholder), alt: poem.theme, className: "flower-icon", onClick: () => handleFlowerClick(poem) }), _jsx("span", { className: "tooltip", children: poem.title })] }, poem.id))) })] }), selectedPoem && (_jsx("div", { className: "modal-overlay", onClick: closeModal, children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsx("h2", { children: selectedPoem.title }), _jsxs("p", { children: [_jsx("strong", { children: "Poem:" }), " ", selectedPoem.content] }), _jsxs("p", { children: [_jsx("strong", { children: "Theme:" }), " ", selectedPoem.theme] }), _jsx("button", { onClick: closeModal, children: "Close" })] }) }))] })] }));
};
export default PoemPage;
