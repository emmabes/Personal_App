import React from 'react';
import { useNavigate } from 'react-router-dom';
import homelogo from '../assets/homepage - no background.png';
import Motivator from '../components/Motivator';
import './Home1.css';

const bio =
  'Seasoned software engineer with a decade of experience architecting systems at scale. ' +
  'From cloud-native platforms processing millions of daily transactions to consumer products ' +
  'loved by millions — every line of code serves a purpose.';

const achievements = [
  'Transformed legacy monoliths into event-driven microservices across multiple enterprise organizations',
  'Built and led cross-functional engineering teams in high-velocity, agile environments',
  'Delivered measurable business impact through platform reliability, performance, and developer experience',
];

function Home1() {
  const navigate = useNavigate();

  return (
    <div className="h1-root">
      <div className="h1-scanlines" />

      <div className="h1-hero">
        {/* LEFT — Text column */}
        <div className="h1-left">
          <div className="h1-eyebrow">
            <span className="h1-eyebrow-line" />
            <span className="h1-eyebrow-text">Full-Stack Engineer &nbsp;·&nbsp; Cloud Architect</span>
            <span className="h1-eyebrow-line h1-eyebrow-line--right" />
          </div>

          <h1 className="h1-name">ERIK<br />MABES</h1>

          <div className="h1-divider">
            <span className="h1-divider-line" />
            <span className="h1-divider-dot" />
          </div>

          <p className="h1-bio">{bio}</p>

          <ul className="h1-achievements">
            {achievements.map((a, i) => (
              <li key={i}>
                <span className="h1-num">0{i + 1}</span>
                {a}
              </li>
            ))}
          </ul>

          <div className="h1-cta">
            <div className="h1-btn-row">
              <button className="h1-btn h1-cyan" onClick={() => navigate('/resume')}>Resume</button>
              <button className="h1-btn h1-orange" onClick={() => navigate('/tic-tac-toe')}>Games <br></br>(For Fun!)</button>
              <button className="h1-btn h1-blue" onClick={() => {}}>About Me</button>
            </div>
            <div className="h1-love-row">
              <Motivator />
            </div>
          </div>
        </div>

        {/* RIGHT — Portrait */}
        <div className="h1-right">
          <div className="h1-ring h1-ring-1" />
          <div className="h1-ring h1-ring-2" />
          <div className="h1-ring h1-ring-3" />
          <div className="h1-glow" />
          <img src={homelogo} alt="Erik Mabes" className="h1-portrait" />
        </div>
      </div>

      {/* Bottom accent strip */}
      <div className="h1-footer-strip">
        <span className="h1-strip-label">erikmabes.com</span>
        <span className="h1-strip-line" />
        <span className="h1-strip-label h1-strip-label--right">Software · Cloud · Leadership</span>
      </div>
    </div>
  );
}

export default Home1;
