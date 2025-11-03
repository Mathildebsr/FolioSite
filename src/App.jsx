import React from 'react';
import BubbleMenu from './components/BubbleMenu';
import TextPressure from './components/TextPressure';
import TextType from './components/TextType';
import Aurora from './components/Aurora';
import ScrollFloat from './components/ScrollFloat';

// Nouvelles sections
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FolderSection from './components/FolderSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';

import './index.css';

const App = () => {
  const menuItems = [
    {
      label: 'accueil',
      href: '#home',
      ariaLabel: 'Home',
      rotation: -8,
      hoverStyles: { bgColor: '#e29afcff', textColor: '#ffffff' }
    },
    {
      label: 'à propos',
      href: '#about',
      ariaLabel: 'About',
      rotation: 8,
      hoverStyles: { bgColor: '#fdf451ff', textColor: '#ffffff' }
    },
    {
      label: 'projets',
      href: '#projects',
      ariaLabel: 'Projects',
      rotation: 8,
      hoverStyles: { bgColor: '#ffa408ff', textColor: '#ffffff' }
    },
    {
      label: 'compétences',
      href: '#skills',
      ariaLabel: 'Skills',
      rotation: -8,
      hoverStyles: { bgColor: '#f65cd2ff', textColor: '#ffffff' }
    },
    {
      label: 'contact',
      href: '#contact',
      ariaLabel: 'Contact',
      rotation: 8,
      hoverStyles: { bgColor: '#f56a6aff', textColor: '#ffffff' }
    }
  ];

  return (
    <div className="portfolio">
      {/* Aurora Background */}
      <div className="aurora-background">
        <Aurora
          colorStops={["#ffe227", "#fa67ff", "#ff8127"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Navigation */}
      <BubbleMenu
        logo={<span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#000000ff' }}>PORTFOLIO</span>}
        items={menuItems}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />

      {/* Home Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Folder Section */}
      <FolderSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default App;