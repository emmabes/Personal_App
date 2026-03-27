import React, { useState, useEffect, useCallback } from 'react';
import './MemoryGame.css';
import backgroundImage from '../assets/Solid-Black-Website-Background.jpg';
import { initializeGame, checkMatch } from '../services/memory/memoryLogic';
import MemoryGrid from '../components/memory/MemoryGrid';
import MemoryControls from '../components/memory/MemoryControls';
import MemoryScoreboard from '../components/memory/MemoryScoreboard';
import GameNav from '../components/GameNav';

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  // Initialize game
  const startNewGame = useCallback((size = gridSize) => {
    const newCards = initializeGame(size);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(false);
    setShowVictory(false);
  }, [gridSize]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isGameActive && !showVictory) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, showVictory]);

  // Check for win
  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      setShowVictory(true);
      setIsGameActive(false);
    }
  }, [matchedCards, cards]);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || showVictory) return;
    
    // Start game on first click
    if (!isGameActive) setIsGameActive(true);

    // Handle Golden Card (instant match if it's the only one)
    if (card.isGolden) {
      setMatchedCards(prev => [...prev, card]);
      return;
    }

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      if (checkMatch(newFlipped[0], newFlipped[1])) {
        // Match found
        setTimeout(() => {
          setMatchedCards(prev => [...prev, ...newFlipped]);
          setFlippedCards([]);
        }, 600); // Wait for flip animation
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1200);
      }
    }
  };

  const handleSizeChange = (newSize) => {
    setGridSize(newSize);
    startNewGame(newSize);
  };

  return (
    <div className="memory-game-page" style={{backgroundImage: `url(${backgroundImage})`}}>
      <GameNav current="/memory-game" />
      <div className="memory-game-container">
        <h1>Memory Game</h1>
        
        <MemoryControls 
          gridSize={gridSize} 
          onSizeChange={handleSizeChange} 
          onReset={() => startNewGame()} 
        />
        
        <MemoryGrid 
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onCardClick={handleCardClick}
          gridSize={gridSize}
        />
        
        <MemoryScoreboard 
          moves={moves}
          matches={Math.floor(matchedCards.filter(c => !c.isGolden).length / 2) + matchedCards.filter(c => c.isGolden).length}
          time={time}
          matchedCards={matchedCards}
        />

        {showVictory && (
          <div className="victory-overlay" onClick={() => startNewGame()}>
            <div className="victory-content">
              <span className="victory-text">WELL DONE!</span>
              <p className="victory-subtext">Solved in {moves} moves and {time} seconds</p>
              <p className="click-to-reset">Click to play again</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
