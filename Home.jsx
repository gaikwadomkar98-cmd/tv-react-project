import { useState, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import ShowCard from "../components/ShowCard";

function Home() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance");

  // Search runs 0.5 seconds after you stop typing (no button needed)
  const debounced = useDebounce(query.trim(), 500);
  const url = debounced ? "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(debounced) : null;
  const { data, loading, error } = useFetch(url);

  // useMemo: only re-sort when data or sort changes
  const shows = useMemo(function () {
    const list = data ? data.map(function (item) { return item.show; }) : [];
    if (sort === "rating") {
      return [...list].sort(function (a, b) {
        return ((b.rating && b.rating.average) || 0) - ((a.rating && a.rating.average) || 0);
      });
    }
    if (sort === "newest") {
      return [...list].sort(function (a, b) { return (b.premiered || "").localeCompare(a.premiered || ""); });
    }
    return list;
  }, [data, sort]);

  return (
    <>
      <div className="toolbar">
        <input
          type="search"
          value={query}
          onChange={function (e) { setQuery(e.target.value); }}
          placeholder="Start typing a show name..."
          aria-label="Search TV shows"
        />
        <select value={sort} onChange={function (e) { setSort(e.target.value); }} aria-label="Sort results">
          <option value="relevance">Best match</option>
          <option value="rating">Top rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {error && <p className="message">{error}</p>}
      {!query.trim() && <p className="message">Type a show name to begin.</p>}
      {debounced && !loading && !error && shows.length === 0 && <p className="message">No shows found.</p>}

      <div className="grid">
        {loading && Array.from({ length: 8 }).map(function (_, i) { return <div key={i} className="skeleton" />; })}
        {!loading && shows.map(function (show) { return <ShowCard key={show.id} show={show} />; })}
      </div>
    </>
  );
}

export default Home;
