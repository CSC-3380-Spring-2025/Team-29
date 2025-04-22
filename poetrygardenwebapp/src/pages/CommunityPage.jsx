import React, { useState, useEffect } from 'react';
import { auth, db, addGarden, fetchGardens } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth'; // ✅ Add this import
import '../styles/communitypage.css';

const CommunityPage = () => {
  const [newPoem, setNewPoem] = useState({ title: '', content: '', theme: '' });
  const [poems, setPoems] = useState([]);
  const [garden, setGarden] = useState([]);
  const [creatingPoem, setCreatingPoem] = useState(false);
  const [user, setUser] = useState(null); // ✅ Track logged-in user

  // ✅ Track auth state (stay logged in)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // null if not logged in
    });
    return () => unsubscribe(); // Clean up listener
  }, []);

  // ✅ Load poems on mount
  useEffect(() => {
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
  }, []);

  const handlePoemSubmit = async () => {
    const placeholder =
      newPoem.theme === "love"
        ? ":rose:"
        : newPoem.theme === "hope"
        ? "sunflower2.png"
        : ":seedling:";

    const newPoemEntry = {
      title: newPoem.title,
      content: newPoem.content,
      theme: newPoem.theme,
      placeholder,
    };

    try {
      await addGarden(newPoemEntry);
      const newEntryWithId = { id: Date.now(), ...newPoemEntry };
      setPoems((prev) => [...prev, newEntryWithId]);
      setGarden((prev) => [...prev, newEntryWithId]);
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

  return (
    <div>
      {/* ✅ Navigation Bar */}
      <nav className="navbar">
        <h2 className="navbar-title">Poetry Garden</h2>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/community">Community</a>
          <a href="/about">About</a>
          {user && (
            <span className="navbar-user">Welcome, {user.email}</span>
          )}
        </div>
      </nav>

      <div className="page-padding">
        <h1>Community Garden</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePoemSubmit();
          }}
        >
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newPoem.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={newPoem.content}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="theme">Theme:</label>
            <select
              id="theme"
              name="theme"
              value={newPoem.theme}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a theme</option>
              <option value="love">Love</option>
              <option value="hope">Hope</option>
              <option value="nature">Nature</option>
            </select>
          </div>
          <button type="submit">Submit Poem</button>
        </form>

        <h2>Your Poems</h2>
        <div>
          {poems.length > 0 ? (
            poems.map((poem) => (
              <div key={poem.id} className="poem-card">
                <h3>{poem.title}</h3>
                <p>{poem.content}</p>
                <p><strong>Theme:</strong> {poem.theme}</p>
                <p><strong>Placeholder:</strong> {poem.placeholder}</p>
              </div>
            ))
          ) : (
            <p>No poems yet. Submit your first poem!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
