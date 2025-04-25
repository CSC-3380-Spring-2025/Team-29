import React, { useState, useEffect } from 'react';
import './App.css';
import Leaderboard from './Leaderboard';
import CommunityChat from './CommunityChat';
import StatsShop from './StatsShop';

export default function CommunityHub() {
  const [leaderFilter, setLeaderFilter] = useState('top100');
  const [searchUser, setSearchUser] = useState('');


  // placeholder data
  const topPoems = [
    { title: 'Morning Dew', author: 'Alice', votes: 312 },
    { title: 'Whispering Winds', author: 'Bob', votes: 287 },
    { title: 'Garden Secrets', author: 'Carol', votes: 254 },
    { title: 'Sunset Serenade', author: 'Dave', votes: 231 },
  ];

  const communityPosts = [
    { author: 'Alice', time: '2h', title: 'Sunset Serenade', snippet: 'The sky danced in hues of pink and gold as the day faded.' },
    { author: 'Bob',   time: '4h', title: 'Garden Secrets',   snippet: 'Beneath the rose petals, whispers of yesterday linger.' }
  ];

  const stats = { totalVotes: 128, tournamentsWon: 5, bestPoem: 'Ode to Spring' };
  const flowers = ['Rose', 'Lily', 'Daisy', 'Tulip'];

  return (
    <div className="container">
      {/* Leaderboard */}
      <Leaderboard data={topPoems} />

      {/* Community Chat */}
      <CommunityChat posts={communityPosts} />

      {/* Stats & Flower Shop */}
      <StatsShop stats={stats} items={flowers} />
    </div>
  );
}