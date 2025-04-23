// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError]     = useState(null);

  // 1) Define your key and search term here:
  const API_KEY = '49884715-c7e4d647234c86d4811b250b4';
  const QUERY   = 'flowers hand drawn animation pattern'; 

  useEffect(() => {
    async function loadVideo() {
      try {
        // 2) Build the query string correctly:
        const params = new URLSearchParams({
          key: API_KEY,
          q: QUERY,
          per_page: '3'
        });
        const url = `https://pixabay.com/api/videos/?${params.toString()}`;
        console.log('Fetching video from:', url);

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Pixabay API error: ${res.status}`);
        const data = await res.json();

        if (data.hits && data.hits.length > 0) {
          // 3) Grab the “large” video URL
          setVideoUrl(data.hits[0].videos.large.url);
        } else {
          setError('No videos found for that query.');
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    loadVideo();
  }, [API_KEY, QUERY]);

  return (
    <div>
      <h1>Hello, World 2!</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!videoUrl && !error && <p>Loading video…</p>}

      {videoUrl && (
        <video
          width="640"
          controls
          style={{ display: 'block', margin: '1rem auto' }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}
    </div>
  );
}
