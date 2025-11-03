import React, { useState, useEffect } from 'react';
import './KeychainHero.css';

// Composant DecryptedText intégré directement
const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  encryptedClassName = ''
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const availableChars = characters.split('');

    const shuffleText = (originalText) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentIteration >= maxIterations) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    };

    if (hasStarted) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setDisplayText(shuffleText(text));
        currentIteration++;
        
        if (currentIteration >= maxIterations) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      }, speed);
    } else {
      setDisplayText(text);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasStarted, text, speed, maxIterations, characters]);

  // Démarrer l'animation immédiatement
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={isScrambling ? encryptedClassName : className}>
      {displayText}
    </span>
  );
};

const KeychainHero = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  const keychains = [
    { id: 1, image: '/FolioSite/images/plasticcycles.png', name: 'Plastic Cycles', section: '#home', label: 'Accueil' },
    { id: 2, image: '/FolioSite/images/pearlcycles.png', name: 'Pearl Cycles', section: '#about', label: 'À propos' },
    { id: 3, image: '/FolioSite/images/keycycles.png', name: 'Key Cycles', section: '#projects', label: 'Projets' },
    { id: 4, image: '/FolioSite/images/skillscycles.png', name: 'Skills Cycles', section: '#skills', label: 'Compétences' },
    { id: 5, image: '/FolioSite/images/8ballscycles.png', name: '8 Balls Cycles', section: '#contact', label: 'Contact' }
  ];

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Positions par défaut (état normal)
  const defaultPositions = [
    { x: -125, y: 157, rotate: 27, zIndex: 5, scale: 1 },
    { x: -55, y: 175, rotate: 10, zIndex: 4, scale: 1 },
    { x: -10, y: 170, rotate: 0, zIndex: 3, scale: 1 },
    { x: 70, y: 150, rotate: -15, zIndex: 2, scale: 1 },
    { x: 110, y: 110, rotate: -22, zIndex: 1, scale: 1 }
  ];

  // Variants de hover
  const hoverVariants = {
    0: [ // Hover sur index 0 - Accueil
    { x: -125, y: 157, rotate: 27, zIndex: 5, scale: 1 },
    { x: -5, y: 165, rotate: -5, zIndex: 4, scale: 1 },
    { x: 40, y: 150, rotate: -15, zIndex: 3, scale: 1 },
    { x: 100, y: 130, rotate: -25, zIndex: 2, scale: 1 },
    { x: 140, y: 85, rotate: -35, zIndex: 1, scale: 1 }
    ],
    1: [ // Hover sur index 1 - About
    { x: -180, y: 145, rotate: 45, zIndex: 5, scale: 1 },
    { x: -55, y: 175, rotate: 10, zIndex: 4, scale: 1 },
    { x: 50, y: 150, rotate: -15, zIndex: 3, scale: 1 },
    { x: 110, y: 120, rotate: -27, zIndex: 2, scale: 1 },
    { x: 150, y: 70, rotate: -40, zIndex: 1, scale: 1 }
    ],
    2: [ // Hover sur index 2 - Projets
    { x: -205, y: 130, rotate: 55, zIndex: 5, scale: 1 },
    { x: -155, y: 165, rotate: 40, zIndex: 4, scale: 1 },
    { x: -10, y: 170, rotate: 0, zIndex: 3, scale: 1 },
    { x: 105, y:120, rotate: -25, zIndex: 2, scale: 1 },
    { x: 150, y: 70, rotate: -40, zIndex: 1, scale: 1 }
    ],
    3: [ // Hover sur index 3 - Skills
    { x: -205, y: 130, rotate: 55, zIndex: 5, scale: 1 },
    { x: -145, y: 170, rotate: 35, zIndex: 4, scale: 1 },
    { x: -85, y: 175, rotate: 20, zIndex: 3, scale: 1 },
    { x: 70, y: 150, rotate: -15, zIndex: 2, scale: 1 },
    { x: 150, y: 65, rotate: -42, zIndex: 1, scale: 1 }
    ],
    4: [ // Hover sur index 4 - Contact
    { x: -205, y: 130, rotate: 55, zIndex: 5, scale: 1 },
    { x: -145, y: 170, rotate: 35, zIndex: 4, scale: 1 },
    { x: -85, y: 175, rotate: 20, zIndex: 3, scale: 1 },
    { x: 15, y: 175, rotate: 0, zIndex: 2, scale: 1 },
    { x: 110, y: 110, rotate: -22, zIndex: 1, scale: 1 }
    ]
  };

  const getKeychainStyle = (index) => {
    const baseStyle = {
      position: 'absolute',
      transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transformOrigin: 'center center',
      top: '50%',
      left: '50%',
      width: '120px', // Zone cliquable réduite
      height: '120px',
      cursor: isMobile ? 'default' : 'pointer'
    };

    let positions;
    
    if (isMobile || hoveredIndex === null) {
      positions = defaultPositions[index];
    } else {
      positions = hoverVariants[hoveredIndex][index];
    }

    return {
      ...baseStyle,
      transform: `translate(${positions.x}px, ${positions.y}px) rotate(${positions.rotate}deg) scale(${positions.scale})`,
      zIndex: positions.zIndex
    };
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      setHoveredIndex(index);
      setTooltipText(keychains[index].label);
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredIndex(null);
      setShowTooltip(false);
    }
  };

  // FONCTION DE SCROLL SMOOTH AJOUTÉE
  const handleClick = (section) => {
    if (!isMobile) {
      const element = document.querySelector(section);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        console.log('Section non trouvée:', section);
      }
    }
  };

  return (
    <div className="keychain-container">
      {/* Anneau fixe */}
      <div className="ring">
        <img src="/FolioSite/images/anneau.png" alt="Anneau" />
      </div>

      {/* Porte-clés */}
      <div className="keychains-wrapper">
        {keychains.map((keychain, index) => (
          <div
            key={keychain.id}
            className="keychain"
            style={getKeychainStyle(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={() => handleClick(keychain.section)}
          >
            <img 
              src={keychain.image} 
              alt={`Porte-clé ${keychain.name}`}
              className="keychain-image"
            />
          </div>
        ))}
      </div>

      {/* Tooltip qui suit le curseur avec effet de décryptage */}
      {showTooltip && !isMobile && (
        <div 
          className="cursor-tooltip"
          style={{
            position: 'fixed',
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        >
          <DecryptedText 
            text={tooltipText}
            speed={30}
            maxIterations={15}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÉÈÊËÎÏÔÙÛÇabcdefghijklmnopqrstuvwxyz"
            className="tooltip-text-revealed"
            encryptedClassName="tooltip-text-encrypted"
          />
        </div>
      )}
    </div>
  );
};

export default KeychainHero;