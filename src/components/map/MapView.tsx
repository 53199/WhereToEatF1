import React from 'react';
import { Header } from '../layout/Header';
import { MapContainer } from './MapContainer';

interface MapViewProps {
  onBack: () => void;
}

export function MapView({ onBack }: MapViewProps) {
  return (
    <div className="h-screen flex flex-col">
      <Header onBack={onBack} />
      <main className="flex-1 flex flex-col min-h-0">
        <MapContainer />
      </main>
    </div>
  );
}