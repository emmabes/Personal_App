import React, { useState } from 'react';
import WinterAbundance from './WinterAbundance';
import DoorwayToWarmth from './DoorwayToWarmth';
import FamilyAdventure from './FamilyAdventure';
import './ThemeSwitcher.css';

const THEMES = [
  { id: 'winter-abundance',  label: 'Winter Abundance',  subtitle: 'Store the Season. Live the Life.',     component: WinterAbundance },
  { id: 'doorway-to-warmth', label: 'Doorway to Warmth', subtitle: 'The First Step Home.',                 component: DoorwayToWarmth },
  { id: 'family-adventure',  label: 'Family Adventure',  subtitle: 'Your Whole Crew. One Rack.',           component: FamilyAdventure },
];

const ThemeSwitcher = () => {
  const [activeId, setActiveId] = useState(THEMES[0].id);

  const ActiveTheme = THEMES.find(t => t.id === activeId).component;

  return (
    <div className="theme-switcher">
      <div className="theme-switcher__toolbar">
        <span className="theme-switcher__label">RIDGELINE — homepage concepts</span>
        <div className="theme-switcher__btns">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              className={`theme-switcher__btn${activeId === theme.id ? ' theme-switcher__btn--active' : ''}`}
              onClick={() => setActiveId(theme.id)}
              title={theme.subtitle}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </div>
      <div className="theme-switcher__canvas">
        <ActiveTheme />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
