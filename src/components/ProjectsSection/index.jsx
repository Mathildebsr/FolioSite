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
  const modalContentRef = useRef(null);
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
      image: '/FolioSite/images/accueilis.jpg',
      ref: whiteRectRef
    },
    {
      id: 'pink', 
      number: '01',
      title: '3D DESIGN',
      color: 'pink',
      image: '/FolioSite/images/projets.jpg',
      ref: pinkRectRef,
      initialY: '160vh',
      videoZones: [
        {
          id: 'video1',
          top: '13%',
          left: '15%',
          width: '82%',
          height: '14%',
          videoUrl: '/FolioSite/videos/memphis.MP4', // Remplace par ton URL de vidéo
          label: 'Vidéo design 1'
        },
        {
          id: 'video2',
          top: '70%',
          left: '7.5%',
          width: '85%',
          height: '15%',
          videoUrl: '/FolioSite/videos/mariage.MOV', // Remplace par ton URL de vidéo
          label: 'Vidéo design 2'
        }  
      ]
    },
    {
      id: 'blue',
      number: '02',
      title: 'TOXIQUE',
      color: 'blue', 
      image: '/FolioSite/images/competences.jpg',
      ref: blueRectRef,
      initialY: '230vh',
      // LIENS avec leurs propres positions
      interactiveLinks: [
        {
          id: 'link1',
          cssClass: 'link-site',
          top: '15%',  // Position indépendante pour le lien 1
          left: '25%', 
          width: '20%',
          height: '8%',
          href: 'http://mathildebiscaro.com/TOXIQUE/',
          label: 'Visiter le site !'
        },
        {
          id: 'link2',
          cssClass: 'link-video', 
          top: '40%',  // Position indépendante pour le lien 2
          left: '60%',
          width: '15%',
          height: '6%',
          href: 'https://www.youtube.com/watch?v=ApUtg1XTCmk',
          label: 'Regarder la vidéo !'
        }
      ],
      // VIDÉO avec ses propres positions
      videoZone: {
        id: 'videoZone',
        top: '55%',   // Position indépendante pour la vidéo
        left: '20%',
        width: '30%',
        height: '25%',
        videoUrl: '/FolioSite/videos/demo.MOV',
        label: 'Vidéo démo'
      }
    },
    {
      id: 'orange',
      number: '03',
      title: 'RIBAMBELLE',
      color: 'orange',
      image: '/FolioSite/images/about.jpg',
      ref: orangeRectRef, 
      initialY: '300vh'
    },
    {
      id: 'purple',
      number: '04',
      title: 'BROWSOW',
      color: 'purple',
      image: '/FolioSite/images/accueil.jpg',
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
        <div className="section-header">
        <ScrollFloat>Mes Projets</ScrollFloat>
        <div className="subtitle">Cliquez sur un projet pour le découvir !</div> 
       </div>
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
            <div 
              className="modal-content"
              ref={modalContentRef}
            >
              {selectedProject && (
                <div className="modal-content-wrapper">
                  {/* Header fixe */}
                  <div className="modal-header">
                    <h2>{selectedProject.title}</h2>
                  </div>
                  
                  {/* Container pour l'image et les éléments superposés */}
                  <div className="modal-image-container">
                    <img 
                      src={`/FolioSite/images/content-${selectedProject.id}.png`} 
                      alt={`Projet ${selectedProject.title}`}
                      className="modal-image"
                    />
                    
                    {/* LIENS INVISIBLES - positions indépendantes */}
                    {selectedProject.id === 'blue' && selectedProject.interactiveLinks && (
                      <div className="interactive-links-container">
                        {selectedProject.interactiveLinks.map((link) => (
                          <a
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`interactive-link ${link.cssClass}`}
                            title={link.label}
                          >
                            {/* Zone invisible cliquable */}
                          </a>
                        ))}
                      </div>
                    )}
                    
                    {/* VIDÉO POUR BLUE RECTANGLE */}
                    {selectedProject.id === 'blue' && selectedProject.videoZone && (
                      <div
                        className="video-zone-container"
                      >
                        <video
                          controls
                          className="modal-video"
                        >
                          <source src={selectedProject.videoZone.videoUrl} type="video/mp4" />
                          Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                      </div>
                    )}
                    
                    {/* AJOUT: 2 VIDÉOS POUR PINK RECTANGLE */}
                    {selectedProject.id === 'pink' && selectedProject.videoZones && (
                      <div className="video-zones-container">
                        {selectedProject.videoZones.map((videoZone, index) => (
                          <div
                            key={videoZone.id}
                            className="video-zone-container"
                            style={{
                              top: videoZone.top,
                              left: videoZone.left,
                              width: videoZone.width,
                              height: videoZone.height
                            }}
                          >
                            <video
                              controls
                              className="modal-video"
                              title={videoZone.label}
                            >
                              <source src={videoZone.videoUrl} type="video/mp4" />
                              Votre navigateur ne supporte pas la lecture de vidéos.
                            </video>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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