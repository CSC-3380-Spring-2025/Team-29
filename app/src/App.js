import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import './App.css';

function Leaderboard({ leaderboard, handleVote }) {
  const { category } = useParams(); // Get the category from the URL
  const [selectedPoem, setSelectedPoem] = useState(null); // State to track the selected poem

  const filteredLeaderboard = leaderboard.filter(poet => poet.category === category);

  const handleViewPoem = (poem) => {
    setSelectedPoem(poem); // Set the selected poem to display
  };

  const handleClosePoem = () => {
    setSelectedPoem(null); // Close the poem view
  };

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
              <th>Actions</th>
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
                  <button onClick={() => handleViewPoem(poet.poem)}>View Poem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedPoem && (
        <div className="poem-modal">
          <div className="poem-content">
            <h2>Poem</h2>
            <p>{selectedPoem}</p>
            <button onClick={handleClosePoem}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Submission() {
  const [existingPoems] = useState([
    { title: "Love Eternal", content: "Roses are red, violets are blue..." },
    { title: "Wings of Hope", content: "Hope is the thing with feathers..." },
  ]); // Mock existing poems
  const [newPoem, setNewPoem] = useState({ title: "", content: "" });
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [submittedPoem, setSubmittedPoem] = useState(null);

  const handleNewPoemChange = (e) => {
    const { name, value } = e.target;
    setNewPoem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (selectedPoem) {
      setSubmittedPoem(selectedPoem);
    } else if (newPoem.title && newPoem.content) {
      setSubmittedPoem(newPoem);
    }
  };

  return (
    <div className="main-content">
      {!submittedPoem ? (
        <>
          <h1>Submit Your Poem</h1>
          <p>Create a new poem or select an existing one to submit for the tournament.</p>
          <div className="submission-section">
            <h2>Create a New Poem</h2>
            <input
              type="text"
              name="title"
              placeholder="Poem Title"
              value={newPoem.title}
              onChange={handleNewPoemChange}
            />
            <textarea
              name="content"
              placeholder="Write your poem here..."
              value={newPoem.content}
              onChange={handleNewPoemChange}
            />
            <h2>Or Select an Existing Poem</h2>
            <ul>
              {existingPoems.map((poem, index) => (
                <li key={index}>
                  <button onClick={() => setSelectedPoem(poem)}>
                    {poem.title}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={handleSubmit} disabled={!selectedPoem && (!newPoem.title || !newPoem.content)}>
              Submit Poem
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Thank You for Your Submission!</h1>
          <p>You have successfully submitted your poem for the tournament.</p>
          <div className="submitted-poem">
            <h2>{submittedPoem.title}</h2>
            <p>{submittedPoem.content}</p>
          </div>
        </>
      )}
    </div>
  );
}

function PoetsOfThePast() {
  const [selectedPoem, setSelectedPoem] = useState(null); // State to track the selected poem

  const pastChampions = [
    { name: "Poet A", title: "Love Eternal", group: "Love Poems", poem: "Roses are red, violets are blue..." },
    { name: "Poet B", title: "Wings of Hope", group: "Hope Poems", poem: "Hope is the thing with feathers..." },
    { name: "Poet C", title: "Kindness of Love", group: "Love Poems", poem: "Love is patient, love is kind..." },
    { name: "Poet D", title: "Tomorrow's Sun", group: "Hope Poems", poem: "The sun will rise again tomorrow..." },
  ];

  const handleViewPoem = (poem) => {
    setSelectedPoem(poem); // Set the selected poem to display
  };

  const handleClosePoem = () => {
    setSelectedPoem(null); // Close the poem view
  };

  return (
    <div className="main-content">
      <h1>Poets of the Past</h1>
      <p>Explore the champions of past tournaments and their winning poems!</p>
      <div className="past-champions">
        <table>
          <thead>
            <tr>
              <th>Poet</th>
              <th>Title</th>
              <th>Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pastChampions.map((champion, index) => (
              <tr key={index}>
                <td>{champion.name}</td>
                <td>{champion.title}</td>
                <td>{champion.group}</td>
                <td>
                  <button onClick={() => handleViewPoem(champion.poem)}>View Poem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedPoem && (
        <div className="poem-modal">
          <div className="poem-content">
            <h2>Poem</h2>
            <p>{selectedPoem}</p>
            <button onClick={handleClosePoem}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderboard, setLeaderboard] = useState([
    { name: "Poet A", votes: 120, category: "love", poem: "Roses are red, violets are blue..." },
    { name: "Poet B", votes: 95, category: "hope", poem: "Hope is the thing with feathers..." },
    { name: "Poet C", votes: 80, category: "love", poem: "Love is patient, love is kind..." },
    { name: "Poet D", votes: 60, category: "hope", poem: "The sun will rise again tomorrow..." },
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
                <li><Link to="/tournament/poets-of-the-past">Poets of the Past</Link></li>
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
          <Route path="/tournament/poets-of-the-past" element={<PoetsOfThePast />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;