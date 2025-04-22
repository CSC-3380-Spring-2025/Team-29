import React, { useState, useEffect } from 'react';
import './App.css';
import { Copy, ShoppingCart, MessageSquare } from 'lucide-react';

export default function CommunityHub() {
  const [leaderFilter, setLeaderFilter] = useState('top100');
  const [searchUser, setSearchUser] = useState('');
  const [comment, setComment] = useState('');

  // placeholder data
  const topPoems = [
    { title: 'Morning Dew', author: 'Alice' },
    { title: 'Whispering Winds', author: 'Bob' }
  ];

  const featuredPoems = [
    { title: 'Sunset Serenade', snippet: 'The sky danced in hues...' },
    { title: 'Garden Secrets', snippet: 'Petals whisper softly...' }
  ];

  const stats = { totalVotes: 128, tournamentsWon: 5, bestPoem: 'Ode to Spring' };
  const flowers = ['Rose', 'Lily', 'Daisy', 'Tulip'];

  return (
    <div className="container">
      {/* Leaderboard */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Poem Leaderboard</h2>
        </div>
        <div className="card-content">
          <input
            type="text"
            placeholder="Search users..."
            className="input"
            value={searchUser}
            onChange={e => setSearchUser(e.target.value)}
          />

          <select
            className="select"
            value={leaderFilter}
            onChange={e => setLeaderFilter(e.target.value)}
          >
            <option value="top100">Top 100</option>
            <option value="friends">Friends</option>
          </select>

          <div className="flex space-x-2">
            <button className="button">View Leaderboard</button>
            <button className="button outline">Switch to Poems</button>
          </div>

          <ul className="list divide-y">
            {topPoems.map((p, i) => (
              <li key={i} className="list-item">
                <span>{i + 1}. {p.title}</span>
                <span className="font-semibold">{p.author}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Community Chat */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <MessageSquare className="mr-2 inline" /> Garden Talk
          </h2>
        </div>
        <div className="card-content">
          {featuredPoems.map((poem, i) => (
            <div key={i} className="card secondary-card p-4">
              <h3 className="font-medium">{poem.title}</h3>
              <p className="text-sm muted-text">{poem.snippet}</p>

              <div className="flex space-x-2 mt-2">
                <textarea
                  className="textarea"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <button className="button">Create Comment</button>
                <button className="button outline" onClick={() => setComment('')}>Cancel</button>
              </div>
            </div>
          ))}

          <div className="flex space-x-2 mt-4">
            <button className="button">Create Group</button>
            <button className="button outline">Add to Group</button>
          </div>
        </div>
      </div>

      {/* Stats & Flower Shop */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <ShoppingCart className="mr-2 inline" /> My Stats & Flower Shop
          </h2>
        </div>
        <div className="card-content">
          <div className="space-y-1 mb-4">
            <p>Total Votes: <span className="font-semibold">{stats.totalVotes}</span></p>
            <p>Tournaments Won: <span className="font-semibold">{stats.tournamentsWon}</span></p>
            <p>My Best Poem: <span className="italic">{stats.bestPoem}</span></p>
          </div>

          <div className="flex space-x-2 mb-4">
            <button className="button">View Stats</button>
            <button className="button">Open Store</button>
            <button className="button outline">View All Poems</button>
            <button className="button secondary">Copy to Clipboard</button>
          </div>

          <div className="flower-grid">
            {flowers.map((flower, i) => (
              <div key={i} className="flower-card">
                <p className="mb-2">{flower}</p>
                <button className="button small-button">
                  <Copy className="mr-1 inline" /> Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}