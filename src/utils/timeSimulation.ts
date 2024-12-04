import { create } from 'zustand';

interface TimeSimulationStore {
  simulatedTime: Date | null;
  setSimulatedTime: (time: Date | null) => void;
}

export const useTimeSimulation = create<TimeSimulationStore>((set) => ({
  simulatedTime: null,
  setSimulatedTime: (time) => set({ simulatedTime: time })
}));

// Remplace la méthode Date.now() native
const originalNow = Date.now;
const originalGetTime = Date.prototype.getTime;

export function initializeTimeSimulation() {
  Date.now = function() {
    const simulatedTime = useTimeSimulation.getState().simulatedTime;
    return simulatedTime ? simulatedTime.getTime() : originalNow.call(Date);
  };

  Date.prototype.getTime = function() {
    const simulatedTime = useTimeSimulation.getState().simulatedTime;
    if (simulatedTime && this instanceof Date) {
      return simulatedTime.getTime();
    }
    return originalGetTime.call(this);
  };
}

export function resetTimeSimulation() {
  Date.now = originalNow;
  Date.prototype.getTime = originalGetTime;
  useTimeSimulation.getState().setSimulatedTime(null);
}

export function setSimulatedTime(hours: number, minutes: number = 0) {
  const now = new Date();
  const simulatedTime = new Date(now);
  simulatedTime.setHours(hours, minutes, 0, 0);
  useTimeSimulation.getState().setSimulatedTime(simulatedTime);
}