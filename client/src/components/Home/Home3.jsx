import React, { useEffect, useRef, useState } from 'react';
import './Home3.css';
import img1 from '../../assets/home1.jpg';
import img2 from '../../assets/home2.jpg';
import img3 from '../../assets/home3.jpg';
import img4 from '../../assets/home4.jpg';
import img5 from '../../assets/home5.jpg';
import img6 from '../../assets/home6.jpg';
import img7 from '../../assets/home7.jpg';

function Home3() {
  const [visibleCards, setVisibleCards] = useState([...Array(7).keys()].map(i => i + 1)); // Initially all cards visible
  const [initialLoad, setInitialLoad] = useState(true); // Track the first load
  const cardsRef = useRef([]);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisibleCards([...Array(7).keys()].map(i => i + 1)); // Show all cards

      // After 3 seconds of being visible, hide all cards
      setTimeout(() => {
        setVisibleCards([]); // Hide all cards
      }, 5000); // Hide cards after 3 seconds
    };

    // First, run the toggleVisibility function after 5 seconds
    const firstTimeout = setTimeout(() => {
      setInitialLoad(false); // After 5 seconds, remove the first-time load class
      toggleVisibility(); // Start hiding and showing cards
    }, 1000);

    // Set an interval to run the toggleVisibility every 5 seconds
    const interval = setInterval(() => {
      toggleVisibility();
    },  10000); // Total interval time: 5 seconds before showing, + 3 seconds display time

    return () => {
      clearTimeout(firstTimeout); // Cleanup the first timeout
      clearInterval(interval); // Cleanup the interval on unmount
    };
  }, []);

  return (
    <div className="home-container">
      <div className="left-header">Dont't Be sad ....</div>
      <div className="right-header">You are in contact with the best solution !</div>
      <div className="circular-grid">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`card card-${index + 1} ${visibleCards.includes(index + 1) ? 'visible' : 'invisible'} ${initialLoad ? 'first-time' : ''}`}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <img
              src={index === 0 ? img1 :
                   index === 1 ? img2 :
                   index === 2 ? img3 :
                   index === 3 ? img4 :
                   index === 4 ? img5 :
                   index === 5 ? img6 :
                   img7}
              alt={`Card ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home3;
