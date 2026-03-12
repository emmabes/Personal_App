import React, { useState } from 'react';
import MediaFrame from './shared/MediaFrame';
import './WinterAbundance.css';
import snowscape from '../../assets/.scratch/snowscape-pan-4K.mp4';
import example1 from '../../assets/.scratch/real-photo-1.jfif';
import example2 from '../../assets/.scratch/real-photo-2.jfif';
import example3 from '../../assets/.scratch/real-photo-3.jfif';
import skiscape from '../../assets/.scratch/snowski-openride-full-hd.mp4';
import mudroom from '../../assets/.scratch/snow-rack-story-board2-image4.png';
import boardscape from '../../assets/.scratch/snowboard-gully-sidewind-full-hd.mp4';



const WinterAbundance = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="wa">

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className="wa-nav">
        <a href="/" className="wa-nav__logo">RIDGELINE</a>

        <ul className={`wa-nav__links ${menuOpen ? 'wa-nav__links--open' : ''}`}>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/configure">Build Yours</a></li>
          <li><a href="/our-story">Our Story</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>

        <button
          className="wa-nav__hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="wa-hero">
        <MediaFrame
          type="video-loop"
          asset="snowscape-pan-4K.mp4"
          src={snowscape}
          description="Sweeping 4K panoramic video of an unbroken alpine snowfield at golden hour — soft light, absolute silence, an entire mountain face untouched and waiting."
          fill
        />
        <div className="wa-hero__overlay">
          <p className="wa-eyebrow">The RIDGELINE Wall Rack</p>
          <h1 className="wa-hero__headline">
            Store the Season.<br />Live the Life.
          </h1>
          <p className="wa-hero__sub">
            Every board on your wall is a day you showed up for winter.
          </p>
          <div className="wa-hero__actions">
            <a href="/shop" className="wa-btn wa-btn--primary">Shop Now</a>
            <a href="/configure" className="wa-btn wa-btn--ghost">Build Your Configuration</a>
          </div>
        </div>
      </section>

      {/* ── PRODUCT INTRO ────────────────────────────────────────────── */}
      <section className="wa-intro">
        <div className="wa-intro__media">
          <MediaFrame
            src={example1}
            type="image"
            description="Clean editorial product photo: RIDGELINE rack mounted on a matte white wall — two snowboards and a pair of alpine skis arranged symmetrically, studio spotlight overhead, no visual distractions. The rack looks deliberate and expensive."
          />
        </div>
        <div className="wa-intro__copy">
          <span className="wa-eyebrow">Engineered for the Quiver</span>
          <h2>Your Gear Deserves<br />a Home This Good.</h2>
          <p>
            The RIDGELINE Wall Rack is a fully adjustable, wall-mounted storage system
            built for the way riders actually live. Every mount slides to any position along
            the rail — configuring for two boards, four skis, or any combination in between.
          </p>
          <p>
            Whether your season looks like weekend laps or three months in the Alps,
            RIDGELINE brings the same clean intention to every wall it touches.
          </p>
          <div className="wa-intro__links">
            <a href="/shop">See All Configurations →</a>
            <a href="/our-story">How RIDGELINE Was Built →</a>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="wa-features">
        <div className="wa-features__header">
          <span className="wa-eyebrow">What Makes It Different</span>
          <h2>Built for the Way You Ride</h2>
        </div>
        <div className="wa-features__grid">
          {[
            {
              title: 'Fully Adjustable Mounts',
              body: 'Every mount slides and locks to any position along the rail. Configure for your quiver today — reconfigure when your season changes tomorrow.',
            },
            {
              title: 'Wall-Mounted Precision',
              body: 'Engineered anchor points distribute load evenly across standard stud spacing. Installs in under an hour. Holds your heaviest gear without flex.',
            },
            {
              title: 'Boards, Skis, Both',
              body: 'Mixed quivers welcome. Snowboards, alpine skis, backcountry setups — RIDGELINE accommodates any combination without adapters or extra hardware.',
            },
            {
              title: 'Clean by Design',
              body: 'Anodized aluminum arms on a solid hardwood rail. The kind of object worth looking at every time you walk through the door.',
            },
          ].map((f, i) => (
            <div key={i} className="wa-feature-card">
              <div className="wa-feature-card__num">0{i + 1}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <div className="wa-features__cta">
          <a href="/configure" className="wa-btn wa-btn--outline">Build Your Configuration</a>
        </div>
      </section>

      {/* ── LIFESTYLE FULL-BLEED ─────────────────────────────────────── */}
      <section className="wa-lifestyle">
        <MediaFrame
          src={skiscape}
          type="video-loop"
          asset="snowski-openride-full-hd.mp4"
          description="Wide-angle video of a lone skier carving a long, graceful arc across an open, empty run at a resort — fresh corduroy, morning light, nobody else on the mountain. The definition of space and abundance."
          fill
        />
        <div className="wa-lifestyle__overlay">
          <blockquote className="wa-lifestyle__quote">
            "The season never has to end."
          </blockquote>
          <p>Build a life that overflows with winter.</p>
          <a href="/shop" className="wa-btn wa-btn--primary">Shop RIDGELINE</a>
        </div>
      </section>

      {/* ── THE COLLECTION ───────────────────────────────────────────── */}
      <section className="wa-collection">
        <div className="wa-collection__header">
          <span className="wa-eyebrow">The RIDGELINE System</span>
          <h2>Every Wall Has a Configuration</h2>
          <p>
            RIDGELINE ships as a complete system. Choose your rail length, mount count,
            and finish. The wall does the rest.
          </p>
        </div>
        <div className="wa-collection__grid">
          <div className="wa-collection__item">
            <MediaFrame
              src={example1}
              type="image"
              description="Product image of RIDGELINE in the 'Compact' configuration — 2-mount rail, two snowboards, matte black finish, mounted on a white drywall mudroom wall. Clean and minimal."
            />
            <h3>Compact</h3>
            <p>2 boards or 2 pairs of skis</p>
            <a href="/shop/compact">Shop Compact →</a>
          </div>
          <div className="wa-collection__item">
            <MediaFrame
              src={example2}
              type="image"
              description="Product image of RIDGELINE in the 'Standard' configuration — 4-mount rail, mixed snowboards and skis, natural walnut rail, mounted on cedar-planked wall. The hero product."
            />
            <h3>Standard</h3>
            <p>Up to 4 boards, skis, or any mix</p>
            <a href="/shop/standard">Shop Standard →</a>
          </div>
          <div className="wa-collection__item">
            <MediaFrame
              src={example3}
              type="image"
              description="Product image of RIDGELINE in the 'Family' configuration — 6-mount extended rail, full family quiver of colorful boards and skis, mounted on a wide garage wall. Full household organized."
            />
            <h3>Family</h3>
            <p>Up to 6 boards and skis</p>
            <a href="/shop/family">Shop Family →</a>
          </div>
        </div>
      </section>

      {/* ── THE RITUAL ───────────────────────────────────────────────── */}
      <section className="wa-ritual">
        <div className="wa-ritual__media">
          <MediaFrame
            src={mudroom}
            type="image"
            asset="snow-rack-story-board2-image3.png"
            description="Lifestyle photo of a tidy garage mudroom at dusk: RIDGELINE rack mounted on warm cedar planking, three boards and a set of skis hung neatly. Snow boots lined below. Garage door half-open with soft snowfall visible outside. Dog lying nearby. Warm overhead light."
          />
        </div>
        <div className="wa-ritual__copy">
          <span className="wa-eyebrow">The After-Ride Ritual</span>
          <h2>The Rack That<br />Waits for You.</h2>
          <p>
            There is a particular satisfaction in the end of a perfect day. You unclip your
            boots, hang your board, and hear the mount click into place. Order restored.
            The day's gear becomes tomorrow's anticipation.
          </p>
          <p>
            The RIDGELINE Rack is not just storage. It is the threshold between your
            adventure and your comfort — the last motion before the warmth of everything
            waiting for you inside.
          </p>
          <p>
            Build your wall. Then go enjoy it.
          </p>
          <a href="/configure" className="wa-btn wa-btn--outline">Configure Your Rack →</a>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="wa-testimonials" id="reviews">
        <div className="wa-testimonials__header">
          <span className="wa-eyebrow">What Riders Are Saying</span>
          <h2>The Wall That Changed the Room</h2>
        </div>
        <div className="wa-testimonials__grid">
          {[
            {
              quote: "I've been through three seasons with my RIDGELINE. My garage went from complete chaos to something I'm genuinely proud of. My wife called it 'gallery-worthy.'",
              name: 'James R.',
              location: 'Park City, UT',
            },
            {
              quote: "We have four kids who all ski or board. RIDGELINE fits all six sets of gear on one wall. I didn't think that was actually possible.",
              name: 'Maria & Tom K.',
              location: 'Steamboat Springs, CO',
            },
            {
              quote: "The adjustable mounts are the real feature. I swapped from boards to skis mid-season and it took five minutes. No tools, no hassle, no second-guessing.",
              name: 'Derek S.',
              location: 'Whistler, BC',
            },
          ].map((t, i) => (
            <div key={i} className="wa-testimonial">
              <p className="wa-testimonial__quote">"{t.quote}"</p>
              <div className="wa-testimonial__author">
                <strong>{t.name}</strong>
                <span>{t.location}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="wa-testimonials__cta">
          <a href="/reviews">Read All Reviews →</a>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section className="wa-cta">
        <MediaFrame
          src={boardscape}
          type="video-loop"
          asset="snowboard-slow-ride-full-hd.mp4"
          description="Smooth, meditative video of a snowboarder making long, unhurried turns down a wide empty run at end of day — golden light, soft snow. The feeling of having all the time in the world."
          fill
        />
        <div className="wa-cta__overlay">
          <h2>Your Next Season<br />Starts on This Wall.</h2>
          <p>Choose your configuration. Mount your gear. Own your winter.</p>
          <div className="wa-cta__actions">
            <a href="/shop" className="wa-btn wa-btn--primary">Shop Now</a>
            <a href="/configure" className="wa-btn wa-btn--ghost">Build Your Configuration</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="wa-footer">
        <div className="wa-footer__top">
          <div className="wa-footer__brand">
            <span className="wa-footer__logo">RIDGELINE</span>
            <p>Wall storage for people who live for winter.</p>
          </div>
          <div className="wa-footer__nav-group">
            <h4>Shop</h4>
            <a href="/shop/compact">Compact Rack</a>
            <a href="/shop/standard">Standard Rack</a>
            <a href="/shop/family">Family Rack</a>
            <a href="/configure">Build Yours</a>
          </div>
          <div className="wa-footer__nav-group">
            <h4>Company</h4>
            <a href="/our-story">Our Story</a>
            <a href="/reviews">Reviews</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="wa-footer__nav-group">
            <h4>Orders</h4>
            <a href="/shipping">Shipping</a>
            <a href="/returns">Returns</a>
            <a href="/warranty">Warranty</a>
            <a href="/install">Installation Guide</a>
          </div>
        </div>
        <div className="wa-footer__bottom">
          <span>© 2025 RIDGELINE. All rights reserved.</span>
          <div className="wa-footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default WinterAbundance;
