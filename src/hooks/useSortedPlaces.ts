import { useMemo } from 'react';
import { Place, SortOption } from '../types/maps';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function useSortedPlaces(
  places: Place[],
  sortBy: SortOption,
  userLocation?: { lat: number; lng: number }
) {
  return useMemo(() => {
    const sortedPlaces = [...places];

    switch (sortBy) {
      case 'rating':
        return sortedPlaces.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      case 'price':
        return sortedPlaces.sort((a, b) => (a.price_level || 0) - (b.price_level || 0));

      case 'popularity':
        return sortedPlaces.sort((a, b) => 
          (b.user_ratings_total || 0) - (a.user_ratings_total || 0)
        );

      case 'distance':
        if (userLocation) {
          return sortedPlaces.sort((a, b) => {
            const distanceA = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              a.geometry.location.lat,
              a.geometry.location.lng
            );
            const distanceB = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              b.geometry.location.lat,
              b.geometry.location.lng
            );
            return distanceA - distanceB;
          });
        }
        return sortedPlaces;

      default:
        return sortedPlaces;
    }
  }, [places, sortBy, userLocation]);
}