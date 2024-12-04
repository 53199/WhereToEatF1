import React, { useState, useCallback } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Location } from '../types/maps';

interface SearchBarProps {
  onPlaceSelected: (location: Location) => void;
  placeholder?: string;
}

export function SearchBar({ onPlaceSelected, placeholder }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);

  const handleSearch = useCallback((input: string) => {
    setSearchValue(input);

    if (!input) {
      setPredictions([]);
      return;
    }

    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input,
        types: ['geocode', 'establishment']
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results);
        } else {
          setPredictions([]);
        }
      }
    );
  }, []);

  const handlePredictionSelect = useCallback((placeId: string) => {
    const placesService = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    placesService.getDetails(
      {
        placeId,
        fields: ['geometry']
      },
      (result, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          result?.geometry?.location
        ) {
          onPlaceSelected({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng()
          });
          setSearchValue('');
          setPredictions([]);
        }
      }
    );
  }, [onPlaceSelected]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder || "Rechercher un lieu..."}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      {predictions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              onClick={() => handlePredictionSelect(prediction.place_id)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{prediction.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}