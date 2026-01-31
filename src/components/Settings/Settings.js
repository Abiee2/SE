import React, { useState } from 'react';
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

  const handleToggle = (key) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
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
              <button>Small</button>
              <button>Medium</button>
              <button>Large</button>
              <button>Extra Large</button>
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

      </div>
    </div>
  );
};

export default Settings;
