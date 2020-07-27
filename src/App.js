import React, { useState } from "react";
import { flags } from "./data/data.js";
import { hashtags } from "./data/hashtags";
import "./App.css";

function App() {
  const [showFlag, setShowFlag] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState({});
  const [search, setSearch] = useState("");

  const windowHeight = window.innerHeight - 110;
  function generateFlage(flag) {
    setSelectedFlag(flag);
    setShowFlag(true);
  }

  function getTags() {
    const uniqueTags = hashtags.filter((v, i, a) => a.indexOf(v) === i);
    console.log(`'${uniqueTags.sort().join("', '").toLowerCase()}'`);

    const shuffled = uniqueTags.sort(() => {
      return 0.5 - Math.random();
    });
    const randomTags = shuffled.slice(0, 30);
    return randomTags
      .map((tag) => {
        return `#${tag}`;
      })
      .join(" ");
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
          <textarea>{getTags()}</textarea>
          {Object.keys(flags).map((flagcode, i) => {
            if (
              flags[flagcode].name.toLowerCase().includes(search.toLowerCase())
            ) {
              return (
                <button
                  className="flagButton"
                  onClick={() => generateFlage(flags[flagcode])}
                  key={i}
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
          <span className="flag" onClick={() => setShowFlag(false)}>
            {selectedFlag.emoji}
          </span>
          <p>{selectedFlag.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
