import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlaceMarker } from './PlaceMarker';
import { Place } from '../../types/maps';

interface MapMarkersProps {
  places: Place[];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
}

export function MapMarkers({ places, selectedPlace, onPlaceSelect }: MapMarkersProps) {
  return (
    <AnimatePresence>
      {places.map((place, index) => (
        <motion.div
          key={place.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <PlaceMarker
            place={place}
            isSelected={selectedPlace?.id === place.id}
            onClick={() => onPlaceSelect(place)}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}