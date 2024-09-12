import React, { useEffect, useRef, useState } from 'react';
import children from '../../assets/4.jpeg';
import '../Home2/home2.css';

function Home2() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='home2-container md:px-12 p-4 max-w-screen-2xl mx-auto'
    >
      <div
        className={`flex items-center justify-between w-full h-96 ${isInView ? 'in-view' : ''}`}
        style={{ marginTop: '100px' }}
      >
        {/* Left side: Image */}
        <div className='flex-1 animate-move-left'>
          <img src={children} alt='children' className='w-full h-full object-cover' />
        </div>

        {/* Vertical Divider */}
        <div className='w-1 h-full bg-white mx-4 rounded-full'></div>

        {/* Right side: Text */}
        <div className='flex-1 flex justify-center items-center animate-move-right'>
          <h1 className='text-center text-3xl font-bold text-white md:text-5xl'>
            Together, Transforming Your Child’s World
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home2;
