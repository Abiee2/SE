/* global chrome */

import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(`/profile/${userId}`);
        setProfileData(response.data);  // Load full profile, not just settings
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        // Fallback to localStorage (full profile)
        const savedProfile = localStorage.getItem("uaps-profile");
        if (savedProfile) {
          const parsed = JSON.parse(savedProfile);
          setProfileData(parsed);  // Load full profile
        } else {
          // Fallback to register details
          const name = localStorage.getItem('registerName') || 'N/A';
          const number = localStorage.getItem('registerNumber') || 'N/A';
          setProfileData({
            firstName: name.split(' ')[0] || name,
            lastName: name.split(' ').slice(1).join(' ') || '',
            address: 'N/A',
            number: number,
            dateOfBirth: 'N/A',
            settings: { textSize: 'Medium', toggles: {} }
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      await API.put(`/profile/${userId}`, editData);
      setProfileData(editData);
    } catch (err) {
      console.error('Failed to update profile:', err);
      // Fallback: Save full profile to localStorage
      localStorage.setItem('uaps-profile', JSON.stringify(editData));
    } finally {
      setIsEditing(false);
    }
  };

const handleExport = () => {
  // Load full profile from localStorage
  const profileStr = localStorage.getItem("uaps-profile");
  if (!profileStr) {
    alert("No profile found to sync.");
    return;
  }
  const fullProfile = JSON.parse(profileStr);

  // Dispatch the event to trigger extension sync on localhost (content script will handle chrome.storage)
  window.dispatchEvent(new CustomEvent("settings-saved", { detail: fullProfile.settings }));

  // Alert success (syncing is now handled by the extension's content script)
  alert('Profile synced to Chrome extension successfully! Check the extension for confirmation.');
};

  if (loading) {
    return (
      <div className="content-area">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profileData) {
    return <div className="content-area">No profile data found.</div>;
  }

  return (
    <div className="content-area">
      {/* HEADER SA TAAS – ICON LANG */}
      <div className="top-header-icon-only">
        <div className="header-avatar">👤</div>
      </div>

      {/* EXISTING PROFILE CARD WRAPPED WITH FRAME */}
      <div className="profile-frame">
        <div className="profile-container">
          <div className="profile-header-card">
            <div className="avatar-circle">👤</div>
            <button className="edit-btn" onClick={handleEdit}>🖊️ Edit Profile</button>
          </div>

          <div className="profile-details-card">
            <h2>{profileData.firstName} {profileData.lastName}</h2>

            <div className="details-box">
              <h3 className="box-title">Profile details</h3>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="icon">👤</span>
                  <div>
                    <label>First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.firstName || ''}
                        onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                      />
                    ) : (
                      <p>{profileData.firstName}</p>
                    )}
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">👤</span>
                  <div>
                    <label>Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.lastName || ''}
                        onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                      />
                    ) : (
                      <p>{profileData.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">📞</span>
                  <div>
                    <label>Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.number || ''}
                        onChange={(e) => setEditData({ ...editData, number: e.target.value })}
                      />
                    ) : (
                      <p>{profileData.number}</p>
                    )}
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">📍</span>
                  <div>
                    <label>Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address || ''}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      />
                    ) : (
                      <p>{profileData.address}</p>
                    )}
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">📅</span>
                  <div>
                    <label>Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.dateOfBirth || ''}
                        onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                      />
                    ) : (
                      <p>{profileData.dateOfBirth || 'N/A'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="edit-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}

            <div className="export-section">
              <button onClick={handleExport}>
                Sync Profile to Chrome Extension
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;