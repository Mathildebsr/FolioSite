import React from 'react';
import './SocialLinks.css';

const SocialLinks = () => {
  const socialNetworks = [
    {
      name: 'LinkedIn',
      url: '#', // Remplacez par votre lien
      icon: '🔗',
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      url: '#', // Remplacez par votre lien
      icon: '💻',
      color: '#333'
    },
    {
      name: 'Instagram',
      url: '#', // Remplacez par votre lien
      icon: '📸',
      color: '#e4405f'
    },
    {
      name: 'Behance',
      url: '#', // Remplacez par votre lien
      icon: '🎨',
      color: '#1769ff'
    }
  ];

  return (
    <div className="social-links-back">
      <h3 className="social-title">Mes Réseaux</h3>
      
      <div className="social-grid">
        {socialNetworks.map((social, index) => (
          <a
            key={social.name}
            href={social.url}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--social-color': social.color }}
            onClick={(e) => e.stopPropagation()} // Empêche le flip au clic sur le lien
          >
            <span className="social-icon">{social.icon}</span>
            <span className="social-name">{social.name}</span>
          </a>
        ))}
      </div>
      
      <div className="flip-hint-back">
        <span>👆 Cliquez pour revenir</span>
      </div>
    </div>
  );
};

export default SocialLinks;