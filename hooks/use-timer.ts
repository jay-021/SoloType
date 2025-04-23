/**
 * Custom hook to manage timer functionality for typing tests
 *
 * Provides timer state and controls for starting, pausing, and stopping the timer
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { debugLog } from '@/lib/logger';

/**
 * Options for the timer configuration
 */
export interface TimerOptions {
  /** Duration in minutes */
  duration: number;
  /** Callback fired when timer completes */
  onComplete?: () => void;
}

/**
 * Current state of the timer
 */
export interface TimerState {
  /** Current time left in seconds */
  timeLeft: number;
  /** Whether the timer is currently active */
  isActive: boolean;
  /** Start time timestamp (for calculating elapsed time) */
  startTime: number;
  /** Elapsed time in milliseconds */
  elapsedTime: number;
}

/**
 * Controls for manipulating the timer
 */
export interface TimerControls {
  /** Start the timer */
  start: () => void;
  /** Pause the timer */
  pause: () => void;
  /** Stop the timer and reset */
  stop: () => void;
  /** Format seconds to mm:ss display */
  formatTime: (seconds: number) => string;
}

/**
 * Hook for managing a countdown timer with start, pause, and stop functionality
 *
 * @param options - Configuration options for the timer
 * @returns Timer state and control functions
 */
export function useTimer({
  duration,
  onComplete,
}: TimerOptions): [TimerState, TimerControls] {
  // Convert minutes to seconds for internal use
  const initialSeconds = duration * 60;

  // State for timer
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Refs to maintain values without triggering re-renders
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeLeftRef = useRef(timeLeft);
  const isActiveRef = useRef(isActive);
  const startTimeRef = useRef(startTime);
  const initialSecondsRef = useRef(initialSeconds);

  // Update refs when state changes
  useEffect(() => {
    timeLeftRef.current = timeLeft;
    isActiveRef.current = isActive;
    startTimeRef.current = startTime;
  }, [timeLeft, isActive, startTime]);

  // Update initial seconds when duration changes
  useEffect(() => {
    const newInitialSeconds = duration * 60;
    initialSecondsRef.current = newInitialSeconds;

    // Only update timeLeft if timer is not active
    if (!isActive) {
      setTimeLeft(newInitialSeconds);
      timeLeftRef.current = newInitialSeconds;
    }
  }, [duration, isActive]);

  // Handle timer countdown
  useEffect(() => {
    debugLog(`Timer effect - isActive: ${isActive}, timeLeft: ${timeLeft}`);

    // Clear any existing interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      debugLog('Cleared existing interval');
    }

    // Set up a new interval if timer is active
    if (isActive) {
      debugLog('Setting up new interval');

      // Track interval start time to ensure accuracy
      const intervalStartMs = Date.now();

      timerRef.current = setInterval(() => {
        // Check if timer should complete
        if (timeLeftRef.current <= 1) {
          debugLog('Timer completed');
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setTimeLeft(0);
          timeLeftRef.current = 0;
          setIsActive(false);
          isActiveRef.current = false;

          if (onComplete) {
            onComplete();
          }
        } else {
          // Calculate new time left
          const newTimeLeft = timeLeftRef.current - 1;
          debugLog(`Timer tick: ${timeLeftRef.current} → ${newTimeLeft}`);
          timeLeftRef.current = newTimeLeft;
          setTimeLeft(newTimeLeft);

          // Update elapsed time
          const now = Date.now();
          const elapsed = now - startTimeRef.current;
          setElapsedTime(elapsed);
        }
      }, 1000);
    }

    // Clean up function
    return () => {
      if (timerRef.current) {
        debugLog('Cleaning up timer interval');
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, onComplete]);

  // Start the timer
  const start = useCallback(() => {
    debugLog('Starting timer');

    // Don't start if already active
    if (isActiveRef.current) {
      debugLog('Timer already active, not starting again');
      return;
    }

    // Clear any existing interval first
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Set start time if not already set
    const now = Date.now();
    setStartTime(now);
    startTimeRef.current = now;

    // Activate timer
    setIsActive(true);
    isActiveRef.current = true;
  }, []);

  // Pause the timer
  const pause = useCallback(() => {
    debugLog('Pausing timer');
    setIsActive(false);
    isActiveRef.current = false;
  }, []);

  // Stop the timer and reset
  const stop = useCallback(() => {
    debugLog('Stopping timer');

    // Clear interval if it exists
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Reset all state
    setIsActive(false);
    isActiveRef.current = false;
    setTimeLeft(initialSecondsRef.current);
    timeLeftRef.current = initialSecondsRef.current;
    setStartTime(0);
    startTimeRef.current = 0;
    setElapsedTime(0);
  }, []);

  // Format time (seconds) to mm:ss string
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return [
    // Timer state
    { timeLeft, isActive, startTime, elapsedTime },
    // Timer controls
    { start, pause, stop, formatTime },
  ];
}
