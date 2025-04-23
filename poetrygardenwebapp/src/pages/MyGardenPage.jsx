import React, { useState, useEffect } from 'react';
import { db, addGarden, fetchGardens } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/mygardenpage.css';
import Flower1 from '../images/Flower1.jpg';
import Flower2 from '../images/Flower2.jpg';
import Flower3 from '../images/Flower3.jpg';
import Poetrygardenlogo from '../images/Poetrygardenlogo.png';

const MyGardenPage = () => {
  const [newPoem, setNewPoem] = useState({ title: '', content: '', theme: '' });
  const [poems, setPoems] = useState([]);
  const [garden, setGarden] = useState([]);
  const [creatingPoem, setCreatingPoem] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedPoem, setSelectedPoem] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const loadPoems = async () => {
      try {
        const loadedPoems = await fetchGardens();
        setGarden(loadedPoems);
        setPoems(loadedPoems);
      } catch (err) {
        console.error("Error loading gardens:", err);
      }
    };

    loadPoems();
    return () => unsubscribe();
  }, []);

  const handlePoemSubmit = async () => {
    const placeholder =
      newPoem.theme === "love"
        ? ":rose:"
        : newPoem.theme === "hope"
        ? "Flower2.jpg"
        : ":seedling:";

    const newPoemEntry = {
      title: newPoem.title,
      content: newPoem.content,
      theme: newPoem.theme,
      placeholder,
      published: true,
      userEmail: user?.email || "Anonymous",
    };

    try {
      await addGarden(newPoemEntry);
      const entryWithId = { id: Date.now(), ...newPoemEntry };
      setPoems((prev) => [...prev, entryWithId]);
      setGarden((prev) => [...prev, entryWithId]);
      setCreatingPoem(false);
      setNewPoem({ title: "", content: "", theme: "" });
    } catch (err) {
      console.error("Failed to add poem to Firebase", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPoem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFlowerClick = (poem) => {
    setSelectedPoem(poem);
  };

  const closeModal = () => {
    setSelectedPoem(null);
  };

  const getFlowerImage = (placeholder) => {
    if (placeholder === ":rose:") return Flower1;
    if (placeholder === "Flower2.jpg") return Flower2;
    return Flower3;
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Poetrygardenlogo} alt="Logo" className="logo" />
        </div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/community">Community</a>
          <a href="/tournament">Tournament</a>
          <a href="/mygarden">My Garden</a>
          <a href="/about">About</a>
          {user && <span className="user-email">{user.email}</span>}
        </div>
      </nav>

      <div className="page-padding">
        <h1>My Garden</h1>

        <div className="garden-container">
          <div className="email-compose-box">
            <h2>Compose New Poem</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePoemSubmit();
              }}
            >
              <div className="form-row">
                <label>To:</label>
                <input type="text" value="Poetry Garden" disabled />
              </div>
              <div className="form-row">
                <label>Subject:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPoem.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Poem Title"
                />
              </div>
              <div className="form-row">
                <label>Message:</label>
                <textarea
                  id="content"
                  name="content"
                  value={newPoem.content}
                  onChange={handleInputChange}
                  required
                  placeholder="Write your poem here..."
                />
              </div>
              <div className="form-row">
                <label>Mood:</label>
                <select
                  id="theme"
                  name="theme"
                  value={newPoem.theme}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a mood</option>
                  <option value="love">Love</option>
                  <option value="hope">Hope</option>
                  <option value="nature">Nature</option>
                </select>
              </div>
              <div className="form-row">
                <button type="submit">Send Poem</button>
              </div>
            </form>
          </div>

          <div className="garden-display-box">
            <h2>Your Garden</h2>
            <div className="poem-flower-grid">
              {poems
                .filter((poem) => poem.published && poem.userEmail === user?.email)
                .map((poem) => (
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
          </div>
        </div>

        {selectedPoem && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedPoem.title}</h2>
              <p><strong>Poem:</strong> {selectedPoem.content}</p>
              <p><strong>Mood:</strong> {selectedPoem.theme}</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGardenPage;

