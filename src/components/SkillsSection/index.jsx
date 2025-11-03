import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import StickerPeel from '../StickerPeel';
import ScrollFloat from '../ScrollFloat';
import './SkillsSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

// Composant parent draggable avec sticker + tooltip
const StickerWithTooltip = ({ skill, initialX, initialY, isMobile }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef(null);
  const draggableInstance = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Position initiale
    gsap.set(container, { 
      x: initialX, 
      y: initialY 
    });

    // DRAG sur MOBILE ET DESKTOP
    draggableInstance.current = Draggable.create(container, {
      type: 'x,y',
      bounds: '#skills',
      inertia: true,
      onDrag() {
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);
        gsap.to(container, { rotation: rot, duration: 0.15, ease: 'power1.out' });
      },
      onDragEnd() {
        gsap.to(container, { rotation: 0, duration: 0.8, ease: 'power2.out' });
      }
    })[0];

    return () => {
      if (draggableInstance.current) {
        draggableInstance.current.kill();
      }
    };
  }, [initialX, initialY, isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile) setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setShowTooltip(false);
  };

  const handleClick = () => {
    if (isMobile) {
      setShowTooltip(!showTooltip);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="sticker-with-tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="sticker-wrapper">
        <StickerPeel
          imageSrc={skill.image}
          width={isMobile ? 70 : 110} // Plus petit sur mobile
          rotate={Math.random() * 8 - 4}
          peelBackHoverPct={25}
          peelBackActivePct={35}
          shadowIntensity={0.7}
          lightingIntensity={0.15}
          initialPosition="center"
        />
      </div>

      {showTooltip && (
        <div className="frozen-tooltip">
          <div className="tooltip-content">
            {skill.name}
          </div>
        </div>
      )}
    </div>
  );
};

const SkillsSection = () => {
  const skillsContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const skills = [
    { name: 'Figma', image: '/images/figma.png' },
    { name: 'JavaScript', image: '/images/javascript.png' },
    { name: 'Lightroom', image: '/images/lightroom.png' },
    { name: 'CSS', image: '/images/css.png' },
    { name: 'React', image: '/images/react.png' },
    { name: 'Framer', image: '/images/framer.png' },
    { name: 'HTML', image: '/images/html.png' },
    { name: 'After Effect', image: '/images/after.png' },
    { name: 'Premiere Pro', image: '/images/premiere.png' },
    { name: 'Photoshop', image: '/images/photoshop.png' },
    { name: 'Illustrator', image: '/images/illustrator.png' },
    { name: 'InDesign', image: '/images/indesign.png' },
    { name: 'Blender', image: '/images/blender.png' },
  ];

  // Détection responsive
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Positioning pour 13 skills - STRUCTURE 4/5/4
  const getInitialPosition = (index) => {
    if (isMobile) {
      return getMobilePosition(index);
    } else {
      return getDesktopPosition(index);
    }
  };

  const getDesktopPosition = (index) => {
    const horizontalSpacing = 220;
    const verticalSpacing = 180;

    if (index < 4) {
      // Ligne 1 (haut) - 4 éléments
      return {
        x: (index * horizontalSpacing) - 330,
        y: -250
      };
    } else if (index < 9) {
      // Ligne 2 (milieu) - 5 éléments
      return {
        x: ((index - 4) * horizontalSpacing) - 440,
        y: -50
      };
    } else {
      // Ligne 3 (bas) - 4 éléments
      return {
        x: ((index - 9) * horizontalSpacing) - 330,
        y: 150
      };
    }
  };

  const getMobilePosition = (index) => {
    // VERSION MOBILE COMPACTE - même structure 4/5/4
    const horizontalSpacing = 90;  // Réduit de 220 à 90
    const verticalSpacing = 100;   // Réduit de 180 à 100

    if (index < 4) {
      // Ligne 1 (haut) - 4 éléments
      return {
        x: (index * horizontalSpacing) - 135, // Recentré pour 4 éléments
        y: -150 // Plus haut
      };
    } else if (index < 9) {
      // Ligne 2 (milieu) - 5 éléments
      return {
        x: ((index - 4) * horizontalSpacing) - 180, // Recentré pour 5 éléments
        y: -30 // Milieu
      };
    } else {
      // Ligne 3 (bas) - 4 éléments
      return {
        x: ((index - 9) * horizontalSpacing) - 135, // Recentré pour 4 éléments
        y: 90 // Plus bas
      };
    }
  };

  useEffect(() => {
    

    // Animation d'entrée des stickers
    const stickers = document.querySelectorAll('.sticker-with-tooltip');
    
    gsap.fromTo(stickers, 
      {
        scale: 0,
        rotation: () => gsap.utils.random(-180, 180),
        opacity: 0,
      },
      {
        scale: isMobile ? 0.9 : 1, // Légèrement plus petit sur mobile
        rotation: 0,
        opacity: 1,
        duration: 1,
        stagger: {
          each: 0.1,
          from: "random"
        },
        ease: "back.out(1.7)",
        delay: 0.3
      }
    );
  }, [isMobile]);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div style={{ marginBottom: isMobile ? '30px' : '100px' }}>
          <ScrollFloat>Compétences</ScrollFloat>
        </div>
        
        <div className="skills-content" ref={skillsContainerRef}>
          {skills.map((skill, index) => {
            const position = getInitialPosition(index);
            return (
              <StickerWithTooltip
                key={skill.name}
                skill={skill}
                initialX={position.x}
                initialY={position.y}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;