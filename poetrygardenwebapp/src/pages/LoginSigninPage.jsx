import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase"; 

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import "../styles/styles.css";


const LoginSigninPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("👤 Auth State Changed:", currentUser);
    });
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Registered User:", userCredential.user);
    } catch (error) {
      console.error("❌ Sign Up Error:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged In:", auth.currentUser.email);
    } catch (error) {
      console.error("❌ Login Error:", error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    console.log("✅ Logged Out");
  };

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsersList(usersArray);
    console.log("📄 Fetched Users:", usersArray);
  };

  return (
    <div className="container">
      {user ? (
        <div className="dashboard">
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Log Out</button>
          <button onClick={fetchUsers}>Fetch Users from Firestore</button>
          <ul>
            {usersList.map((u) => (
              <li key={u.id}>{u.email}</li>
            ))}
          </ul>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default LoginSigninPage;
