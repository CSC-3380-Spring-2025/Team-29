import React, { useEffect } from 'react';

const ProfilePage = () => {
  //  force-restart every 6s
  useEffect(() => {
    const vid = document.getElementById('bg-video');
    const id = setInterval(() => {
      if (vid) { vid.currentTime = 0; vid.play(); }
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Video wrapper is fixed so it fills the entire screen */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1
      }}>
        <video
          id="bg-video"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'   // this makes it cover the entire area
          }}
        >
          <source
            src="https://cdn.pixabay.com/video/2022/08/12/127701-739144766_small.mp4"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Your page content sits on top */}
      <div style={{ position: 'relative', zIndex: 1, color: 'white', padding: '2rem' }}>
        <h1>Profile Page</h1>
        {/* ...more content */}
      </div>
    </>
  );
};

export default ProfilePage;
