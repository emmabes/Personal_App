import React from 'react';
import { CirclePicker } from 'react-color';

const PlayerBox = ({
  player,
  playerName,
  playerIcon,
  playerColor,
  wins,
  editingPlayer,
  showIconDropdown,
  showColorPicker,
  iconList,
  onIconClick,
  onIconSelect,
  onNameClick,
  onNameEdit,
  onColorClick,
  onColorSelect,
  renderIcon
}) => {
  return (
    <div className="player-box" style={{backgroundColor: `${playerColor}20`}}>
      <div className="icon-container">
        <div className="player-symbol" onClick={() => onIconClick(player)}>
          {renderIcon(player, playerIcon)}
        </div>
        {showIconDropdown === player && (
          <div className="icon-dropdown">
            <div className="icon-option" onClick={() => onIconSelect(player, player)}>{player}</div>
            {iconList.map((icon) => (
              <div key={icon} className="icon-option" onClick={() => onIconSelect(player, icon)}>
                {renderIcon(player, icon)}
              </div>
            ))}
          </div>
        )}
      </div>
      {editingPlayer === player ? (
        <input 
          type="text" 
          defaultValue={playerName}
          onBlur={(e) => onNameEdit(player, e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onNameEdit(player, e.target.value)}
          autoFocus
          className="name-input"
        />
      ) : (
        <div className="player-name" onClick={() => onNameClick(player)}>
          {playerName}
        </div>
      )}
      <div className="win-count">Wins: {wins}</div>
      <div className="color-container">
        <div 
          className="color-box" 
          style={{backgroundColor: playerColor}}
          onClick={() => onColorClick(player)}
        ></div>
        {showColorPicker === player && (
          <div className="color-picker-container">
            <CirclePicker
              color={playerColor}
              onChange={(color) => onColorSelect(player, color)}
              colors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b', '#000000', '#ffffff']}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerBox;