import React, { useState } from "react";
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // State to track the search input
  const [garden, setGarden] = useState([]); // State to track poems in the garden
  const [creatingPoem, setCreatingPoem] = useState(false); // State to track if the user is creating a poem
  const [newPoem, setNewPoem] = useState({ title: "", content: "", theme: "" }); // State for the new poem
  const [positions, setPositions] = useState({}); // State to track positions of poems
  const [selectedPoem, setSelectedPoem] = useState(null); // State to track the selected poem

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update state with the input value
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    console.log("Searching for:", searchTerm); // Log the search term (replace with your search logic)
  };

  const handleCreateClick = () => {
    setCreatingPoem(true); // Show the poem creation form
  };

  const handlePoemChange = (event) => {
    const { name, value } = event.target;
    setNewPoem((prev) => ({ ...prev, [name]: value })); // Update the new poem state
  };

  const handlePoemSubmit = () => {
    const placeholder =
      newPoem.theme === "love"
        ? ":rose:"
        : newPoem.theme === "hope"
        ? "sunflower2.png" // Use image for "hope" theme
        : ":seedling:";
    setGarden((prev) => [...prev, { ...newPoem, placeholder }]); // Add the new poem to the garden
    setCreatingPoem(false); // Hide the poem creation form
    setNewPoem({ title: "", content: "", theme: "" }); // Reset the new poem state
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index); // Store the index of the dragged poem
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData("text/plain");
    const dropX = event.clientX;
    const dropY = event.clientY;

    if (draggedIndex !== undefined) {
      setPositions((prev) => ({
        ...prev,
        [draggedIndex]: { x: dropX, y: dropY }, // Update position of the dragged poem
      }));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow dropping
  };

  const handleDoubleClick = (index) => {
    setSelectedPoem(garden[index]); // Set the selected poem to display its content
  };

  const handleCloseModal = () => {
    setSelectedPoem(null); // Close the modal by resetting the selected poem
  };

  return (
    <div className="App" onDrop={handleDrop} onDragOver={handleDragOver}>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span> Poetry Garden </span>
        </div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/my-garden" className="active">My Garden</a></li>
          <li><a href="/community-garden">Community Garden</a></li>
          <li><a href="/my-profile">Profile</a></li>
          <li><a href="/tournament">Tournament</a></li>
        </ul>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm} // Controlled input
            onChange={handleSearchChange} // Handle input change
          />
          <button type="submit">Search</button>
        </form>
      </nav>
      {/* Main Content */}
      <div className="main-content">
        <h1> My Garden </h1>
        <p> Welcome to your poetry garden!</p>
        <div className="garden-buttons">
          <button>Poem of the day</button>
          <button>My Poems</button>
          <button onClick={handleCreateClick}>Create</button>
        </div>
        {creatingPoem ? (
          <div className="create-poem">
            <h2>Create a New Poem</h2>
            <input
              type="text"
              name="title"
              placeholder="Poem Title"
              value={newPoem.title}
              onChange={handlePoemChange}
            />
            <textarea
              name="content"
              placeholder="Write your poem here..."
              value={newPoem.content}
              onChange={handlePoemChange}
            />
            <select name="theme" value={newPoem.theme} onChange={handlePoemChange}>
              <option value="">Select a Theme</option>
              <option value="love">Love</option>
              <option value="hope">Hope</option>
              <option value="nature">Nature</option>
            </select>
            <button onClick={handlePoemSubmit} disabled={!newPoem.title || !newPoem.content || !newPoem.theme}>
              Submit Poem
            </button>
          </div>
        ) : (
          <div className="garden">
            <h2>Your Garden</h2>
            <div className="garden-grid">
              {garden.map((poem, index) => {
                const position = positions[index] || { x: 0, y: 0 };
                return (
                  <div
                    key={index}
                    className="garden-item"
                    draggable
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDoubleClick={() => handleDoubleClick(index)} // Trigger modal on double-click
                    style={{
                      position: "absolute",
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      background: "none", // Ensure no background
                      border: "none", // Ensure no border
                      boxShadow: "none", // Ensure no shadow
                    }}
                  >
                    {poem.theme === "hope" ? (
                      <img
                        src="/sunflower2.png" // Ensure the correct path to the image
                        alt="Sunflower"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      <>
                        <span>{poem.placeholder}</span>
                        <p>{poem.title}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Modal for displaying poem content */}
        {selectedPoem && (
          <div className="poem-modal" style={{ 
            position: "fixed", 
            top: "0", 
            left: "0", 
            width: "100%", 
            height: "100%", 
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
          }}>
            <div className="poem-modal-content" style={{ 
              backgroundColor: "white", 
              padding: "20px", 
              borderRadius: "8px", 
              width: "50%", 
              textAlign: "center" 
            }}>
              <h2>{selectedPoem.title}</h2>
              <p>{selectedPoem.content}</p>
              <button onClick={handleCloseModal} style={{ 
                marginTop: "20px", 
                padding: "10px 20px", 
                backgroundColor: "#007BFF", 
                color: "white", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer" 
              }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
