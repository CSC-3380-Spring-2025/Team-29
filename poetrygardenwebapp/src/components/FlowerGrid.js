import React from "react";
const FlowerGrid = ({ poems, getFlowerImage, handleFlowerClick, filterByUser }) => {
    const filteredPoems = filterByUser
        ? poems.filter((poem) => poem.published && poem.userEmail === filterByUser)
        : poems;
    return (React.createElement("div", { className: "poem-flower-grid" }, filteredPoems.map((poem) => (React.createElement("div", { key: poem.id, className: "flower-wrapper" },
        React.createElement("img", { src: getFlowerImage(poem.placeholder), alt: poem.theme, className: "flower-icon", onClick: () => handleFlowerClick(poem) }),
        React.createElement("span", { className: "tooltip" }, poem.title))))));
};
export default FlowerGrid;
