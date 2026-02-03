
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import './PreviewPanel.css';

const PreviewPanel = () => {
  const [isApplied, setIsApplied] = useState(false);
  const [settings, setSettings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSettings = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await API.get(`/profile/${userId}`);
        setSettings(response.data.settings);
      } catch (err) {
        console.error('Failed to load settings for preview:', err);
      }
    };

    loadSettings();
  }, []);

  const textSizeClass = settings?.textSize ? `text-size-${settings.textSize.toLowerCase().replace(' ', '-')}` : '';
  const readableFontClass = settings?.toggles?.readableFont ? 'readable-font' : '';
  const simpleModeClass = settings?.toggles?.simpleMode ? 'simple-mode' : '';

  return (
    <div className={`preview-page-wrapper ${textSizeClass} ${readableFontClass} ${simpleModeClass}`}>

      <div className="device-frame">
        {!isApplied ? (
          <div className={`layout-container before-state ${textSizeClass} ${readableFontClass} ${simpleModeClass}`}>
            <div className="top-banner">
              <div className="user-welcome">
                <h1>Welcome, Abie!</h1>
              </div>
              <div className="header-notif-icons">
                <span className="icon-badge">🔔</span>
                <span className="icon-badge">✉️</span>
              </div>
            </div>

            <div className="nav-grid">
              <div className="nav-card">
                <span className="card-icon">📋</span>
                <p>My Accessibility Settings</p>
              </div>
              <div className="nav-card">
                <span className="card-icon">🖱️</span>
                <p>Simplified Interface</p>
              </div>
              <div className="nav-card">
                <span className="card-icon">🖥️</span>
                <p>Connected Application</p>
              </div>
              <div className="nav-card">
                <span className="card-icon">🤝</span>
                <p>Help & Support</p>
              </div>
            </div>

            <div className="apps-inventory">
              <h3>Your Applications</h3>
              <div className="app-item">
                <span className="app-info">📍 Health Tracker</span>
                <span className="status-badge connected">connected</span>
              </div>
              <div className="app-item">
                <span className="app-info">🏠 Smart Home</span>
                <span className="status-label not-connected">Not connected</span>
              </div>
              <div className="app-item">
                <span className="app-info">🖼️ Photo Sharing App</span>
                <span className="status-badge connected">connected</span>
              </div>
            </div>
            
            <div className="action-row">
              <button className="btn-action apply" onClick={() => setIsApplied(true)}>
                Apply Changes
              </button>
            </div>
          </div>
        ) : (
/* --- AFTER DESIGN --- (Updated Section) */
<div className="layout-container after-state">
  <div className="simplified-hero">
    <div className="hero-content">
      <h1>Welcome, Abie!</h1>
      <p className="profile-tag">Accessibility Profile: <strong>Enhanced</strong></p>
    </div>
  </div>

  <div className="simplified-features-grid">
    <div className="feature-item">
      <span className="feature-emoji">📋</span>
      <div className="feature-text">
        <h3>My Accessibility Settings</h3>
        <p>Manage your custom view</p>
      </div>
    </div>
    <div className="feature-item">
      <span className="feature-emoji">🖱️</span>
      <div className="feature-text">
        <h3>Simplified Interface</h3>
        <p>Easier navigation enabled</p>
      </div>
    </div>
    <div className="feature-item">
      <span className="feature-emoji">🖥️</span>
      <div className="feature-text">
        <h3>Connected Application</h3>
        <p>3 apps currently linked</p>
      </div>
    </div>
    <div className="feature-item">
      <span className="feature-emoji">🤝</span>
      <div className="feature-text">
        <h3>Help & Support</h3>
        <p>Get assistance anytime</p>
      </div>
    </div>
  </div>

  <div className="action-row-split">
    <button className="btn-action applied-status" disabled>✓ Applied</button>
    <button className="btn-action dashboard-btn" onClick={() => navigate('/home')}>
      Back to Dashboard
    </button>
  </div>
</div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
