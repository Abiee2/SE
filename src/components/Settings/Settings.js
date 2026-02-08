import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './Settings.css';

const Settings = () => {
  const [toggles, setToggles] = useState(null);
  const [textSize, setTextSize] = useState(null);
  const [loading, setLoading] = useState(true); // Loading indicator
  const [message, setMessage] = useState('');

  // Load settings: preview first, then API fallback
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);

      try {
        // Check for preview first
        const savedPreview = localStorage.getItem('uaps-preview');
        if (savedPreview) {
          const parsed = JSON.parse(savedPreview);
          if (parsed?.settings) {
            setToggles(parsed.settings.toggles ?? {});
            setTextSize(parsed.settings.textSize ?? 'Medium');
            setLoading(false);
            return;
          }
        }

        // Fallback: load from API
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const response = await API.get(`/profile/${userId}`);
        const settings = response.data.settings || {};
        setToggles(settings.toggles ?? {});
        setTextSize(settings.textSize ?? 'Medium');
      } catch (err) {
        console.error('Failed to load settings:', err);
        setToggles({});
        setTextSize('Medium');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleToggle = (key) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };


  const handleSave = () => {
    if (!toggles || !textSize) return;

    const previewPayload = { textSize, toggles };

    // Save preview so Settings remembers it
    localStorage.setItem('uaps-preview', JSON.stringify({ settings: previewPayload }));

    // Trigger preview update
    window.dispatchEvent(new CustomEvent("preview-updated", { detail: { textSize, toggles } }));

    console.log("Settings saved to localStorage:", previewPayload);  // Add this for debugging
    setMessage('Preview updated. Review changes before applying.');
  };

  if (loading) {
    return (
      <div className="content-area">
        <p className="loading-message">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="settings-wrapper">

        {/* VISION ACCESSIBILITY */}
        <section className="settings-card">
          <div className="card-header">👁️ Vision Accessibility</div>

          <div className="setting-row">
            <span>Text Size</span>
            <div className="size-btns">
              {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                <button
                  key={size}
                  className={textSize === size ? 'active' : ''}
                  onClick={() => setTextSize(size)}
                >
                  {size}
                </button>
              ))}
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
          <button onClick={handleSave}>
            Save & Preview
          </button>
          {message && <p className="message">{message}</p>}
        </div>

      </div>
    </div>
  );
};

export default Settings;
