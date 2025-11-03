import React, { useRef, useState } from 'react';
import ScrollFloat from '../ScrollFloat';
import ProfileCard3D from '../ProfileCard3D';
import './ContactSection.css';

const ContactSection = () => {
  const formRef = useRef(null);
  const successMessageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('https://formspree.io/f/xeordrag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (successMessageRef.current) {
          successMessageRef.current.classList.add('show');
          formRef.current.reset();
          setTimeout(() => successMessageRef.current.classList.remove('show'), 3000);
        }
      } else throw new Error('Erreur lors de l\'envoi');
    } catch (error) {
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <ScrollFloat>Contact</ScrollFloat>
        <div className="contact-layout">
          {/* Carte profil sans flip */}
          <div className="profile-card-column">
            <ProfileCard3D />
          </div>

          {/* Formulaire */}
          <div className="form-column">
            <div className="form-header">
              <h2 className="form-title">Contactez-moi</h2>
              <p className="form-subtitle">Discutons de votre projet</p>
            </div>
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-input" name="name" placeholder="Votre nom" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-input" name="email" placeholder="Votre email" required />
              </div>
              <div className="form-group">
                <textarea className="form-input" name="message" placeholder="Votre message" rows="5" required />
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Message de succès */}
      <div className="success-message" ref={successMessageRef}>
        <h3 style={{ color: '#ff66b2', marginBottom: '20px' }}>Message envoyé !</h3>
        <p>Je vous répondrai dans les plus brefs délais</p>
      </div>
    </section>
  );
};

export default ContactSection;