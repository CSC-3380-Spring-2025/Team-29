import React from "react";
import { useNavigate } from "react-router-dom";
import Poetrygardenlogo from '../images/Poetrygardenhomepage.png';
import Flower1 from '../images/Flower1.jpg'; // Example flower image
import Flower2 from '../images/Flower2.jpg'; // Example flower image
import Flower3 from '../images/Flower3.jpg'; // Example flower image
import '../styles/homepage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <img src={Poetrygardenlogo} alt="Logo" />
        <h1> </h1>
        <button className="btn btn-primary" onClick={() => navigate("/signin")}>
          <span className="btn-txt">Get started</span>
        </button>
      </div>

      {/* Why Use This Website Section */}
      <div className="why-section">
        <h2>Why Use Poetry Garden?</h2>
        <p>
        Plant your words, let them grow. Poetry Garden is a welcoming space to publish your poems and share your voice. Whether you're new to poetry or a lifelong writer, our platform helps your work bloom in a beautiful, supportive setting.

Connect, create, and grow together. Join a community of poets who read, respond, and inspire. Here, your words don’t just live — they thrive. 🌿


        </p>
        <div className="flower-gallery">
          <img src={Flower1} alt="Flower 1" className="flower-image" />
          <img src={Flower2} alt="Flower 2" className="flower-image" />
          <img src={Flower3} alt="Flower 3" className="flower-image" />
        </div>
        <div className="user-reviews">
  <h2>User Reviews</h2>
  <div className="review">
    <p>
      <strong>John John:</strong> "Poetry Garden has been an amazing platform for me to share my poems and connect with other poets. Highly recommend!"
    </p>
    <div className="stars">★★★★★</div> 
  </div>
  <div className="review">
    <p>
      <strong>Barry Allen:</strong> "I love the supportive community and the beautiful design of the website. It inspires me to write more!"
    </p>
    <div className="stars">★★★★☆</div>
  </div>
  <div className="review">
    <p>
      <strong>Jane Wonder:</strong> "A wonderful place to let your creativity bloom. The flower gallery is such a nice touch!"
    </p>
    <div className="stars">★★★★★</div> 
  </div>
</div>
      </div>
    </div>
    
  );

}

export default HomePage;