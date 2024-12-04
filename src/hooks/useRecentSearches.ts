import { useState, useCallback, useEffect } from 'react';
import { Location } from '../types/maps';

interface RecentSearch {
  id: string;
  name: string;
  address: string;
  location: Location;
}

const STORAGE_KEY = 'wheretoeat_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addRecentSearch = useCallback((search: RecentSearch) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.id !== search.id);
      return [search, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  };
}