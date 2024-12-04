import React from 'react';
import { Map as MapIcon } from 'lucide-react';

interface HeaderProps {
  onBack: () => void;
}

export function Header({ onBack }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onBack}>
            <MapIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">WhereToEat</h1>
          </div>
        </div>
      </div>
    </header>
  );
}