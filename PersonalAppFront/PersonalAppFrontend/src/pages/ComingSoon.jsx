import React, { useState } from "react";
import "../App.css";

import homelogo from "../assets/homepage - no background.png";
import Motivator from "../components/motivator";

function ComingSoon() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p> </p>
      <h1 class="home-font">Welcome to erikmabes.com</h1>
      <p class="home-font">Erik Mabes' personal site coming soon!</p>
      <div>
        <img src={homelogo} className="logo" alt="home logo" />
      </div>
      <div className="card">
        <Motivator />
      </div>
    </>
  );
}

export default ComingSoon;
