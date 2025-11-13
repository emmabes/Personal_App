import React from 'react';

// Dynamically import all PNG files from the ttc assets directory
const iconModules = import.meta.glob('../../assets/ttc/*.png', { eager: true });

// Create iconMap from the dynamic imports
export const iconMap = Object.fromEntries(
  Object.entries(iconModules).map(([path, module]) => {
    const filename = path.split('/').pop();
    return [filename, module.default];
  })
);

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