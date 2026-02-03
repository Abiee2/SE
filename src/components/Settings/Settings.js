import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './Settings.css';

const Settings = () => {
  const [toggles, setToggles] = useState({
    textSize: true,
    zoom: true,
    readableFont: true,
    sound: true,
    captions: true,
    simpleMode: false,
    visualAlerts: true,
    quietHours: false,
  });
  const [textSize, setTextSize] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await API.get(`/profile/${userId}`);
        if (response.data.settings) {
          setToggles(response.data.settings.toggles || toggles);
          setTextSize(response.data.settings.textSize || 'Medium');
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };

    loadSettings();
  }, []);

  const handleToggle = (key) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setMessage('No user logged in');
      setLoading(false);
      return;
    }

    try {
      await API.put(`/profile/${userId}`, { toggles, textSize });
      setMessage('Settings saved successfully!');
    } catch (err) {
      console.error('Failed to save settings:', err);
      setMessage('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-area">
      <div className="settings-wrapper">

        {/* VISION ACCESSIBILITY */}
        <section className="settings-card">
          <div className="card-header">👁️ Vision Accessibility</div>

          <div className="setting-row">
            <span>Text Size</span>
            <div className="size-btns">
              <button className={textSize === 'Small' ? 'active' : ''} onClick={() => setTextSize('Small')}>Small</button>
              <button className={textSize === 'Medium' ? 'active' : ''} onClick={() => setTextSize('Medium')}>Medium</button>
              <button className={textSize === 'Large' ? 'active' : ''} onClick={() => setTextSize('Large')}>Large</button>
              <button className={textSize === 'Extra Large' ? 'active' : ''} onClick={() => setTextSize('Extra Large')}>Extra Large</button>
            </div>
            <div
              className={`pill-switch ${toggles.textSize ? 'on' : ''}`}
              onClick={() => handleToggle('textSize')}
            />
          </div>

          <div className="setting-row">
            <span>Zoom Interface</span>
            <div
              className={`pill-switch ${toggles.zoom ? 'on' : ''}`}
              onClick={() => handleToggle('zoom')}
            />
          </div>

          <div className="setting-row">
            <span>Readable Font</span>
            <div
              className={`pill-switch ${toggles.readableFont ? 'on' : ''}`}
              onClick={() => handleToggle('readableFont')}
            />
          </div>
        </section>

        {/* HEARING ACCESSIBILITY */}
        <section className="settings-card">
          <div className="card-header">👂 Hearing Accessibility</div>

          <div className="setting-row">
            <span>Sound Alerts</span>
            <div
              className={`pill-switch ${toggles.sound ? 'on' : ''}`}
              onClick={() => handleToggle('sound')}
            />
          </div>

          <div className="setting-row">
            <span>Enable Captions</span>
            <div
              className={`pill-switch ${toggles.captions ? 'on' : ''}`}
              onClick={() => handleToggle('captions')}
            />
          </div>
        </section>

        {/* COGNITIVE ACCESSIBILITY */}
        <section className="settings-card">
          <div className="card-header">🧠 Cognitive Accessibility</div>

          <div className="setting-row">
            <span>Simple Mode</span>
            <div
              className={`pill-switch ${toggles.simpleMode ? 'on' : ''}`}
              onClick={() => handleToggle('simpleMode')}
            />
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="settings-card">
          <div className="card-header">🔔 Notifications</div>

          <div className="setting-row">
            <span>Show Visual Alerts</span>
            <div
              className={`pill-switch ${toggles.visualAlerts ? 'on' : ''}`}
              onClick={() => handleToggle('visualAlerts')}
            />
          </div>

          <div className="setting-row">
            <span>Set Quiet Hours</span>
            <div
              className={`pill-switch ${toggles.quietHours ? 'on' : ''}`}
              onClick={() => handleToggle('quietHours')}
            />
          </div>
        </section>

        <div className="save-section">
          <button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
          {message && <p className="message">{message}</p>}
        </div>

      </div>
    </div>
  );
};

export default Settings;