import React, { useState, useRef } from "react";
import { flags } from "./data/data.js";
import { links } from "./data/links.js";
import { WATCHED } from "./data/watched";
import { hashtags } from "./data/hashtags";
import "./App.css";

function App() {
  const [showFlag, setShowFlag] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState({});
  const [search, setSearch] = useState("");
  const [showWatched, setShowWatched] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const textAreaRef = useRef(null);

  const windowHeight = window.innerHeight - 110;
  function generateFlage(flag) {
    setSelectedFlag(flag);
    setShowFlag(true);
  }

  function giveIdea() {
    const unwatched = Object.keys(flags).filter(
      (country) => !WATCHED.includes(country)
    );
    var randomCountry = unwatched[Math.floor(Math.random() * unwatched.length)];
    generateFlage(flags[randomCountry]);
  }

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
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
      minHeight: windowHeight,
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
            <span onClick={() => setShowLinks(!showLinks)}>links</span>
            <span onClick={() => giveIdea()}>idea</span>
          </div>

          <textarea ref={textAreaRef} onClick={copyToClipboard}>
            {getTags()}
          </textarea>
          {showLinks && (
            <div className="links">
              {links.map((link, id) => (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className="link"
                  key={id}
                  href={link}
                >
                  {link}
                </a>
              ))}
            </div>
          )}
          <div className="countries">
            {countries.map((flagcode, i) => {
              if (
                flags[flagcode].name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) {
                return (
                  <button
                    className="flagButton"
                    onClick={() => generateFlage(flags[flagcode])}
                    key={i}
                    style={{ opacity: WATCHED.includes(flagcode) ? 0.5 : 1 }}
                  >
                    <span>{flags[flagcode].emoji}</span> {flags[flagcode].name}
                  </button>
                );
              }
              return null;
            })}
          </div>
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
