import { useState, useEffect, useCallback } from 'react';
import { PainEntry } from '@/types/pain';

const STORAGE_KEY = 'pain-tracker-entries';

export function usePainStore() {
  const [entries, setEntries] = useState<PainEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const entriesWithDates = parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
          createdAt: new Date(entry.createdAt),
          zoneDetails: entry.zoneDetails ?? {},
        }));
        setEntries(entriesWithDates);
      }
    } catch (error) {
      console.error('Error loading pain entries:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveEntries = useCallback((newEntries: PainEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
  }, []);

  const addEntry = useCallback((entry: Omit<PainEntry, 'id' | 'createdAt'>) => {
    const newEntry: PainEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    saveEntries([newEntry, ...entries]);
    return newEntry;
  }, [entries, saveEntries]);

  const deleteEntry = useCallback((id: string) => {
    saveEntries(entries.filter(entry => entry.id !== id));
  }, [entries, saveEntries]);

  const getEntryById = useCallback((id: string) => {
    return entries.find(entry => entry.id === id);
  }, [entries]);

  const getEntriesByDateRange = useCallback((startDate: Date, endDate: Date) => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  }, [entries]);

  const getStats = useCallback(() => {
    if (entries.length === 0) {
      return {
        totalEntries: 0,
        averageIntensity: 0,
        maxIntensity: 0,
        mostAffectedZones: [],
        mostCommonPainTypes: [],
      };
    }

    const intensities = entries.map(e => e.intensity);
    const zoneCount: Record<string, number> = {};
    const typeCount: Record<string, number> = {};

    entries.forEach(entry => {
      entry.zones.forEach(zone => {
        zoneCount[zone] = (zoneCount[zone] || 0) + 1;
      });
      entry.painTypes.forEach(type => {
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
    });

    const sortedZones = Object.entries(zoneCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([zone]) => zone);

    const sortedTypes = Object.entries(typeCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type);

    return {
      totalEntries: entries.length,
      averageIntensity: Math.round(intensities.reduce((a, b) => a + b, 0) / intensities.length * 10) / 10,
      maxIntensity: Math.max(...intensities),
      mostAffectedZones: sortedZones,
      mostCommonPainTypes: sortedTypes,
    };
  }, [entries]);

  return {
    entries,
    isLoading,
    addEntry,
    deleteEntry,
    getEntryById,
    getEntriesByDateRange,
    getStats,
  };
}
