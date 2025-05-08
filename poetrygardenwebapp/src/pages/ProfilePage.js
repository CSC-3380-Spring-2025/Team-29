import React, { useState } from "react";
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
    return (React.createElement(AnimatePresence, null,
        React.createElement(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.3 }, className: "profile-container" },
            React.createElement("div", { className: "profile-title" }, "Profile"),
            React.createElement("div", { className: "profile-picture" },
                pfp ? (React.createElement("img", { src: pfp, alt: "User profile", className: "profile-picture" })) : (React.createElement("div", { className: "placeholder-pfp" }, "?")),
                editing && (React.createElement("input", { type: "file", accept: ".png,.jpeg,.jpg", onChange: handleFileChange, className: "edit-button" }))),
            !editing && (React.createElement("h2", { className: "text-center text-green-700 font-bold mt-4" }, username)),
            !editing && (React.createElement("button", { onClick: () => setEditing(true), className: "edit-button" }, "Edit Profile")),
            React.createElement("div", { className: "profile-fields" }, profileFields.map(({ label, value, setValue }) => (React.createElement("div", { key: label, className: "profile-field" },
                React.createElement("label", null,
                    label,
                    ":"),
                editing ? (React.createElement("input", { type: "text", value: value, onChange: (e) => setValue(e.target.value) })) : (React.createElement("p", null, value)))))),
            editing && (React.createElement("div", { className: "button-group" },
                React.createElement("button", { onClick: handleCancel, className: "button-cancel" }, "Cancel"),
                React.createElement("button", { onClick: handleSave, className: "button-save" }, "Save"))))));
};
export default ProfileCard;
