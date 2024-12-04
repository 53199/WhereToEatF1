import { useState, useEffect } from 'react';
import { Location } from '../types/maps';
import { MAPS_CONFIG } from '../config/maps';

export function useMapCenter(userLocation: Location | null) {
  const [center, setCenter] = useState<Location>(MAPS_CONFIG.defaultCenter);

  useEffect(() => {
    if (userLocation) {
      setCenter(userLocation);
    }
  }, [userLocation]);

  return { center, setCenter };
}