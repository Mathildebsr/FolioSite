import React from 'react';
import Folder from '../Folder';
import ScrollFloat from '../ScrollFloat';
import './FolderSection.css';

const FolderSection = () => {
  const handleFolderClick = (projectName) => {
    // Pour les projets "en travaux"
    if (projectName === "What's in my bag" || 
        projectName === "Visit my room" || 
        projectName === "The lost laptop") {
      window.location.href = '/404.html';
      return;
    }
    
    // // Pour "The lost laptop" ou autres projets futurs
    // if (projectName === "The lost laptop") {
    //   // Comportement par défaut (ou autre action)
    //   console.log("Projet:", projectName);
    // }
  };

  return (
    <section id="folder" className="section folder-section">
      <div className="container">
        <ScrollFloat>Explorez !</ScrollFloat>
        <div className="folder-content">
          <Folder 
            color="#3b82f6" 
            size={1.5} 
            items={[
              <div 
                key="1" 
                className="folder-item" 
                onClick={() => handleFolderClick("What's in my bag")}
              >
                What's in my bag
              </div>,
              <div 
                key="2" 
                className="folder-item" 
                onClick={() => handleFolderClick("Visit my room")}
              >
                Visit my room
              </div>,
              <div 
                key="3" 
                className="folder-item" 
                onClick={() => handleFolderClick("The lost laptop")}
              >
                The lost laptop
              </div>
            ]} 
          />
        </div>
      </div>
    </section>
  );
};

export default FolderSection;