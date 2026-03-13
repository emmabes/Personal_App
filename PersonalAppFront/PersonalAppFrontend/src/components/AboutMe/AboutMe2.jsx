import React, { useState, useEffect } from 'react';
import CyberFrame from './CyberFrame';
import portrait from '../../assets/aboutme/homepage.png';
import familyHeros from '../../assets/aboutme/family_heros.png';
import zoeDaddy from '../../assets/aboutme/Zoe and Daddy on Enterprise.png';
import myGirls from '../../assets/aboutme/family_my_girls.png';
import zoe from '../../assets/aboutme/zoe.png';
import './AboutMe2.css';

const careerSteps = [
  { code: 'EDU', label: 'B.S. Neuroscience · University of Arizona' },
  { code: 'SVC', label: 'Ritz Carlton · Topgolf · TKM Restaurants — 10 years' },
  { code: 'AMZ', label: 'Amazon — Fulfillment Associate → Project Coordinator' },
  { code: 'ATA', label: 'Amazon Technical Academy — Selected & Graduated' },
  { code: 'ENG', label: 'SDE I → Cloud Architect · Systems at Scale' },
];

const directives = [
  'Build systems that people can trust.',
  'Communicate clearly; accountability is care.',
  'Every user is a human — design for them.',
  'The work earns its meaning from what you build it for.',
  'Keep learning. The moment you stop, the craft starts dying.',
];

function AboutMe2() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="am2-root">
      <div className="am2-scanlines" />

      {/* ── TERMINAL HEADER ── */}
      <div className="am2-terminal-header">
        <div className="am2-th-bar">
          <span className="am2-th-filename">PERSONAL_DOSSIER.md</span>
          <span className="am2-th-badge">PUBLIC</span>
        </div>
        <div className="am2-th-meta">
          <span className="am2-th-prompt">&gt;</span>
          <span className="am2-th-field">SUBJECT:</span>
          <span className="am2-th-value">ERIK MABES</span>
          <span className="am2-th-sep">·</span>
          <span className="am2-th-field">STATUS:</span>
          <span className="am2-th-value am2-th-value--active">ACTIVE</span>
          <span className="am2-th-sep">·</span>
          <span className="am2-th-field">LAST_UPDATED:</span>
          <span className="am2-th-value">2026</span>
          <span className={`am2-cursor ${cursorVisible ? '' : 'am2-cursor--hidden'}`}>_</span>
        </div>
      </div>

      {/* ── BENTO GRID ── */}
      <div className="am2-grid">

        {/* OVERVIEW */}
        <div className="am2-card am2-card--overview">
          <span className="am2-card-label">&gt; SUBJECT_OVERVIEW</span>
          <p className="am2-card-body">
            I didn't take the expected path to software engineering — I took the honest one.
            A neuroscience degree, a decade leading world-class hospitality teams, a move to Amazon
            as an hourly associate, then a decision to retrain through the Technical Academy that
            changed everything. Every step brought something the last one couldn't have given me.
          </p>
          <p className="am2-card-body">
            The result is an engineer who understands systems at the technical layer and the
            human layer simultaneously. That combination is rare. I use it every day.
          </p>
        </div>

        {/* PORTRAIT — spans 2 rows */}
        <div className="am2-card am2-card--portrait">
          <CyberFrame
            src={portrait}
            description="Erik Mabes"
            className="am2-portrait-frame"
            style={{ minHeight: '100%', height: '100%' }}
          />
        </div>

        {/* CAREER TRACE */}
        <div className="am2-card am2-card--career">
          <span className="am2-card-label">&gt; CAREER_TRACE</span>
          <div className="am2-career-list">
            {careerSteps.map((step, i) => (
              <div key={i} className="am2-career-item">
                <span className="am2-career-code">[{step.code}]</span>
                <span className="am2-career-text">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAMILY PHOTO */}
        <div className="am2-card am2-card--family-photo">
          <CyberFrame
            src={familyHeros}
            description="Family"
            style={{ minHeight: '100%', height: '100%' }}
          />
          <span className="am2-card-overlay-label">&gt; FAMILY_UNIT</span>
        </div>

        {/* FAMILY TEXT */}
        <div className="am2-card am2-card--family-text">
          <span className="am2-card-label">&gt; FAMILY_UNIT</span>
          <p className="am2-card-body">
            Family isn't a milestone I reached — it was the compass that reoriented everything.
            The people who know me best know that the work and the warmth are inseparable.
          </p>
          <p className="am2-card-body">
            My girls keep the mission honest. Every reliable system I ship is a small act of
            care for the people on the other end of it.
          </p>
        </div>

        {/* ZOE */}
        <div className="am2-card am2-card--zoe">
          <CyberFrame
            src={zoe}
            description="Zoe"
            style={{ minHeight: '100%', height: '100%' }}
          />
          <span className="am2-card-overlay-label">&gt; ZOE</span>
        </div>

        {/* MY GIRLS — full width */}
        <div className="am2-card am2-card--my-girls">
          <CyberFrame
            src={myGirls}
            description="My girls"
            style={{ minHeight: '100%', height: '100%' }}
          />
          <span className="am2-card-overlay-label am2-card-overlay-label--large">
            &gt; MY_GIRLS — THE_WHY
          </span>
        </div>

        {/* DIRECTIVES */}
        <div className="am2-card am2-card--directives">
          <span className="am2-card-label">&gt; CORE_DIRECTIVES</span>
          <ol className="am2-directives-list">
            {directives.map((d, i) => (
              <li key={i} className="am2-directive">
                <span className="am2-directive-num">0{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ZOE + DADDY */}
        <div className="am2-card am2-card--zoe-daddy">
          <CyberFrame
            src={zoeDaddy}
            description="Zoe and Daddy on the Enterprise campus"
            style={{ minHeight: '100%', height: '100%' }}
          />
          <span className="am2-card-overlay-label">&gt; ZOE_AND_DADDY · AMAZON_ENTERPRISE</span>
        </div>

        {/* PLACEHOLDER */}
        <div className="am2-card am2-card--placeholder">
          <span className="am2-card-label">&gt; NEXT_FRAME</span>
          <CyberFrame
            description="A candid family moment — photo placeholder"
            style={{ height: '100%', minHeight: '200px' }}
          />
        </div>

      </div>

      {/* ── FOOTER STRIP ── */}
      <div className="am2-footer">
        <span className="am2-strip-label">erikmabes.com</span>
        <span className="am2-strip-line" />
        <span className="am2-strip-label am2-strip-label--right">Family · Engineering · Purpose</span>
      </div>
    </div>
  );
}

export default AboutMe2;
