import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Place } from '../../types/maps';
import { motion, AnimatePresence } from 'framer-motion';
import { getPlaceTypeIcon } from '../../utils/placeIcons';
import { Star, MapPin } from 'lucide-react';

interface PlaceMarkerProps {
  place: Place;
  isSelected: boolean;
  onClick: () => void;
}

export function PlaceMarker({ place, isSelected, onClick }: PlaceMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { icon: Icon, color } = getPlaceTypeIcon(place.types[0]);

  // Personnalisation du marqueur
  const markerIcon = {
    path: `M12 0C7.58 0 4 3.58 4 8c0 5.76 7.44 14.44 7.75 14.81.15.18.37.28.6.28.23 0 
          .45-.1.6-.28C13.26 22.44 20 13.76 20 8c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 
          3-3 3 1.34 3 3-1.34 3-3 3z`,
    fillColor: isSelected ? '#3b82f6' : color,
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: '#ffffff',
    scale: isSelected ? 1.4 : isHovered ? 1.3 : 1.2,
    anchor: new google.maps.Point(12, 24),
  };

  // Calcul de la position de l'InfoWindow pour qu'elle reste fixe au-dessus du marqueur
  const infoWindowPosition = {
    lat: place.geometry.location.lat + 0.0008, // Décalage fixe vers le haut
    lng: place.geometry.location.lng
  };

  return (
    <>
      <Marker
        position={place.geometry.location}
        title={place.name}
        icon={markerIcon}
        animation={isSelected ? google.maps.Animation.BOUNCE : undefined}
        onClick={onClick}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        opacity={isHovered ? 0.9 : 1}
        zIndex={isSelected || isHovered ? 1000 : 1}
      />
      
      {(isHovered || isSelected) && (
        <InfoWindow
          position={infoWindowPosition}
          onCloseClick={() => setIsHovered(false)}
          options={{
            pixelOffset: new google.maps.Size(0, -10),
            disableAutoPan: true // Empêche le recentrage automatique de la carte
          }}
        >
          <div className="min-w-[200px] max-w-[300px] overflow-hidden rounded-lg bg-white shadow-lg">
            {place.photos?.[0] && (
              <div className="relative h-32 w-full">
                <img
                  src={place.photos[0].photo_reference}
                  alt={place.name}
                  className="h-full w-full object-cover"
                />
                {place.price_level && (
                  <div className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-sm font-semibold text-green-600">
                    {'$'.repeat(place.price_level)}
                  </div>
                )}
              </div>
            )}
            <div className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon className="h-5 w-5" style={{ color }} />
                <h3 className="font-medium text-gray-900">{place.name}</h3>
              </div>
              
              {place.rating && (
                <div className="mb-2 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{place.rating.toFixed(1)}</span>
                  {place.user_ratings_total && (
                    <span className="text-sm text-gray-500">
                      ({place.user_ratings_total} avis)
                    </span>
                  )}
                </div>
              )}
              
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <p className="truncate">{place.vicinity}</p>
              </div>
              
              {place.opening_hours && (
                <div className="mt-2 text-sm">
                  <span className={`font-medium ${
                    place.opening_hours.isOpen ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {place.opening_hours.isOpen ? 'Ouvert' : 'Fermé'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}