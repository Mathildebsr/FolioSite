import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from '../ScrollFloat';
import './ProjectsSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection = () => {
  const whiteRectRef = useRef(null);
  const pinkRectRef = useRef(null);
  const blueRectRef = useRef(null);
  const orangeRectRef = useRef(null);
  const purpleRectRef = useRef(null);
  const transparentRectRef = useRef(null);
  const transparentRectRef2 = useRef(null);
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState(null);

  // Données des projets
  const projects = [
    {
      id: 'white',
      number: '00',
      title: '',
      color: 'white',
      image: '/images/accueilis.jpg',
      ref: whiteRectRef
    },
    {
      id: 'pink', 
      number: '01',
      title: '3D DESIGN',
      color: 'pink',
      image: '/images/projets.jpg',
      ref: pinkRectRef,
      initialY: '160vh'
    },
    {
      id: 'blue',
      number: '02',
      title: 'TOXIQUE',
      color: 'blue', 
      image: '/images/competences.jpg',
      ref: blueRectRef,
      initialY: '230vh'
    },
    {
      id: 'orange',
      number: '03',
      title: 'RIBAMBELLE',
      color: 'orange',
      image: '/images/about.jpg',
      ref: orangeRectRef, 
      initialY: '300vh'
    },
    {
      id: 'purple',
      number: '04',
      title: 'BROWSOW',
      color: 'purple',
      image: '/images/accueil.jpg',
      ref: purpleRectRef,
      initialY: '370vh'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Réinitialiser les positions
    gsap.set([pinkRectRef.current, blueRectRef.current, orangeRectRef.current, purpleRectRef.current, transparentRectRef.current], {
      y: (i) => [160, 230, 300, 370, 400, 430][i] + "vh"
    });

    // Animation au scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top", 
        scrub: 1.5,
        markers: false
      }
    });

    tl.to(pinkRectRef.current, { y: 0, duration: 0.2 }, 0)
      .to(blueRectRef.current, { y: 0, duration: 0.4 }, 0.15)
      .to(orangeRectRef.current, { y: 0, duration: 0.4 }, 0.3)  
      .to(purpleRectRef.current, { y: 0, duration: 0.4 }, 0.45)
      .to(transparentRectRef.current, { y: 0, duration: 0.4 }, 0.6)
      .to(transparentRectRef2.current, { y: 0, duration: 0.4 }, 0.75);

  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="container">
        <ScrollFloat>Mes Projets</ScrollFloat>
        
        <div className="animation-container">
          {/* Rectangles des projets */}
          {projects.map((project) => (
            <div
              key={project.id}
              ref={project.ref}
              className={`project-rectangle ${project.color}`}
              style={{
                backgroundImage: `url(${project.image})`
              }}
              onClick={() => handleProjectClick(project)}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* NUMÉRO EN HAUT À GAUCHE */}
              <div className="project-number">{project.number}</div>
              
              {/* TITRE À GAUCHE ROTATION -90° */}
              <div className={`project-title-side project-title-${project.id}`}>{project.title}</div>
              
              {/* TITRE CENTRAL EXISTANT (gardé pour compatibilité) */}
              <h3 className="project-title">{project.title}</h3>
            </div>
            
          ))}
          
          
          {/* Rectangles transparents pour l'animation */}
          <div className="project-rectangle transparent" ref={transparentRectRef}></div>
          <div className="project-rectangle transparent" ref={transparentRectRef2}></div>
        </div>

          {showTooltip && (
    <div 
      className="cursor-tooltip"
      style={{
        position: 'fixed',
        left: mousePosition.x + 10,
        top: mousePosition.y + 10,
      }}
    >
      Cliquez pour découvrir le projet !
    </div>
  )}


        {/* Modal */}
        <div className={`project-modal-overlay ${selectedProject ? 'active' : ''}`}>
  <div className="project-modal">
    <button className="modal-close" onClick={handleCloseModal}>×</button>
    <div className="modal-content">
      {selectedProject && (
        <div className="modal-content-wrapper">
          {/* Header fixe */}
          <div className="modal-header">
            <h2>{selectedProject.title}</h2>
          </div>
          
          {/* Image Figma avec tout le contenu */}
          <img 
            src={`/images/content-${selectedProject.id}.png`} 
            alt={`Projet ${selectedProject.title}`}
            className="modal-image"
          />
        </div>
      )}
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default ProjectsSection;