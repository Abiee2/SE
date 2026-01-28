import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: 'Home', path: '/home', icon: '🏠' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
    { name: 'Preview', path: '/', icon: '👁️' },
    { name: 'Apps', path: '/', icon: '🎛️' },
    { name: 'Help', path: '/', icon: '🎧' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/Uaps bg.png" alt="UAPS Logo" />
        <h1>UAPS</h1>
      </div>
      <div className="nav-menu">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;