import React from 'react';

function Banner({ banner, heading, subheading, btn, paragraph, onBtnClick }) {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between'>
      
      <div className='md:w-3/5' style={{ marginTop: '100px' }}>
        <h2 className='md:text-7xl text-4xl font-bold mb-6 leading-relaxed text-white'>{heading}</h2>
        <h3 className='md:text-5xl text-3xl font-semibold mt-4 leading-relaxed text-white'>{subheading}</h3>
        <p className='mt-2 text-lg text-white'>
          {paragraph}
        </p>


        <div className='mt-6 space-y-4'>
          <button
            className='btnPrimary bg-white text-black py-2 px-4 transition-all duration-300 rounded-3xl hover:text-white hover:bg-purple-400'
            onClick={onBtnClick} // Trigger the popup on button click
          >
            {btn}
          </button>
        </div>
      </div>
      
      
      <div className='mt-15 md:mt-0 md:ml-8' style={{ marginTop: '100px' }}>
        <div 
          className='flex flex-col md:flex-row-reverse justify-between items-center gap-10 w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-black'
          style={{
            boxShadow: '0 0 15px 5px rgba(128, 0, 128, 0.5), inset 0 0 10px 5px white', 
          }}
        >
          <img src={banner} alt="Mother and child" className='w-full h-full object-cover' />
        </div>
      </div>
    </div>
  );
}

export default Banner;
