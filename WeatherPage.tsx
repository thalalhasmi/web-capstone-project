import React, { useEffect, useRef } from 'react';
import { mountVanillaWeather } from '../vanilla-weather/weather';

export const WeatherPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Mount the pure Vanilla JavaScript Weather Dashboard
    const cleanup = mountVanillaWeather(containerRef.current);

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Vanilla JS Weather Mount Target */}
      <div
        ref={containerRef}
        id="vanilla-weather-host-container"
        className="w-full"
        aria-label="Real-Time Meteorological Dashboard Application"
      />
    </div>
  );
};
