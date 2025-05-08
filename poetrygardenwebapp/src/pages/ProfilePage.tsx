import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/ProfileCard.css';

const ProfileCard = () => {
  const [username, setUsername] = useState("Username");
  const [bio, setBio] = useState("Tell us about yourself");
  const [email, setEmail] = useState("your@email.com");
  const [location, setLocation] = useState("City, Country");
  const [interests, setInterests] = useState("etc. Coding, Gaming");
  const [language, setLanguage] = useState("English");
  const [nickname, setNickname] = useState("Choose a funky nickname");
  const [pfp, setPfp] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setPfp(URL.createObjectURL(file));
    }
  };

  const profileFields = [
    { label: "Bio", value: bio, setValue: setBio },
    { label: "Email", value: email, setValue: setEmail },
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="profile-container"
      >
        <div className="profile-title">Profile</div>

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
          <h2 className="text-center text-green-700 font-bold mt-4">{username}</h2>
        )}
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="edit-button"
          >
            Edit Profile
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
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileCard;