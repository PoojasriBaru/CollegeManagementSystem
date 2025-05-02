import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function StudentSection() {
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
  const [formData, setFormData] = useState({ 
    rollNumber: '',
    name: '', 
    email: '', 
    department: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data
      if (!formData.rollNumber.trim()) {
        alert('Roll number is required');
        return;
      }

      const response = await fetch('http://localhost:4000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add student');
      }
      
      const newStudent = await response.json();
      setStudents([...students, newStudent]);
      setFormData({ rollNumber: '', name: '', email: '', department: '' });
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
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
        <h1 className="text-center mb-4">Student Management</h1>
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group mb-3">
          <input
            type="text"
            name="rollNumber"
            className="form-control"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Student Name"
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
        <button type="submit" className="btn btn-success">Add Student</button>
          </form>
          <Link to="/student-search" className="btn btn-primary mt-3">Search Students</Link>
        </div>
      </div>
    </div>
  </div>
  );
}