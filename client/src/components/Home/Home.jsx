import React from 'react';
import mother from '../../assets/3.png';
import './Home.css';
import NavBar from '../Navbar/Navbar';


function Home() {
  return (
    <div>
      {/* Navbar is now fixed at the top */}
      <NavBar />

      <div className='home-container md:px-12 p-4 max-w-screen-2xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          
          {/* Banner content */}
          <div className='md:w-3/5 ' style={{ marginTop: '100px' }}>
            <h2 className='md:text-7xl text-4xl font-bold mb-6 leanding-rela text-white'>SENSORY JOURNEY</h2>
            <h3 className='text-5xl font-semibold mt-4 text-white'>Turn Your Scars Into Stars!</h3>
            <p className='mt-2 text-1xl text-white'>
              Sensory Journey is a website made to help kids with autism do sensory activities at home.
              It's personalized for each child and their family, focusing on what sensory activities work best for them.
            </p>
            <div className='mt-6 space-y-20 '>
              <button className='btnPrimary bg-white text-black py-2 px-4 transition-all duration-300 rounded-3xl hover:text-white hover:bg-purple-400'>
                See More
              </button>
            </div>
          </div>
          
          {/* Banner image */}
          <div className='mt-15 md:mt-0 md:ml-8' style={{ marginTop: '100px' }}>
            <div 
              className='flex flex-col md:flex-row-reverse justify-between items-center gap-10 w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-black'
              style={{
                boxShadow: '0 0 15px 5px rgba(128, 0, 128, 0.5), inset 0 0 10px 5px white', 
              }}
            >
              <img src={mother} alt="Mother and child" className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
