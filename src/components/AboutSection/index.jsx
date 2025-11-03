import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollFloat from '../ScrollFloat';
import './AboutSection.css';

const AboutSection = () => {
  const [activePage, setActivePage] = useState('apropos');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const textLines = [
    "Hello, moi c'est Mathilde ! Je crois que la créativité commence souvent par la curiosité.",
    "Depuis toujours, j'ai besoin de comprendre, d'explorer, de toucher à tout, que ce soit une idée, une matière ou un univers visuel. C'est ce qui me pousse à créer des projets qui ont du sens, du style, et un petit quelque chose en plus.",
    "Pour moi, le design, c'est avant tout une histoire à raconter. Chaque projet est une rencontre, un terrain de jeu où j'aime transformer une idée en une expérience visuelle qui parle d'elle-même. J'accorde autant d'importance à l'émotion qu'à l'esthétique, parce que l'un sans l'autre, c'est joli... mais pas vivant.",
    "Je mets mon énergie, mon audace et ma curiosité au service de chaque création, avec toujours la même envie : donner vie à des idées à travers des visuels qui captent l'attention et racontent quelque chose de vrai."
  ];

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Remet l'état normal après 2 secondes
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const carouselImages = [
    "/FolioSite/images/about-1.jpg",
    "/FolioSite/images/about-2.jpg", 
    "/FolioSite/images/about-3.jpg"
  ];

  useEffect(() => {
    // Carrousel automatique
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const activatePage = (page) => {
    setActivePage(page);
  };

  // Fonction pour gérer le clic sur les feuilles
  const handleFeuilleClick = (page, e) => {
    // Empêcher la fermeture si on clique sur le bouton close
    if (e.target.classList.contains('feuille-close')) {
      return;
    }
    // Si la feuille n'est pas active, l'activer
    if (activePage !== page) {
      activatePage(page);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <ScrollFloat>À Propos</ScrollFloat>
        
        <div className="feuilles-container">
          {/* Dot Menu */}
          <div className="dot-menu">
            <div 
              className={`dot ${activePage === 'apropos' ? 'active' : ''}`} 
              data-title="À Propos"
              onClick={() => activatePage('apropos')}
            ></div>
            <div 
              className={`dot ${activePage === 'cv' ? 'active' : ''}`} 
              data-title="Mon CV"
              onClick={() => activatePage('cv')}
            ></div>
            <div 
              className={`dot ${activePage === 'lettre' ? 'active' : ''}`} 
              data-title="Vidéo de présentation"
              onClick={() => activatePage('lettre')}
            ></div>
          </div>
          
         {/* Feuille 1 - À propos */}
<div 
  className={`feuille feuille-1 ${activePage === 'apropos' ? 'active' : 'inactive'}`}
  onClick={(e) => handleFeuilleClick('apropos', e)}
>
  <div className="feuille-header">
    <h2 className="feuille-title">A propos de moi</h2>
  </div>

  {/* Nouveau conteneur horizontal */}
  <div className="feuille-content">
    {/* Bloc texte à gauche */}
    <div className="texte-contenu">
      {textLines.map((line, index) => (
        <div key={index} className="typing-line">
          {line}
        </div>
      ))}
    </div>

    {/* Carrousel à droite */}
    <div className="carousel-container">
      <div className="carousel-slides">
        {carouselImages.map((image, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${currentSlide === index ? 'active' : ''}`}
          >
            <img src={image} alt={`Projet ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

          
          {/* Feuille 2 - CV EN IMAGE */}
          <div 
            className={`feuille feuille-2 ${activePage === 'cv' ? 'active' : 'inactive'}`}
            onClick={(e) => handleFeuilleClick('cv', e)}
          >
            <div className="feuille-header">
              <h2 className="feuille-title">Mon curriculum vitae</h2>
              <button className="feuille-close" onClick={() => activatePage('apropos')}>×</button>
            </div>
            <div className="cv-image-container">
              <div className="cv-image-wrapper">
                <img 
                  src="/FolioSite/images/moncv.jpg" 
                  alt="Mon Curriculum Vitae"
                  className="cv-image"
                />
                <div className="cv-actions">
                  <a 
    href="/FolioSite/images/moncv.jpg" 
    download 
    className={`download-btn ${isDownloading ? 'downloading' : ''}`}
    title="Télécharger le CV"
    onClick={handleDownload}
  >
    <img 
      src={isDownloading ? "/images/download-success.png" : "/images/download.png"}
      alt="Télécharger" 
      className="download-icon"
    />
  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feuille 3 - Lettre de motivation */}
          <div 
            className={`feuille feuille-3 ${activePage === 'lettre' ? 'active' : 'inactive'}`}
            onClick={(e) => handleFeuilleClick('lettre', e)}
          >
            <div className="feuille-header">
              <h2 className="feuille-title">Et si on faisait connaissance</h2>
              <button className="feuille-close" onClick={() => activatePage('apropos')}>×</button>
            </div>
            <div className="video-container">
              <video 
                controls 
                width="100%"
                poster="/FolioSite/images/video-preview.jpg"
              >
                <source src="/FolioSite/videos/motivation.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;