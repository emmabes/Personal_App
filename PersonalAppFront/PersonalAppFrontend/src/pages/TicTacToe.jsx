import React, { useState } from "react";
import "./TicTacToe.css";
import backgroundImage from "../assets/Solid-Black-Website-Background.jpg";
import { checkWinner, checkCatsGame } from "../services/ttc/gameLogic";
import { iconList, renderIcon } from "../services/ttc/iconService.jsx";
import GameGrid from "../components/ttc/GameGrid";
import PlayerBox from "../components/ttc/PlayerBox";
import GameControls from "../components/ttc/GameControls";
import GameOverlay from "../components/ttc/GameOverlay";
import Instructions from "../components/ttc/Instructions";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [animatingCell, setAnimatingCell] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [playerNames, setPlayerNames] = useState({ X: 'Player X', O: 'Player O' });
  const [wins, setWins] = useState({ X: 0, O: 0 });
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [playerIcons, setPlayerIcons] = useState({ X: 'X', O: 'O' });
  const [showIconDropdown, setShowIconDropdown] = useState(null);
  const [playerColors, setPlayerColors] = useState({ X: '#ff6600', O: '#0066ff' });
  const [showColorPicker, setShowColorPicker] = useState(null);
  const [gameState, setGameState] = useState('playing');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleClick = (index) => {
    if (board[index] || animatingCell !== null || gameState !== 'playing') return;
    
    if (selectedCell === index) {
      setSelectedCell(null);
    } else {
      setSelectedCell(index);
    }
  };

  const handleNext = () => {
    if (selectedCell === null || gameState !== 'playing') return;
    
    setAnimatingCell(selectedCell);
    
    setTimeout(() => {
      const newBoard = [...board];
      newBoard[selectedCell] = currentPlayer;
      setBoard(newBoard);
      
      const winResult = checkWinner(newBoard);
      if (winResult) {
        setGameState('victory');
        setWinner(winResult.winner);
        setWinningLine(winResult.line);
        setWins(prev => ({ ...prev, [winResult.winner]: prev[winResult.winner] + 1 }));
      } else if (checkCatsGame(newBoard)) {
        setGameState('cats');
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
      
      setAnimatingCell(null);
      setSelectedCell(null);
    }, 200);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setSelectedCell(null);
    setAnimatingCell(null);
    setCurrentPlayer('X');
    setPlayerColors({ X: '#ff6600', O: '#0066ff' });
    setPlayerIcons({ X: 'X', O: 'O' });
    setGameState('playing');
    setWinner(null);
    setWinningLine([]);
  };

  const handleNameEdit = (player, newName) => {
    setPlayerNames({ ...playerNames, [player]: newName });
    setEditingPlayer(null);
  };

  const handleNameClick = (player) => {
    setEditingPlayer(player);
  };

  const handleIconClick = (player) => {
    setShowIconDropdown(showIconDropdown === player ? null : player);
  };

  const handleIconSelect = (player, icon) => {
    setPlayerIcons({ ...playerIcons, [player]: icon });
    setShowIconDropdown(null);
  };

  const handleColorClick = (player) => {
    setShowColorPicker(showColorPicker === player ? null : player);
  };

  const handleColorSelect = (player, colorResult) => {
    setPlayerColors({ ...playerColors, [player]: colorResult.hex });
    setShowColorPicker(null);
  };

  return (
    <div className="tic-tac-toe-page" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="game-container">
        <h1>Tic Tac Toe</h1>
        <div className="instructions-label" onClick={() => setShowInstructions(true)}>
          Instructions
        </div>
        
        <Instructions 
          showInstructions={showInstructions}
          onClose={() => setShowInstructions(false)}
        />
        
        <GameOverlay 
          gameState={gameState}
          winner={winner}
          playerNames={playerNames}
          onReset={handleReset}
        />
        
        <div className="game-layout">
          <div className="desktop-player-left">
            <PlayerBox
              player="X"
              playerName={playerNames.X}
              playerIcon={playerIcons.X}
              playerColor={playerColors.X}
              wins={wins.X}
              editingPlayer={editingPlayer}
              showIconDropdown={showIconDropdown}
              showColorPicker={showColorPicker}
              iconList={iconList}
              onIconClick={handleIconClick}
              onIconSelect={handleIconSelect}
              onNameClick={handleNameClick}
              onNameEdit={handleNameEdit}
              onColorClick={handleColorClick}
              onColorSelect={handleColorSelect}
              renderIcon={renderIcon}
            />
          </div>
          
          <div className="grid-container">
            <GameGrid
              board={board}
              selectedCell={selectedCell}
              animatingCell={animatingCell}
              winningLine={winningLine}
              gameState={gameState}
              playerColors={playerColors}
              currentPlayer={currentPlayer}
              onCellClick={handleClick}
              renderIcon={(player, icon) => renderIcon(player, playerIcons[player])}
            />
            
            <GameControls
              selectedCell={selectedCell}
              playerColors={playerColors}
              currentPlayer={currentPlayer}
              onNext={handleNext}
              onReset={handleReset}
            />
            
            <div className="mobile-players">
              <PlayerBox
                player="X"
                playerName={playerNames.X}
                playerIcon={playerIcons.X}
                playerColor={playerColors.X}
                wins={wins.X}
                editingPlayer={editingPlayer}
                showIconDropdown={showIconDropdown}
                showColorPicker={showColorPicker}
                iconList={iconList}
                onIconClick={handleIconClick}
                onIconSelect={handleIconSelect}
                onNameClick={handleNameClick}
                onNameEdit={handleNameEdit}
                onColorClick={handleColorClick}
                onColorSelect={handleColorSelect}
                renderIcon={renderIcon}
              />
              <PlayerBox
                player="O"
                playerName={playerNames.O}
                playerIcon={playerIcons.O}
                playerColor={playerColors.O}
                wins={wins.O}
                editingPlayer={editingPlayer}
                showIconDropdown={showIconDropdown}
                showColorPicker={showColorPicker}
                iconList={iconList}
                onIconClick={handleIconClick}
                onIconSelect={handleIconSelect}
                onNameClick={handleNameClick}
                onNameEdit={handleNameEdit}
                onColorClick={handleColorClick}
                onColorSelect={handleColorSelect}
                renderIcon={renderIcon}
              />
            </div>
          </div>
          
          <div className="desktop-player-right">
            <PlayerBox
              player="O"
              playerName={playerNames.O}
              playerIcon={playerIcons.O}
              playerColor={playerColors.O}
              wins={wins.O}
              editingPlayer={editingPlayer}
              showIconDropdown={showIconDropdown}
              showColorPicker={showColorPicker}
              iconList={iconList}
              onIconClick={handleIconClick}
              onIconSelect={handleIconSelect}
              onNameClick={handleNameClick}
              onNameEdit={handleNameEdit}
              onColorClick={handleColorClick}
              onColorSelect={handleColorSelect}
              renderIcon={renderIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;