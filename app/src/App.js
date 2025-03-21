import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import './App.css';

function Leaderboard({ leaderboard, handleVote }) {
  const { category } = useParams(); // Get the category from the URL
  const filteredLeaderboard = leaderboard.filter(poet => poet.category === category);

  return (
    <div className="main-content">
      <h1> {category.charAt(0).toUpperCase() + category.slice(1)} Leaderboard </h1>
      <p> Vote for your favorite poets in the {category} category!</p>
      <div className="leaderboard">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Poet</th>
              <th>Votes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaderboard.map((poet, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{poet.name}</td>
                <td>{poet.votes}</td>
                <td>
                  <button onClick={() => handleVote(index)}>Vote</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Submission() {
  return (
    <div className="main-content">
      <h1> Submission Section </h1>
      <p> Submit your poems for the tournament here!</p>
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderboard, setLeaderboard] = useState([
    { name: "Poet A", votes: 120, category: "love" },
    { name: "Poet B", votes: 95, category: "hope" },
    { name: "Poet C", votes: 80, category: "love" },
    { name: "Poet D", votes: 60, category: "hope" },
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleVote = (index) => {
    const updatedLeaderboard = [...leaderboard];
    updatedLeaderboard[index].votes += 1;
    setLeaderboard(updatedLeaderboard);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-logo">
            <span> Poetry Garden </span>
          </div>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/my-garden">My Garden</Link></li>
            <li><Link to="/community-garden">Community Garden</Link></li>
            <li><Link to="/my-profile">Profile</Link></li>
            <li className="dropdown">
              <span className="dropdown-toggle">Tournament</span>
              <ul className="dropdown-menu">
                <li className="dropdown">
                  <Link to="#" className="dropdown-toggle">Leaderboard</Link>
                  <ul className="dropdown-menu">
                    <li><Link to="/tournament/leaderboard/love">Love Poems</Link></li>
                    <li><Link to="/tournament/leaderboard/hope">Hope Poems</Link></li>
                  </ul>
                </li>
                <li><Link to="/tournament/submission">Submission</Link></li>
              </ul>
            </li>
          </ul>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
          </form>
        </nav>
        <Routes>
          <Route
            path="/tournament/leaderboard/:category"
            element={<Leaderboard leaderboard={leaderboard} handleVote={handleVote} />}
          />
          <Route path="/tournament/submission" element={<Submission />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;