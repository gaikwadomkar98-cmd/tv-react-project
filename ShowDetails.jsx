import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";

function ShowDetails() {
  const { id } = useParams(); // the :id from the URL
  const { data: show, loading, error } = useFetch("https://api.tvmaze.com/shows/" + id);
  const { toggle, isFavorite } = useFavorites();

  if (loading) return <p className="message">Loading...</p>;
  if (error) return <p className="message">{error}</p>;
  if (!show) return null;

  const image = show.image ? show.image.original.replace("http://", "https://") : null;
  const summary = show.summary ? show.summary.replace(/<[^>]+>/g, "") : "No summary available.";
  const fav = isFavorite(show.id);

  return (
    <div className="details">
      <Link to="/" className="back">← Back to search</Link>
      <div className="details-body">
        {image && <img src={image} alt={show.name + " poster"} />}
        <div>
          <h2>{show.name}</h2>
          <p className="meta">
            {show.premiered ? show.premiered.slice(0, 4) : "N/A"} · ★ {(show.rating && show.rating.average) || "N/A"} · {show.status}
          </p>
          {show.genres.length > 0 && (
            <ul className="genres">
              {show.genres.map(function (g) { return <li key={g}>{g}</li>; })}
            </ul>
          )}
          <p>{summary}</p>
          <button className={fav ? "fav active" : "fav"} aria-pressed={fav} onClick={function () { toggle(show); }}>
            {fav ? "Remove favorite" : "Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
