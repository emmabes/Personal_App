import React from 'react';
import './JobsList.css';

const JobsList = React.forwardRef(({ jobs, color = [192, 192, 192], onItemClick, style }, ref) => {
  const [r, g, b] = color;

  const vars = {
    '--accent':        `rgb(${r}, ${g}, ${b})`,
    '--accent-glow':   `rgba(${r}, ${g}, ${b}, 0.35)`,
    '--accent-dim':    `rgba(${r}, ${g}, ${b}, 0.15)`,
    '--accent-border': `rgba(${r}, ${g}, ${b}, 0.5)`,
    '--accent-text':   `rgba(${r}, ${g}, ${b}, 0.9)`,
  };

  return (
    <div ref={ref} className="jobs-list" style={{ ...vars, ...style }}>
      <div className="jobs-list__accent-bar" />
      <div className="jobs-list__items">
        {jobs.map((job, i) => (
          <div
            key={i}
            className="jobs-list__item"
            onClick={() => onItemClick?.(job, i)}
          >
            {job}
          </div>
        ))}
      </div>
    </div>
  );
});

export default JobsList;
