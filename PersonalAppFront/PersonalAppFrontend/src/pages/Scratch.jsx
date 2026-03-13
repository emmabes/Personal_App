import React, { useState } from 'react';
import AboutMe1 from '../components/AboutMe/AboutMe1';
import AboutMe2 from '../components/AboutMe/AboutMe2';
import AboutMe3 from '../components/AboutMe/AboutMe3';
import './Scratch.css';

const VARIANTS = [
  { label: 'Signal & Soul', desc: '01' },
  { label: 'Dossier',       desc: '02' },
  { label: 'Homebase',      desc: '03' },
];

const pages = [<AboutMe1 />, <AboutMe2 />, <AboutMe3 />];

const Scratch = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="scratch-root">
      {/* ── Variant Switcher ── */}
      <div className="scratch-switcher">
        {VARIANTS.map((v, i) => (
          <button
            key={i}
            className={`scratch-tab ${active === i ? 'scratch-tab--active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="scratch-tab-num">{v.desc}</span>
            <span className="scratch-tab-label">{v.label}</span>
          </button>
        ))}
      </div>

      {/* ── Active Page ── */}
      <div className="scratch-page">
        {pages[active]}
      </div>
    </div>
  );
};

export default Scratch;
