// LoginPanel.jsx
import React, { useState } from "react";
import axios from "axios";
import API from "../../services/api";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./LogInPanel.css";

const LoginPanel = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  // LOGIN
  const [loginNumber, setLoginNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // REGISTER
  const [registerName, setRegisterName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  // LOGIN SUBMIT
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // <- Prevents page reload
    setLoginError("");
    setLoginLoading(true);

    // Check against registered details in localStorage
    const storedNumber = localStorage.getItem("registerNumber");
    const storedPassword = localStorage.getItem("registerPassword");
    const storedUserId = localStorage.getItem("userId");

    if (loginNumber === storedNumber && loginPassword === storedPassword) {
      // Login successful
      localStorage.setItem("userId", storedUserId);
      setLoginSuccess('Logged in successfully');
      // Small delay so user sees feedback, then navigate
      setTimeout(() => navigate("/profile"), 250);
    } else {
      setLoginError("Invalid number or password");
    }

    setLoginLoading(false);
  };

  // REGISTER SUBMIT
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterLoading(true);

    // Generate a simple userId
    const userId = `user-${Date.now()}`;

    // Save details to localStorage
    localStorage.setItem("userId", userId);
    localStorage.setItem("registerName", registerName);
    localStorage.setItem("registerNumber", registerNumber);
    localStorage.setItem("registerPassword", registerPassword);

    // Navigate to create account panel
    navigate("/account");

    setRegisterLoading(false);
  };

  return (
    <div className="login-panel-wrapper blue-theme">
      <div className={`container ${isActive ? "active" : ""}`}>
        {/* REGISTER */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegisterSubmit}>
            <div className="logo">
              <img src={`${process.env.PUBLIC_URL}/Uaps bg.png`} alt="UAPS Logo" />
            </div>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
              required
            />
            <div className="password-wrapper">
              <input
                type={showRegisterPassword ? "text" : "password"}
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              >
                {showRegisterPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {registerError && <p className="error">{registerError}</p>}
            <button type="submit" disabled={registerLoading}>
              {registerLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {/* LOGIN */}
        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <div className="logo">
              <img src={`${process.env.PUBLIC_URL}/Uaps bg.png`} alt="UAPS Logo" />
            </div>
            <h1>Log In</h1>
            <input
              type="tel"
              placeholder="Phone Number"
              value={loginNumber}
              onChange={(e) => setLoginNumber(e.target.value)}
              required
            />
            <div className="password-wrapper">
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {loginError && <p className="error">{loginError}</p>}
            {loginSuccess && <p className="success">{loginSuccess}</p>}
            <button type="submit" disabled={loginLoading}>
              {loginLoading ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>

        {/* TOGGLE PANEL */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button className="hidden" onClick={() => setIsActive(false)}>
                Log In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button className="hidden" onClick={() => setIsActive(true)}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
