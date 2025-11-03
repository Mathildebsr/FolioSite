import React, { useState } from 'react';
import './FlipCard.css';

const FlipCard = ({ frontContent, backContent, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`flip-card ${className} ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        {/* Face avant */}
        <div className="flip-card-front">
          {frontContent}
        </div>
        
        {/* Face arrière */}
        <div className="flip-card-back">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;