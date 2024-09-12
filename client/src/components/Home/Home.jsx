import React from 'react';
import './Home.css';
import NavBar from '../Navbar/Navbar';
import Banner from '../../shared/Banner';
import banner from '../../assets/3.png';

function Home() {
  return (
    <div>
      {/* Navbar is now fixed at the top */}
      <NavBar />

      <div className='home-container md:px-12 p-4 max-w-screen-2xl mx-auto'>
        <Banner
          banner={banner}  // Changed the prop name to 'banner' to match the usage in the Banner component
          heading="Sensory Journey"
          subheading="Turn Your Scars Into Stars!"
          paragraph="Sensory Journey is a website made to help kids with autism do sensory activities at home. It's personalized for each child and their family, focusing on what sensory activities work best for them."
          btn="See More"
        />
      </div>
    </div>
  );
}

export default Home;
