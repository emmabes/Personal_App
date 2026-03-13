import React from 'react';
import './CyberFrame.css';

/**
 * CyberFrame — Cyber-Command-themed media placeholder.
 * Renders a dashed-cyan placeholder when no src is provided.
 * Renders a cover-fit image when src is provided.
 *
 * Props:
 *   description  — caption / what belongs here (shown in placeholder)
 *   src          — imported image; renders real media when provided
 *   className    — extra class names on outer wrapper
 *   style        — inline style overrides (e.g. height, aspect-ratio)
 */
const CyberFrame = ({ description, src, className = '', style = {} }) => {
  if (src) {
    return (
      <div className={`cf ${className}`} style={style}>
        <img className="cf__img" src={src} alt={description ?? ''} />
        {description && <span className="cf__caption">{description}</span>}
      </div>
    );
  }

  return (
    <div className={`cf ${className}`} style={style}>
      <div className="cf__inner">
        <span className="cf__badge">◻ &nbsp; Photo</span>
        <p className="cf__desc">{description}</p>
      </div>
    </div>
  );
};

export default CyberFrame;
