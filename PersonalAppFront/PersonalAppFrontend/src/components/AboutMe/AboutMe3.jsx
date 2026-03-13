import React from 'react';
import CyberFrame from './CyberFrame';
import portrait from '../../assets/aboutme/homepage.png';
import familyHeros from '../../assets/aboutme/family_heros.png';
import zoeDaddy from '../../assets/aboutme/Zoe and Daddy on Enterprise.png';
import myGirls from '../../assets/aboutme/family_my_girls.png';
import zoe from '../../assets/aboutme/zoe.png';
import ssj from '../../assets/aboutme/zoe_ssj.png';
import adventure from '../../assets/aboutme/homepage8.png';
import './AboutMe3.css';

function AboutMe3() {
  return (
    <div className="am3-root">
      <div className="am3-scanlines" />

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════ */}
      <section className="am3-hero">
        <div className="am3-hero__left">
          <div className="am3-eyebrow">
            <span className="am3-eyebrow-line" />
            <span className="am3-eyebrow-text">Father · Builder · Lifelong Learner</span>
            <span className="am3-eyebrow-line am3-eyebrow-line--right" />
          </div>

          <h1 className="am3-hero-headline">
            THE<br />
            STORY<br />
            OF A<br />
            BUILDER
          </h1>

          <div className="am3-divider">
            <span className="am3-divider-line" />
            <span className="am3-divider-dot" />
          </div>

          <p className="am3-hero-bio">
            If you strip away the titles, the code, and the career milestones,
            what you're left with is a man whose entire world is anchored by the people he loves.
            My "why" isn't found in a terminal or a cloud architecture diagram — it's found in
            the laughter of my girls and the quiet moments at home that remind me what actually matters.
          </p>

          <div className="am3-hero-tags">
            <span className="am3-tag">Neuroscience</span>
            <span className="am3-tag am3-tag--amber">Hospitality</span>
            <span className="am3-tag">Amazon</span>
            <span className="am3-tag am3-tag--amber">Cloud Architect</span>
            <span className="am3-tag">Father</span>
          </div>
        </div>

        <div className="am3-hero__right">
          <div className="am3-hero-glow" />
          <div className="am3-hero-ring am3-hero-ring-1" />
          <div className="am3-hero-ring am3-hero-ring-2" />
          <div className="am3-hero-ring am3-hero-ring-3" />
          <CyberFrame
            src={portrait}
            description="Erik Mabes"
            className="am3-hero-portrait"
            style={{ position: 'absolute', inset: 0, minHeight: 'unset', border: 'none' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — ORIGINS (text panel)
          ═══════════════════════════════════════ */}
      <section className="am3-panel">
        <div className="am3-panel__inner">
          <span className="am3-section-eyebrow">01 &nbsp;—&nbsp; Origins</span>
          <h2 className="am3-panel-heading">A Walking<br />Contradiction</h2>
          <div className="am3-panel-text">
            <p>
              I'm a bit of a walking contradiction. I have a B.S. in Neuroscience, which means
              I'm perpetually fascinated by the weird ways our brains work — but I've also spent
              a decade in the trenches of hospitality, learning that nothing is more complex, or
              more rewarding, than human connection.
            </p>
            <p>
              I'm the guy who will geek out over a perfectly optimized feedback loop one minute
              and then get completely lost in a "family hero" adventure the next. I have a penchant
              for the over-engineered, a love for quirky interests that keep my mind sharp, and a
              stubborn belief that you're never too old to start something new and be great at it.
            </p>
            <p>
              That restlessness eventually led me to a turning point. I stepped away from established
              management roles and dove into automation and code. Discovering software wasn't just
              finding a new career — it was like finally finding the right lens for my eyes. The
              moment I wrote my first script to solve a problem that had plagued a team for months,
              the spark became a fire.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — ROOTS: photo + quote
          ═══════════════════════════════════════ */}
      <section className="am3-pq">
        <div className="am3-pq__photo">
          <img src={familyHeros} alt="Family" className="am3-pq__img" />
        </div>
        <div className="am3-pq__text">
          <span className="am3-section-eyebrow">02 &nbsp;—&nbsp; Roots</span>
          <blockquote className="am3-pq__quote">
            Every late night debugging was a brick laid in the foundation of the life I want
            to build for them.
          </blockquote>
          <p className="am3-pq__caption">
            My daughters are the true architects of my ambition.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          AVATAR NOTE — terminal annotation
          ═══════════════════════════════════════ */}
      <div className="am3-avatar-note">
        <span className="am3-avatar-note-prompt">&gt; NOTE:</span>
        <p>
          You might notice my family looks a little more "animated" than your average crew.
          While we're a pretty lively bunch in person, these cartoon avatars are our high-tech
          digital armor — a playful safety mechanism to keep my girls safe while I share our
          story with the vastness of the internet. Think of it as our own personal firewall,
          rendered in 2D.
        </p>
      </div>

      {/* ═══════════════════════════════════════
          SECTION 4 — ZOE (2-col: text left, image right)
          ═══════════════════════════════════════ */}
      <section className="am3-split am3-split--reverse">
        <div className="am3-split__text">
          <span className="am3-section-eyebrow">03 &nbsp;—&nbsp; Zoe</span>
          <h2 className="am3-split-heading">She Changed<br />Everything</h2>
          <p className="am3-split-body">
            Being a father isn't just a role I play — it's the lens through which I see every
            opportunity and every challenge. My daughters, especially Zoe, are the true architects
            of my ambition.
          </p>
          <p className="am3-split-body">
            Every bold career pivot and every late night spent debugging was a brick laid in
            the foundation of the life I want to provide for them. They are my greatest project,
            my most rewarding "ship," and the reason I refuse to settle for anything less
            than excellence.
          </p>
          <div className="am3-split-accent">
            <div className="am3-accent-line" />
            <span className="am3-accent-text">Zoe · My Greatest Project</span>
          </div>
        </div>
        <div className="am3-split__frame">
          <CyberFrame
            src={zoeDaddy}
            description="Zoe and Daddy on the Enterprise campus"
            style={{ height: '100%', minHeight: '420px' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — MY GIRLS: quote + photo
          ═══════════════════════════════════════ */}
      <section className="am3-pq am3-pq--flip">
        <div className="am3-pq__text am3-pq__text--amber">
          <span className="am3-section-eyebrow am3-section-eyebrow--amber">04 &nbsp;—&nbsp; My Girls</span>
          <blockquote className="am3-pq__quote am3-pq__quote--amber">
            My Girls.<br />My Why.
          </blockquote>
        </div>
        <div className="am3-pq__photo">
          <img src={myGirls} alt="My Girls" className="am3-pq__img" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — WHAT I BUILD (text panel)
          ═══════════════════════════════════════ */}
      <section className="am3-panel am3-panel--warm">
        <div className="am3-panel__inner">
          <span className="am3-section-eyebrow am3-section-eyebrow--amber">05 &nbsp;—&nbsp; The Work</span>
          <h2 className="am3-panel-heading">Builder by Trade.<br />Caretaker by Heart.</h2>
          <div className="am3-panel-text">
            <p>
              My dreams aren't just about reaching the next level in tech — they're about the
              freedom to build a legacy that my family can be proud of. I want to create a world
              for my girls where curiosity is encouraged, where hard work is a given, and where
              they know their dad never stopped reaching for the best version of himself.
            </p>
            <p>
              My goal is to build systems that scale, but my priority is to nurture a home that
              thrives. I'm a builder by trade, a caretaker by heart, and a father above all else.
              This is me — quirks, passions, and a deep-seated drive to make every moment count
              for the people who call me "Dad."
            </p>
          </div>
          <div className="am3-panel-stats">
            <div className="am3-stat">
              <span className="am3-stat-num">10+</span>
              <span className="am3-stat-label">Years Leading Teams</span>
            </div>
            <div className="am3-stat">
              <span className="am3-stat-num">M+</span>
              <span className="am3-stat-label">Daily Transactions Served</span>
            </div>
            <div className="am3-stat">
              <span className="am3-stat-num">∞</span>
              <span className="am3-stat-label">Reasons to Keep Building</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7 — GALLERY ROW
          ═══════════════════════════════════════ */}
      <section className="am3-gallery">
        <div className="am3-gallery__inner">
          <CyberFrame
            src={zoe}
            description="Zoe"
            style={{ minHeight: '280px' }}
          />
          <CyberFrame
            src={adventure}
            description="A family adventure — photo placeholder"
            style={{ minHeight: '280px' }}
          />
          <CyberFrame
            src={ssj}
            description="A candid moment — photo placeholder"
            style={{ minHeight: '280px' }}
          />
        </div>
        <p className="am3-gallery-label">06 &nbsp;—&nbsp; Moments</p>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="am3-footer">
        <span className="am3-strip-label">erikmabes.com</span>
        <span className="am3-strip-line" />
        <span className="am3-strip-label am3-strip-label--right">Family · Engineering · Purpose</span>
      </div>
    </div>
  );
}

export default AboutMe3;
