import React, { useState, useEffect } from 'react';
import './ResumeTutorial.css';
import tutorial1 from '../assets/tutorials/tutorial1.png';
import tutorial2 from '../assets/tutorials/tutorial2.png';
import tutorial3 from '../assets/tutorials/tutorial3.png';

const ToolbarGuide = () => (
  <div className="tutorial-toolbar-guide">
    <div className="tutorial-toolbar-row">
      <span className="tutorial-toolbar-icon">⏸</span>
      <span className="tutorial-toolbar-label">Pause or resume the comet animations</span>
    </div>
    <div className="tutorial-toolbar-row">
      <span className="tutorial-toolbar-icon">⬇</span>
      <span className="tutorial-toolbar-label">Download a copy of the resume</span>
    </div>
    <div className="tutorial-toolbar-row">
      <span className="tutorial-toolbar-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM2.2 6.5h2.6v7H2.2v-7ZM6.5 6.5h2.5v1c.5-.8 1.5-1.2 2.5-1.2 2.2 0 2.5 1.5 2.5 3.4v3.8h-2.6V10.3c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.2H6.5v-7Z" />
        </svg>
      </span>
      <span className="tutorial-toolbar-label">Open LinkedIn profile</span>
    </div>
    <div className="tutorial-toolbar-row">
      <span className="tutorial-toolbar-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a7 7 0 0 0-2.21 13.64c.35.06.48-.15.48-.34v-1.2c-1.96.43-2.37-.95-2.37-.95-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.08.73 1.08.73.63 1.07 1.65.76 2.05.58.06-.46.24-.76.44-.93-1.56-.18-3.2-.78-3.2-3.48 0-.77.27-1.4.73-1.89-.08-.18-.32-.9.07-1.87 0 0 .59-.19 1.94.72a6.76 6.76 0 0 1 3.54 0c1.35-.91 1.94-.72 1.94-.72.39.97.14 1.69.07 1.87.45.5.72 1.12.72 1.89 0 2.71-1.65 3.3-3.22 3.47.26.22.48.66.48 1.33v1.97c0 .19.13.41.48.34A7 7 0 0 0 8 1Z" />
        </svg>
      </span>
      <span className="tutorial-toolbar-label">Open GitHub profile</span>
    </div>
  </div>
);

const SLIDES = [
  {
    image: tutorial1,
    title: 'Step 1 — Company Icons',
    description:
      'Click any company icon as it flies up the screen to reveal the roles held there. Click anywhere else to close.',
  },
  {
    image: tutorial2,
    title: 'Step 2 — Job Listings',
    description:
      'Click a job title from the list to open its full detail card. Click anywhere else to close the list.',
  },
  {
    image: tutorial3,
    title: 'Step 3 — Detail Card',
    description:
      'The detail card shows the role, key achievements, and skills. Click anywhere outside the card to dismiss it.',
  },
  {
    content: <ToolbarGuide />,
    title: 'Toolbar',
    description:
      'The toolbar on the right side of the screen gives you quick access to page controls.',
  },
];

const ResumeTutorial = ({ show, onClose }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (show) setSlide(0);
  }, [show]);

  if (!show) return null;

  const current = SLIDES[slide];

  const goPrev = (e) => {
    e.stopPropagation();
    setSlide(s => Math.max(s - 1, 0));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setSlide(s => Math.min(s + 1, SLIDES.length - 1));
  };

  return (
    <div className="tutorial-overlay" onClick={onClose}>
      <div className="tutorial-card" onClick={e => e.stopPropagation()}>

        <button className="tutorial-close" onClick={onClose} title="Close">✕</button>

        {current.image ? (
          <div className="tutorial-image-wrap">
            <img
              src={current.image}
              alt={`Tutorial step ${slide + 1}`}
              className="tutorial-image"
            />
          </div>
        ) : (
          <div className="tutorial-content-wrap">
            {current.content}
          </div>
        )}

        <div className="tutorial-body">
          <p className="tutorial-title">{current.title}</p>
          <p className="tutorial-description">{current.description}</p>
        </div>

        <div className="tutorial-nav">
          <button
            className="tutorial-nav__arrow"
            onClick={goPrev}
            disabled={slide === 0}
          >
            ‹
          </button>

          <div className="tutorial-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`tutorial-dot ${i === slide ? 'active' : ''}`}
                onClick={e => { e.stopPropagation(); setSlide(i); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="tutorial-nav__arrow"
            onClick={goNext}
            disabled={slide === SLIDES.length - 1}
          >
            ›
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResumeTutorial;
