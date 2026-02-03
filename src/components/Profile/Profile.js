import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(`/profile/${userId}`);
        setProfileData(response.data.settings);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        // Fallback to localStorage data
        const name = localStorage.getItem('registerName') || 'N/A';
        const number = localStorage.getItem('registerNumber') || 'N/A';
        setProfileData({
          firstName: name.split(' ')[0] || name,
          lastName: name.split(' ').slice(1).join(' ') || '',
          address: 'N/A',
          number: number
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="content-area">Loading profile...</div>;
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
            <button className="edit-btn">🖊️ Edit Profile</button>
          </div>

          <div className="profile-details-card">
            <h2>{profileData.firstName} {profileData.lastName}</h2>

            <div className="details-box">
              <h3 className="box-title">Profile details</h3>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="icon">👤</span>
                  <div>
                    <label>Full Name</label>
                    <p>{profileData.firstName} {profileData.lastName}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">📞</span>
                  <div>
                    <label>Number</label>
                    <p>{profileData.number}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">👤</span>
                  <div>
                    <label>Username</label>
                    <p>{profileData.firstName}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">📍</span>
                  <div>
                    <label>Address</label>
                    <p>{profileData.address}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="icon">📅</span>
                  <div>
                    <label>Date of Birth</label>
                    <p>N/A</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
