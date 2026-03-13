import React, { useState } from 'react';
import Comet from '../components/Comet';
import ResumeTutorial from '../components/ResumeTutorial';
import amazonLogo from '../assets/job logos/amazon_logo.png';
import sizzlerLogo from '../assets/job logos/sizzler_logo.png';
import ritzLogo from '../assets/job logos/ritz_logo.png';
import topgolfLogo from '../assets/job logos/topgolf_logo.png';
import degreeLogo from '../assets/job logos/Degree_logo.png';
import JOB_DETAILS from '../data/jobDetails.json';
import './Resume.css';

const COLOR_SIZZLER = [255, 160, 160];
const COLOR_RITZ = [230, 230, 255];
const COLOR_AMAZON = [255, 220, 160];
const COLOR_TOPGOLF = [160, 160, 255];
const COLOR_DEGREE = [100, 100, 255];

const JOBS_SIZZLER = ['Director of Operations', 'Project Manager', 'Manager, Training Supervisor', ];
const JOBS_RITZ = ['Shift Lead, Training Server'];
const JOBS_AMAZON = ['Software Development Engineer I', 'Amazon Technical Academy', 'Project Coordinator', 'Staffing Ambassador', 'Fulfillment Associate'];
const JOBS_TOPGOLF = ['Lead Bartender, Certified Trainer'];
const JOBS_DEGREE = ['BS Neuroscience & Cognitive Science', 'AAS Health Science'];

const SIGN_URL_ENDPOINT = import.meta.env.VITE_SIGN_URL_ENDPOINT;

// Comets feel too fast on small screens — slow them down proportionally
const MOBILE_SPEED_MULT = window.innerWidth <= 768 ? 2.2 : 1.0;

const Resume = () => {
  const [paused, setPaused] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleDownload = async () => {
    if (downloading || !SIGN_URL_ENDPOINT) return;
    setDownloading(true);
    try {
      const res = await fetch(SIGN_URL_ENDPOINT);
      const { url } = await res.json();
      window.open(url, '_blank');
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="resume-page">
      <Comet image={sizzlerLogo}
        startX={0.15} speed={6.5 * MOBILE_SPEED_MULT} color={COLOR_SIZZLER}
        startDelay={600} paused={paused} jobs={JOBS_SIZZLER}
        jobDetails={JOB_DETAILS} />
      <Comet image={ritzLogo}
        startX={0.3} speed={5.25 * MOBILE_SPEED_MULT} color={COLOR_RITZ}
        fade={.4} paused={paused} jobs={JOBS_RITZ}
        jobDetails={JOB_DETAILS} />
      <Comet image={degreeLogo}
        startX={0.5} speed={6.25 * MOBILE_SPEED_MULT} color={COLOR_DEGREE}
        startDelay={1500} paused={paused} jobs={JOBS_DEGREE}
        jobDetails={JOB_DETAILS} />
      <Comet image={amazonLogo}
        startX={0.7} speed={5.75 * MOBILE_SPEED_MULT} color={COLOR_AMAZON}
        startDelay={1500} paused={paused} jobs={JOBS_AMAZON}
        jobDetails={JOB_DETAILS} />
      <Comet image={topgolfLogo}
        startX={0.85} speed={5.0 * MOBILE_SPEED_MULT} color={COLOR_TOPGOLF}
        fade={.6} paused={paused} jobs={JOBS_TOPGOLF}
        jobDetails={JOB_DETAILS} />
      <button
        className="resume-instructions-btn"
        onClick={() => setShowTutorial(t => !t)}
        title="How to use"
      >
        Instructions
      </button>

      <ResumeTutorial show={showTutorial} onClose={() => setShowTutorial(false)} />

      <div className="resume-toolbar">
        <button
          className="resume-toolbar__btn"
          onClick={() => setPaused(p => !p)}
          title={paused ? 'Play' : 'Pause'}
        >
          {paused ? '\u25B6' : '\u275A\u275A'}
        </button>
        <button
          className="resume-toolbar__btn"
          onClick={handleDownload}
          disabled={downloading}
          title="Download Resume"
        >
{downloading ? '\u23F3' : '\u2913'}
        </button>
        <a
          className="resume-toolbar__btn"
          href="#"
          title="LinkedIn"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM2.2 6.5h2.6v7H2.2v-7ZM6.5 6.5h2.5v1c.5-.8 1.5-1.2 2.5-1.2 2.2 0 2.5 1.5 2.5 3.4v3.8h-2.6V10.3c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.2H6.5v-7Z" />
          </svg>
        </a>
        <a
          className="resume-toolbar__btn"
          href="#"
          title="GitHub"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 0 0-2.21 13.64c.35.06.48-.15.48-.34v-1.2c-1.96.43-2.37-.95-2.37-.95-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.08.73 1.08.73.63 1.07 1.65.76 2.05.58.06-.46.24-.76.44-.93-1.56-.18-3.2-.78-3.2-3.48 0-.77.27-1.4.73-1.89-.08-.18-.32-.9.07-1.87 0 0 .59-.19 1.94.72a6.76 6.76 0 0 1 3.54 0c1.35-.91 1.94-.72 1.94-.72.39.97.14 1.69.07 1.87.45.5.72 1.12.72 1.89 0 2.71-1.65 3.3-3.22 3.47.26.22.48.66.48 1.33v1.97c0 .19.13.41.48.34A7 7 0 0 0 8 1Z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Resume;
