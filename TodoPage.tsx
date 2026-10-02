import React, { useEffect, useRef } from 'react';
import { mountVanillaTodo } from '../vanilla-todo/todo';

export const TodoPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Mount the pure Vanilla JavaScript To-Do application
    const cleanup = mountVanillaTodo(containerRef.current);

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Vanilla JS DOM Mount Target */}
      <div
        ref={containerRef}
        id="vanilla-todo-host-container"
        className="w-full"
        aria-label="Interactive Vanilla JavaScript To-Do Application"
      />
    </div>
  );
};
