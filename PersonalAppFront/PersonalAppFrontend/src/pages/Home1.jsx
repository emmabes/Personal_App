import React from 'react';
import { useNavigate } from 'react-router-dom';
import homelogo from '../assets/homepage - no background.png';
import Motivator from '../components/Motivator';
import './Home1.css';

const storyParagraphs = [
  'For a long time, my life was a series of restless questions. I spent years navigating the ' +
  'high-pressure, physical worlds of restaurant operations and large-scale project management — ' +
  'environments where "progress" was often measured in shifts survived and P&Ls balanced. I was ' +
  'good at it, but there was a growing dissatisfaction, a quiet friction against the mundane. I ' +
  'found myself staring at repetitive tasks and stagnant systems, wondering why we were working ' +
  'so hard to stand still. I had an insatiable curiosity for how things actually worked under the ' +
  'hood, and a frustration with any path that didn\'t lead to growth.',

  'That restlessness eventually led me to a turning point. I realized that if I wanted to see the ' +
  'horizon, I had to be willing to tear down the walls in front of me. I stepped away from the ' +
  'comfort of established management roles and dove headfirst into the unknown — moving from the ' +
  'warehouse floor to the quiet intensity of automation and code. Discovering software wasn\'t just ' +
  'finding a new career; it was like finally finding the right lens for my eyes. The moment I wrote ' +
  'my first script to solve a problem that had plagued a team for months, the spark became a fire. ' +
  'I realized that tech was the ultimate tool for a builder — a way to create progress where there ' +
  'was only process.',

  'But the "what" of my career has always been secondary to the "why." At my core, I am driven by ' +
  'a deep-seated commitment to the people in my sphere of influence — whether it\'s showing up as ' +
  'a father, a provider, or the steady presence my team and family can count on. I carry those roles ' +
  'with pride. Every line of code I write and every complex system I architect is fueled by that ' +
  'responsibility. My journey from neuroscience to operations to software engineering is a testament ' +
  'to an obsession with finding the best version of myself. I don\'t just want to participate in ' +
  'the industry — I want to master it, lead within it, and build a legacy of excellence for those ' +
  'who depend on me. This is my story of exploration, the courage to change, and the relentless ' +
  'pursuit of a life well-built.',
];

function Home1() {
  const navigate = useNavigate();

  return (
    <div className="h1-root">
      <div className="h1-scanlines" />

      <div className="h1-article">

        {/* ── LEFT — article text column ── */}
        <div className="h1-left">

          {/* Header identity block */}
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

          {/* CTAs — immediately accessible */}
          <div className="h1-cta">
            <div className="h1-btn-row">
              <button className="h1-btn h1-blue"   onClick={() => navigate('/resume')}>Resume</button>
              <button className="h1-btn h1-pink"  onClick={() => navigate('/tic-tac-toe')}>Games<br />(For Fun!)</button>
              <button className="h1-btn h1-green"    onClick={() => navigate('/about')}>About Me</button>
              <button className="h1-btn h1-yellow"   onClick={() => navigate('/why-hire')}>Value<br />Proposition</button>
            </div>
            <div className="h1-love-row">
              <Motivator />
            </div>
          </div>

          {/* Story chapter marker — anchors bottom of hero column */}
          <div className="h1-story-label">
            <div className="h1-eyebrow">
              <span className="h1-eyebrow-line" />
              <span className="h1-eyebrow-text">The Story</span>
              <span className="h1-eyebrow-line h1-eyebrow-line--right" />
            </div>
          </div>

        </div>

        {/* ── RIGHT — sticky portrait ── */}
        <div className="h1-right">
          <div className="h1-ring h1-ring-1" />
          <div className="h1-ring h1-ring-2" />
          <div className="h1-ring h1-ring-3" />
          <div className="h1-glow" />
          <img src={homelogo} alt="Erik Mabes" className="h1-portrait" />
        </div>

      </div>

      {/* ── FULL-WIDTH STORY — flows below the portrait ── */}
      <div className="h1-story-section">
        {storyParagraphs.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
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
