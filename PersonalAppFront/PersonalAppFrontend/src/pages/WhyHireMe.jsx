import React, { useState } from 'react';
import './WhyHireMe.css';

const SIGN_URL_ENDPOINT = import.meta.env.VITE_SIGN_URL_ENDPOINT;

const pillars = [
  {
    id: 'hospitality',
    border: 'cyan',
    stat: '15+',
    statSub: 'Years Serving People',
    headline: 'Where Users Are The Spec',
    body: 'Fifteen years of fulfilling requests, anticipating needs before they\'re voiced, and providing lateral support that lifts the whole team — that\'s hospitality. That orientation toward people doesn\'t stay at the door. It shapes how I think about every interface, every workflow, every system I ship.',
    chips: ['User-First Design', 'Ops Automation', 'Hospitality', 'Python', 'POS Integration'],
  },
  {
    id: 'amazon',
    border: 'orange',
    stat: '$300M+',
    statSub: 'Amazon Impact',
    headline: 'Big Stage. Real Stakes.',
    body: 'At Amazon I shipped features at scale — a 9% drop in upload errors worth ~$50M, and collaborated on initiatives saving ~$250M annually. I know what production means, what on-call means, and how to operate with rigor in high-accountability environments.',
    chips: ['Java', 'AWS', 'Microservices', 'SDLC', 'Production On-Call'],
  },
  {
    id: 'range',
    border: 'gradient',
    stat: '63',
    statSub: 'Service Industry Direct Reports',
    headline: 'Still Writing the Code',
    body: 'I lead a 63-person hospitality team while shipping production Python tooling that supports ownership and administration — from planning and decision-making through implementation and review. That range is the point: I think in architecture, execute in detail, and never lose sight of the people the system serves.',
    chips: ['Operations Manager', 'Lean Six Sigma', 'React', 'AWS CDK', 'TypeScript'],
  },
];

function WhyHireMe() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading || !SIGN_URL_ENDPOINT) return;
    setDownloading(true);
    try {
      const res = await fetch(SIGN_URL_ENDPOINT);
      const { url } = await res.json();
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to get download URL. This endpoint is rate-limited.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="wh-root">
      <div className="wh-scanlines" />

      {/* ── HERO ── */}
      <section className="wh-hero">
        <div className="wh-hero__inner">
          <div className="wh-eyebrow">
            <span className="wh-eyebrow-line" />
            <span className="wh-eyebrow-text">Engineering · Operations · Leadership</span>
            <span className="wh-eyebrow-line wh-eyebrow-line--right" />
          </div>

          <h1 className="wh-headline">
            THE INTERSECTION<br />
            IS THE&nbsp;<span className="wh-headline--accent">ADVANTAGE.</span>
          </h1>

          <p className="wh-tagline">
            15+ years serving people with excellence — then discovering software<br className="wh-br-md" />
            and never looking back. The intersection is where the real value lives.
          </p>
        </div>
      </section>

      {/* ── CHAPTER BREAK ── */}
      <div className="wh-chapter">
        <span className="wh-chapter-left">← WHAT THIS MEANS FOR YOU</span>
        <span className="wh-chapter-line" />
        <span className="wh-chapter-right">CAPABILITY PROFILE →</span>
      </div>

      {/* ── THREE PILLARS ── */}
      <section className="wh-pillars">
        {pillars.map((p) => (
          <div key={p.id} className={`wh-card wh-card--${p.border}`}>
            <div className="wh-card__stat">
              <span className="wh-stat-num">{p.stat}</span>
              <span className="wh-stat-sub">{p.statSub}</span>
            </div>
            <h2 className="wh-card__headline">{p.headline}</h2>
            <p className="wh-card__body">{p.body}</p>
            <div className="wh-chips">
              {p.chips.map((c) => (
                <span key={c} className="wh-chip">{c}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── HOW I CAN SERVE YOUR ORG ── */}
      <section className="wh-roles">
        <div className="wh-roles__inner">
          <div className="wh-roles__header">
            <span className="wh-eyebrow-text">Where I Add Value</span>
          </div>
          <div className="wh-roles__grid">
            {[
              {
                title: 'Software Development',
                body: 'Full-stack engineering across Java, Python, and React — built for scale, secured from the start, deployed with CI/CD discipline.',
              },
              {
                title: 'Cloud Architecture',
                body: 'AWS-native design from microservices to serverless. I write the IaC, own the pipeline, and stay on-call for what I ship.',
              },
              {
                title: 'Project Management',
                body: 'I compress timelines without cutting corners. A remodel stalled 7 months became a 3.5-week closure — and recouped $360K in the process.',
              },
              {
                title: 'Business Analysis',
                body: 'I find the gap between what the data says and what it means — then build the tool that closes it and puts the insight in the right hands.',
              },
              {
                title: 'Operations Analysis & Improvement',
                body: 'Lean Six Sigma-informed process redesign. I quantify the waste, identify the lever, and ship a fix that sticks.',
              },
              {
                title: 'Technical Leadership',
                body: 'From individual contributor to director, I\'ve led at every level. I know when to delegate, when to dig in, and when to get out of the team\'s way.',
              },
            ].map((r) => (
              <div key={r.title} className="wh-role-item">
                <span className="wh-role-dot" />
                <div>
                  <p className="wh-role-title">{r.title}</p>
                  <p className="wh-role-body">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIAL STRIP ── */}
      <div className="wh-credentials">
        <span className="wh-cred-text">
          B.S. NEUROSCIENCE &nbsp;·&nbsp; AMAZON SDE I &nbsp;·&nbsp; 99% ATA PROGRAM GRADE &nbsp;·&nbsp; DIRECT-TO-SDE I PLACEMENT
        </span>
      </div>

      {/* ── CTA ── */}
      <section className="wh-cta">
        <div className="wh-cta__inner">
          <span className="wh-cta-eyebrow">Ready When You Are</span>
          <p className="wh-cta-statement">
            The right role doesn't need convincing.<br />
            It just needs the right person.
          </p>
          <p className="wh-cta-sub">
            Python · Java · AWS · React · Leadership · Lean Six Sigma
          </p>
          <div className="wh-cta-buttons">
            <button
              className="wh-btn wh-btn--cyan"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? 'Preparing…' : 'Download Resume'}
            </button>
            <a
              className="wh-btn wh-btn--outline"
              href="https://www.linkedin.com/in/erik-mabes-4b6133184/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="wh-footer">
        <span className="wh-strip-label">erikmabes.com</span>
        <span className="wh-strip-line" />
        <span className="wh-strip-label wh-strip-label--right">Engineering · Operations · Purpose</span>
      </div>
    </div>
  );
}

export default WhyHireMe;
