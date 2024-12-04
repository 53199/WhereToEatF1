import React from 'react';
import { Map, Utensils, Search, Filter } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Map className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">WhereToEat</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Trouvez où manger en
            <span className="text-blue-600"> quelques clics</span>
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-5">
            Découvrez les meilleurs restaurants, cafés et établissements autour de vous,
            filtrez selon vos préférences et trouvez votre bonheur en un instant.
          </p>

          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Utensils className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Large choix</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Restaurants, cafés, snacks et plus encore
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <Search className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Recherche facile</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Trouvez rapidement ce que vous cherchez
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <Filter className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Filtres précis</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Affinez votre recherche selon vos envies
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Commencer la recherche
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Propulsé par Google Maps et Places API
          </p>
        </div>
      </footer>
    </div>
  );
}