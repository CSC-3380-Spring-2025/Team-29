import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "./styles.css";

const App = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Track login status
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate("/profile"); // Navigate to profile if user is logged in
      }
    });
  }, [navigate]);

  // Handle sign up
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Registered User:", userCredential.user);
      navigate("/profile"); // Navigate to profile after signup
    } catch (error) {
      console.error("❌ Sign Up Error:", error.message);
    }
  };

  // Handle login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged In:", auth.currentUser.email);
      navigate("/profile"); // Navigate to profile after login
    } catch (error) {
      console.error("❌ Login Error:", error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    console.log("✅ Logged Out");
    navigate("/"); // Navigate back to login page after logout
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <div className="auth-form">
              <header>{isSignup ? "Signup" : "Login"}</header>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder={isSignup ? "Create a password" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isSignup ? (
                <button onClick={handleSignUp}>Signup</button>
              ) : (
                <button onClick={handleLogin}>Login</button>
              )}
              <div className="switch-container">
                {isSignup ? (
                  <span>
                    Already have an account?{" "}
                    <button className="switch" onClick={() => setIsSignup(false)}>
                      Login
                    </button>
                  </span>
                ) : (
                  <span>
                    Don't have an account?{" "}
                    <button className="switch" onClick={() => setIsSignup(true)}>
                      Signup
                    </button>
                  </span>
                )}
              </div>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              <div className="dashboard">
                <h2>Welcome, {user.email}</h2>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            ) : (
              <div>
                <h2>Please log in to view your profile.</h2>
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
