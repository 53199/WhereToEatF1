import React from 'react';
import { Clock } from 'lucide-react';
import { useTimeSimulation, setSimulatedTime, resetTimeSimulation } from '../utils/timeSimulation';

const PRESET_TIMES = [
  { label: '8:00 (Matin)', hours: 8 },
  { label: '12:00 (Midi)', hours: 12 },
  { label: '15:00 (Après-midi)', hours: 15 },
  { label: '20:00 (Soir)', hours: 20 },
  { label: '23:00 (Nuit)', hours: 23 },
  { label: '2:00 (Nuit profonde)', hours: 2 },
];

export function TimeSimulator() {
  const simulatedTime = useTimeSimulation((state) => state.simulatedTime);

  const handleTimeChange = (hours: number) => {
    setSimulatedTime(hours);
    // Force un rafraîchissement de la recherche
    window.location.reload();
  };

  const handleReset = () => {
    resetTimeSimulation();
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="font-medium">
            {simulatedTime ? (
              `Heure simulée: ${simulatedTime.getHours()}:${String(simulatedTime.getMinutes()).padStart(2, '0')}`
            ) : (
              'Heure réelle'
            )}
          </span>
        </div>

        <div className="flex gap-2">
          {PRESET_TIMES.map(({ label, hours }) => (
            <button
              key={hours}
              onClick={() => handleTimeChange(hours)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                simulatedTime?.getHours() === hours
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
          
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md ml-2"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}