import { useState, useCallback } from 'react';
import { PlacesFilters, PlaceType, FoodType, SortOption } from '../types/maps';

const initialFilters: PlacesFilters = {
  placeType: 'restaurant',
  foodType: 'all',
  sortBy: 'rating',
  minPrice: undefined,
  maxPrice: undefined,
  searchQuery: undefined
};

export function useFilters() {
  const [filters, setFilters] = useState<PlacesFilters>(initialFilters);

  const updateFilter = useCallback(<K extends keyof PlacesFilters>(
    key: K,
    value: PlacesFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    updateFilter,
    resetFilters
  };
}