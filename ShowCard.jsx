import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function ShowCard({ show }) {
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(show.id);
  const image = show.image ? show.image.medium.replace("http://", "https://") : null;
  const year = show.premiered ? show.premiered.slice(0, 4) : "N/A";
  const rating = show.rating && show.rating.average ? show.rating.average : "N/A";

  return (
    <article className="card">
      <Link to={"/show/" + show.id} aria-label={"Details of " + show.name}>
        {image ? <img src={image} alt={show.name + " poster"} loading="lazy" /> : <div className="no-image">No image</div>}
      </Link>
      <div className="info">
        <h3>{show.name}</h3>
        <p>{year} · ★ {rating}</p>
        <button className={fav ? "fav active" : "fav"} aria-pressed={fav} onClick={function () { toggle(show); }}>
          {fav ? "Remove favorite" : "Add to favorites"}
        </button>
      </div>
    </article>
  );
}

export default ShowCard;
