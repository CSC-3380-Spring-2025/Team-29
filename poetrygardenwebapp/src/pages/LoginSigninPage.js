import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, } from "firebase/auth";
import "../styles/loginpage.css";
import { useNavigate } from "react-router-dom";
const LoginSigninPage = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("👤 Auth State Changed:", currentUser);
        });
    }, []);
    const getFriendlyErrorMessage = (errorCode) => {
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
        }
        catch (error) {
            console.error("❌ Sign Up Error:", error.message);
            setErrorMessage(getFriendlyErrorMessage(error.code));
        }
    };
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setErrorMessage("");
            navigate("/communitypage"); // Navigate to the community page
        }
        catch (error) {
            console.error("❌ Login Error:", error.message);
            setErrorMessage(getFriendlyErrorMessage(error.code));
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
        }
        catch (error) {
            console.error("❌ Forgot Password Error:", error.message);
            setErrorMessage(getFriendlyErrorMessage(error.code));
        }
    };
    const handleLogout = async () => {
        await signOut(auth);
        console.log("✅ Logged Out");
    };
    return (React.createElement("div", { className: "container" }, isResetPassword ? (React.createElement("div", { className: "auth-form" },
        React.createElement("header", null, "Reset Password"),
        errorMessage && React.createElement("p", { className: "error-message" }, errorMessage),
        successMessage && React.createElement("p", { className: "success-message" }, successMessage),
        React.createElement("input", { type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value) }),
        React.createElement("button", { onClick: handleForgotPassword }, "Send Reset Email"),
        React.createElement("div", { className: "switch-container" },
            React.createElement("span", null,
                React.createElement("a", { href: "#", className: "switch", onClick: (e) => {
                        e.preventDefault();
                        setIsResetPassword(false);
                    } }, "Back to Login"))))) : (React.createElement("div", { className: "auth-form" },
        React.createElement("header", null, isSignup ? "Signup" : "Login"),
        errorMessage && React.createElement("p", { className: "error-message" }, errorMessage),
        successMessage && React.createElement("p", { className: "success-message" }, successMessage),
        React.createElement("input", { type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value) }),
        React.createElement("input", { type: "password", placeholder: isSignup ? "Create a password" : "Enter your password", value: password, onChange: (e) => setPassword(e.target.value) }),
        isSignup ? (React.createElement("button", { onClick: handleSignUp }, "Signup")) : (React.createElement("button", { onClick: handleLogin }, "Login")),
        !isSignup && (React.createElement("div", { className: "forgot-password" },
            React.createElement("a", { href: "#", onClick: (e) => {
                    e.preventDefault();
                    setIsResetPassword(true);
                } }, "Forgot your password?"))),
        React.createElement("div", { className: "switch-container" }, isSignup ? (React.createElement("span", null,
            "Already have an account?",
            " ",
            React.createElement("a", { href: "#", className: "switch", onClick: (e) => {
                    e.preventDefault();
                    setIsSignup(false);
                } }, "Login"))) : (React.createElement("span", null,
            "Don't have an account?",
            " ",
            React.createElement("a", { href: "#", className: "switch", onClick: (e) => {
                    e.preventDefault();
                    setIsSignup(true);
                } }, "Signup"))))))));
};
export default LoginSigninPage;
