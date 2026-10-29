import { useState, useEffect } from "react";

// Waits until the user stops typing before the value updates
export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(function () {
    const timer = setTimeout(function () { setDebounced(value); }, delay);
    return function () { clearTimeout(timer); }; // cleanup: cancel the old timer
  }, [value, delay]);

  return debounced;
}
