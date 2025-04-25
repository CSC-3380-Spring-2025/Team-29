import React, { useState, useEffect } from 'react';
import { auth, fetchGardens, addGarden } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import CommunityChat from '../pages/CommunityChat';
import '../styles/tournamentpage.css';
import '../styles/communitychat.css';
import Poetrygardenlogo from '../images/Poetrygardenlogo.png';

export default function TournamentPage() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [tab, setTab] = useState('leaderboard');
  const navigate = useNavigate();

  // Subscribe to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  // Load entries from the shared gardens collection
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGardens();
        setEntries(data);
      } catch (err) {
        console.error('Failed to load entries', err);
      }
    };
    load();
  }, []);

  // Handle logout
  const handleLogout = async () => {
      try {
        await signOut(auth);
        setUser(null); // optional: clear local user state
        navigate("/");
      } catch (err) {
        console.error("Logout failed:", err);
      }
    };

  // Handle new poem submissions
  const handleSubmit = async (poem) => {
    if (!poem.title.trim() || !poem.content.trim()) {
      alert('Please provide a title and content for your poem.');
      return;
    }
    try {
      await addGarden({
        ...poem,
        userEmail: user.email,
        votes: 0,
        status: 'submitted',
        timestamp: Date.now(),
      });
      const updated = await fetchGardens();
      setEntries(updated);
      setTab('leaderboard');
    } catch (err) {
      console.error('Submit failed', err);
    }
  };

  // Prepare posts for CommunityChat
  const posts = entries
    .filter((e) => tab !== 'previous' || e.status === 'winner')
    .map((e) => ({
      author: e.userEmail,
      time: new Date(e.timestamp).toLocaleString(),
      title: e.title,
      snippet: e.content.slice(0, 120) + (e.content.length > 120 ? '…' : ''),
    }));

  return (
    <>
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
                  onClick={() => navigate('/profile')}
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

        <div className="page-padding">
          <div className="tournament-tabs">
            <button
              className={tab === 'leaderboard' ? 'active' : ''}
              onClick={() => setTab('leaderboard')}
            >
              Leaderboard
            </button>
            <button
              className={tab === 'previous' ? 'active' : ''}
              onClick={() => setTab('previous')}
            >
              Previous Winners
            </button>
            <button
              className={tab === 'submit' ? 'active' : ''}
              onClick={() => setTab('submit')}
            >
              Submit Poem
            </button>
          </div>

          <div className="chat-card">
            <div className="chat-header">
              <h2>
                {tab === 'leaderboard' && 'Current Leaderboard'}
                {tab === 'previous' && 'Previous Winners'}
                {tab === 'submit' && 'Submit Your Poem'}
              </h2>
            </div>

            {(tab === 'leaderboard' || tab === 'previous') && posts.length > 0 ? (
              <CommunityChat posts={posts} />
            ) : (
              <p>No entries available.</p>
            )}

            {tab === 'submit' && (
              <div className="submit-form">
                {!user && <p>Please log in to submit a poem.</p>}
                {user && <SubmitEntry user={user} onSubmit={handleSubmit} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function SubmitEntry({ user, onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOldPoem, setIsOldPoem] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please provide a title and content for your poem.');
      return;
    }
    onSubmit({ title, content, isOldPoem });
  };

  return (
    <div style={{ padding: '16px' }}>
      <input
        type="text"
        placeholder="Poem Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write or paste your poem here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isOldPoem}
          onChange={(e) => setIsOldPoem(e.target.checked)}
        />{' '}
        This is an old poem
      </label>
      <div className="chat-input" style={{ marginTop: '12px' }}>
        <input type="text" readOnly value={user ? user.email : ''} />
        <button onClick={handleSubmit}>Post Poem</button>
      </div>
    </div>
  );
}