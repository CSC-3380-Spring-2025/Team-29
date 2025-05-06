import React, { useState, useEffect } from 'react';
import { auth, fetchGardens, addGarden, voteGarden } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import CommunityChat from './CommunityChat';
import '../styles/tournamentpage.css';
import '../styles/communitypage.css';  // for the grid & modal styles

// import all 12 flower images
import Flower1  from '../images/Flower1.png';
import Flower2  from '../images/Flower2.png';
import Flower3  from '../images/Flower3.png';
import Flower4  from '../images/Flower4.png';
import Flower5  from '../images/Flower5.png';
import Flower6  from '../images/Flower6.png';
import Flower7  from '../images/Flower7.png';
import Flower8  from '../images/Flower8.png';
import Flower9  from '../images/Flower9.png';
import Flower10 from '../images/Flower10.png';
import Flower11 from '../images/Flower11.png';
import Flower12 from '../images/Flower12.png';

// array for numeric placeholders
const flowerImages = [
  Flower1, Flower2, Flower3, Flower4, Flower5, Flower6,
  Flower7, Flower8, Flower9, Flower10, Flower11, Flower12,
];

// map for string‐based placeholders (CommunityPage uses filenames)
const flowerMap = {
  'Flower1.png':  Flower1,
  'Flower2.png':  Flower2,
  'Flower3.png':  Flower3,
  'Flower4.png':  Flower4,
  'Flower5.png':  Flower5,
  'Flower6.png':  Flower6,
  'Flower7.png':  Flower7,
  'Flower8.png':  Flower8,
  'Flower9.png':  Flower9,
  'Flower10.png': Flower10,
  'Flower11.png': Flower11,
  'Flower12.png': Flower12,
};

// helper to pick the right image
function getFlowerSrc(placeholder) {
  if (typeof placeholder === 'number') {
    return flowerImages[placeholder % flowerImages.length];
  }
  if (typeof placeholder === 'string' && flowerMap[placeholder]) {
    return flowerMap[placeholder];
  }
  // fallback to first flower
  return flowerImages[0];
}

export default function TournamentPage() {
  const [user, setUser]         = useState(null);
  const [entries, setEntries]   = useState([]);
  const [randomPrev, setRandomPrev] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [tab, setTab]           = useState('leaderboard');
  const navigate = useNavigate();

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    (async () => {
      const data = await fetchGardens();
      const normalized = data.map(e => ({
        ...e,
        votes: typeof e.votes === 'number' ? e.votes : 0
      }));
      setEntries(normalized);
    })();
  }, []);
