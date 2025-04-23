/**
 * Custom hook to manage typing statistics for typing tests
 */
import { useState, useRef, useEffect } from 'react';

export interface TypingStatsOptions {
  /** Whether the typing test is active */
  isActive: boolean;
  /** Start time of the test (timestamp) */
  startTime: number;
  /** Elapsed time in milliseconds */
  elapsedTime: number;
}

export interface TypingStats {
  /** Words per minute */
  wpm: number;
  /** Accuracy percentage (0-100) */
  accuracy: number;
  /** Count of correctly typed characters */
  correctChars: number;
  /** Total characters typed */
  totalChars: number;
  /** Total words typed */
  wordsTyped: number;
  /** Typing speed category ('slow' or 'fast') */
  typingSpeed: 'slow' | 'fast';
  /** Total error count */
  errorCount: number;
}

export interface TypingStatsActions {
  /** Update stats with new typing data */
  updateStats: (data: {
    correctChars: number;
    totalChars: number;
    errorCount: number;
  }) => void;
  /** Add to words typed count */
  addWordsTyped: (count: number) => void;
  /** Reset all statistics */
  resetStats: () => void;
  /** Calculate final statistics */
  calculateFinalStats: () => TypingStats;
}

/**
 * Hook for tracking typing statistics (WPM, accuracy, etc.)
 *
 * @param options - Configuration options
 * @returns Typing statistics and actions
 */
export function useTypingStats(
  options: TypingStatsOptions
): [TypingStats, TypingStatsActions] {
  const { isActive, startTime, elapsedTime } = options;

  // State for tracking typing statistics
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [typingSpeed, setTypingSpeed] = useState<'slow' | 'fast'>('slow');
  const [errorCount, setErrorCount] = useState(0);

  // Refs to avoid unnecessary re-renders and for stable values in callbacks
  const correctCharsRef = useRef(0);
  const totalCharsRef = useRef(0);
  const wordsTypedRef = useRef(0);
  const errorCountRef = useRef(0);
  const lastUpdateRef = useRef(0);

  /**
   * Update typing statistics based on new data
   */
  const updateStats = (data: {
    correctChars: number;
    totalChars: number;
    errorCount: number;
  }) => {
    const { correctChars, totalChars, errorCount: newErrorCount } = data;

    // Update refs with new data
    correctCharsRef.current = correctChars;
    totalCharsRef.current = totalChars;
    errorCountRef.current = newErrorCount;

    // Update error count state for display
    setErrorCount(newErrorCount);

    // Throttle WPM updates to reduce unnecessary calculations
    const now = Date.now();
    if (now - lastUpdateRef.current > 500) {
      updateWpmAndAccuracy();
      lastUpdateRef.current = now;
    }
  };

  /**
   * Calculate and update WPM and accuracy
   */
  const updateWpmAndAccuracy = () => {
    if (!isActive) return;

    try {
      // Calculate elapsed time in minutes with safeguards
      const elapsedMilliseconds = Math.max(Date.now() - startTime, 1); // Ensure positive value
      const elapsedMinutes = Math.max(elapsedMilliseconds / 60000, 0.05); // Minimum 3 seconds (0.05 minutes)

      // Calculate WPM (5 characters = 1 word) with upper limit to catch unrealistic values
      if (elapsedMinutes > 0) {
        // Use *correct* characters for WPM calculation, not total chars
        // Standard definition: WPM = (characters / 5) / minutes
        const rawWpm = correctCharsRef.current / 5 / elapsedMinutes;
        const reasonableWpm = Math.min(Math.round(rawWpm), 250);

        // For debugging
        console.log(
          `WPM calculation: ${correctCharsRef.current} correct chars / 5 = ${correctCharsRef.current / 5} words in ${elapsedMinutes.toFixed(2)} minutes = ${rawWpm.toFixed(1)} raw WPM`
        );

        setWpm(reasonableWpm);

        // Update typing speed category based on capped WPM
        setTypingSpeed(reasonableWpm >= 35 ? 'fast' : 'slow');
      }

      // Calculate accuracy (prevent division by zero)
      if (totalCharsRef.current > 0) {
        setAccuracy(
          Math.round((correctCharsRef.current / totalCharsRef.current) * 100)
        );
      } else {
        setAccuracy(100); // Default when no characters typed
      }
    } catch (error) {
      console.error('Error calculating typing stats:', error);
    }
  };

  /**
   * Add to the words typed count
   */
  const addWordsTyped = (count: number) => {
    wordsTypedRef.current += count;
  };

  /**
   * Reset all statistics
   */
  const resetStats = () => {
    setWpm(0);
    setAccuracy(100);
    setTypingSpeed('slow');
    setErrorCount(0);
    correctCharsRef.current = 0;
    totalCharsRef.current = 0;
    wordsTypedRef.current = 0;
    errorCountRef.current = 0;
    lastUpdateRef.current = 0;
  };

  /**
   * Calculate final statistics
   */
  const calculateFinalStats = () => {
    // Use elapsed time with safeguards for final calculation
    const elapsedMilliseconds = Math.max(elapsedTime, 1);
    const elapsedMinutes = Math.max(elapsedMilliseconds / 60000, 0.05);

    // Calculate final WPM with the same reasonable cap
    let finalWpm = wpm;

    if (elapsedMinutes > 0) {
      // Use the standard WPM calculation: (correct characters / 5) / minutes
      const rawWpm = correctCharsRef.current / 5 / elapsedMinutes;
      finalWpm = Math.min(Math.round(rawWpm), 250);
      console.log(
        `Final WPM: ${correctCharsRef.current} chars / 5 = ${correctCharsRef.current / 5} words in ${elapsedMinutes.toFixed(2)} mins = ${finalWpm} WPM`
      );
    }

    return {
      wpm: finalWpm,
      accuracy,
      correctChars: correctCharsRef.current,
      totalChars: totalCharsRef.current,
      wordsTyped: wordsTypedRef.current,
      typingSpeed,
      errorCount: errorCountRef.current,
    };
  };

  // Update stats periodically when the test is active
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(updateWpmAndAccuracy, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return [
    {
      wpm,
      accuracy,
      correctChars: correctCharsRef.current,
      totalChars: totalCharsRef.current,
      wordsTyped: wordsTypedRef.current,
      typingSpeed,
      errorCount,
    },
    {
      updateStats,
      addWordsTyped,
      resetStats,
      calculateFinalStats,
    },
  ];
}
