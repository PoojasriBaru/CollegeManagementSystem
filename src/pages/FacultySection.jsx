import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';


const FacultySection = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/faculty');
        const data = await response.json();
        setFaculty(data);
      } catch (error) {
        console.error('Error fetching faculty:', error);
      }
    };
    fetchFaculty();
  }, []);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    department: '',
    position: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newFaculty = await response.json();
      setFaculty([...faculty, newFaculty]);
      setFormData({ name: '', email: '', department: '', position: '' });
    } catch (error) {
      console.error('Error adding faculty:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="text-center mb-4">Faculty Management</h1>
      
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Faculty Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            name="department"
            className="form-control"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            name="position"
            className="form-control"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Add Faculty</button>
            </form>
            <Link to="/faculty-search" className="btn btn-primary mt-3">Search Faculty</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultySection;