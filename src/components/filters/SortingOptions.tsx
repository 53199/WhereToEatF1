import React from 'react';
import { SortOption } from '../../types/maps';
import { Star, TrendingUp, DollarSign, Users } from 'lucide-react';

interface SortingOptionsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_BUTTONS: Array<{
  value: SortOption;
  label: string;
  icon: typeof Star;
  color: string;
}> = [
  {
    value: 'rating',
    label: 'Note',
    icon: Star,
    color: '#eab308'
  },
  {
    value: 'distance',
    label: 'Distance',
    icon: TrendingUp,
    color: '#3b82f6'
  },
  {
    value: 'price',
    label: 'Prix',
    icon: DollarSign,
    color: '#22c55e'
  },
  {
    value: 'popularity',
    label: 'Popularité',
    icon: Users,
    color: '#ec4899'
  }
];

export function SortingOptions({ currentSort, onSortChange }: SortingOptionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-gray-700">Trier par</h3>
      <div className="flex flex-wrap gap-2">
        {SORT_BUTTONS.map(({ value, label, icon: Icon, color }) => (
          <button
            key={value}
            onClick={() => onSortChange(value)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all
              ${currentSort === value
                ? 'bg-gray-100 ring-2 ring-gray-300'
                : 'hover:bg-gray-50'
              }`}
          >
            <Icon
              className="h-4 w-4"
              style={{ color: currentSort === value ? color : '#6b7280' }}
            />
            <span className={`text-sm font-medium ${
              currentSort === value ? 'text-gray-900' : 'text-gray-600'
            }`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}