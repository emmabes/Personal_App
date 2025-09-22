import React, { useState } from "react";
import ComingSoon from "./pages/ComingSoon";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="app-background">
        <ComingSoon />
      </div>
    </>
  );
}

export default App;
