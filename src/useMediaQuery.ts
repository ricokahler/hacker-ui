import { useMemo, useState, useEffect } from 'react';

function useMediaQuery(query: string) {
  const normalizedQuery = query.startsWith('@media')
    ? query.substring('@media'.length, query.length)
    : query;
  const mediaQueryList = useMemo(() => matchMedia(normalizedQuery), [
    normalizedQuery,
  ]);
  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQueryList.addListener(handleChange);

    return () => {
      mediaQueryList.removeListener(handleChange);
    };
  }, [mediaQueryList]);

  return matches;
}

export default useMediaQuery;
