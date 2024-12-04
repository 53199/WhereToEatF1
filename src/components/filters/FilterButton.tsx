import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FilterButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterButton({ icon: Icon, label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all
        ${isActive 
          ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-2' 
          : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        } shadow-sm`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}