// Whenever we flip to “previous,” pick one at random
 useEffect(() => {
     if (tab === 'previous' && entries.length) {
       const pick = entries[Math.floor(Math.random() * entries.length)];
      setRandomPrev(pick);
    }
   }, [tab, entries]);
  const handleSubmit = async (poem) => {
    // pick random numeric index
    const idx = Math.floor(Math.random() * flowerImages.length);
    await addGarden({
      ...poem,
      userEmail: user.email,
      votes: 0,
      status: 'submitted',
      timestamp: Date.now(),
      placeholder: idx, 
    });
    setEntries(await fetchGardens());
    setTab('leaderboard');
  };

  const handleVote = async (id) => {
    if (!user) return alert('Please log in to vote.');
      // **bump locally first** for instant feedback
   setEntries((es) =>
       es.map((e) => e.id === id ? { ...e, votes: e.votes + 1 } : e)
     );
     if (selected && selected.id === id) {
       setSelected({ ...selected, votes: selected.votes + 1 });
     }
  
    await voteGarden(id);
    setEntries(await fetchGardens());
  };

  const winner      = entries.find((e) => e.status === 'winner');
  const contestants = entries.filter((e) => e.status !== 'winner');

  return (
    <div className="community-page">
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/"><img src={require('../images/Poetrygardenlogo.png')} alt="Logo" className="logo"/></a>
        </div>
        <div className="navbar-links">
          <a href="/communitypage">Community</a>
          <a href="/tournament">Tournament</a>
          <a href="/mygarden">My Garden</a>
          <a href="/about">About</a>
          {user && (
            <div className="user-info">
              <span onClick={() => navigate('/profile')} className="user-email">
                {user.email}
              </span>
              <button className="logout-button" onClick={() => signOut(auth)}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="page-padding">
        {/* Poem of the Week with its flower */}
        {winner && (
          <section className="poem-of-week">
            <h2>🏆 Poem of the Week</h2>
            <div className="poem-card spotlight">
              <img
                src={getFlowerSrc(winner.placeholder)}
                alt="Winner flower"
                className="spotlight-flower"
              />
              <h3>{winner.title}</h3>
              <p className="full-content">{winner.content}</p>
              <div className="meta">
                <span>{winner.userEmail}</span>
                <span>{winner.votes} votes</span>
              </div>
            </div>
          </section>
        )}

        {/* Tabs */}
        <div className="tournament-tabs">
          {['leaderboard','previous','submit'].map((t) => (
            <button
              key={t}
              className={tab === t ? 'active' : ''}
              onClick={() => setTab(t)}
            >
              {t === 'leaderboard'
                ? 'Leaderboard'
                : t === 'previous'
                ? 'Previous Winners'
                : 'Submit Poem'}
            </button>
          ))}
        </div>

        {/* Flower grid */}
        {(tab === 'leaderboard' || tab === 'previous') && (
          <div className="poem-flower-grid">
            {contestants
              .filter(e => tab !== 'previous' || e.status === 'winner')
              .map((e) => (
                <div
                  key={e.id}
                  className="flower-wrapper"
                  onClick={() => {
                    setSelected(e);
                    setShowComments(false);
                  }}
                >
                  <img
                    src={getFlowerSrc(e.placeholder)}
                    alt={e.title}
                    className="flower-icon"
                  />
                  <span className="tooltip">{e.title}</span>
                </div>
              ))
            }
            {contestants.length === 0 && <p>No entries yet.</p>}
          </div>
        )}
 {/* Leaderboard grid */}
 {tab === 'leaderboard' && (
   <div className="poem-flower-grid">
     {contestants.map((e) => (
       <div
         key={e.id}
         className="flower-wrapper"
         onClick={() => { setSelected(e); setShowComments(false); }}
       >
         <img
           src={getFlowerSrc(e.placeholder)}
           alt={e.title}
           className="flower-icon"
        />
        <span className="tooltip">{e.title}</span>
       </div>
     ))}
     {contestants.length === 0 && <p>No entries yet.</p>}
   </div>
 )}

 {/* Previous Winner spotlight */}
 {tab === 'previous' && randomPrev && (
   <section className="poem-of-week">
     <h2>🏅 Previous Winner</h2>
     <div className="poem-card spotlight">
       <img
         src={getFlowerSrc(randomPrev.placeholder)}
         alt={randomPrev.title}
         className="spotlight-flower"   
    />
       <h3>{randomPrev.title}</h3>
       <p className="full-content">{randomPrev.content}</p>
       <div className="meta">
         <span>{randomPrev.userEmail}</span>
         <span>{randomPrev.votes} votes</span>
       </div>
       <button onClick={() => handleVote(randomPrev.id)}>
         👍 Vote
       </button>
     </div>
   </section>
 )}
        {/* Submit tab */}
        {tab === 'submit' && (
          <SubmitEntry user={user} onSubmit={handleSubmit}/>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img
              src={getFlowerSrc(selected.placeholder)}
              alt="Selected flower"
              className="modal-flower"
            />
            <h2>{selected.title}</h2>
            <p>{selected.content}</p>
            <div className="actions">
              <button onClick={() => handleVote(selected.id)}>
                👍 Vote ({selected.votes})
              </button>
              <button onClick={() => setShowComments(s => !s)}>
                💬 {showComments ? 'Hide' : 'Show'} Comments
              </button>
            </div>
            {showComments && (
              <div className="comments-dropdown">
                <CommunityChat
                  posts={[{
                    author: selected.userEmail,
                    time: new Date(selected.timestamp).toLocaleString(),
                    title: selected.title,
                    snippet: selected.content,
                  }]}
                />
              </div>
            )}
            <button className="close-btn" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline submit form stays the same
function SubmitEntry({ user, onSubmit }) {
  const [title, setTitle]   = useState('');
  const [content, setContent] = useState('');
  const [isOld, setIsOld]   = useState(false);

  return (
    <div className="submit-form">
      {!user
        ? <p>Please log in to submit.</p>
        : <>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Your poem..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={isOld}
                onChange={e => setIsOld(e.target.checked)}
              /> Old poem
            </label>
            <button
              onClick={() =>
                onSubmit({ title, content, isOldPoem: isOld })
              }
            >
              Post to Tournament
            </button>
          </>
      }
    </div>
  );
}
