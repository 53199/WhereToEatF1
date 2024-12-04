import { useState, useCallback } from 'react';
import { Place } from '../types/maps';

export function useSelectedPlace() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handlePlaceSelect = useCallback((place: Place) => {
    setSelectedPlace(place);
  }, []);

  const handlePlaceClose = useCallback(() => {
    setSelectedPlace(null);
  }, []);

  return {
    selectedPlace,
    handlePlaceSelect,
    handlePlaceClose
  };
}