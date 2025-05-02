import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function FacultySearchPage() {
  const [searchParams, setSearchParams] = useState({
    name: '',
    position: ''
  });
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Allow empty searches to return all faculty
      if (!searchParams.name.trim() && !searchParams.position.trim()) {
        const response = await fetch('http://localhost:4000/api/faculty');
        const data = await response.json();
        setFaculty(data);
        setLoading(false);
        return;
      }
      const response = await fetch(`http://localhost:4000/api/faculty/search?name=${encodeURIComponent(searchParams.name.trim())}&position=${encodeURIComponent(searchParams.position.trim())}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Search failed');
      }
      setFaculty(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Search failed');
      setFaculty([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
      <h1 className="mb-4 text-primary">Faculty Search</h1>
      <Link to="/faculty" className="btn btn-secondary mb-4">Back to Faculty</Link>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="form-group mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Faculty Name"
            value={searchParams.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            name="position"
            className="form-control"
            placeholder="Position"
            value={searchParams.position}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {loading && <div className="text-center my-4">Loading...</div>}
      {error && <div className="alert alert-danger my-4">{error}</div>}
      {faculty.length > 0 ? (
        <div className="mt-4">
          <h2>Search Results</h2>
          {faculty.map(f => (
            <div key={f._id} className="card border-primary mb-3">
              <div className="card-header bg-primary text-white">
                <h3>{f.name}</h3>
              </div>
              <div className="card-body">
                <p><strong>Email:</strong> {f.email}</p>
                <p><strong>Department:</strong> {f.department}</p>
                <p><strong>Position:</strong> {f.position}</p>
              </div>
            </div>
          ))}
        </div>
      ) : !loading && (
        <div className="alert alert-info mt-4">No faculty found matching your criteria.</div>
      )}
    </div>
  </div>
);
}