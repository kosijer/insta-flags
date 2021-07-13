import React, { useState } from "react";
import { flags } from "./data/data.js";
import { WATCHED } from "./data/watched";
import { hashtags } from "./data/hashtags";
import "./App.css";

function App() {
  const [showFlag, setShowFlag] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState({});
  const [search, setSearch] = useState("");
  const [showWatched, setShowWatched] = useState(false);

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
    const mandatoryTags = [
      "zemljaporekla",
      "zemljaporeklanaengleskom",
      "zanrilinaziv",
    ];
    const randomTags = [...mandatoryTags, ...shuffled.slice(0, 27)];
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

  const countries = showWatched
    ? Object.keys(flags)
    : Object.keys(flags).filter((country) => !WATCHED.includes(country));

  return (
    <div className="App">
      {!showFlag ? (
        <>
          <div className="searchbar">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
            />
            <span onClick={() => setShowWatched(!showWatched)}>
              {showWatched ? "show" : "hide"}
            </span>
          </div>

          <textarea>{getTags()}</textarea>
          {countries.map((flagcode, i) => {
            if (
              flags[flagcode].name.toLowerCase().includes(search.toLowerCase())
            ) {
              return (
                <button
                  className="flagButton"
                  onClick={() => generateFlage(flags[flagcode])}
                  key={i}
                  style={{ opacity: WATCHED.includes(flagcode) ? 0.5 : 1 }}
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
