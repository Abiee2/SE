import React, { useState, useEffect } from 'react';
import './ConnectedApp.css';

/* global chrome */
const ConnectedApp = () => {
  const [appliedApps, setAppliedApps] = useState([]);

  // Load applied apps from localStorage (and optionally Chrome storage)
  const loadAppliedApps = () => {
    const profileStr = localStorage.getItem("uaps-profile");
    if (profileStr) {
      const profile = JSON.parse(profileStr);
      setAppliedApps(profile.appliedApps || []);
    }
  };

  useEffect(() => {
    loadAppliedApps();

    // Listen for storage changes (from other tabs or extension sync)
    const handleStorage = (e) => {
      if (e.key === "uaps-profile") loadAppliedApps();
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const applyProfileToApp = (appName) => {
    const previewStr = localStorage.getItem("uaps-preview");
    const profileStr = localStorage.getItem("uaps-profile");
    if (!previewStr) {
      alert("No preview settings found. Please save your profile first.");
      return;
    }

    const preview = JSON.parse(previewStr);
    const profile = profileStr ? JSON.parse(profileStr) : { settings: {} };
    const newProfile = {
      settings: { ...profile.settings, ...preview.settings },  // Merge settings
      firstName: profile.firstName || profile.settings?.firstName || '',
      lastName: profile.lastName || profile.settings?.lastName || '',
      number: profile.number || profile.settings?.number || '',
      address: profile.address || profile.settings?.address || '',
      appliedApps: Array.from(new Set([...(profile.appliedApps || []), appName]))
    };

    // Save full profile to localStorage
    localStorage.setItem("uaps-profile", JSON.stringify(newProfile));
    setAppliedApps(newProfile.appliedApps);

    // Sync full profile to Chrome extension storage
    if (window.chrome?.storage?.sync) {
      chrome.storage.sync.set({ uapsProfile: newProfile }, () => {
        if (chrome.runtime.lastError) {
          console.error("UAPS Extension: Sync failed:", chrome.runtime.lastError);
        } else {
          console.log("UAPS Extension: Full profile synced to extension for", appName);
        }
      });
    } else {
      console.warn("UAPS Extension: Chrome storage not available. Install the extension.");
    }

    alert(`Accessibility profile applied to ${appName}!`);
  };

  const renderAppCard = (appName, emoji) => {
    const isConnected = appliedApps.includes(appName);
    return (
      <div className="app-card" key={appName}>
        <div className="white-box-icon">
          <span className="emoji-graphic">{emoji}</span>
        </div>
        <h2 className="app-name">{appName}</h2>
        <div className="status-indicator">
          {isConnected ? (
            <>
              <span className="check-dot">✔</span>
              <span className="status-label">Connected</span>
            </>
          ) : (
            <>
              <span className="check-dot not-connected">❌</span>
              <span className="status-label">Not Applied</span>
            </>
          )}
        </div>
        <button
          className="apply-profile-btn"
          onClick={() => applyProfileToApp(appName)}
          disabled={isConnected}
        >
          {isConnected ? "Applied" : "Apply Accessibility Profile"}
        </button>
      </div>
    );
  };

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
          {renderAppCard("Wikipedia", "🌐")}

        </div>

        <div className="info-footer-box">
          <span className="info-mark">ℹ️</span>
          <p>
            When you apply your profile, the app will automatically use your preferred text size, 
            contrast, and simplified layout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectedApp;