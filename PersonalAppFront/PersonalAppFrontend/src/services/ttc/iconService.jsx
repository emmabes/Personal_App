import React from 'react';
import bearIcon from "../../assets/ttc/bear.png";
import fireZukoIcon from "../../assets/ttc/fire zuko.png";
import footballAwayIcon from "../../assets/ttc/football away.png";
import footballHomeIcon from "../../assets/ttc/football home.png";
import gokuIcon from "../../assets/ttc/goku.png";
import tigerIcon from "../../assets/ttc/tiger.png";
import vegetaIcon from "../../assets/ttc/vegeta.png";
import waterKitaraIcon from "../../assets/ttc/water kitara.png";

export const iconMap = {
  'bear.png': bearIcon,
  'fire zuko.png': fireZukoIcon,
  'football away.png': footballAwayIcon,
  'football home.png': footballHomeIcon,
  'goku.png': gokuIcon,
  'tiger.png': tigerIcon,
  'vegeta.png': vegetaIcon,
  'water kitara.png': waterKitaraIcon
};

export const iconList = Object.keys(iconMap);

export const renderIcon = (player, icon) => {
  if (icon === 'X' || icon === 'O') {
    return <span className="text-symbol">{icon}</span>;
  }
  
  const iconPath = iconMap[icon];
  if (iconPath) {
    return (
      <img 
        src={iconPath} 
        alt={icon} 
        className={`player-icon ${player === 'X' ? 'mirrored' : ''}`}
      />
    );
  }
  return <span className="text-symbol">{player}</span>;
};