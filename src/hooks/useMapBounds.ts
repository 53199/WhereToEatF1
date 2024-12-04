import { useCallback } from 'react';
import { Location } from '../types/maps';

export function useMapBounds() {
  const fitMapToBounds = useCallback((map: google.maps.Map, locations: Location[]) => {
    if (!locations.length) return;

    const bounds = new google.maps.LatLngBounds();
    locations.forEach(location => {
      bounds.extend(new google.maps.LatLng(location.lat, location.lng));
    });

    map.fitBounds(bounds);
    
    // Zoom out a bit to give some padding
    const zoom = map.getZoom();
    if (zoom) map.setZoom(zoom - 1);
  }, []);

  return { fitMapToBounds };
}