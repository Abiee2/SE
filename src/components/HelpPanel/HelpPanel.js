import React from 'react';
import './HelpPanel.css';

const HelpPanel = () => {
  return (
    <div className="help-container">
      <div className="help-content-wrapper">
        <p className="help-intro-text">How can we assist you?</p>

        {/* Teal Header Box */}
        <div className="help-teal-section">
          <div className="help-cards-grid">
            <div className="help-card">
              <img src="Faq.png" alt="FAQ" />
              <h3>FAQ</h3>
              <p>Browse common questions</p>
            </div>
            <div className="help-card">
              <img src="contactSupport.png" alt="Support" />
              <h3>Contact Support</h3>
              <p>Get in touch with us</p>
            </div>
            <div className="help-card">
              <img src="UserGuide.png" alt="Guide" />
              <h3>User Guide</h3>
              <p>Read our detailed instructions</p>
            </div>
            <div className="help-card">
              <img src="TroubleShooting.png" alt="Tools" />
              <h3>Troubleshooting</h3>
              <p>Fix technical problems</p>
            </div>
          </div>

          <div className="help-action-row">
            <button className="help-contact-button">Contact us</button>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-search-container">
            <div className="faq-search-bar">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search for answers..." />
            </div>
          </div>

          <div className="faq-questions-grid">
            <div className="faq-column">
              <p><span>▶</span> How do I reset my password?</p>
              <p><span>▶</span> How can I update my profile information?</p>
              <p><span>▶</span> Where can I find the user guide?</p>
              <p><span>▶</span> What should I do if I encounter a bug?</p>
              <p><span>▶</span> How do I contact customer support?</p>
            </div>
            <div className="faq-column">
              <p><span>▶</span> What should I do if I encounter a bug?</p>
              <p><span>▶</span> How do I contact customer service?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;