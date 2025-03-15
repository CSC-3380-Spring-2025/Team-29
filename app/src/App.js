import React, { useState } from "react";
import logo from './garden.png';
import './App.css';

function App() {

  const [searchTerm, setSearchTerm] = useState(""); // State to track the search input

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update state with the input value
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    console.log("Searching for:", searchTerm); // Log the search term (replace with your search logic)
  };

  return (
    <div className="App">
      { /* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* Navigation Bar */}
      <nav className = "navbar">
        <div className = "navbar-logo">
          <span> Poetry Garden </span>
        </div>
        <ul className = "navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href ="/my-garden" className ="active" >My Garden</a></li>
          <li><a href ="/community-garden" >Community Garden</a></li>
          <li><a href = "/my-profile" >Profile</a></li>
          <li><a href = "/tournament" >Tournament</a></li>
        </ul>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm} // Controlled input
            onChange={handleSearchChange} // Handle input change
          />
          <button type="submit">Search</button>
        </form>
      </nav>
      {/* Main Content */}
      <div className = "main-content">
        <h1> My Garden </h1>
        <p> Welcome to your poetry garden!</p>
      </div>



    </div>
  );
}

export default App;
