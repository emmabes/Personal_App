import React from 'react';
import './JobCard.css';

const JobCard = ({
  company,
  role,
  image,
  color = [192, 192, 192],
  description,
  achievements = [],
  skills = [],
  startDate,
  endDate,
  location,
  type,
}) => {
  const [r, g, b] = color;

  const cardStyle = {
    '--accent':        `rgb(${r}, ${g}, ${b})`,
    '--accent-glow':   `rgba(${r}, ${g}, ${b}, 0.35)`,
    '--accent-dim':    `rgba(${r}, ${g}, ${b}, 0.15)`,
    '--accent-border': `rgba(${r}, ${g}, ${b}, 0.5)`,
    '--accent-text':   `rgba(${r}, ${g}, ${b}, 0.9)`,
  };

  return (
    <div className="job-card" style={cardStyle}>
      <div className="job-card__accent-bar" />

      <div className="job-card__header">
        <div className="job-card__logo-wrap">
          <img src={image} alt={`${company} logo`} className="job-card__logo" />
        </div>
        <div className="job-card__title-block">
          <h2 className="job-card__company">{company}</h2>
          <p className="job-card__role">{role}</p>
        </div>
        <div className="job-card__dates">
          <span>{startDate}</span>
          <span className="job-card__date-sep">&mdash;</span>
          <span>{endDate}</span>
        </div>
      </div>

      <hr className="job-card__divider" />

      <div className="job-card__body">
        {description && (
          <section className="job-card__section">
            <h3 className="job-card__section-title">About</h3>
            <p className="job-card__description">{description}</p>
          </section>
        )}

        {achievements.length > 0 && (
          <section className="job-card__section">
            <h3 className="job-card__section-title">Key Achievements</h3>
            <ul className="job-card__achievements">
              {achievements.map((item, i) => (
                <li key={i} className="job-card__achievement">{item}</li>
              ))}
            </ul>
          </section>
        )}

        {skills.length > 0 && (
          <section className="job-card__section">
            <h3 className="job-card__section-title">Skills</h3>
            <div className="job-card__skills">
              {skills.map((skill, i) => (
                <span key={i} className="job-card__skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>

      {(location || type) && (
        <div className="job-card__footer">
          {location && <span className="job-card__footer-item">{location}</span>}
          {type && <span className="job-card__footer-item">{type}</span>}
        </div>
      )}
    </div>
  );
};

export default JobCard;
