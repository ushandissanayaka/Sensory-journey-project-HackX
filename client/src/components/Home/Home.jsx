import React from 'react';
import mother from '../../assets/3.png';
import './Home.css'; 
import NavBar from '../Navbar/Navbar'; 

function Home() {
  return (
    <div>
      <NavBar /> 
      
      <div className='home-container md:px-12 p-4 max-w-screen-2xl mx-auto mt-28'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          
          {/* Banner content */}
          <div className='md:w-3/5'>
            <h2 className='text-7xl font-bold'>SENSORY JOURNEY</h2>
            <h3 className='text-4xl font-semibold mt-4'>Turn Your Scars Into Stars!</h3>
            <p className='mt-2'>
              Sensory Journey is a website made to help kids with autism do sensory activities at home.
              It's personalized for each child and their family, focusing on what sensory activities work best for them.
            </p>
            <div className='mt-6'>
              <button className='bg-black text-white rounded-full px-6 py-2'>
                See More
              </button>
            </div>
          </div>
          
          {/* Banner image with margin-top: 12px */}
          <div className='mt-15 md:mt-0 md:ml-8' style={{ marginTop: '100px' }}> 
            <div 
              className='w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-black'
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
