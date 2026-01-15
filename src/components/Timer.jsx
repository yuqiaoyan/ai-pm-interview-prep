import { useState, useEffect } from 'react';
import './Timer.css';

function Timer({ isVisible, onToggleVisibility, onTick, resetKey }) {
  const [seconds, setSeconds] = useState(0);

  // Reset timer when resetKey changes (new question)
  useEffect(() => {
    setSeconds(0);
  }, [resetKey]);

  // Timer interval
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        const newSeconds = prevSeconds + 1;
        if (onTick) {
          onTick(newSeconds);
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTick]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-inline">
      {isVisible && (
        <div className="timer-display-inline">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="timer-time">{formatTime(seconds)}</span>
        </div>
      )}
      <button
        className="timer-toggle-btn"
        onClick={onToggleVisibility}
        title={isVisible ? "Hide timer" : "Show timer"}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          {isVisible ? (
            <path d="M2 8C2 8 4 4 8 4C12 4 14 8 14 8C14 8 12 12 8 12C4 12 2 8 2 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <>
              <path d="M2 8C2 8 4 4 8 4C12 4 14 8 14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3" y1="13" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </>
          )}
          {isVisible && <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>}
        </svg>
      </button>
    </div>
  );
}

export default Timer;
