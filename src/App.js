import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("reacthooks");
  const [loading, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();
  useEffect(() => {
    getNews();
  }, []);
  const getNews = async () => {
    setStatus(true);
    try {
      await axios
        .get(`http://hn.algolia.com/api/v1/search/?query=${query}`)
        .then((response) => {
          console.log(response.data.hits);
          setResults(response.data.hits);
        });
    } catch (err) {
      setError(err);
    }
    setStatus(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    getNews();
  };
  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };
  return (
    <div className="container max-w mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">
      <h1 className="text-grey-400 text-3xl">Hooks News</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 m-1 rounded"
        ></input>
        <button className="bg-orange-400 p-1 m-1 rounded" type="submit">
          Search
        </button>
        <button
          className="bg-teal-400 text-white p-1 m-1 rounded"
          type="button"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>
      {loading ? (
        <div className="text-red-400 text-3xl">Loading Reasults . . .</div>
      ) : (
        <ul className="list-reset loading-normal">
          {results.map((res) => (
            <li key={res.objectID}>
              <a className="text-indigo-500 hover:text-red-500" href={res.url}>
                {res.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="text-red-400 text-3xl">{error && error.message}</div>
    </div>
  );
}
