import React from 'react';
import { motion } from 'framer-motion';
import { Place } from '../types/maps';
import { Star, DollarSign, Clock, MapPin } from 'lucide-react';
import { getPlaceTypeIcon } from '../utils/placeIcons';
import { useSortedPlaces } from '../hooks/useSortedPlaces';

interface PlacesListProps {
  places: Place[];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
  sortBy: SortOption;
  userLocation?: Location;
}

export function PlacesList({
  places,
  selectedPlace,
  onPlaceSelect,
  sortBy,
  userLocation
}: PlacesListProps) {
  const sortedPlaces = useSortedPlaces(places, sortBy, userLocation);

  if (sortedPlaces.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Aucun lieu trouvé dans cette zone
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {sortedPlaces.map((place, index) => {
        const { icon: Icon, color } = getPlaceTypeIcon(place.types[0]);
        
        return (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onPlaceSelect(place)}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedPlace?.id === place.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex gap-4">
              {place.photos?.[0] ? (
                <img
                  src={place.photos[0].photo_reference}
                  alt={place.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-8 h-8" style={{ color }} />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{place.name}</h3>
                <p className="text-sm text-gray-500 mt-1 truncate">{place.vicinity}</p>
                
                <div className="flex items-center gap-4 mt-2">
                  {place.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{place.rating.toFixed(1)}</span>
                      {place.user_ratings_total && (
                        <span className="text-sm text-gray-500">
                          ({place.user_ratings_total})
                        </span>
                      )}
                    </div>
                  )}
                  
                  {place.price_level !== undefined && (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: place.price_level + 1 }).map((_, i) => (
                        <DollarSign key={i} className="w-4 h-4 text-green-600" />
                      ))}
                    </div>
                  )}
                  
                  {place.opening_hours && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className={`text-sm ${
                        place.opening_hours.isOpen ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {place.opening_hours.isOpen ? 'Ouvert' : 'Fermé'}
                      </span>
                    </div>
                  )}
                </div>

                {sortBy === 'distance' && userLocation && (
                  <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        place.geometry.location.lat,
                        place.geometry.location.lng
                      ).toFixed(1)} km
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}