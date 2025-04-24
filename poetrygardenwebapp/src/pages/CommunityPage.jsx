/*
import React, { useState, useEffect } from 'react';
import { db, addGarden, fetchGardens } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/communitypage.css';
import Flower1 from '../images/Flower1.jpg'; // Example flower image
import Flower2 from '../images/Flower2.jpg'; // Example flower image
import Flower3 from '../images/Flower3.jpg'; // Example flower image
import Poetrygardenlogo from '../images/Poetrygardenlogo.png'; 

const CommunityPage = () => {
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
  if (placeholder === ":rose:") return Flower1; // Use imported Flower1
  if (placeholder === "Flower2.jpg") return Flower2; // Use imported Flower2
  return Flower3; // Default to imported Flower3
};

  return (
    <div>
      {/* Navigation Bar */

      /*
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

      {/* Page Content */
      /*
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

        {/* Modal */
        /*
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

export default CommunityPage;
*/

import React, { useState, useEffect } from 'react';
import { auth, addGarden, fetchGardens } from '../firebase';
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import '../styles/communitypage.css';
import Flower1 from '../images/Flower1.png';
import Flower2 from '../images/Flower2.png';
import Flower3 from '../images/Flower3.png';
import Flower4 from '../images/Flower4.png';
import Flower5 from '../images/Flower5.png';
import Flower6 from '../images/Flower6.png';
import Flower7 from '../images/Flower7.png';
import Flower8 from '../images/Flower8.png';
import Flower9 from '../images/Flower9.png';
import Flower10 from '../images/Flower10.png';
import Flower11 from '../images/Flower11.png';
import Flower12 from '../images/Flower12.png';
import Poetrygardenlogo from '../images/Poetrygardenlogo.png';

const CommunityPage = () => {

  const [newPoem, setNewPoem] = useState({ title: '', content: '', theme: '' });
  const [poems, setPoems] = useState([]);
  const [garden, setGarden] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();


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
      newPoem.theme === "love"? "Flower1.png"
      :newPoem.theme === "loss"? "Flower2.png"
        :newPoem.theme === "time"? "Flower3.png"
        :newPoem.theme === "dreams"? "Flower4.png"
        :newPoem.theme === "nature"? "Flower5.png"
        :newPoem.theme === "identity"? "Flower6.png"
        :newPoem.theme === "silence"? "Flower7.png"
        :newPoem.theme === "hope"? "Flower8.png"
        :newPoem.theme === "chaos"? "Flower9.png"
        :newPoem.theme === "memory"? "Flower10.png"
        :newPoem.theme === "faith"? "Flower11.png"
        :newPoem.theme === "solitude"? "Flower12.png" //
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
      setShowForm(false);
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
    if (placeholder === "Flower1.png") return Flower1; //
    if (placeholder === "Flower2.png") return Flower2;
    if (placeholder === "Flower3.png") return Flower3;
    if (placeholder === "Flower4.png") return Flower4;
    if (placeholder === "Flower5.png") return Flower5;
    if (placeholder === "Flower6.png") return Flower6;
    if (placeholder === "Flower7.png") return Flower7;
    if (placeholder === "Flower8.png") return Flower8;
    if (placeholder === "Flower9.png") return Flower9;
    if (placeholder === "Flower10.png") return Flower10;
    if (placeholder === "Flower11.png") return Flower11;
    if (placeholder === "Flower12.png") return Flower12;
    return Flower12;//
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // optional: clear local user state
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Poetrygardenlogo} alt="Logo" className="logo" />
        </div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/communitypage">Community</a>
          <a href="/tournament">Tournament</a>
          <a href="/mygarden">My Garden</a>
          <a href="/about">About</a>
          {user && (
  <div className="user-info">
    <span className="user-email">{user.email}</span>
    
      <button
        className="logout-button"
        onClick={async () => {
          await handleLogout();
          
        }}
    >
      Logout
    </button>
    
  </div>
)}


        </div>
      </nav>

      <div className="page-padding">
        <h1>My Garden</h1>

        <div className="garden-box">
        <div className="garden-header">
  <button
    className="toggle-button"
    onClick={() => setShowForm(!showForm)}
  >
    {showForm ? '-' : '+'}
  </button>
</div>

          {showForm && (
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
                  src={getFlowerImage(
                    newPoem.theme === "love"
                      ? "Flower1.png"
                      : newPoem.theme === "loss" ? "Flower2.png"
                      : newPoem.theme === "time" ? "Flower3.png"
                      : newPoem.theme === "dreams" ? "Flower4.png"
                      : newPoem.theme === "nature" ? "Flower5.png"
                      : newPoem.theme === "identity" ? "Flower6.png"
                      : newPoem.theme === "silence" ? "Flower7.png"
                      : newPoem.theme === "hope" ? "Flower8.png"
                      : newPoem.theme === "chaos" ? "Flower9.png"
                      : newPoem.theme === "memory" ? "Flower10.png"
                      : newPoem.theme === "faith" ? "Flower11.png"
                      : newPoem.theme === "solitude" ? "Flower12.png"
                      
                      : ":seedling:"
                  )}
                  alt="Preview Flower"
                  className="flower-preview"
                />
              )}

              <button onClick={handlePoemSubmit}>Send Poem</button>
            </div>
          )}

          <div className="poem-flower-grid">
          {poems.map((poem) => (
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

        {selectedPoem && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedPoem.title}</h2>
              <p><strong>Poem:</strong> {selectedPoem.content}</p>
              <p><strong>Theme:</strong> {selectedPoem.theme}</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;