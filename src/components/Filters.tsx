import React from 'react';
import { PLACE_TYPES, FOOD_TYPES, SORT_OPTIONS } from '../config/maps';
import { PlacesFilters, PlaceType, FoodType, SortOption } from '../types/maps';
import { UtensilsCrossed, Coffee, ShoppingBag, Truck, Store, Pizza } from 'lucide-react';

interface FiltersProps {
  filters: PlacesFilters;
  onFiltersChange: (filters: PlacesFilters) => void;
  disabled?: boolean;
}

const TYPE_ICONS = {
  restaurant: Pizza,
  bakery: Coffee,
  cafe: Coffee,
  meal_takeaway: UtensilsCrossed,
  meal_delivery: Truck,
  supermarket: Store
};

export function Filters({ filters, onFiltersChange, disabled }: FiltersProps) {
  const handleChange = (key: keyof PlacesFilters, value: PlaceType | FoodType | SortOption) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Type d'établissement
        </label>
        <div className="relative">
          <select
            value={filters.placeType}
            onChange={(e) => handleChange('placeType', e.target.value as PlaceType)}
            disabled={disabled}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 appearance-none"
          >
            {PLACE_TYPES.map((type) => {
              const Icon = TYPE_ICONS[type.value];
              return (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              );
            })}
          </select>
          {TYPE_ICONS[filters.placeType] && (
            <div className="absolute left-3 top-2.5">
              {React.createElement(TYPE_ICONS[filters.placeType], {
                className: "h-5 w-5 text-gray-500"
              })}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Type de cuisine
        </label>
        <select
          value={filters.foodType}
          onChange={(e) => handleChange('foodType', e.target.value as FoodType)}
          disabled={disabled}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
        >
          {FOOD_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Trier par
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value as SortOption)}
          disabled={disabled}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}