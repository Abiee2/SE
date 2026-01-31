import React from 'react';
import './ConnectedApp.css';

const ConnectedApp = () => {
  return (
    <div className="connected-page-layout">
      <div className="content-inner">
        <header className="page-header">
          <h1 className="main-title">Connected Applications</h1>
          <p className="subtitle-text">
            These applications use your accessibility settings to make them easier to use.
          </p>
        </header>

        <div className="cards-flex-row">
          {/* Card 1: Health App */}
          <div className="app-card">
            <div className="white-box-icon">
              <span className="emoji-graphic">📱</span>
              <div className="plus-sign">+</div>
            </div>
            <h2 className="app-name">Health App</h2>
            <div className="status-indicator">
              <span className="check-dot">✔</span>
              <span className="status-label">Connected</span>
            </div>
            <button className="apply-profile-btn">
              Apply Accessibility Profile
            </button>
          </div>

          {/* Card 2: Messenger */}
          <div className="app-card">
            <div className="white-box-icon">
              <span className="emoji-graphic">💬</span>
              <div className="plus-sign">+</div>
            </div>
            <h2 className="app-name">Messenger</h2>
            <div className="status-indicator">
              <span className="check-dot">✔</span>
              <span className="status-label">Connected</span>
            </div>
            <button className="apply-profile-btn">
              Apply Accessibility Profile
            </button>
          </div>
        </div>

        <div className="info-footer-box">
          <span className="info-mark">ℹ️</span>
          <p>When you apply your profile, the app will automatically use your preferred text size, contrast, and simplified layout.</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectedApp;