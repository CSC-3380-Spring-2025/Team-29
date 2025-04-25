import React, { useState, useEffect } from 'react';
import { auth, fetchGardens, addGarden } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/tournamentpage.css';

// Subcomponents for each section
const Leaderboard = ({ entries }) => {
  // Sort entries by votes (descending) and display top performers
  const sorted = [...entries].sort((a, b) => b.votes - a.votes);
  return (
    <div>
      {sorted.map((entry, idx) => (
        <div key={entry.id} className="leaderboard-row">
          <span className="rank">#{idx + 1}</span>
          <span className="title">{entry.title}</span>
          <span className="votes">{entry.votes} votes</span>
        </div>
      ))}
    </div>
  );
};

const PreviousWinners = ({ entries }) => {
  // Filter entries marked as past winners
  const winners = entries.filter(e => e.status === 'winner');
  return (
    <div>
      {winners.map(entry => (
        <div key={entry.id} className="winner-card">
          <h3>{entry.title}</h3>
          <p><em>by {entry.userEmail}</em></p>
          <p>{entry.content}</p>
        </div>
      ))}
    </div>
  );
};

const SubmitEntry = ({ user, onSubmit }) => {
  const [entry, setEntry] = useState({ title: '', content: '', isOldPoem: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEntry(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (!entry.title || !entry.content) return;
    onSubmit({
      ...entry,
      userEmail: user.email,
      votes: 0,
      status: 'submitted',
      timestamp: Date.now()
    });
    setEntry({ title: '', content: '', isOldPoem: false });
  };
// 
  return (
    <div className="submit-form">
      <input
        name="title"
        placeholder="Poem Title"
        value={entry.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Write or paste your poem here"
        value={entry.content}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="isOldPoem"
          checked={entry.isOldPoem}
          onChange={handleChange}
        />
        This is an old poem
      </label>
      <button onClick={handleSubmit}>Submit Poem</button>
    </div>
  );
};

export default function TournamentPage() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [tab, setTab] = useState('leaderboard');

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  // Load tournament entries from the same gardens collection
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGardens();
        setEntries(data);
      } catch (err) {
        console.error('Error fetching tournament entries:', err);
      }
    };
    load();
  }, []);

  // Handler for new submissions: reuse addGarden
  const handleNewEntry = async (entry) => {
    try {
      await addGarden(entry);
      const data = await fetchGardens();
      setEntries(data);
      setTab('leaderboard');
    } catch (err) {
      console.error('Error submitting entry:', err);
    }
  };

  return (
    <div className="tournament-page">
      <nav className="navbar">
        <h2 className="navbar-title">Poetry Garden Tournament</h2>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/community">Community</a>
          <a className="active" href="/tournament">Tournament</a>
          <a href="/mygarden">My Garden</a>
          <a href="/about">About</a>
          {user && <span className="user-email">{user.email}</span>}
        </div>
      </nav>

      <div className="tournament-tabs">
        <button
          className={tab === 'leaderboard' ? 'active' : ''}
          onClick={() => setTab('leaderboard')}
        >Leaderboard</button>
        <button
          className={tab === 'previous' ? 'active' : ''}
          onClick={() => setTab('previous')}
        >Previous Winners</button>
        <button
          className={tab === 'submit' ? 'active' : ''}
          onClick={() => setTab('submit')}
        >Submit Poem</button>
      </div>

      <div className="tournament-content">
        {tab === 'leaderboard' && <Leaderboard entries={entries} />}
        {tab === 'previous' && <PreviousWinners entries={entries} />}
        {tab === 'submit' && user && (
          <SubmitEntry user={user} onSubmit={handleNewEntry} />
        )}
        {tab === 'submit' && !user && (
          <p>Please log in to submit a poem.</p>
        )}
      </div>
    </div>
  );
}
