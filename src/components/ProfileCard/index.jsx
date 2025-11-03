import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ 
  name = "Mathilde",
  title = "Développeuse Full Stack",
  avatarUrl = "/images/avatar.jpg"
}) => {
  return (
    <div className="profile-card-front">
      <div className="avatar-container">
        <img 
          src={avatarUrl} 
          alt={name}
          className="profile-avatar"
        />
      </div>
      
      <div className="profile-info">
        <h3 className="profile-name">{name}</h3>
        <p className="profile-title">{title}</p>
      </div>
      
      <div className="flip-hint">
        <span>👆 Cliquez pour découvrir</span>
      </div>
    </div>
  );
};

export default ProfileCard;