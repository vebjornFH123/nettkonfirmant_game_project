import "./App.css";
import Navbar from "./modules/navbar";
import Game1 from "./modules/game1/game1";
import Game2 from "./modules/game2/game2";
import { useState } from "react";

function App() {
  const [appView, setAppView] = useState(<Game1 />);
  function navigateInApp(game) {
    if (game === "game1") {
      setAppView(<Game1 />);
    } else if (game === "game2") {
      setAppView(<Game2 />);
    }
  }
  return (
    <div className="App">
      <Navbar navigateInApp={navigateInApp} />
      {appView}
    </div>
  );
}

export default App;
