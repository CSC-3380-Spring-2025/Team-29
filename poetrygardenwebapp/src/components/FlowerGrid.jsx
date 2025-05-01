import React from "react";

const FlowerGrid = ({ poems, getFlowerImage, handleFlowerClick, filterByUser }) => {
  const filteredPoems = filterByUser
    ? poems.filter((poem) => poem.published && poem.userEmail === filterByUser)
    : poems;

  return (
    <div className="poem-flower-grid">
      {filteredPoems.map((poem) => (
        <div key={poem.id} className="flower-wrapper">
          <img
            src={getFlowerImage(poem.placeholder)}
            alt={poem.theme}
            className="flower-icon"
            onClick={() => handleFlowerClick(poem)}
          />
          <span className="tooltip">{poem.title}</span>
        </div>
      ))}
    </div>
  );
};

export default FlowerGrid;