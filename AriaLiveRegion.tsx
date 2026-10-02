import React from 'react';

interface AriaLiveRegionProps {
  message: string;
  assertiveMessage?: string;
}

export const AriaLiveRegion: React.FC<AriaLiveRegionProps> = ({ message, assertiveMessage }) => {
  return (
    <>
      {/* Polite live region for route transitions and subtle status updates */}
      <div
        id="a11y-status-polite"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>

      {/* Assertive live region for critical validation alerts and errors */}
      <div
        id="a11y-status-assertive"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessage}
      </div>
    </>
  );
};
