import { Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetails from "./pages/ShowDetails";
import Favorites from "./pages/Favorites";
import { useFavorites } from "./context/FavoritesContext";
import "./App.css";

function App() {
  const { favorites } = useFavorites();

  return (
    <div className="app">
      <nav className="nav">
        <Link to="/" className="brand">TV Finder</Link>
        <div className="nav-links">
          <NavLink to="/" end>Search</NavLink>
          <NavLink to="/favorites">Favorites ({favorites.length})</NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<p className="message">Page not found. <Link to="/">Go home</Link></p>} />
      </Routes>
    </div>
  );
}

export default App;
