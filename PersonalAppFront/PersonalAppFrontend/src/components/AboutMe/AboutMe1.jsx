import React from 'react';
import CyberFrame from './CyberFrame';
import familyHeros from '../../assets/aboutme/family_heros.png';
import zoeDaddy from '../../assets/aboutme/Zoe and Daddy on Enterprise.png';
import myGirls from '../../assets/aboutme/family_my_girls.png';
import portrait from '../../assets/aboutme/homepage.png';
import './AboutMe1.css';

const chapters = [
  {
    num: '01',
    color: 'cyan',
    title: 'ORIGINS',
    body: 'The University of Arizona gave me a B.S. in Neuroscience and a deep respect for complex systems. A decade in hospitality — the Ritz Carlton, Topgolf, TKM Restaurants — taught me what textbooks never could: how teams break under pressure, how culture is built in small moments, how to find calm at the center of chaos. Those years didn\'t feel like a detour. They were the foundation.',
  },
  {
    num: '02',
    color: 'amber',
    title: 'ROOTS',
    body: 'Family wasn\'t a milestone I reached — it was the compass that reoriented everything. The people who know me best know that the work and the warmth are inseparable. Every system I architect is a home I\'m trying to build.',
    frame: { src: familyHeros, desc: 'Family — the foundation' },
  },
  {
    num: '03',
    color: 'cyan',
    title: 'THE PIVOT',
    body: 'In 2019, I walked into an Amazon fulfillment center as an associate. Curious about the technology, I started teaching myself to code. When Amazon launched the Technical Academy — a program to retrain hourly employees as engineers — I applied without hesitation. Being accepted was one of the best days of my life. Graduating was better. I joined as an SDE I and never looked back.',
  },
  {
    num: '04',
    color: 'amber',
    title: 'ZOE',
    body: 'Then there\'s Zoe. She arrived and rearranged every priority in the best possible way. The late nights debugging stopped feeling like sacrifice and started feeling like purpose. I build scalable systems for a living — but my most important architecture is the one I\'m raising.',
    frame: { src: zoeDaddy, desc: 'Zoe and Daddy on the Enterprise campus' },
  },
  {
    num: '05',
    color: 'cyan',
    title: 'THE BUILD',
    body: 'From cloud-native platforms processing millions of daily transactions to consumer products loved by millions — every line of code serves a purpose. I bring the same instincts I learned running restaurant teams to every engineering project: clear communication, genuine accountability, and an obsessive focus on the humans at the end of every system.',
  },
  {
    num: '06',
    color: 'amber',
    title: 'MY GIRLS',
    body: 'I build toward something. Not just reliability metrics or deployment velocity — but the kind of life worth coming home to. My girls are the reason the work has weight.',
    frame: { src: myGirls, desc: 'My girls' },
  },
];

function AboutMe1() {
  return (
    <div className="am1-root">
      <div className="am1-scanlines" />

      {/* ── HEADER ── */}
      <div className="am1-header">
        <div className="am1-eyebrow">
          <span className="am1-eyebrow-line" />
          <span className="am1-eyebrow-text">The Person Behind the Work</span>
          <span className="am1-eyebrow-line am1-eyebrow-line--right" />
        </div>
        <h1 className="am1-name">ABOUT<br />ERIK</h1>
        <div className="am1-divider">
          <span className="am1-divider-line" />
          <span className="am1-divider-dot" />
        </div>
        <p className="am1-tagline">Builder &nbsp;·&nbsp; Father &nbsp;·&nbsp; Lifelong Learner</p>
      </div>

      {/* ── INTRO 2-COL ── */}
      <div className="am1-intro">
        <div className="am1-intro__text">
          <p>
            I didn't take the expected path to software engineering — I took the honest one.
            A neuroscience degree, years leading world-class hospitality teams, a move to Amazon
            as an hourly associate, then a decision to retrain that changed everything.
            Every step brought something the last one couldn't have given me.
          </p>
          <p>
            This is the signal through the noise. The story of someone who kept finding a way.
          </p>
        </div>
        <div className="am1-intro__frame">
          <CyberFrame
            src={portrait}
            description="Portrait of Erik Mabes"
            style={{ minHeight: '340px' }}
          />
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div className="am1-timeline-wrap">
        <div className="am1-timeline">
          {chapters.map((ch) => (
            <React.Fragment key={ch.num}>
              <div className={`am1-chapter am1-chapter--${ch.color}`}>
                <div className="am1-node-col">
                  <span className="am1-node-dot" />
                </div>
                <div className="am1-chapter-content">
                  <div className="am1-chapter-header">
                    <span className="am1-num">{ch.num}</span>
                    <h3 className="am1-chapter-title">{ch.title}</h3>
                  </div>
                  <p className="am1-chapter-body">{ch.body}</p>
                </div>
              </div>

              {ch.frame && (
                <div className="am1-media-row">
                  <div className="am1-node-col am1-node-col--spacer" />
                  <div className="am1-media-frame">
                    <CyberFrame
                      src={ch.frame.src}
                      description={ch.frame.desc}
                      style={{ minHeight: '320px' }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Chapter 07 — forward-looking */}
          <div className="am1-chapter am1-chapter--amber">
            <div className="am1-node-col">
              <span className="am1-node-dot" />
            </div>
            <div className="am1-chapter-content">
              <div className="am1-chapter-header">
                <span className="am1-num">07</span>
                <h3 className="am1-chapter-title">NEXT SIGNAL</h3>
              </div>
              <p className="am1-chapter-body">
                The journey isn't finished. There's more to learn, more to build, more to give.
                But I know exactly what I'm building toward.
              </p>
            </div>
          </div>

          <div className="am1-media-row">
            <div className="am1-node-col am1-node-col--spacer" />
            <div className="am1-media-frame">
              <CyberFrame
                description="A candid family moment — photo placeholder"
                style={{ minHeight: '260px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER STRIP ── */}
      <div className="am1-footer">
        <span className="am1-strip-label">erikmabes.com</span>
        <span className="am1-strip-line" />
        <span className="am1-strip-label am1-strip-label--right">Family · Engineering · Purpose</span>
      </div>
    </div>
  );
}

export default AboutMe1;
