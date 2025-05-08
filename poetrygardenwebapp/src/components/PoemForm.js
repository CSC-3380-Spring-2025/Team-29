import React from "react";
const PoemForm = ({ newPoem, handleInputChange, handlePoemSubmit, getFlowerImage, }) => {
    return (React.createElement("div", { className: "poem-form" },
        React.createElement("input", { type: "text", name: "title", placeholder: "Poem Title", value: newPoem.title, onChange: handleInputChange, required: true }),
        React.createElement("textarea", { name: "content", placeholder: "Write your poem here...", value: newPoem.content, onChange: handleInputChange, required: true }),
        React.createElement("select", { name: "theme", value: newPoem.theme, onChange: handleInputChange, required: true },
            React.createElement("option", { value: "" }, "Select Theme"),
            React.createElement("option", { value: "love" }, "Love"),
            React.createElement("option", { value: "loss" }, "Loss"),
            React.createElement("option", { value: "time" }, "Time"),
            React.createElement("option", { value: "dreams" }, "Dreams"),
            React.createElement("option", { value: "nature" }, "Nature"),
            React.createElement("option", { value: "identity" }, "Identity"),
            React.createElement("option", { value: "silence" }, "Silence"),
            React.createElement("option", { value: "hope" }, "Hope"),
            React.createElement("option", { value: "chaos" }, "Chaos"),
            React.createElement("option", { value: "memory" }, "Memory"),
            React.createElement("option", { value: "faith" }, "Faith"),
            React.createElement("option", { value: "solitude" }, "Solitude")),
        newPoem.theme && (React.createElement("img", { src: getFlowerImage(newPoem.theme), alt: "Preview Flower", className: "flower-preview" })),
        React.createElement("button", { onClick: handlePoemSubmit }, "Send Poem")));
};
export default PoemForm;
