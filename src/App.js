import React, { useState } from "react";
import { flags } from "./data.js";
import "./App.css";

function App() {
  const [showFlag, setShowFlag] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState({});
  const [search, setSearch] = useState("");
  console.log("search", flags);
  const windowHeight = window.innerHeight - 80;
  function generateFlage(flag) {
    setSelectedFlag(flag);
    setShowFlag(true);
  }

  const styles = {
    container: {
      height: windowHeight,
    },
  };

  return (
    <div className="App">
      {!showFlag ? (
        <>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
          />
          {Object.keys(flags).map((flagcode) => {
            if (
              flags[flagcode].name.toLowerCase().includes(search.toLowerCase())
            ) {
              return (
                <button
                  className="flagButton"
                  onClick={() => generateFlage(flags[flagcode])}
                >
                  {flags[flagcode].emoji} - {flags[flagcode].name}
                </button>
              );
            }
            return null;
          })}
        </>
      ) : (
        <div style={styles.container} className="container">
          <span onClick={() => setShowFlag(false)}>{selectedFlag.emoji}</span>
          <p>{selectedFlag.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
