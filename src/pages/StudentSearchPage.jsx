import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function StudentSearchPage() {
  const [rollNumber, setRollNumber] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!rollNumber.trim()) {
        setError('Please enter a roll number');
        return;
      }
      const response = await fetch(`http://localhost:4000/api/students/search?rollNumber=${encodeURIComponent(rollNumber.trim())}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.status === 404) {
        setError('No student found with this roll number');
        setStudent(null);
      } else if (!response.ok) {
        throw new Error(data.message || 'Search failed');
      } else {
        setStudent(data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Search failed');
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setRollNumber(e.target.value);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
      <h1 className="mb-4 text-primary">Student Search</h1>
      <Link to="/students" className="btn btn-secondary mb-4">Back to Students</Link>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="form-group mb-3">
          <input
            type="text"
            name="rollNumber"
            className="form-control"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {loading && <div className="text-center my-4">Loading...</div>}
      {error && <div className="alert alert-danger my-4">{error}</div>}
      {student && (
        <div className="card border-primary">
          <div className="card-header bg-primary text-white">
            <h2>Student Details</h2>
          </div>
          <div className="card-body">
            <p><strong>Roll Number:</strong> {student.rollNumber}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Department:</strong> {student.department}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}