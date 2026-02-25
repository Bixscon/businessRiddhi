import { useEffect, useState } from 'react';

export default function useSuggestions(query: string, opts?: { minLength?: number; limit?: number }) {
  const minLength = opts?.minLength ?? 2;
  const limit = opts?.limit ?? 7;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < minLength) {
      setSuggestions([]);
      return;
    }

    const ac = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/suggestions?query=${encodeURIComponent(query)}`, { signal: ac.signal });
        const data = await res.json();
        setSuggestions(Array.isArray(data.suggestions) ? data.suggestions.slice(0, limit) : []);
      } catch (err) {
        if ((err as any)?.name !== 'AbortError') console.error('useSuggestions error', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      ac.abort();
    };
  }, [query, minLength, limit]);

  return { suggestions, loading } as const;
}
