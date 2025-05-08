import React, { useState } from "react";
import Header from "../components/Header.tsx";
import PoemForm from "../components/PoemForm.tsx";
import HandlePoemSubmit from "../Utilities/HandlePoemSubmit.ts";
import PoemLogic from "../components/PoemLogic.tsx";
import getFlowerImage from "../Utilities/GetFlowerImage.ts";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.ts";

interface PoemPageProps {
  title: string;
  filterPoems: (poems: any[]) => any[];
}

const PoemPage: React.FC<PoemPageProps> = ({ title, filterPoems }) => {
  const {
    newPoem,
    setNewPoem,
    poems,
    setPoems,
    garden,
    setGarden,
    user,
    setUser,
    selectedPoem: selectedPoemState,
    setSelectedPoem: setSelectedPoemState,
    showForm,
    setShowForm,
    navigate,
  } = PoemLogic();

  const [selectedPoem, setSelectedPoem] = useState<{ id: string; title: string; content: string; theme: string; placeholder: string } | null>(null);

  // Handle input changes for the poem form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPoem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle poem submission
  const handlePoemSubmit = async () => {
    try {
      await HandlePoemSubmit({
        newPoem,
        user: user ? { email: user.email || undefined } : null, // Convert null to undefined
        setPoems,
        setGarden,
        setShowForm,
        setNewPoem,
      });
    } catch (err) {
      console.error("Failed to submit poem:", err);
    }
  };

  // Handle flower click to open modal
  const handleFlowerClick = (poem: { id: string; title: string; content: string; theme: string; placeholder: string }) => {
    setSelectedPoem(poem);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedPoem(null);
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="poem-page">
      <Header user={user && user.email ? { email: user.email } : null} handleLogout={handleLogout} />

      <div className="page-padding">
        <h1>{title}</h1>

        <div className="garden-box">
          <div className="garden-header">
            <button
              className="toggle-button"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "-" : "+"}
            </button>
          </div>

          {showForm && (
            <PoemForm
              newPoem={newPoem}
              handleInputChange={handleInputChange}
              handlePoemSubmit={handlePoemSubmit} // Use the centralized handlePoemSubmit
              getFlowerImage={getFlowerImage}
            />
          )}

          <div className="poem-flower-grid">
            {filterPoems(poems).map((poem) => (
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
              <p>
                <strong>Poem:</strong> {selectedPoem.content}
              </p>
              <p>
                <strong>Theme:</strong> {selectedPoem.theme}
              </p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemPage;