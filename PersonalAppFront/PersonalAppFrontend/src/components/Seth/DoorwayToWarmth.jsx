import React, { useState } from 'react';
import MediaFrame from './shared/MediaFrame';
import './DoorwayToWarmth.css';
import warmcabin from '../../assets/.scratch/snow-cabin-fire-full-hd.mp4';
import rusticgarage from '../../assets/.scratch/snow-rack-story-board2-image3.png';
import warmmudroom from '../../assets/.scratch/warmmudroom.png';
import messygarage from '../../assets/.scratch/messygarage.png';
import cleangarage from '../../assets/.scratch/snow-rack-story-board2-image4.png';
import snowpair from '../../assets/.scratch/snow-couple-standing-nuzzle-full-hd.mp4';
import warmlifestyle from '../../assets/.scratch/warmlifestyle.png';

const DoorwayToWarmth = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dtw">

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className="dtw-nav">
        <a href="/" className="dtw-nav__logo">RIDGELINE</a>

        <ul className={`dtw-nav__links ${menuOpen ? 'dtw-nav__links--open' : ''}`}>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/configure">Build Yours</a></li>
          <li><a href="/our-story">Our Story</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>

        <button
          className="dtw-nav__hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="dtw-hero">
        <MediaFrame
          src={warmcabin}
          type="video-loop"
          asset="snow-cabin-hd.mp4"
          description="Cinematic wide shot of a snow-dusted mountain cabin at dusk — warm amber light spilling from every window, a single thread of chimney smoke, snowflakes drifting in slow motion. The outside is cold and still. The inside is alive with warmth."
          fill
        />
        <div className="dtw-hero__overlay">
          <h1 className="dtw-hero__headline">The First<br />Step Home.</h1>
          <p className="dtw-hero__sub">
            Your gear belongs here.<br />You belong inside.
          </p>
          <a href="/shop" className="dtw-btn dtw-btn--warm">Find Your Fit</a>
        </div>
      </section>

      {/* ── THRESHOLD SECTION ────────────────────────────────────────── */}
      <section className="dtw-threshold">
        <div className="dtw-threshold__copy">
          <span className="dtw-eyebrow">The Ritual</span>
          <h2>There Is a Moment<br />at the End of Every Great Day.</h2>
          <p>
            You know it by feel. Cold cheeks. Tired legs. The particular kind of satisfied
            that only comes from a day fully spent on a mountain.
          </p>
          <p>
            You push open the door and the warmth meets you — but only after the board
            goes up. The boots come off. The gear finds its place on the wall.
            Order restored. The threshold crossed.
          </p>
          <p>
            That moment — that small, satisfying ritual — is what RIDGELINE was built for.
          </p>
        </div>
        <div className="dtw-threshold__media">
          <MediaFrame
            src={rusticgarage}
            type="image"
            asset="snow-rack-story-board1-image1.png"
            description="Intimate close-up of a snowboard being lifted onto a RIDGELINE wall mount — warm amber light from indoors washing over the board, snow and cold blue light still visible in a doorway behind. The exact moment of transition."
          />
        </div>
      </section>

      {/* ── THE PRODUCT ──────────────────────────────────────────────── */}
      <section className="dtw-product">
        <span className="dtw-eyebrow">The RIDGELINE Wall Rack</span>
        <h2 className="dtw-product__headline">Your Gear Belongs Here.</h2>
        <div className="dtw-product__showcase">
          <MediaFrame
            src={warmmudroom}
            type="image"
            description="Warm-lit lifestyle product photo: RIDGELINE rack on a dark wood-paneled mudroom wall — two snowboards and one pair of skis hung neatly. Amber Edison bulb overhead. Snow boots lined below on a woven mat. A scarf and jacket hang on nearby hooks. The whole scene feels like someone's real home."
          />
        </div>
        <div className="dtw-product__specs">
          <div className="dtw-spec">
            <span className="dtw-eyebrow">Adjusts to Anything</span>
            <p>
              Every mount slides and locks to any position. Switch from boards to skis in
              minutes. RIDGELINE adapts to your season without a second thought.
            </p>
          </div>
          <div className="dtw-spec">
            <span className="dtw-eyebrow">Built for Real Homes</span>
            <p>
              Installs on standard stud spacing in under an hour. Holds your heaviest gear
              without flex or worry. Cedar, pine, drywall — it works everywhere.
            </p>
          </div>
          <div className="dtw-spec">
            <span className="dtw-eyebrow">Worth Looking At</span>
            <p>
              Warm-toned anodized aluminum and solid walnut rail. The kind of object that
              earns a quiet nod every time you walk past it.
            </p>
          </div>
          <div className="dtw-spec">
            <span className="dtw-eyebrow">Every Combination</span>
            <p>
              Snowboards, alpine skis, backcountry gear, and everything in between.
              Your whole quiver on one wall.
            </p>
          </div>
        </div>
        <a href="/configure" className="dtw-btn dtw-btn--outline">Configure Your Rack</a>
      </section>

      {/* ── WARMTH AWAITS ────────────────────────────────────────────── */}
      <section className="dtw-warmth">
        <MediaFrame
          src={snowpair}
          type="video-loop"
          asset="snow-couple-standing-nuzzle-full-hd.mp4"
          description="Slow, warm video of a couple in heavy winter coats standing close together outside — breath visible in cold air, foreheads touching, the last moment before stepping inside. The intimacy of being cold together and knowing warmth is seconds away."
          fill
        />
        <div className="dtw-warmth__overlay">
          <h2>Everything Good Is<br />Waiting on the Other Side.</h2>
          <p>Hang your gear. Step inside. The rest takes care of itself.</p>
          <a href="/shop" className="dtw-btn dtw-btn--warm">Shop RIDGELINE</a>
        </div>
      </section>

      {/* ── BEFORE / AFTER INTRO ─────────────────────────────────────── */}
      <section className="dtw-split-intro">
        <span className="dtw-eyebrow">The Difference It Makes</span>
        <h2>A Place for Everything.<br />Finally.</h2>
        <p>
          Winter gear has a way of taking over a home. Boards lean against walls.
          Skis claim floor space. Jackets pile on whatever surface will hold them.
          It's not a character flaw — it's just what happens without the right system.
        </p>
        <p>
          RIDGELINE gives every piece of gear a permanent, intentional home on your wall.
          The result isn't just tidier — it's calmer. The kind of calm that greets you
          at the door every time you walk in.
        </p>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────── */}
      <section className="dtw-split">
        <div className="dtw-split__panel dtw-split__panel--cold">
          <MediaFrame
            src={messygarage}
            type="image"
            description="Photo of a cluttered garage entryway: snowboards leaning against a wall at odd angles, skis on the floor, boots scattered, damp jackets piled on a bench. Functional but chaotic. Lit with flat overhead fluorescent light. Feels stressful."
            />
          <div className="dtw-split__label">Before RIDGELINE</div>
        </div>
        <div className="dtw-split__panel dtw-split__panel--warm">
          <MediaFrame
            src={cleangarage}
            type="image"
            asset="snow-rack-story-board2-image4.png"
            description="Photo of the same garage entryway transformed: RIDGELINE rack on the wall, boards and skis hung neatly with color-coordinated spacing, boots lined below, hooks for jackets beside. Warm Edison overhead. A golden retriever curled on a mat. Everything in its place."
          />
          <div className="dtw-split__label">With RIDGELINE</div>
        </div>
      </section>

      {/* ── WARMTH OBJECTS ───────────────────────────────────────────── */}
      <section className="dtw-interior">
        <div className="dtw-interior__copy">
          <span className="dtw-eyebrow">The Other Side</span>
          <h2>The Rack Earns<br />What Comes Next.</h2>
          <p>
            A bowl of chili. A mug of something warm. Thick socks and a couch that hasn't
            moved. The kind of evening that only feels this good because of the kind of day
            that came before it.
          </p>
          <p>
            RIDGELINE is the bridge between those two worlds. The last thing you touch
            before the warmth finds you.
          </p>
          <a href="/our-story">Read the Story Behind RIDGELINE →</a>
        </div>
        <div className="dtw-interior__media">
          <MediaFrame
           src={warmlifestyle}
            type="image"
            description="Warm interior lifestyle image: a rustic kitchen with exposed wood beams and stone counters — two mugs of steaming hot cocoa on a worn wooden table, a bowl of food nearby, a thick wool blanket draped over a chair in the background. Snow visible through a window. The feeling of earned comfort."
          />
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="dtw-testimonials" id="reviews">
        <span className="dtw-eyebrow">What Riders Are Saying</span>
        <h2>The Rack Changed<br />More Than the Wall.</h2>
        <div className="dtw-testimonials__grid">
          {[
            {
              quote: "My mudroom used to be the most stressful part of our house. Boards everywhere. Now I look at it and feel genuinely calm. That sounds dramatic, but the rack changed that.",
              name: 'Kira M.',
              location: 'Breckenridge, CO',
            },
            {
              quote: "There's something about coming home, hanging the board, pouring a drink. RIDGELINE made that feel like a real ritual. Like the end of the day actually meant something.",
              name: 'Sam O.',
              location: 'Jackson Hole, WY',
            },
            {
              quote: "I bought it for the storage. I kept it for the way it makes my whole entryway feel. My house finally looks like a mountain home.",
              name: 'Elise V.',
              location: 'Tahoe City, CA',
            },
          ].map((t, i) => (
            <div key={i} className="dtw-testimonial">
              <p className="dtw-testimonial__quote">"{t.quote}"</p>
              <div className="dtw-testimonial__author">
                <strong>{t.name}</strong>
                <span> — {t.location}</span>
              </div>
            </div>
          ))}
        </div>
        <a href="/reviews" className="dtw-reviews-link">Read All Reviews →</a>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="dtw-cta">
        <h2>Your Gear. Your Home.<br />Your Ritual.</h2>
        <p>The RIDGELINE Wall Rack. Configure yours today.</p>
        <div className="dtw-cta__actions">
          <a href="/shop" className="dtw-btn dtw-btn--warm">Shop Now</a>
          <a href="/configure" className="dtw-btn dtw-btn--outline">Build Your Configuration</a>
        </div>
        <div className="dtw-cta__links">
          <a href="/faq">Questions? Read the FAQ →</a>
          <a href="/install">Installation Guide →</a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="dtw-footer">
        <div className="dtw-footer__top">
          <div className="dtw-footer__brand">
            <span className="dtw-footer__logo">RIDGELINE</span>
            <p>The last step before the warmth finds you.</p>
          </div>
          <div className="dtw-footer__nav-group">
            <h4>Shop</h4>
            <a href="/shop/compact">Compact Rack</a>
            <a href="/shop/standard">Standard Rack</a>
            <a href="/shop/family">Family Rack</a>
            <a href="/configure">Build Yours</a>
          </div>
          <div className="dtw-footer__nav-group">
            <h4>Company</h4>
            <a href="/our-story">Our Story</a>
            <a href="/reviews">Reviews</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="dtw-footer__nav-group">
            <h4>Orders</h4>
            <a href="/shipping">Shipping</a>
            <a href="/returns">Returns</a>
            <a href="/warranty">Warranty</a>
            <a href="/install">Installation Guide</a>
          </div>
        </div>
        <div className="dtw-footer__bottom">
          <span>© 2025 RIDGELINE. All rights reserved.</span>
          <div className="dtw-footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default DoorwayToWarmth;
