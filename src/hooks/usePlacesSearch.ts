import { useCallback, useState } from 'react';
import { Place, PlacesFilters, Location } from '../types/maps';
import { MAPS_CONFIG } from '../config/maps';

export function usePlacesSearch() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchNearbyPlaces = useCallback(async (
    map: google.maps.Map | null,
    filters: PlacesFilters,
    location?: Location
  ) => {
    if (!map) {
      setError("La carte n'est pas initialisée");
      return;
    }

    const searchLocation = location || {
      lat: map.getCenter()?.lat() || MAPS_CONFIG.defaultCenter.lat,
      lng: map.getCenter()?.lng() || MAPS_CONFIG.defaultCenter.lng
    };

    setIsSearching(true);
    setError(null);

    try {
      const service = new google.maps.places.PlacesService(map);

      // Construction de la requête de recherche
      const searchRequest: google.maps.places.TextSearchRequest = {
        location: searchLocation,
        radius: MAPS_CONFIG.searchRadius,
        type: filters.placeType as google.maps.places.PlaceType,
        openNow: true
      };

      // Ajout du type de cuisine à la requête si spécifié
      if (filters.foodType !== 'all') {
        searchRequest.query = `${filters.foodType} ${filters.placeType}`;
      }

      // Effectue la recherche
      const results = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
        service.textSearch(searchRequest, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results);
          } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            resolve([]);
          } else {
            reject(new Error(`Erreur lors de la recherche: ${status}`));
          }
        });
      });

      // Récupère les détails pour chaque lieu
      const placesWithDetails = await Promise.all(
        results.map(async (result) => {
          if (!result.place_id) return null;

          const details = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
            service.getDetails(
              {
                placeId: result.place_id,
                fields: [
                  'opening_hours',
                  'photos',
                  'reviews',
                  'website',
                  'formatted_phone_number',
                  'price_level',
                  'rating',
                  'user_ratings_total',
                  'types',
                  'geometry',
                  'name',
                  'vicinity',
                  'formatted_address'
                ]
              },
              (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                  resolve(place);
                } else {
                  reject(new Error(`Erreur lors de la récupération des détails: ${status}`));
                }
              }
            );
          });

          return {
            id: result.place_id,
            name: details.name || result.name || 'Sans nom',
            vicinity: details.vicinity || details.formatted_address || result.formatted_address || 'Adresse non disponible',
            geometry: {
              location: {
                lat: details.geometry?.location.lat() || result.geometry?.location.lat(),
                lng: details.geometry?.location.lng() || result.geometry?.location.lng()
              }
            },
            types: details.types || result.types || [],
            place_id: result.place_id,
            rating: details.rating || result.rating,
            price_level: details.price_level || result.price_level,
            user_ratings_total: details.user_ratings_total || result.user_ratings_total,
            opening_hours: details.opening_hours ? {
              isOpen: details.opening_hours.isOpen(),
              periods: details.opening_hours.periods,
              weekday_text: details.opening_hours.weekday_text
            } : undefined,
            photos: details.photos?.map(photo => ({
              height: photo.height,
              width: photo.width,
              html_attributions: photo.html_attributions,
              photo_reference: photo.getUrl({ maxWidth: 800, maxHeight: 600 })
            })),
            reviews: details.reviews,
            website: details.website,
            formatted_phone_number: details.formatted_phone_number
          };
        })
      );

      // Filtre les résultats nuls et applique les filtres supplémentaires
      const validPlaces = placesWithDetails
        .filter((place): place is Place => place !== null)
        .filter(place => {
          // Vérifie si le lieu correspond au type d'établissement
          if (!place.types.includes(filters.placeType)) {
            return false;
          }

          // Vérifie le type de cuisine si spécifié
          if (filters.foodType !== 'all') {
            const cuisineMatch = place.types.some(type => 
              type.toLowerCase().includes(filters.foodType) ||
              type.toLowerCase().includes('restaurant')
            );
            if (!cuisineMatch) return false;
          }

          return true;
        });

      setPlaces(validPlaces);
      
      if (validPlaces.length === 0) {
        setError("Aucun établissement trouvé dans cette zone");
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError("Une erreur est survenue lors de la recherche");
      setPlaces([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { 
    places, 
    isSearching, 
    error, 
    searchNearbyPlaces 
  };
}