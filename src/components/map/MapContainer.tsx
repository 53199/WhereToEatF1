import React, { useEffect, useCallback, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { MAPS_CONFIG } from '../../config/maps';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';
import { MapMarkers } from './MapMarkers';
import { FiltersPanel } from '../filters/FiltersPanel';
import { SearchBar } from '../search/SearchBar';
import { PlacesList } from '../PlacesList';
import { PlaceDetails } from '../PlaceDetails';
import { useGeolocation } from '../../hooks/useGeolocation';
import { usePlacesSearch } from '../../hooks/usePlacesSearch';
import { useMapInstance } from '../../hooks/useMapInstance';
import { useSelectedPlace } from '../../hooks/useSelectedPlace';
import { useFilters } from '../../hooks/useFilters';
import { Location } from '../../types/maps';
import { getGoogleMapsErrorMessage } from '../../utils/errorHandling';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MapContainer() {
  const { mapRef, isLoaded, loadError, onLoad, onUnmount } = useMapInstance();
  const { selectedPlace, handlePlaceSelect, handlePlaceClose } = useSelectedPlace();
  const { filters, updateFilter, resetFilters } = useFilters();
  const { places, isSearching, error, searchNearbyPlaces } = usePlacesSearch();
  const { location: userLocation, error: geoError } = useGeolocation();
  const [center, setCenter] = useState<Location>(MAPS_CONFIG.defaultCenter);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (userLocation) {
      setCenter(userLocation);
      if (mapRef.current) {
        mapRef.current.panTo(userLocation);
        searchNearbyPlaces(mapRef.current, filters, userLocation);
      }
    }
  }, [userLocation, searchNearbyPlaces, filters]);

  const handleMapIdle = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        const newLocation = {
          lat: center.lat(),
          lng: center.lng()
        };
        searchNearbyPlaces(mapRef.current, filters, newLocation);
      }
    }
  }, [searchNearbyPlaces, filters]);

  const handleMapClick = useCallback(() => {
    handlePlaceClose();
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [handlePlaceClose, isMobile]);

  const handlePlaceSelected = useCallback((location: Location) => {
    setCenter(location);
    if (mapRef.current) {
      mapRef.current.setZoom(MAPS_CONFIG.defaultZoom);
      mapRef.current.panTo(location);
      setTimeout(() => {
        searchNearbyPlaces(mapRef.current, filters, location);
      }, 300);
    }
  }, [filters, searchNearbyPlaces]);

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <ErrorMessage message={getGoogleMapsErrorMessage(loadError)} />
      </div>
    );
  }

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="relative h-full flex">
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 z-50 rounded-full bg-white p-3 shadow-lg"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      )}

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={isMobile ? { x: -320 } : false}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -320 } : undefined}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`
              ${isMobile ? 'absolute inset-y-0 left-0' : 'relative'}
              w-80 md:w-96 bg-white shadow-lg z-20 flex flex-col
            `}
          >
            <div className="p-6 space-y-4 border-b border-gray-200">
              <SearchBar 
                onPlaceSelected={handlePlaceSelected}
                placeholder="Rechercher une adresse..."
              />
              
              <FiltersPanel
                filters={filters}
                onFiltersChange={updateFilter}
                onReset={resetFilters}
                isSearching={isSearching}
              />
              
              {(error || geoError) && (
                <ErrorMessage message={error || geoError} />
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              <PlacesList
                places={places}
                selectedPlace={selectedPlace}
                onPlaceSelect={handlePlaceSelect}
                sortBy={filters.sortBy}
                userLocation={userLocation}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 relative">
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={center}
          zoom={MAPS_CONFIG.defaultZoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
          onIdle={handleMapIdle}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            styles: [],
            gestureHandling: 'greedy',
            disableDefaultUI: false,
            clickableIcons: false
          }}
        >
          <MapMarkers
            places={places}
            selectedPlace={selectedPlace}
            onPlaceSelect={handlePlaceSelect}
          />
        </GoogleMap>

        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`
                absolute z-20 bg-white rounded-lg shadow-xl
                ${isMobile 
                  ? 'inset-x-4 bottom-4 top-auto max-h-[80vh] overflow-y-auto'
                  : 'top-4 right-4 w-96'
                }
              `}
            >
              <PlaceDetails
                place={selectedPlace}
                onClose={handlePlaceClose}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}