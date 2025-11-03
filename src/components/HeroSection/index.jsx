import React from 'react';
import TextPressure from '../TextPressure';
import TextType from '../TextType';
import KeychainHero from '../KeychainHero';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="home" className="section home-section">
      <div className="container">
        {/* Container agrandi pour TextPressure */}
        <div style={{ 
          position: 'relative', 
          height: '50vh',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%'
        }}>
          <TextPressure
            text="Mathilde Biscaro"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={48}
          />
        </div>
        
        {/* Porte-clés */}
        <KeychainHero />
        
        <div className="subtitle">
          <TextType 
            text={["Développeuse & Webdesigner", "Créative Polyvalente", "Bienvenue sur mon portfolio","Faire que chaque idée compte","Création d'univers uniques"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            textColors={['#ffffff', '#ffffffff', '#ffffffff', '#ffffffff', '#ffffffff']}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;