const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Connect to local MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/collegeDB');
    console.log('Connected to local MongoDB');
    // Start server only after successful database connection
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

// Student Schema
const studentSchema = new mongoose.Schema({
  rollNumber: String,
  name: String,
  email: String,
  department: String
});

// Faculty Schema
const facultySchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  position: String
});

const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);

// Student Routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/students/search', async (req, res) => {
  try {
    const { rollNumber } = req.query;
    if (!rollNumber) return res.status(400).json({ message: 'Roll number is required' });
    
    // Changed from strict regex match to partial match for better search results
    const student = await Student.findOne({ rollNumber: { $regex: rollNumber.trim(), $options: 'i' } });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Faculty Routes
app.get('/api/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/faculty/search', async (req, res) => {
  try {
    const { name, position } = req.query;
    let query = {};
    
    if (name) query.name = { $regex: name, $options: 'i' };
    if (position) query.position = { $regex: position, $options: 'i' };
    
    const faculty = await Faculty.find(query);
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/faculty', async (req, res) => {
  const faculty = new Faculty(req.body);
  try {
    const newFaculty = await faculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Server will be started after MongoDB connection is established