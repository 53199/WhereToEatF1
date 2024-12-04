import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, MapPin, History, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Location } from '../../types/maps';
import { useRecentSearches } from '../../hooks/useRecentSearches';

interface SearchBarProps {
  onPlaceSelected: (location: Location) => void;
  placeholder?: string;
}

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export function SearchBar({ onPlaceSelected, placeholder }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsFocused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleSearch = useCallback(async (input: string) => {
    setSearchValue(input);
    setIsLoading(true);

    if (!input.trim()) {
      setPredictions([]);
      setIsLoading(false);
      return;
    }

    try {
      const autocompleteService = new google.maps.places.AutocompleteService();
      const results = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
        autocompleteService.getPlacePredictions(
          {
            input,
            types: ['establishment', 'geocode'],
            // Suppression de la restriction géographique
          },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              resolve(predictions);
            } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              resolve([]);
            } else {
              reject(new Error('Erreur lors de la recherche'));
            }
          }
        );
      });

      setPredictions(results);
    } catch (error) {
      console.error('Erreur de recherche:', error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePredictionSelect = useCallback(async (prediction: Prediction) => {
    const placesService = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    try {
      const result = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
        placesService.getDetails(
          {
            placeId: prediction.place_id,
            fields: ['geometry', 'name', 'formatted_address']
          },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              resolve(place);
            } else {
              reject(new Error('Erreur lors de la récupération des détails'));
            }
          }
        );
      });

      if (result.geometry?.location) {
        const location = {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng()
        };
        
        addRecentSearch({
          id: prediction.place_id,
          name: prediction.structured_formatting.main_text,
          address: prediction.structured_formatting.secondary_text,
          location
        });

        onPlaceSelected(location);
        setSearchValue(prediction.structured_formatting.main_text);
        setPredictions([]);
        setIsFocused(false);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection:', error);
    }
  }, [onPlaceSelected, addRecentSearch]);

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder || "Rechercher un lieu, une adresse, un restaurant..."}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm 
                   focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                   placeholder-gray-400 transition-colors"
        />
        <Search className={`absolute left-4 top-3.5 h-5 w-5 transition-colors
          ${isLoading ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`}
        />
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue('');
              setPredictions([]);
            }}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFocused && (predictions.length > 0 || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden max-h-[60vh] overflow-y-auto"
          >
            {predictions.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {predictions.map((prediction) => (
                  <li
                    key={prediction.place_id}
                    onClick={() => handlePredictionSelect(prediction)}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {prediction.structured_formatting.main_text}
                      </div>
                      <div className="text-sm text-gray-500">
                        {prediction.structured_formatting.secondary_text}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between p-3 bg-gray-50">
                  <div className="text-sm font-medium text-gray-700">Recherches récentes</div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Effacer
                  </button>
                </div>
                <ul className="divide-y divide-gray-100">
                  {recentSearches.map((search) => (
                    <li
                      key={search.id}
                      onClick={() => {
                        onPlaceSelected(search.location);
                        setSearchValue(search.name);
                        setIsFocused(false);
                      }}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <History className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">{search.name}</div>
                        <div className="text-sm text-gray-500">{search.address}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}