import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  // Modified paths to ensure 'Preview' matches your App.js route
  const menuItems = [
    { name: 'Home', path: '/home', icon: '🏠' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
    { name: 'Preview', path: '/preview', icon: '👁️' }, // Updated from '/' to '/preview'
    { name: 'Apps', path: '/apps', icon: '🎛️' },      // Placeholder path
    { name: 'Help', path: '/help', icon: '🎧' },      // Placeholder path
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        {/* Assuming 'Uaps bg.png' is in your /public folder */}
        <img src="/Uaps bg.png" alt="UAPS Logo" />
        <h1>UAPS</h1>
      </div>
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;