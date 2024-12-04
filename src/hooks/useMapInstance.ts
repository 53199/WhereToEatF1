import { useCallback, useRef } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { MAPS_LIBRARIES } from '../config/maps';

export function useMapInstance() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: MAPS_LIBRARIES
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return {
    mapRef,
    isLoaded,
    loadError,
    onLoad,
    onUnmount
  };
}