import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterButton } from './FilterButton';
import { PlacesFilters } from '../../types/maps';
import { PLACE_TYPES, FOOD_TYPES, SORT_OPTIONS } from '../../config/maps';
import { getPlaceTypeIcon } from '../../utils/placeIcons';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';

interface FiltersPanelProps {
  filters: PlacesFilters;
  onFiltersChange: (filters: PlacesFilters) => void;
  onReset: () => void;
  isSearching?: boolean;
}

export function FiltersPanel({
  filters,
  onFiltersChange,
  onReset,
  isSearching
}: FiltersPanelProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const updateFilter = <K extends keyof PlacesFilters>(
    key: K,
    value: PlacesFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="relative z-10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium 
                   shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filtres</span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Filtres</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={onReset}
                  className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
                  title="Réinitialiser les filtres"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Type d'établissement
                </h4>
                <div className="flex flex-wrap gap-2">
                  {PLACE_TYPES.map(type => {
                    const { icon } = getPlaceTypeIcon(type.value);
                    return (
                      <FilterButton
                        key={type.value}
                        icon={icon}
                        label={type.label}
                        isActive={filters.placeType === type.value}
                        onClick={() => updateFilter('placeType', type.value)}
                      />
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Type de cuisine
                </h4>
                <div className="flex flex-wrap gap-2">
                  {FOOD_TYPES.map(type => (
                    <FilterButton
                      key={type.value}
                      icon={getPlaceTypeIcon('food').icon}
                      label={type.label}
                      isActive={filters.foodType === type.value}
                      onClick={() => updateFilter('foodType', type.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Trier par
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SORT_OPTIONS.map(option => (
                    <FilterButton
                      key={option.value}
                      icon={getPlaceTypeIcon('default').icon}
                      label={option.label}
                      isActive={filters.sortBy === option.value}
                      onClick={() => updateFilter('sortBy', option.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  disabled={isSearching}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white
                           hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                           disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isSearching ? 'Recherche en cours...' : 'Appliquer les filtres'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}