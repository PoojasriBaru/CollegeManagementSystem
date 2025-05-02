import React from 'react';

const AboutPage = ({ title, description }) => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-primary">{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default AboutPage;