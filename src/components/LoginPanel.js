import React, { useState } from 'react';
import axios from 'axios';
import './LoginPanel.css';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // add at the top


const LoginPanel = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate(); // initialize navigate


  // LOGIN
  const [loginNumber, setLoginNumber] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // REGISTER
  const [registerName, setRegisterName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false); // ✅ Loading state for Sign Up

  // LOGIN SUBMIT
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await axios.post('http://localhost:8082/api/login', {
        number: loginNumber,
        password: loginPassword
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch {
      setLoginError('Invalid number or password');
    } finally {
      setLoginLoading(false);
    }
  };

  // REGISTER SUBMIT
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterLoading(true); // ✅ Start loading

    try {
      const response = await axios.post('http://localhost:8082/api/register', {
        name: registerName,
        number: registerNumber,
        password: registerPassword
      });

      if (response.data?.userId) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("registerName", registerName);
        localStorage.setItem("registerNumber", registerNumber);
      }

      // Redirect to Create Account panel after sign up
      window.location.href = "/create-account";

    } catch {
      setRegisterError('Registration failed');
    } finally {
      setRegisterLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="login-panel-wrapper blue-theme">
      <div className={`container ${isActive ? 'active' : ''}`}>

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

            {/* ✅ Sign Up button */}
            <button
              className="hidden"
              onClick={() => navigate("/account")} // redirect directly
            >
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

            {/* <a href="#">Forget Your Password?</a> */}
            {/* Change this line */}
            <p className={`error ${loginError ? 'visible' : ''}`}>
              {loginError || " placeholder "}
            </p>

            <button type="submit" disabled={loginLoading}>
              {loginLoading ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>

        {/* TOGGLE */}
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
