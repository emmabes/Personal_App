import React from 'react';
import './MediaFrame.css';

/**
 * MediaFrame — placeholder that upgrades to real media when a src is provided.
 *
 * Props:
 *   description   — what belongs here (shown in placeholder when no src)
 *   type          — 'video-loop' | 'image' | 'gif'
 *   src           — imported asset or URL; when provided, renders real media instead of placeholder
 *   asset         — filename from src/assets/.scratch/ (annotation only, does not load media)
 *   className     — extra class names on the outer wrapper
 *   style         — inline style overrides on the outer wrapper
 *   fill          — if true, the frame fills its positioned parent (position:absolute inset:0)
 *
 * Usage with real media:
 *   import myVideo from '../../../assets/.scratch/snowscape-pan-4K.mp4';
 *   <MediaFrame src={myVideo} type="video-loop" description="..." />
 */
const TYPE_LABELS = {
  'video-loop': '▶  Video Loop',
  image:        '◻  Image',
  gif:          '◻  GIF',
};

const MediaFrame = ({ description, type = 'image', src, asset, className = '', style = {}, fill = false }) => {
  const cls = `mf ${fill ? 'mf--fill' : ''} ${className}`;

  if (src && type === 'video-loop') {
    return (
      <div className={cls} style={style}>
        <video
          className="mf__video"
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    );
  }

  if (src && (type === 'image' || type === 'gif')) {
    return (
      <div className={cls} style={style}>
        <img className="mf__img" src={src} alt={description} />
      </div>
    );
  }

  // No src — render placeholder
  return (
    <div className={cls} style={style}>
      <div className="mf__inner">
        <span className="mf__badge">{TYPE_LABELS[type] ?? type}</span>
        {asset && <span className="mf__asset">asset: {asset}</span>}
        <p className="mf__description">{description}</p>
      </div>
    </div>
  );
};

export default MediaFrame;
