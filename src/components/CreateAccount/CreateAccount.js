import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./CreateAccount.css";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Prefill form if redirected from registration
  useEffect(() => {
    const savedName = localStorage.getItem("registerName");
    const savedNumber = localStorage.getItem("registerNumber");
    const savedPassword = localStorage.getItem("registerPassword");
    if (savedName) setFirstName(savedName);
    if (savedNumber) setNumber(savedNumber);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  // Navigate to login after successful profile save
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service & Privacy Policy");
      return;
    }

    setLoading(true);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('No user account found. Please register or login first.');
      setLoading(false);
      return;
    }

    const settings = { firstName, lastName, address, number, password };
    localStorage.setItem("profile", JSON.stringify({ userId, settings }));
    setSuccess("Profile saved successfully! 🎉");
    setLoading(false);
  };

  const handleCheckboxClick = () => setShowPrivacyModal(true);
  const handleAgree = () => {
    setAgreeTerms(true);
    setShowPrivacyModal(false);
  };
  const handleCancel = () => {
    setAgreeTerms(false);
    setShowPrivacyModal(false);
  };

  if (loading) {
    return (
      <div className="create-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          Saving profile...
        </div>
      </div>
    );
  }

  return (
    <div className="create-container">
      <div className="create-header">
        <img
          src={`${process.env.PUBLIC_URL}/Uaps bg.png`}
          alt="UAPS Logo"
          className="logo"
        />
        <h2>Create Your Accessibility Profile</h2>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        <div className="row">
          <label>
            <span>First Name</span>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Last Name</span>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>

        <label className="full-width">
          <span>Address</span>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <div className="row">
          <label>
            <span>Number</span>
            <input
              type="tel"
              placeholder="Enter your number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={handleCheckboxClick}
          />
          <span>
            I agree to the <b>Terms of Service</b> & <b>Privacy Policy</b>
          </span>
        </label>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving Profile..." : "Save Profile"}
        </button>
      </form>

      {/* PRIVACY MODAL */}
      {showPrivacyModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <span>Data Privacy</span>
              <span className="close-x" onClick={handleCancel}>×</span>
            </div>
            <div className="modal-content">
              We value your privacy.<br /><br />
              By creating an account, your personal information (name, address, and contact number) will be collected and used in compliance with the Data Privacy Act of 2012 (RA 10173).<br /><br />
              Your data will be used only for system services and will not be shared without your consent.
            </div>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              <button className="agree-btn" onClick={handleAgree}>I Understand & Agree</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccount;
