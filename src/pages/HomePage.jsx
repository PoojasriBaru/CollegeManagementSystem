import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  // Fetch students data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/students');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="college-name">
          <h2>CMR</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/"><i className="fas fa-home"></i> Dashboard</Link>
            </li>
            <li>
              <Link to="/students"><i className="fas fa-user-graduate"></i> Student Section</Link>
            </li>
            <li>
              <Link to="/faculty"><i className="fas fa-chalkboard-teacher"></i> Faculty</Link>
            </li>
            <li>
              <Link to="/courses"><i className="fas fa-book"></i> Courses</Link>
            </li>
            <li>
              <Link to="/attendance"><i className="fas fa-clipboard-check"></i> Attendance</Link>
            </li>
            <li>
              <Link to="/grades"><i className="fas fa-graduation-cap"></i> Grades</Link>
            </li>

          </ul>
        </nav>
      </div>
      <div className="main-content">
        <div className="dashboard-sections">
          <section className="student-clubs mb-5">
            <h2 className="text-center mb-4">Student Clubs</h2>
            <div className="groups-container">
              <div className="group-card">
                <div className="card-header">
                  <h3>Computer Science Club</h3>
                  <span className="group-type">Technical</span>
                </div>
                <div className="card-body">
                  <p className="description">A club for students interested in computer science and programming. We organize hackathons, workshops, and coding competitions.</p>
                  <button className="join-btn">Join Club</button>
                </div>
              </div>
              <div className="group-card">
                <div className="card-header">
                  <h3>Literary Society</h3>
                  <span className="group-type">Cultural</span>
                </div>
                <div className="card-body">
                  <p className="description">Promotes creative writing, poetry, and literature among students. Organizes poetry slams and writing workshops.</p>
                  <button className="join-btn">Join Club</button>
                </div>
              </div>
              <div className="group-card">
                <div className="card-header">
                  <h3>Sports Club</h3>
                  <span className="group-type">Sports</span>
                </div>
                <div className="card-body">
                  <p className="description">Organizes various sports activities and tournaments. Promotes physical fitness and sportsmanship.</p>
                  <button className="join-btn">Join Club</button>
                </div>
              </div>
            </div>
          </section>

          <section className="about-college mb-5">
            <h2 className="text-center mb-4">About Our College</h2>
            <div className="card">
              <div className="card-body">
                <p>Our college is committed to providing quality education and fostering academic excellence. With state-of-the-art facilities and experienced faculty, we prepare students for successful careers.</p>
                <p>Founded in 1995, we have consistently ranked among the top educational institutions in the region.</p>
              </div>
            </div>
          </section>

          <section className="contact-info">
            <h2 className="text-center mb-4">Contact Information</h2>
            <div className="card">
              <div className="card-body">
                <p><strong>Address:</strong> 123 College Road, Education City, State - 12345</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> info@college.edu</p>
                <p><strong>Office Hours:</strong> Monday - Friday: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}