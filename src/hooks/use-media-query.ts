"use client";

import { useEffect, useState } from "react";

type MediaQueryState = {
  matches: boolean;
  isReady: boolean;
};

export function useMediaQuery(query: string): MediaQueryState {
  const [state, setState] = useState<MediaQueryState>({
    matches: false,
    isReady: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const update = () => {
      setState({
        matches: mediaQuery.matches,
        isReady: true,
      });
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return state;
}
