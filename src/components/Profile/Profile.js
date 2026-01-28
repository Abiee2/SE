import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="content-area">

      {/* HEADER SA TAAS – ICON LANG */}
      <div className="top-header-icon-only">
        <div className="header-avatar">👤</div>
      </div>

      {/* EXISTING PROFILE CARD */}
      <div className="profile-container">
        <div className="profile-header-card">
          <div className="avatar-circle">👤</div>
          <button className="edit-btn">🖊️ Edit Profile</button>
        </div>

        <div className="profile-details-card">
          <h2>Profile Name</h2>

          <div className="details-box">
            <h3 className="box-title">Profile details</h3>

            <div className="details-grid">
              <div className="detail-item">
                <span className="icon">👤</span>
                <div>
                  <label>Full Name</label>
                  <p>FirstName Last Name</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="icon">📞</span>
                <div>
                  <label>Number</label>
                  <p>092222221214</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="icon">👤</span>
                <div>
                  <label>Username</label>
                  <p>Joy</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="icon">📍</span>
                <div>
                  <label>Address</label>
                  <p>123 katapatan street</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="icon">📅</span>
                <div>
                  <label>Date of Birth</label>
                  <p>09/17/2005</p>
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
