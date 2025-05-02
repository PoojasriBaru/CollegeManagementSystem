import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import StudentSection from './pages/StudentSection.jsx';
import StudentSearchPage from './pages/StudentSearchPage.jsx';
import FacultySection from './pages/FacultySection.jsx';
import FacultySearchPage from './pages/FacultySearchPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import FeeSection from './pages/FeeSection.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/students" element={<StudentSection />} />
        <Route path="/student-search" element={<StudentSearchPage />} />
        <Route path="/faculty" element={<FacultySection />} />
        <Route path="/faculty-search" element={<FacultySearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/fees" element={<FeeSection />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </Router>
  );
}

export default App;