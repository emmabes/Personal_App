import React from "react";
import "./StickyNote.css";

function StickyNote({ text, color = "yellow", show = false, animationKey }) {
  if (!show) return null;

  return (
    <div className="sticky-note-container">
      <div key={animationKey} className={`sticky-note ${color}`}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default StickyNote;
