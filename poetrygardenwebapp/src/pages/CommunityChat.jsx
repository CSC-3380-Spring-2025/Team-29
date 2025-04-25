// src/components/CommunityChat.jsx
import React, { useState } from 'react';
import '../styles/communitychat.css';
import { MessageSquare, Heart, Share2 } from 'lucide-react';

export default function CommunityChat({ posts }) {
  // track reply inputs per post
  const [replies, setReplies] = useState({});

  const handleChange = (idx, val) => {
    setReplies(prev => ({ ...prev, [idx]: val }));
  };
  const handlePost = idx => {
    // stub: in a real app you’d append to a thread
    setReplies(prev => ({ ...prev, [idx]: '' }));
  };

  return (
    <div className="chat-card">
      <div className="chat-header">
        <h2>Garden Talk</h2>
      </div>
      <ul className="chat-list">
        {posts.map((p, i) => (
          <li key={i} className="chat-item">
            <img
              className="chat-avatar"
              src={`https://i.pravatar.cc/40?u=${p.author}`}
              alt={p.author}
            />
            <div className="chat-body">
              <div className="chat-meta">
                <span className="chat-author">{p.author}</span>
                <span className="chat-time">{p.time}</span>
              </div>
              <div className="chat-content">
                <p className="chat-title">{p.title}</p>
                <p>{p.snippet}</p>
              </div>
              <div className="chat-actions">
                <MessageSquare className="action-icon" /><span>3</span>
                <Heart         className="action-icon" /><span>12</span>
                <Share2        className="action-icon" /><span>Share</span>
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Reply..."
                  value={replies[i] || ''}
                  onChange={e => handleChange(i, e.target.value)}
                />
                <button onClick={() => handlePost(i)}>Post</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}