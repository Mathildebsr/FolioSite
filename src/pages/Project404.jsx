import React, { useEffect, useRef, useState } from 'react';
import './Project404.css'; // ton CSS copié depuis game.css

const Project404 = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showStart, setShowStart] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let birdY = 140;
    let velocity = 0;
    const gravity = 0.6;
    
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // simple bird
      ctx.fillStyle = 'yellow';
      ctx.fillRect(50, birdY, 20, 20);
      
      velocity += gravity;
      birdY += velocity;
      
      if (birdY > canvas.height - 20 || birdY < 0) {
        setGameOver(true);
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    if (!showStart && !gameOver) {
      animationFrameId = requestAnimationFrame(gameLoop);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [showStart, gameOver]);

  const handleStart = () => {
    setShowStart(false);
    setGameOver(false);
    setScore(0);
  };

  const handleRestart = () => {
    setShowStart(true);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="error-page">
      <div className="error-header">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">OUPS ! LA PAGE EST ENCORE EN TRAVAUX</h2>
        <p className="error-message">Tant que vous êtes là, amusez-vous !</p>
      </div>

      <div id="gameboy-container">
        <div className="game-boy-text">GAME BOY</div>
        <div className="speaker">
          {[...Array(5)].map((_, i) => <div key={i} className="speaker-line"></div>)}
        </div>

        <div id="screen-container">
          <div id="game-screen">
            <canvas id="game-canvas" ref={canvasRef} width={280} height={280}></canvas>

            {showStart && (
              <div id="start-screen" className="screen-text">
                <div className="title">MATHILDE'S BIRD</div>
                <div className="instructions">APPUYEZ SUR ESPACE POUR VOLER</div>
                <div className="instructions">EVITEZ LES TUYAUX</div>
                <button className="btn" onClick={handleStart}>JOUER</button>
              </div>
            )}

            {gameOver && (
              <div id="game-over-screen" className="screen-text">
                <div className="title">GAME OVER</div>
                <div className="score">SCORE: {score}</div>
                <div className="instructions">APPUYEZ SUR ESPACE POUR REJOUER</div>
                <button className="btn" onClick={handleRestart}>REJOUER</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="navigation">
        <a href="/" className="btn-nav">← RETOUR À L'ACCUEIL</a>
      </div>
    </div>
  );
};

export default Project404;
