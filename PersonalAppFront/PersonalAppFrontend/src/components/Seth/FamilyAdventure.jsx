import React, { useState } from 'react';
import MediaFrame from './shared/MediaFrame';
import './FamilyAdventure.css';
import funny from '../../assets/.scratch/funny-marketing.mp4';
import flip from '../../assets/.scratch/snowboard-flip.mp4';
import garage from '../../assets/.scratch/snow-rack-story-board1-image2.png';
import lightmudroom from '../../assets/.scratch/snow-rack-story-board1-image1.png';
import choosing from '../../assets/.scratch/garage-early-am-excitement.png';
import hike from '../../assets/.scratch/snowboard-snow-hike-full-hd.mp4';
import putaway from '../../assets/.scratch/snow-rack-story-board2-image3.png';
import family from '../../assets/.scratch/family-ski.png';
import messygarage from '../../assets/.scratch/messygarage.png';
import cleangarage from '../../assets/.scratch/snow-rack-story-board2-image4.png';


const FamilyAdventure = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fa">

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className="fa-nav">
        <a href="/" className="fa-nav__logo">RIDGELINE</a>

        <ul className={`fa-nav__links ${menuOpen ? 'fa-nav__links--open' : ''}`}>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/configure">Build Yours</a></li>
          <li><a href="/our-story">Our Story</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>

        <button
          className="fa-nav__hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="fa-hero">
        <MediaFrame
          src={funny}
          type="video-loop"
          asset="snowboard-rampway-startoff-full-hd.mp4"
          description="Wide energetic video of a snowboarder launching off a natural ramp into open blue sky — daylight, snow spray, the explosive joy of a big day on the mountain. The camera catches the full arc of the jump. High energy, pure fun."
          fill
        />
        <div className="fa-hero__overlay">
          <p className="fa-eyebrow">Effortless Organization. More Time for Adventure.</p>
          <h1 className="fa-hero__headline">
            Your Whole Crew.<br />One Rack.
          </h1>
          <p className="fa-hero__sub">
            Every board on the wall is another reason to get back out there.
          </p>
          <div className="fa-hero__actions">
            <a href="/shop" className="fa-btn fa-btn--primary">Build Your Rack</a>
            <a href="/our-story" className="fa-btn fa-btn--ghost">Our Story</a>
          </div>
        </div>
      </section>

      {/* ── FAMILY MOMENT ────────────────────────────────────────────── */}
      <section className="fa-moment">
        <MediaFrame
          src={garage}
          type="image"
          asset="snow-rack-story-board1-image2.png"
          description="Lifestyle photo of a smiling father in a red jacket and two kids in bright teal winter coats standing in a snowy garage with the door open — golden retriever nearby, skis on the wall behind them. The car trunk is open, ready for the mountain. The energy is joyful and completely unstaged."
          fill
        />
        <div className="fa-moment__overlay">
          <h2>Organize Your Adventures.</h2>
          <p>
            When the gear is handled, everything else gets easier. Pack faster.
            Load up faster. Hit the road before the good snow is gone.
          </p>
          <a href="/shop" className="fa-btn fa-btn--primary">Shop Now</a>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────────── */}
      <section className="fa-intro">
        <div className="fa-intro__copy">
          <span className="fa-eyebrow">The RIDGELINE Wall Rack</span>
          <h2>For the Family<br />That Lives for Winter.</h2>
          <p>
            The RIDGELINE Wall Rack holds your full family quiver — two boards, six sets of
            skis, or any mix you can throw at it. Fully adjustable mounts mean every family
            member's gear has a spot, and reconfiguring takes minutes.
          </p>
          <p>
            Wall-mounted. Built from anodized aluminum and hardwood. Installs in under
            an hour and holds everything without complaint. Your garage finally looks
            like it belongs to a family that actually uses it.
          </p>
          <div className="fa-intro__links">
            <a href="/shop">See All Sizes →</a>
            <a href="/configure">Build Your Configuration →</a>
          </div>
        </div>
        <div className="fa-intro__media">
          <MediaFrame
            src={lightmudroom}
            type="image"
            asset="snow-rack-story-board1-image1.png"
            description="Product lifestyle photo: RIDGELINE rack on a bright white mudroom wall — a little girl in pink snow gear holding a small colorful snowboard, a boy in teal reaching up to hang his board. Two adult boards already on the rack. Boots below. Everything organized. The kids look proud."
          />
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="fa-features">
        <div className="fa-features__header">
          <span className="fa-eyebrow">Why RIDGELINE</span>
          <h2>Less Time in the Garage.<br />More Time on the Mountain.</h2>
        </div>
        <div className="fa-features__grid">
          {[
            {
              title: 'Fits Your Whole Quiver',
              body: "From the little one's first board to the touring skis you only bring out on powder days — RIDGELINE holds the whole family's gear on one wall.",
            },
            {
              title: 'Kids Can Use It',
              body: 'Low-profile mounts and a rail at a height that works for everyone. Getting gear on and off the rack is something kids do themselves — which means one less thing for you.',
            },
            {
              title: 'Adjusts as They Grow',
              body: "Slide any mount to any position in seconds. As your kids level up and their quivers change, RIDGELINE changes with them. No new hardware needed.",
            },
            {
              title: 'Built for the Garage',
              body: 'Anodized aluminum handles cold temperatures and humidity without complaint. Cedar wall, drywall, plywood — it installs anywhere and stays put.',
            },
            {
              title: 'Packs Faster',
              body: 'When every board has a home, you stop looking for things. Wake up, pull the gear off the wall, load the car. Out the door before 7am.',
            },
            {
              title: 'Looks the Part',
              body: 'Because a garage that looks organized is a garage you actually want to use. Hardwood rail, clean aluminum, no visual clutter.',
            },
          ].map((f, i) => (
            <div key={i} className="fa-feature-card">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <a href="/configure" className="fa-btn fa-btn--outline">Configure Your Rack</a>
      </section>

      {/* ── A DAY IN THE LIFE ─────────────────────────────────────────── */}
      <section className="fa-day">
        <div className="fa-day__header">
          <span className="fa-eyebrow">A Day With RIDGELINE</span>
          <h2>Morning to Evening.</h2>
        </div>
        <div className="fa-day__steps">
          <div className="fa-day__step">
            <div className="fa-day__step-num">6:45 am</div>
            <MediaFrame
              src={choosing}
              type="image"
              description="Photo of a parent and child in pajamas standing at the RIDGELINE rack in an open garage doorway at dawn — selecting gear by headlamp light, breath visible in cold air, boards hanging neatly behind them. Excited energy."
            />
            <h3>Gear pulls fast.</h3>
            <p>Every board has a home. Nobody's digging through a pile. You're loaded and pulling out before 7.</p>
          </div>
          <div className="fa-day__step">
            <div className="fa-day__step-num">10:00 am</div>
            <MediaFrame
              src={hike}
              type="video-loop"
              asset="snowtrail-couple-walk-follow-full-hd.mp4"
              description="Warmly lit video of a family hiking up a snowy trail in snowboard boots, carrying boards — two kids out front, parents following, all laughing. Snow-covered pines, bright blue sky. The pure joy of being outside together."
            />
            <h3>Everyone rides.</h3>
            <p>Board days are family days. All gear accounted for. Nobody left out.</p>
          </div>
          <div className="fa-day__step">
            <div className="fa-day__step-num">4:30 pm</div>
            <MediaFrame
              src={putaway}
              type="image"
              asset="snow-rack-story-board2-image3.png"
              description="Photo of a father and child hanging snowboards back on the RIDGELINE rack in a warm cedar garage — golden retriever lying nearby watching, snow melting off boots on the mat, garage door still open with blue dusk sky visible outside. Satisfied, tired, happy."
            />
            <h3>Everything goes back up.</h3>
            <p>The rack waits exactly where you left it. Boards up, boots off, day done.</p>
          </div>
        </div>
      </section>

      {/* ── FAMILY FULL-BLEED ────────────────────────────────────────── */}
      <section className="fa-fullbleed">
        <MediaFrame
          src={family}
          type="image"
          asset="snow-rack-story-board-2.png"
          description="Wide joyful photo of a family of four at the top of a ski run — colorful gear, poles raised, big smiles, mountain valley visible behind them. The father has a child on his shoulders. Pure winter family energy."
          fill
        />
        <div className="fa-fullbleed__overlay">
          <h2>Built for the Family<br />That Earns These Moments.</h2>
          <a href="/shop" className="fa-btn fa-btn--primary">Shop RIDGELINE</a>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="fa-testimonials" id="reviews">
        <span className="fa-eyebrow">What Families Are Saying</span>
        <h2>Real Garages. Real Families.</h2>
        <div className="fa-testimonials__grid">
          {[
            {
              quote: "My kids used to just throw their boards anywhere. Now they actually hang them up themselves. Something about the rack made it feel official to them.",
              name: 'Beth & Aaron T.',
              location: 'Salt Lake City, UT',
            },
            {
              quote: "We went from dreading gear prep to it being a 10-minute thing. The kids know where everything is. I know where everything is. That's everything.",
              name: 'Mark H.',
              location: 'Lake Tahoe, CA',
            },
            {
              quote: "RIDGELINE holds all four of our family's boards and a set of skis on a single wall. I didn't think that was possible until I saw it with my own eyes.",
              name: 'Priya & Josh N.',
              location: 'Denver, CO',
            },
          ].map((t, i) => (
            <div key={i} className="fa-testimonial">
              <p className="fa-testimonial__quote">"{t.quote}"</p>
              <div className="fa-testimonial__author">
                <strong>{t.name}</strong>
                <span> — {t.location}</span>
              </div>
            </div>
          ))}
        </div>
        <a href="/reviews" className="fa-reviews-link">Read All Reviews →</a>
      </section>

      {/* ── BEFORE / AFTER INTRO ─────────────────────────────────────── */}
      <section className="fa-split-intro">
        <span className="fa-eyebrow">The Difference It Makes</span>
        <h2>Same Gear.<br />Completely Different Garage.</h2>
        <p>
          Gear doesn't organize itself. Without a system, boards lean wherever they land,
          skis claim the floor, and every departure starts with a search party.
        </p>
        <p>
          RIDGELINE puts every piece in its place — on the wall, off the floor,
          ready to grab. The garage your family deserves.
        </p>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────── */}
      <section className="fa-split">
        <div className="fa-split__panel fa-split__panel--before">
          <MediaFrame
            src={messygarage}
            type="image"
            description="Photo of a cluttered family garage: snowboards propped against the wall at odd angles, skis laid across the floor, kids' gear piled on a bench, boots scattered everywhere. Flat overhead light. Feels chaotic — like every morning is a scavenger hunt."
          />
          <div className="fa-split__label">Before RIDGELINE</div>
        </div>
        <div className="fa-split__panel fa-split__panel--after">
          <MediaFrame
            src={cleangarage}
            type="image"
            asset="snow-rack-story-board1-image1.png"
            description="Photo of the same garage transformed: RIDGELINE rack on a bright white wall, the whole family's boards and skis hung neatly — kids' boards low, adult boards above. Boots lined below. Everything exactly where it belongs. A golden retriever on the mat."
          />
          <div className="fa-split__label">With RIDGELINE</div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="fa-cta">
        <h2>Your Crew Is Ready.<br />Is Your Wall?</h2>
        <p>
          Choose your size. Pick your finish. Mount it this weekend.
          Hit the mountain by next Friday.
        </p>
        <div className="fa-cta__actions">
          <a href="/shop" className="fa-btn fa-btn--primary">Shop Now</a>
          <a href="/configure" className="fa-btn fa-btn--outline">Build Your Configuration</a>
        </div>
        <div className="fa-cta__links">
          <a href="/faq">Questions? Read the FAQ →</a>
          <a href="/install">See the Installation Guide →</a>
          <a href="/shipping">Shipping & Delivery →</a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="fa-footer">
        <div className="fa-footer__top">
          <div className="fa-footer__brand">
            <span className="fa-footer__logo">RIDGELINE</span>
            <p>More time for adventure. Guaranteed.</p>
          </div>
          <div className="fa-footer__nav-group">
            <h4>Shop</h4>
            <a href="/shop/compact">Compact Rack</a>
            <a href="/shop/standard">Standard Rack</a>
            <a href="/shop/family">Family Rack</a>
            <a href="/configure">Build Yours</a>
          </div>
          <div className="fa-footer__nav-group">
            <h4>Company</h4>
            <a href="/our-story">Our Story</a>
            <a href="/reviews">Reviews</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="fa-footer__nav-group">
            <h4>Orders</h4>
            <a href="/shipping">Shipping</a>
            <a href="/returns">Returns</a>
            <a href="/warranty">Warranty</a>
            <a href="/install">Installation Guide</a>
          </div>
        </div>
        <div className="fa-footer__bottom">
          <span>© 2025 RIDGELINE. All rights reserved.</span>
          <div className="fa-footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default FamilyAdventure;
