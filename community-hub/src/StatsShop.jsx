// src/components/StatsShop.jsx
import React from 'react';
import './StatsShop.css';
import { ShoppingCart } from 'lucide-react';

export default function StatsShop({ stats, items }) {
  return (
    <div className="stats-shop-card">
      <div className="stats-shop-header">
        <ShoppingCart className="mr-2" />
        <h2>My Stats & Flowers</h2>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <div className="stat-label">Total Votes</div>
          <div className="stat-value">{stats.totalVotes}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Tournaments Won</div>
          <div className="stat-value">{stats.tournamentsWon}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Best Poem</div>
          <div className="stat-value">{stats.bestPoem}</div>
        </div>
      </div>

      <div className="shop-section">
        <div className="shop-title">Flower Armory</div>
        <div className="shop-grid">
          {items.map((item, i) => (
            <div key={i} className="shop-item">
              <div className="shop-item-icon">🌸</div>
              <div className="shop-item-name">{item}</div>
              <div className="shop-item-price">
                <span>{(i + 1) * 100}</span>
                <span className="currency">⚡</span>
              </div>
              <button className="shop-button">Equip</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
