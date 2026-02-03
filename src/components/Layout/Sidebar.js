import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuItems = [
    { name: 'Home', path: '/home', icon: '🏠' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
    { name: 'Preview', path: '/preview', icon: '👁️' },
    { name: 'Apps', path: '/apps', icon: '🎛️' },
    { name: 'Help', path: '/help', icon: '🎧' },
  ];

  const handleLinkClick = () => {
    // close sidebar on mobile when a link is clicked
    setOpen(false);
  };

  return (
    <>
      <button
        className={`sidebar-toggle ${open ? 'open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      >
        <span className="hamburger" />
      </button>

      {/* overlay shown when mobile sidebar is open */}
      <div className={`sidebar-overlay ${open ? 'visible' : ''}`} onClick={() => setOpen(false)} />

      <div className={`sidebar ${open ? 'open' : ''}`} role="navigation" aria-hidden={!open && window.innerWidth <= 600}>
        <div className="sidebar-logo">
          <img src="/Uaps bg.png" alt="UAPS Logo" />
          <h1>UAPS</h1>
        </div>
        <div className="nav-menu">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={handleLinkClick}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;