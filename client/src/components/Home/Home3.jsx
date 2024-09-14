import React, { useRef, useState, useEffect } from 'react';
import './Home3.css';

function Home3() {
  const cardContainerRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedParagraph, setSelectedParagraph] = useState(''); // New state for storing paragraph content

  const scrollLeft = () => {
    const container = cardContainerRef.current;
    const cardWidth = container.querySelector('.card').offsetWidth + 20; // Card width + gap (20px)
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = cardContainerRef.current;
    const cardWidth = container.querySelector('.card').offsetWidth + 20; // Card width + gap (20px)
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const openPopup = (cardIndex, paragraph) => {
    setSelectedCard(cardIndex);
    setSelectedParagraph(paragraph);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Pause the animation when popup is open
  useEffect(() => {
    const container = cardContainerRef.current;
    if (isPopupOpen) {
      container.style.animationPlayState = 'paused';
    } else {
      container.style.animationPlayState = 'running';
    }
  }, [isPopupOpen]);

  return (
    <div className="home-container">
      {/* Header */}
      <h1 className="header">Users Feedbacks</h1>

      <div className="carousel">
        <div className="card-container" ref={cardContainerRef}>
          {[...Array(10)].map((_, index) => {
            const paragraph = `This is a detailed description for card ${index + 1}. It includes multiple sentences that provide more information about the card. 
            This is a sample of a longer text that will be shown in the popup.`;
            return (
              <div
                key={index}
                className="card"
                onClick={() => openPopup(index + 1, paragraph)}
              >
                <img
                  src={`https://via.placeholder.com/400x200?text=Image+${index + 1}`}
                  alt={`Card ${index + 1}`}
                />
                <h2>Card {index + 1}</h2>
                <p>{paragraph.split('. ')[0] + '.'}</p> {/* Show only the first sentence */}
                <button>See More...</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Card {selectedCard}</h2>
            <p>{selectedParagraph}</p> {/* Show the full paragraph */}
            <button className="close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home3;
