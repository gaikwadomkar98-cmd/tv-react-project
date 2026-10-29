import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

// HashRouter works on GitHub Pages. FavoritesProvider shares favorites with every page.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </HashRouter>
  </StrictMode>
);
