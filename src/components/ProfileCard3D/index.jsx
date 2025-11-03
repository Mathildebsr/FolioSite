import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard3D.css';

const ProfileCard3D = ({
  avatarUrl = "/images/avatar.png",
  name = "Mathilde",
  title = "Développeuse & Webdesigner", 
  enableTilt = true
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;

    const updateCardTransform = (offsetX, offsetY, card, wrap) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = Math.min(Math.max((100 / width) * offsetX, 0), 100);
      const percentY = Math.min(Math.max((100 / height) * offsetY, 0), 100);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${(percentX * 0.3) + 35}%`,
        '--background-y': `${(percentY * 0.3) + 35}%`,
        '--pointer-from-center': `${Math.min(Math.hypot(percentY - 50, percentX - 50) / 50, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${(-centerX / 5).toFixed(3)}deg`,
        '--rotate-y': `${(centerY / 4).toFixed(3)}deg`,
        '--card-opacity': '0.5'
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (duration, startX, startY, card, wrap) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const easeInOutCubic = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

      const animationLoop = currentTime => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(Math.max(elapsed / duration, 0), 1);
        const easedProgress = easeInOutCubic(progress);

        const currentX = startX + (targetX - startX) * easedProgress;
        const currentY = startY + (targetY - startY) * easedProgress;

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    event => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;
      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(event.clientX - rect.left, event.clientY - rect.top, card, wrap);
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    animationHandlers.cancelAnimation();
    wrap.classList.add('active');
    card.classList.add('active');
    wrap.style.setProperty('--card-opacity', '1');
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    event => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;
      animationHandlers.createSmoothAnimation(600, event.offsetX, event.offsetY, card, wrap);
      wrap.classList.remove('active');
      card.classList.remove('active');
      wrap.style.setProperty('--card-opacity', '0.5');
    },
    [animationHandlers]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    wrap.style.setProperty('--card-opacity', '0.5');
    const initialX = wrap.clientWidth - 70;
    const initialY = 60;
    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(1500, initialX, initialY, card, wrap);

    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
      animationHandlers.cancelAnimation();
    };
  }, [enableTilt, animationHandlers, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  // Réseaux sociaux
  const socialLinksData = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mathilde-biscaro-08a787222', image: '/images/linkedin-icon.png', color: '#0077b5' },
    { name: 'GitHub', url: 'https://github.com/Mathildebsr', image: '/images/github-icon.png', color: '#333' },
    { name: 'Instagram', url: 'https://www.instagram.com/mathildebiscaro', image: '/images/instagram-icon.png', color: '#e4405f' },
    { name: 'Behance', url: 'https://www.behance.net/mathildebiscaro', image: '/images/behance-icon.png', color: '#1769ff' }
  ];

  return (
  <div ref={wrapRef} className="profile-card-3d-wrapper">
    <section ref={cardRef} className="profile-card-3d">
      <div className="pc-inside">
        <div className="pc-shine" />
        <div className="pc-glare" />

        {/* Contenu principal - Face avant uniquement */}
        <div className="pc-content pc-avatar-content-full">
          <div className="main-avatar-full">
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              loading="lazy"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
        
        {/* TITRE EN HAUT - EN DEHORS DU CONTENEUR AVATAR */}
        <div className="pc-content">
          <div className="pc-details">
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
        </div>
        
        {/* ICÔNES RÉSEAUX SOCIAUX EN BAS */}
        <div className="pc-user-info">
          <div className="pc-social-icons">
            {socialLinksData.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="social-icon-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--social-color': social.color }}
                onClick={e => e.stopPropagation()}
              >
                <div className="social-icon-container">
                  <img
                    src={social.image}
                    alt={social.name}
                    className="social-icon-image"
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="social-icon-fallback" style={{ display: 'none' }}>
                    {social.name.charAt(0)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);
};

export default ProfileCard3D;
