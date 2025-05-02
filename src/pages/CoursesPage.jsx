import React from 'react';
import Sidebar from '../components/Sidebar';
import './HomePage.css';

export default function CoursesPage() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-sections">
          <section className="courses-offered mb-5">
            <h2 className="text-center mb-4">Courses Offered</h2>
            <div className="groups-container">
              <div className="group-card">
                <div className="card-header">
                  <h3>CSE</h3>
                  <span className="group-type">Engineering</span>
                </div>
                <div className="card-body">
                  <p className="description">Computer Engineering Science program focusing on advanced computing principles and scientific applications.</p>
                </div>
              </div>
              <div className="group-card">
                <div className="card-header">
                  <h3>CSE (AIML)</h3>
                  <span className="group-type">Engineering</span>
                </div>
                <div className="card-body">
                  <p className="description">Computer Science Engineering specializing in Artificial Intelligence and Machine Learning.</p>
                </div>
              </div>
              <div className="group-card">
                <div className="card-header">
                  <h3>ECE</h3>
                  <span className="group-type">Engineering</span>
                </div>
                <div className="card-body">
                  <p className="description">Electronics and Communication Engineering focusing on electronic systems and communication technology.</p>
                </div>
              </div>
              <div className="group-card">
                <div className="card-header">
                  <h3>EEE</h3>
                  <span className="group-type">Engineering</span>
                </div>
                <div className="card-body">
                  <p className="description">Electrical and Electronics Engineering covering power systems and electronic devices.</p>
                </div>
              </div>
              <div className="group-card">
                <div className="card-header">
                  <h3>Civil</h3>
                  <span className="group-type">Engineering</span>
                </div>
                <div className="card-body">
                  <p className="description">Civil Engineering program focusing on infrastructure design and construction management.</p>
                </div>
              </div>
              <div className="group-card">
                <div className="card-header">
                  <h3>IT</h3>
                  <span className="group-type">Engineering</span>
                </div>
                <div className="card-body">
                  <p className="description">Information Technology program covering software development and IT infrastructure.</p>
                </div>
              </div>
              <div className="group-card">
                <div className="card-header">
                  <h3>CSD</h3>
                  <span className="group-type">Engineering</span>
                </div>
                <div className="card-body">
                  <p className="description">Computer Science and Design program combining technical skills with design principles.</p>
                </div>
              </div>
              <div className="group-card">
                <div className="card-header">
                  <h3>CSC</h3>
                  <span className="group-type">Engineering</span>
                </div>
                <div className="card-body">
                  <p className="description">Computer Engineering program focusing on hardware and software system design.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}