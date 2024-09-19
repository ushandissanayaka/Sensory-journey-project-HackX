import React from 'react';
import Layout from '../components/Layout';
import bgImage from '../assets/background.jpg'; // Ensure this path is correct
import './PublicDashboard.css'
const PublicDashboard = () => {
  return (
    <Layout>
      <div
        className="relative flex flex-col items-center justify-center h-[calc(88vh)] bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }} // Corrected the URL syntax
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <h1 className="relative text-4xl md:text-6xl font-bold text-center mb-6 typing-effect">
          Welcome to Sensory Journey!
        </h1>
      </div>
    </Layout>
  );
};

export default PublicDashboard;
