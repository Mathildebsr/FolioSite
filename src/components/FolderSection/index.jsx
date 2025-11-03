import React from 'react';
import { useNavigate } from 'react-router-dom';
import Folder from '../Folder';
import ScrollFloat from '../ScrollFloat';
import './FolderSection.css';

const FolderSection = () => {
const navigate = useNavigate();

const handleFolderClick = (projectName) => {
// Projets "en travaux" → rediriger vers la page 404 interne
if (
projectName === "What's in my bag" ||
projectName === "Visit my room" ||
projectName === "The lost laptop"
) {
navigate('/project/404');
return;
}

// Tous les autres projets → redirection vers la page dynamique
//const slug = projectName.toLowerCase().replace(/\s+/g, '-'); // convertit en "url-friendly"
//navigate(`/project/${slug}`);


};

return ( <section id="folder" className="section folder-section"> <div className="container"> <ScrollFloat>Explorez !</ScrollFloat> <div className="folder-content">
<Folder
color="#3b82f6"
size={1.5}
items={[
<div
key="1"
className="folder-item"
onClick={() => handleFolderClick("What's in my bag")}
>
What's in my bag </div>,
<div
key="2"
className="folder-item"
onClick={() => handleFolderClick("Visit my room")}
>
Visit my room </div>,
<div
key="3"
className="folder-item"
onClick={() => handleFolderClick("The lost laptop")}
>
The lost laptop </div>
]}
/> </div> </div> </section>
);
};

export default FolderSection;
