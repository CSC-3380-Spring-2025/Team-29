import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/ProfileCard.css';
const ProfileCard = () => {
    const [username, setUsername] = useState("Username");
    const [bio, setBio] = useState("Tell us about yourself");
    const [email, setEmail] = useState("your@email.com");
    const [location, setLocation] = useState("City, Country");
    const [interests, setInterests] = useState("etc. Coding, Gaming");
    const [language, setLanguage] = useState("English");
    const [nickname, setNickname] = useState("Choose a funky nickname");
    const [pfp, setPfp] = useState(null);
    const [editing, setEditing] = useState(false);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            setPfp(URL.createObjectURL(file));
        }
    };
    const profileFields = [
        { label: "Bio", value: bio, setValue: setBio },
        { label: "Email", value: email, setValue: setEmail },
        { label: "Location", value: location, setValue: setLocation },
        { label: "Interests", value: interests, setValue: setInterests },
        { label: "Language", value: language, setValue: setLanguage },
        { label: "Nickname", value: nickname, setValue: setNickname },
    ];
    const handleSave = () => {
        setEditing(false);
    };
    const handleCancel = () => {
        setEditing(false);
    };
    return (_jsx(AnimatePresence, { children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.3 }, className: "profile-container", children: [_jsx("div", { className: "profile-title", children: "Profile" }), _jsxs("div", { className: "profile-picture", children: [pfp ? (_jsx("img", { src: pfp, alt: "User profile", className: "profile-picture" })) : (_jsx("div", { className: "placeholder-pfp", children: "?" })), editing && (_jsx("input", { type: "file", accept: ".png,.jpeg,.jpg", onChange: handleFileChange, className: "edit-button" }))] }), !editing && (_jsx("h2", { className: "text-center text-green-700 font-bold mt-4", children: username })), !editing && (_jsx("button", { onClick: () => setEditing(true), className: "edit-button", children: "Edit Profile" })), _jsx("div", { className: "profile-fields", children: profileFields.map(({ label, value, setValue }) => (_jsxs("div", { className: "profile-field", children: [_jsxs("label", { children: [label, ":"] }), editing ? (_jsx("input", { type: "text", value: value, onChange: (e) => setValue(e.target.value) })) : (_jsx("p", { children: value }))] }, label))) }), editing && (_jsxs("div", { className: "button-group", children: [_jsx("button", { onClick: handleCancel, className: "button-cancel", children: "Cancel" }), _jsx("button", { onClick: handleSave, className: "button-save", children: "Save" })] }))] }) }));
};
export default ProfileCard;
