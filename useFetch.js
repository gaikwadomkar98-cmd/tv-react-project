import { useState, useEffect } from "react";

// Reusable data fetching. Pass null as url to do nothing.
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    if (!url) {
      setData(null); setError(""); setLoading(false);
      return;
    }

    const controller = new AbortController(); // lets us cancel an old request
    setLoading(true);
    setError("");

    fetch(url, { signal: controller.signal })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(function (json) { setData(json); setLoading(false); })
      .catch(function (err) {
        if (err.name !== "AbortError") {
          setError("Could not load data. Check your internet and try again.");
          setLoading(false);
        }
      });

    return function () { controller.abort(); };
  }, [url]);

  return { data, loading, error };
}
