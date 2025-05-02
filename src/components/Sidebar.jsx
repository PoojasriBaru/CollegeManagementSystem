import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="college-name">
        <h2>CMR</h2>
      </div>
      <nav>
        <ul>
          <li><Link to="/"><i className="fas fa-home"></i> Dashboard</Link></li>
          <li><Link to="/students"><i className="fas fa-user-graduate"></i> Student Section</Link></li>
          <li><Link to="/faculty"><i className="fas fa-chalkboard-teacher"></i> Faculty</Link></li>
          <li><Link to="/courses"><i className="fas fa-book"></i> Courses</Link></li>
          <li><Link to="/attendance"><i className="fas fa-clipboard-check"></i> Attendance</Link></li>
          <li><Link to="/grades"><i className="fas fa-graduation-cap"></i> Grades</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;