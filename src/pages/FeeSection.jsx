import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FeeSection() {
  const [fees, setFees] = useState([]);
  const [formData, setFormData] = useState({
    rollNumber: '',
    amount: '',
    status: 'Pending'
  });

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/fees');
        const data = await response.json();
        setFees(data);
      } catch (error) {
        console.error('Error fetching fees:', error);
      }
    };
    fetchFees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/fees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add fee');

      const newFee = await response.json();
      setFees([...fees, newFee]);
      setFormData({ rollNumber: '', amount: '', status: 'Pending' });
    } catch (error) {
      console.error('Error adding fee:', error);
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
    <div className="container mt-5">
      <h1 className="mb-4 text-primary">Fee Management</h1>
      <Link to="/" className="btn btn-secondary mb-4">&lt;</Link>

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
            type="number"
            name="amount"
            className="form-control"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <select
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Add Fee</button>
      </form>
    </div>
  );
}