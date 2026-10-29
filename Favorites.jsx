import { useFavorites } from "../context/FavoritesContext";
import ShowCard from "../components/ShowCard";

function Favorites() {
  const { favorites, clear } = useFavorites();

  if (favorites.length === 0) return <p className="message">No favorites yet. Add some from the search page.</p>;

  return (
    <>
      <div className="toolbar">
        <h2>Your favorites</h2>
        <button className="fav" onClick={clear}>Clear all</button>
      </div>
      <div className="grid">
        {favorites.map(function (show) { return <ShowCard key={show.id} show={show} />; })}
      </div>
    </>
  );
}

export default Favorites;
