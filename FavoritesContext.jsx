import { createContext, useContext, useEffect, useReducer } from "react";

const FavoritesContext = createContext(null);

// A reducer: one function that decides how the favorites list changes
function reducer(state, action) {
  switch (action.type) {
    case "toggle": {
      const exists = state.some(function (s) { return s.id === action.show.id; });
      if (exists) return state.filter(function (s) { return s.id !== action.show.id; });
      const { id, name, image, rating, premiered } = action.show;
      return [...state, { id, name, image, rating, premiered }];
    }
    case "clear":
      return [];
    default:
      return state;
  }
}

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch (e) {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(reducer, null, loadFavorites);

  useEffect(function () {
    try { localStorage.setItem("favorites", JSON.stringify(favorites)); } catch (e) { /* ignore */ }
  }, [favorites]);

  const value = {
    favorites,
    toggle: function (show) { dispatch({ type: "toggle", show }); },
    clear: function () { dispatch({ type: "clear" }); },
    isFavorite: function (id) { return favorites.some(function (f) { return f.id === id; }); }
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

// Custom hook so any component can use favorites with one line
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
