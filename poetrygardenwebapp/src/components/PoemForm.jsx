import React from "react";

const PoemForm = ({
  newPoem,
  handleInputChange,
  handlePoemSubmit,
  getFlowerImage,
}) => {
  return (
    <div className="poem-form">
      <input
        type="text"
        name="title"
        placeholder="Poem Title"
        value={newPoem.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="content"
        placeholder="Write your poem here..."
        value={newPoem.content}
        onChange={handleInputChange}
        required
      />
      <select
        name="theme"
        value={newPoem.theme}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Theme</option>
        <option value="love">Love</option>
        <option value="loss">Loss</option>
        <option value="time">Time</option>
        <option value="dreams">Dreams</option>
        <option value="nature">Nature</option>
        <option value="identity">Identity</option>
        <option value="silence">Silence</option>
        <option value="hope">Hope</option>
        <option value="chaos">Chaos</option>
        <option value="memory">Memory</option>
        <option value="faith">Faith</option>
        <option value="solitude">Solitude</option>
      </select>

      {newPoem.theme && (
        <img
          src={getFlowerImage(newPoem.theme)}
          alt="Preview Flower"
          className="flower-preview"
        />
      )}

      <button onClick={handlePoemSubmit}>Send Poem</button>
    </div>
  );
};

export default PoemForm;