import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import "../styles/loginpage.css";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";



const LoginSigninPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("👤 Auth State Changed:", currentUser);
    });
  }, []);

  const getFriendlyErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Invalid email or password. Please try again.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const handleSignUp = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ Registered User:", userCredential.user);
    setErrorMessage("");
    navigate("/profile");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Sign Up Error:", error.message);
      setErrorMessage(getFriendlyErrorMessage((error as any).code));
    } else {
      console.error("❌ Sign Up Error:", error);
      setErrorMessage("An unknown error occurred.");
    }
  }
};

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setErrorMessage("");
    navigate("/communitypage"); // Navigate to the community page
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Login Error:", error.message);
      setErrorMessage(getFriendlyErrorMessage((error as any).code));
    } else {
      console.error("❌ Login Error:", error);
      setErrorMessage("An unknown error occurred.");
    }
  }
};
const navigate = useNavigate();
const handleForgotPassword = async () => {
  if (!email) {
    setErrorMessage("Please enter your email to reset your password.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    setSuccessMessage("Password reset email sent! Check your inbox.");
    setErrorMessage("");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Forgot Password Error:", error.message);
      setErrorMessage(getFriendlyErrorMessage((error as any).code));
    } else {
      console.error("❌ Forgot Password Error:", error);
      setErrorMessage("An unknown error occurred.");
    }
  }
};

const handleLogout = async () => {
  await signOut(auth);
  console.log("✅ Logged Out");
};


 

  return (
    <div className="container">
      { isResetPassword ? (
        <div className="auth-form">
          <header>Reset Password</header>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleForgotPassword}>Send Reset Email</button>
          <div className="switch-container">
            <span>
              <a
                href="#"
                className="switch"
                onClick={(e) => {
                  e.preventDefault();
                  setIsResetPassword(false);
                }}
              >
                Back to Login
              </a>
            </span>
          </div>
        </div>
      ) : (
        <div className="auth-form">
          <header>{isSignup ? "Signup" : "Login"}</header>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
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
          

          {!isSignup && (
            <div className="forgot-password">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsResetPassword(true);
                }}
              >
                Forgot your password?
              </a>
            </div>
          )}

          <div className="switch-container">
            {isSignup ? (
              
              <span>
                Already have an account?{" "}
                <a
                  href="#"
                  className="switch"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignup(false);
                  }}
                >
                  Login
                </a>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <a
                  href="#"
                  className="switch"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignup(true);
                  }}
                >
                  Signup
                </a>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSigninPage;
