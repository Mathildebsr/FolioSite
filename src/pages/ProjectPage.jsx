// src/pages/ProjectPage.jsx
import { useParams, Link } from 'react-router-dom';

const ProjectPage = () => {
  const { projectName } = useParams(); // récupère la partie dynamique de l'URL

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Projet : {projectName.replace(/-/g, ' ')}</h1>
      <p>Contenu de ton projet ici...</p>
      <Link to="/">← Retour à l'accueil</Link>
    </div>
  );
};

export default ProjectPage;
