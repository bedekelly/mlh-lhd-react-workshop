import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";


export default function Search({ query, navigate }) {
  const [inputText, setInputText] = useState(query || '');
  const [searchText, setSearchText] = useState(query || '');
  const [results, setResults] = useState([]);

  useEffect(() => {

    if (!searchText) return;

    const controller = new AbortController();
    const options = {
      signal: controller.signal
    };

    fetch(`https://api.bede.io/search?q=${searchText}`, options)
      .then(response => response.json())
      .then(json => setResults(json.results))
      .then(() => navigate(`/q/${searchText}`))
      .catch(err => console.log(err));

    return () => controller.abort();

  }, [searchText]);

  return <div className="container">
    <h1>Search</h1>

    <form onSubmit={event => {
      setSearchText(inputText);
      event.preventDefault();
    }}>
      <input value={inputText} onChange={e => setInputText(e.target.value)} type="text"/>
      <button>Search</button>

      <ul>
        { results.map(result => {
          return <li>{ result }</li>
        })}
      </ul>
    </form>

    <Link to={"/about"}>About</Link>
  </div>
}