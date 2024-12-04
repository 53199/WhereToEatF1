import React from 'react';
import { SearchBar } from '../SearchBar';
import { Filters } from '../Filters';
import { ErrorMessage } from '../ErrorMessage';
import { PlacesFilters, Location } from '../../types/maps';

interface MapControlsProps {
  filters: PlacesFilters;
  onFiltersChange: (filters: PlacesFilters) => void;
  onSearch: () => void;
  isSearching: boolean;
  onPlaceSelected: (location: Location) => void;
  error?: string | null;
}

export function MapControls({
  filters,
  onFiltersChange,
  onSearch,
  isSearching,
  onPlaceSelected,
  error
}: MapControlsProps) {
  return (
    <div className="bg-white shadow-md p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <SearchBar 
              onPlaceSelected={onPlaceSelected}
              placeholder="Rechercher une adresse ou un lieu..."
            />
          </div>
          <div className="md:col-span-2">
            <Filters
              filters={filters}
              onFiltersChange={onFiltersChange}
              disabled={isSearching}
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onSearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg 
                     hover:from-blue-700 hover:to-blue-800 transition-all duration-200 
                     disabled:from-blue-300 disabled:to-blue-400 disabled:cursor-not-allowed 
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0
                     min-w-[200px] text-center"
          >
            {isSearching ? 'Recherche en cours...' : 'Rechercher des lieux'}
          </button>
          
          {error && (
            <div className="w-full max-w-2xl">
              <ErrorMessage message={error} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}