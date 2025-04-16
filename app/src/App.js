import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // State to track the search input
  const [garden, setGarden] = useState([]); // State to track poems in the garden
  const [creatingPoem, setCreatingPoem] = useState(false); // State to track if the user is creating a poem
  const [showMyPoems, setShowMyPoems] = useState(false); // State to track if "My Poems" is active
  const [newPoem, setNewPoem] = useState({ title: "", content: "", theme: "" }); // State for the new poem
  const [positions, setPositions] = useState({}); // State to track positions of poems
  const [selectedPoem, setSelectedPoem] = useState(null); // State to track the selected poem
  const [poems, setPoems] = useState([
    { id: 1, title: 'Poem One', content: 'This is the first poem.' },
    { id: 2, title: 'Poem Two', content: 'This is the second poem.' },
    { id: 3, title: 'Poem Three', content: 'This is the third poem.' },
  ]);

  const filteredPoems = poems.filter(poem =>
    poem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update state with the input value
  };

  const handleMyPoemsClick = () => {
    setShowMyPoems(true); // Show the "My Poems" section
    setCreatingPoem(false); // Hide the poem creation form if active
  };

  const handleCreateClick = () => {
    setCreatingPoem(true); // Show the poem creation form
    setShowMyPoems(false); // Hide the "My Poems" section if active
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

    const newPoemEntry = {
      id: poems.length + 1, // Generate a new ID
      title: newPoem.title,
      content: newPoem.content,
      theme: newPoem.theme,
      placeholder,
    };

    setGarden((prev) => [...prev, newPoemEntry]); // Add the new poem to the garden
    setPoems((prev) => [...prev, newPoemEntry]); // Add the new poem to the "My Poems" list
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
    <Router>
      <div className="App" onDrop={handleDrop} onDragOver={handleDragOver}>
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-logo">
            <span> Poetry Garden </span>
          </div>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/my-garden" className="active">My Garden</Link></li>
            <li><Link to="/community-garden">Community Garden</Link></li>
            <li><Link to="/my-profile">Profile</Link></li>
            <li><Link to="/tournament">Tournament</Link></li>
          </ul>
          <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
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
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-content">
                <h1>Welcome to Poetry Garden</h1>
                <p>Explore and create beautiful poems!</p>
              </div>
            }
          />
          <Route
            path="/my-garden"
            element={
              <div className="main-content">
                <h1> My Garden </h1>
                <p> Welcome to your poetry garden!</p>
                <div className="garden-buttons">
                  <button>Poem of the day</button>
                  <button onClick={handleMyPoemsClick}>My Poems</button>
                  <button onClick={handleCreateClick}>Create</button>
                </div>
                {creatingPoem && (
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
                      <option value="melancholy">Melancholy</option>
                      <option value="joy">Joy</option>
                      <option value="sadness">Sadness</option>
                      <option value="others">Others</option>
                    </select>
                    <button onClick={handlePoemSubmit} disabled={!newPoem.title || !newPoem.content || !newPoem.theme}>
                      Submit Poem
                    </button>
                  </div>
                )}
                {showMyPoems && (
                  <div className="my-poems">
                    <h2>My Poems</h2>
                    <input
                      type="text"
                      placeholder="Search poems..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <ul className="my-poems-list">
                      {filteredPoems.map((poem) => (
                        <li key={poem.id}>
                          <Link to={`/poem/${poem.id}`}>{poem.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!creatingPoem && !showMyPoems && (
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
            }
          />
          <Route path="/poem/:id" element={<PoemDetail poems={poems} />} />
        </Routes>
      </div>
    </Router>
  );
}

function PoemDetail({ poems }) {
  const { id } = useParams();
  const poem = poems.find((poem) => poem.id === parseInt(id));

  if (!poem) {
    return <div>Poem not found</div>;
  }

  return (
    <div className="poem-detail">
      <h2>{poem.title}</h2>
      <p>{poem.content}</p>
      <Link to="/my-garden">Back to My Garden</Link>
    </div>
  );
}

export default App;
