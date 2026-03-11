import React, { useRef, useEffect, useState, useCallback } from 'react';
import JobsList from './JobsList';
import JobCard from './JobCard';

const Comet = ({
  color = [255, 220, 160],
  speed = 3,
  startX = 0.5,
  startY = 1.0,
  fade = 1.0,
  image = null,
  startDelay = 0,
  paused = false,
  jobs = [],
  jobDetails = {},
}) => {
  const canvasRef = useRef(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const [cardOpen, setCardOpen] = useState(false);
  const cardOpenRef = useRef(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const posRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const cardRef = useRef(null);
  const jobCardRef = useRef(null);
  const hitRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    let img = null;
    let imgW = 0;
    let imgH = 80;
    let imgReady = false;

    if (image) {
      img = new Image();
      img.src = image;
      img.onload = () => {
        imgW = (img.naturalWidth / img.naturalHeight) * imgH;
        imgReady = true;
      };
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const [r, g, b] = color;

    let startDelayTimeout;

    const state = {
      x: window.innerWidth * startX,
      y: window.innerHeight * startY,
      phase: startDelay > 0 ? 'waiting' : 'rising',
      mouseX: -9999,
      mouseY: -9999,
    };
    const trail = [];

    const influenceRadius = 150;
    const onMouseMove = (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
    };
    const onMouseLeave = () => {
      state.mouseX = -9999;
      state.mouseY = -9999;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const getSpeedMultiplier = () => {
      const dx = state.mouseX - state.x;
      const dy = state.mouseY - state.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= influenceRadius) return 1;
      return dist / influenceRadius;
    };

    let frameCount = 0;

    const pxSpeed = () => canvas.height / (speed * 60);
    const fadeRate = () => {
      const trailLength = canvas.height * 0.35;
      // Adjusted for emitting every 2nd frame
      return 0.8 / (trailLength / (pxSpeed() * 2));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trail dots — no shadowBlur, fake glow with a larger transparent circle
      ctx.shadowBlur = 0;
      for (const dot of trail) {
        const alpha = dot.opacity * fade;
        // Outer glow circle
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`;
        ctx.fill();
        // Core dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }

      // Comet head — shadowBlur only here (once per frame)
      if (state.phase === 'rising') {
        if (imgReady) {
          ctx.save();
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${0.5 * fade})`;
          ctx.shadowBlur = 40;
          ctx.globalAlpha = fade;
          ctx.drawImage(img, state.x - imgW / 2, state.y - imgH / 2, imgW, imgH);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(state.x, state.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fade})`;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${0.9 * fade})`;
          ctx.shadowBlur = 15;
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
    };

    const fadeTail = () => {
      const fr = fadeRate();
      let writeIdx = 0;
      for (let i = 0; i < trail.length; i++) {
        trail[i].opacity -= fr;
        if (trail[i].opacity > 0) {
          trail[writeIdx++] = trail[i];
        }
      }
      trail.length = writeIdx;
    };

    let lastTime = null;

    const tick = (now) => {
      const newPos = { x: state.x, y: state.y, w: imgW, h: imgH };
      if (frameCount % 10 === 0 &&
          (posRef.current.x !== newPos.x || posRef.current.y !== newPos.y ||
           posRef.current.w !== newPos.w)) {
        setPos(newPos);
      }
      posRef.current = newPos;

      if (pausedRef.current || cardOpenRef.current) {
        lastTime = null;
        draw();
        animationId = requestAnimationFrame(tick);
        return;
      }

      if (lastTime === null) lastTime = now;
      const dt = now - lastTime;
      lastTime = now;

      frameCount++;

      if (state.phase === 'rising') {
        const multiplier = getSpeedMultiplier();
        state.x = canvas.width * startX;
        state.y -= pxSpeed() * multiplier;

        if (frameCount % 2 === 0) {
          trail.push({ x: state.x, y: state.y, opacity: 0.8 });
        }

        fadeTail();

        if (state.y <= 0) {
          state.phase = 'topPause';
          state.topPauseElapsed = 0;
        }
      } else if (state.phase === 'topPause') {
        state.topPauseElapsed += dt;
        if (state.topPauseElapsed >= 1000) {
          trail.length = 0;
          state.y = canvas.height * startY;
          state.phase = 'rising';
        } else {
          fadeTail();
        }
      }

      draw();
      animationId = requestAnimationFrame(tick);
    };

    if (startDelay > 0) {
      startDelayTimeout = setTimeout(() => {
        state.phase = 'rising';
      }, startDelay);
    }

    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(startDelayTimeout);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [color, speed, startX, startY, fade, image, startDelay]);

  useEffect(() => {
    if (!cardOpen) return;
    const onClickOutside = (e) => {
      if (cardRef.current && cardRef.current.contains(e.target)) return;
      if (jobCardRef.current && jobCardRef.current.contains(e.target)) return;
      if (hitRef.current && hitRef.current.contains(e.target)) return;
      setCardOpen(false);
      cardOpenRef.current = false;
      setSelectedJob(null);
    };
    window.addEventListener('mousedown', onClickOutside);
    return () => window.removeEventListener('mousedown', onClickOutside);
  }, [cardOpen]);

  const handleClick = useCallback(() => {
    if (jobs.length === 0) return;
    setCardOpen(prev => {
      const next = !prev;
      cardOpenRef.current = next;
      return next;
    });
  }, [jobs.length]);

  const { x, y, w, h } = pos;
  const [r, g, b] = color;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
      {jobs.length > 0 && (
        <div
          ref={hitRef}
          onClick={handleClick}
          style={{
            position: 'absolute',
            left: x - w / 2,
            top: y - h / 2,
            width: w,
            height: h,
            cursor: 'pointer',
            zIndex: 5,
          }}
        />
      )}
      {cardOpen && (
        <JobsList
          ref={cardRef}
          jobs={jobs}
          color={color}
          onItemClick={(job) => setSelectedJob(prev => prev === job ? null : job)}
          style={{
            position: 'absolute',
            left: x,
            top: y + h / 2 - 5,
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        />
      )}
      {cardOpen && selectedJob && jobDetails[selectedJob] && (
        <div
          ref={jobCardRef}
          className="comet-card-wrap"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 11,
          }}
        >
          <button
            className="comet-card-close"
            onClick={() => {
              setCardOpen(false);
              cardOpenRef.current = false;
              setSelectedJob(null);
            }}
            aria-label="Close"
          >
            ✕
          </button>
          <JobCard
            {...jobDetails[selectedJob]}
            image={image}
            color={color}
          />
        </div>
      )}
    </>
  );
};

export default Comet;
