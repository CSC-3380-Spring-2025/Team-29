// src/components/Leaderboard.jsx
import React from 'react';
import './Leaderboard.css';

export default function Leaderboard({ data }) {
  return (
    <div className="leaderboard-card">
      <div className="leaderboard-header">
        <h2>Top Poemists</h2>
        <span className="filter-badge">Top 100</span>
      </div>
      <ul className="leaderboard-list">
        {data.map((p, i) => (
          <li key={p.author} className="leaderboard-item">
            <div className="position">{i + 1}</div>
            <div className="user-info">
              <img
                src={`https://i.pravatar.cc/40?u=${p.author}`}
                alt={p.author}
                className="avatar"
              />
              <span className="username">{p.author}</span>
            </div>
            <div className="poem-title">{p.title}</div>
            <div className="score">💖 {p.votes}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
