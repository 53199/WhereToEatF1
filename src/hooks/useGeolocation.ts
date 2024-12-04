import { useState, useEffect } from 'react';
import { Location } from '../types/maps';

interface GeolocationState {
  location: Location | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        error: "La géolocalisation n'est pas supportée par votre navigateur",
        loading: false
      });
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          error: null,
          loading: false
        });
      },
      (error) => {
        let errorMessage = "Impossible d'obtenir votre position";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Vous avez refusé l'accès à votre position";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Votre position n'est pas disponible";
            break;
          case error.TIMEOUT:
            errorMessage = "La demande de géolocalisation a expiré";
            break;
        }
        setState({
          location: null,
          error: errorMessage,
          loading: false
        });
      },
      options
    );
  }, []);

  return state;
}