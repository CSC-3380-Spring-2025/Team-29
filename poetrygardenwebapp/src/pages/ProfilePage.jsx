import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/profilepage.css";
import Poetrygardenlogo from "../images/Poetrygardenlogo.png"; // Import the logo

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");
  const [language, setLanguage] = useState("");
  const [nickname, setNickname] = useState("");
  const [pfp, setPfp] = useState(null);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null); // Define user state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      setUser(null); // Clear the user state
      navigate("/"); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setPfp(URL.createObjectURL(file));
    }
  };

  const profileFields = [
    { label: "Bio", value: bio, setValue: setBio },
    { label: "Location", value: location, setValue: setLocation },
    { label: "Interests", value: interests, setValue: setInterests },
    { label: "Language", value: language, setValue: setLanguage },
    { label: "Nickname", value: nickname, setValue: setNickname },
  ];

  const handleSave = () => {
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Poetrygardenlogo} alt="Logo" className="logo" />
        </div>
        <div className="navbar-links">
          <a href="/communitypage">Community</a>
          <a href="/tournament">Tournament</a>
          <a href="/mygarden">My Garden</a>
          <a href="/about">About</a>
          {user && (
            <div className="user-info">
              <span
                className="user-email"
                onClick={() => navigate("/profile")}
              >
                {user.email}
              </span>
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="profile-container">
        <div className="profile-title">
          <span className="user-email">
            {user ? user.email : "Guest"} {/* Show "Guest" if user is null */}
          </span>
        </div>

        <div className="profile-picture">
          {pfp ? (
            <img
              src={pfp}
              alt="User profile"
              className="profile-picture"
            />
          ) : (
            <div className="placeholder-pfp">?</div>
          )}
          {editing && (
            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              onChange={handleFileChange}
              className="edit-button"
            />
          )}
        </div>

        {!editing && (
          <h2 className="text-center text-green-700 font-bold mt-4">
            {username}
          </h2>
        )}
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="toggle-button"
          >
            {editing ? "-" : "+"}
          </button>
        )}

        <div className="profile-fields">
          {profileFields.map(({ label, value, setValue }) => (
            <div key={label} className="profile-field">
              <label>{label}:</label>
              {editing ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              ) : (
                <p>{value}</p>
              )}
            </div>
          ))}
        </div>

        {editing && (
          <div className="button-group">
            <button
              onClick={handleCancel}
              className="button-cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="button-save"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;