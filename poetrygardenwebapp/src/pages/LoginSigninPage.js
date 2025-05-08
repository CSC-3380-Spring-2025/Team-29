import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
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
            if (error instanceof Error) {
                console.error("❌ Sign Up Error:", error.message);
                setErrorMessage(getFriendlyErrorMessage(error.code));
            }
            else {
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
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("❌ Login Error:", error.message);
                setErrorMessage(getFriendlyErrorMessage(error.code));
            }
            else {
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
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("❌ Forgot Password Error:", error.message);
                setErrorMessage(getFriendlyErrorMessage(error.code));
            }
            else {
                console.error("❌ Forgot Password Error:", error);
                setErrorMessage("An unknown error occurred.");
            }
        }
    };
    const handleLogout = async () => {
        await signOut(auth);
        console.log("✅ Logged Out");
    };
    return (_jsx("div", { className: "container", children: isResetPassword ? (_jsxs("div", { className: "auth-form", children: [_jsx("header", { children: "Reset Password" }), errorMessage && _jsx("p", { className: "error-message", children: errorMessage }), successMessage && _jsx("p", { className: "success-message", children: successMessage }), _jsx("input", { type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("button", { onClick: handleForgotPassword, children: "Send Reset Email" }), _jsx("div", { className: "switch-container", children: _jsx("span", { children: _jsx("a", { href: "#", className: "switch", onClick: (e) => {
                                e.preventDefault();
                                setIsResetPassword(false);
                            }, children: "Back to Login" }) }) })] })) : (_jsxs("div", { className: "auth-form", children: [_jsx("header", { children: isSignup ? "Signup" : "Login" }), errorMessage && _jsx("p", { className: "error-message", children: errorMessage }), successMessage && _jsx("p", { className: "success-message", children: successMessage }), _jsx("input", { type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: "password", placeholder: isSignup ? "Create a password" : "Enter your password", value: password, onChange: (e) => setPassword(e.target.value) }), isSignup ? (_jsx("button", { onClick: handleSignUp, children: "Signup" })) : (_jsx("button", { onClick: handleLogin, children: "Login" })), !isSignup && (_jsx("div", { className: "forgot-password", children: _jsx("a", { href: "#", onClick: (e) => {
                            e.preventDefault();
                            setIsResetPassword(true);
                        }, children: "Forgot your password?" }) })), _jsx("div", { className: "switch-container", children: isSignup ? (_jsxs("span", { children: ["Already have an account?", " ", _jsx("a", { href: "#", className: "switch", onClick: (e) => {
                                    e.preventDefault();
                                    setIsSignup(false);
                                }, children: "Login" })] })) : (_jsxs("span", { children: ["Don't have an account?", " ", _jsx("a", { href: "#", className: "switch", onClick: (e) => {
                                    e.preventDefault();
                                    setIsSignup(true);
                                }, children: "Signup" })] })) })] })) }));
};
export default LoginSigninPage;
