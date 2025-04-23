/**
 * Main hook to orchestrate the typing test functionality
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTimer } from '@/hooks/use-timer';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { useTypingTexts } from '@/hooks/use-typing-texts';
import { useKeyboard } from '@/hooks/use-keyboard';
import { TypingText } from '@/data/typing-texts';
import { testResultsService } from '@/services/test-results';
import { errorLog, debugLog } from '@/lib/logger';

// Constants
export const TYPING_RANKS = [
  { id: 'e', label: 'E', className: 'dungeon-rank e-rank' },
  { id: 'd', label: 'D', className: 'dungeon-rank d-rank' },
  { id: 'c', label: 'C', className: 'dungeon-rank c-rank' },
  { id: 'b', label: 'B', className: 'dungeon-rank b-rank' },
  { id: 'a', label: 'A', className: 'dungeon-rank a-rank' },
  { id: 's', label: 'S', className: 'dungeon-rank s-rank' },
];

// Test durations in minutes
export const TEST_DURATIONS = [0.5, 1, 2, 3, 5, 10, 15];

// State interfaces
export interface TypingTestState {
  // Settings
  selectedDuration: number;
  selectedRank: string;
  isTestActive: boolean;
  testCompleted: boolean;

  // Typing state
  typedText: string;

  // Derived stats
  timeLeft: number;
  wpm: number;
  accuracy: number;
  progress: number;
  activeKeys: string[];
  typingSpeed: 'slow' | 'fast';
  errorCount: number;

  // Text data
  currentText: string;
  completedCharacters: number;
  totalCharacters: number;

  // Final stats for test completion
  finalStats: {
    wpm: number;
    accuracy: number;
    duration: number;
    rank: string;
    charactersTyped: number;
    wordsTyped: number;
  } | null;

  // Saving state
  isSaving: boolean;
  saveError: string | null;
}

export interface TypingTestControls {
  // Test controls
  startTest: () => void;
  endTest: () => void;
  handleTyping: (value: string) => void;

  // Setting controls
  setSelectedDuration: (duration: number) => void;
  setSelectedRank: (rank: string) => void;

  // Keyboard event handlers
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  // UI helpers
  formatTime: (seconds: number) => string;
  formatDuration: (duration: number) => string;
  getRankEffect: () => string;
  renderFormattedText: () => JSX.Element | null;

  // Test result actions
  handleRetry: () => void;
  handleNewTest: () => void;
  saveResults: () => Promise<boolean>;
}

export interface UseTypingTestOptions {
  /** Callback when typing speed changes */
  onTypingSpeedChange?: (speed: 'slow' | 'fast') => void;
  /** Callback when the test is completed */
  onTestComplete?: (stats: TypingTestState['finalStats']) => void;
  /** Auto-save results when test completes */
  autoSaveResults?: boolean;
}

/**
 * Hook that orchestrates all typing test functionality
 *
 * @param options - Configuration options
 * @returns Typing test state and control functions
 */
export function useTypingTest(
  options: UseTypingTestOptions = {}
): [TypingTestState, TypingTestControls] {
  const {
    onTypingSpeedChange,
    onTestComplete,
    autoSaveResults = true,
  } = options;

  // Test settings
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedRank, setSelectedRank] = useState('e');
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [typedText, setTypedText] = useState('');

  // Final stats storage
  const [finalStats, setFinalStats] =
    useState<TypingTestState['finalStats']>(null);

  // Saving state
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Input ref for focusing
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Set up timer
  const [timerState, timerControls] = useTimer({
    duration: selectedDuration,
    onComplete: () => endTest(),
  });

  // Set up typing stats tracking
  const [typingStats, typingStatsActions] = useTypingStats({
    isActive: isTimerStarted,
    startTime: timerState.startTime,
    elapsedTime: timerState.elapsedTime,
  });

  // Set up text management
  const [textState, textActions] = useTypingTexts({
    rank: selectedRank,
    duration: selectedDuration,
    isActive: isTestActive,
    onTextComplete: (completedText: TypingText) => {
      // Count words in the completed text
      const wordsInText = completedText.text
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      typingStatsActions.addWordsTyped(wordsInText);
    },
  });

  // Set up keyboard handling
  const [activeKeys, keyboardHandlers] = useKeyboard({
    onEnterPressed: () => {
      if (!isTestActive && !testCompleted) {
        startTest();
      }
    },
  });

  // Update global typing speed when local speed changes
  useEffect(() => {
    if (onTypingSpeedChange) {
      onTypingSpeedChange(typingStats.typingSpeed);
    }
  }, [typingStats.typingSpeed, onTypingSpeedChange]);

  /**
   * Start the typing test
   */
  const startTest = () => {
    console.log('startTest called - starting typing test');

    // First stop any existing test completely
    if (isTestActive) {
      console.log('Stopping existing active test');
      timerControls.stop();
      setIsTestActive(false);
      setIsTimerStarted(false);
    }

    // Reset all state
    setTypedText('');
    setTestCompleted(false);
    setSaveError(null);

    // Clear final stats
    setFinalStats(null);

    // Reset text state
    textActions.resetTexts();

    // Reset stats
    typingStatsActions.resetStats();

    // Clear any active keys
    keyboardHandlers.clearActiveKeys();

    // Activate the test
    console.log('Setting test to active');
    setIsTestActive(true);

    // Timer will start on first keystroke
    setIsTimerStarted(false);

    // Focus input (using ref from parent)
    setTimeout(() => {
      console.log('Input should be focused now');
      // Input focus is handled in the component
    }, 100);
  };

  /**
   * End the typing test
   */
  const endTest = async () => {
    // First set test as not active to prevent further updates
    setIsTestActive(false);
    setIsTimerStarted(false);

    // Stop timer
    timerControls.stop();

    // Calculate final stats
    const stats = typingStatsActions.calculateFinalStats();

    // Create final stats object
    const finalStatsObject = {
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      duration: selectedDuration,
      rank: selectedRank,
      charactersTyped: stats.totalChars,
      wordsTyped: stats.wordsTyped,
    };

    // Reset UI state
    setTypedText('');
    keyboardHandlers.clearActiveKeys();

    // Mark test as completed and set final stats
    setTestCompleted(true);
    setFinalStats(finalStatsObject);

    // Call onTestComplete callback if provided
    if (onTestComplete) {
      onTestComplete(finalStatsObject);
    }

    // Auto-save results if enabled
    if (autoSaveResults) {
      await saveResults();
    }
  };

  /**
   * Save test results to the server
   */
  const saveResults = async (): Promise<boolean> => {
    if (!finalStats) return false;

    // Set saving status
    setIsSaving(true);
    setSaveError(null);

    try {
      // Match the parameters expected by the backend API
      await testResultsService.saveResult({
        wpm: finalStats.wpm,
        accuracy: finalStats.accuracy,
        duration: finalStats.duration,
        difficulty: finalStats.rank,
        wordsTyped: finalStats.wordsTyped,
        selectedRank: finalStats.rank,
        // Ensure we're including all required fields
        createdAt: new Date().toISOString(),
      });

      setIsSaving(false);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to save results';
      setSaveError(errorMessage);
      setIsSaving(false);
      return false;
    }
  };

  /**
   * Handle typing input
   */
  const handleTyping = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement> | null, value: string = '') => {
      // Don't process if test is not active
      if (!isTestActive) {
        debugLog('Test is not active, ignoring input', { isTestActive });
        return;
      }

      console.log(
        'handleTyping called with value:',
        value.substring(0, 10) + (value.length > 10 ? '...' : '')
      );

      // Start timer on first keystroke if not started yet
      if (!isTimerStarted && value.length > 0) {
        console.log('Starting timer on first keystroke', {
          isTimerStarted,
          valueLength: value.length,
        });
        timerControls.start();
        setIsTimerStarted(true);

        // Debug logging for timer initiation
        debugLog('Timer started', {
          isActive: timerState.isActive,
          timeLeft: timerState.timeLeft,
        });
      }

      // Check timer is running properly
      // This helps detect if timer stopped unexpectedly
      if (isTimerStarted && !timerState.isActive && timerState.timeLeft > 0) {
        debugLog('Timer not active but should be, restarting', {
          isTimerStarted,
          timerActive: timerState.isActive,
          timeLeft: timerState.timeLeft,
        });
        timerControls.start();
      }

      setTypedText(value);

      // Process characters for stats
      const correctChars = value
        .split('')
        .filter((char, i) => textState.currentText.charAt(i) === char).length;

      // Update statistics
      typingStatsActions.updateStats({
        correctChars,
        totalChars: value.length,
        errorCount: value.length - correctChars,
      });

      // If the current text is completed with good accuracy, move to the next one
      if (value.length >= textState.currentText.length) {
        // Check if the typed text is mostly correct (at least 50% accuracy)
        const accuracy = (correctChars / value.length) * 100;
        if (accuracy >= 50) {
          textActions.moveToNextText();
          setTypedText(''); // Clear the input for the next text
        }
      }
    },
    [
      isTestActive,
      isTimerStarted,
      timerControls,
      timerState,
      typingStatsActions,
      textState,
    ]
  );

  /**
   * Format time for display
   */
  const formatTime = (seconds: number) => {
    return timerControls.formatTime(seconds);
  };

  /**
   * Format duration for display
   */
  const formatDuration = (duration: number) => {
    if (duration === 0.5) return '30 sec';
    return `${duration} min`;
  };

  /**
   * Get CSS class for rank-based effects
   */
  const getRankEffect = () => {
    const rankInfo = TYPING_RANKS.find((r) => r.id === selectedRank);
    if (!rankInfo) return '';

    switch (rankInfo.id) {
      case 's':
        return 'rank-effect-s';
      case 'a':
        return 'rank-effect-a';
      case 'b':
        return 'rank-effect-b';
      default:
        return '';
    }
  };

  /**
   * Handle retry button click
   */
  const handleRetry = () => {
    // Reset state and start a new test with the same settings
    setFinalStats(null);
    setTestCompleted(false);
    setSaveError(null);

    // Small delay to ensure UI updates
    setTimeout(() => startTest(), 50);
  };

  /**
   * Handle new test button click
   */
  const handleNewTest = () => {
    // Reset to default state for a completely new test
    setFinalStats(null);
    setTestCompleted(false);
    setSaveError(null);

    // Allow user to select new settings before starting
  };

  /**
   * Render the formatted text with highlighting for typed characters
   */
  const renderFormattedText = () => {
    if (!textState.currentText) return null;

    // Split text into segments for highlighting
    return (
      <div className="text-lg leading-relaxed">
        {textState.currentText.split('').map((char, index) => {
          let className = 'text-gray-400'; // Default untyped text

          if (index < typedText.length) {
            // Character has been typed
            if (char === typedText[index]) {
              className = 'text-white'; // Correct character
            } else {
              className = 'text-red-500'; // Incorrect character
            }
          } else if (index === typedText.length) {
            className =
              'text-white border-b-2 border-solo-purple animate-pulse'; // Current position
          }

          // Use non-breaking space for actual spaces
          const displayChar = char === ' ' ? '\u00A0' : char;

          return (
            <span key={index} className={className}>
              {displayChar}
            </span>
          );
        })}
      </div>
    );
  };

  // Return state and controls
  return [
    {
      // Settings
      selectedDuration,
      selectedRank,
      isTestActive,
      testCompleted,

      // Typing state
      typedText,

      // Stats
      timeLeft: timerState.timeLeft,
      wpm: typingStats.wpm,
      accuracy: typingStats.accuracy,
      progress: (typedText.length / (textState.currentText?.length || 1)) * 100,
      activeKeys,
      typingSpeed: typingStats.typingSpeed,
      errorCount: typingStats.errorCount,

      // Text data
      currentText: textState.currentText,
      completedCharacters: textState.completedCharacters,
      totalCharacters: textState.totalCharacters,

      // Final stats
      finalStats,

      // Saving state
      isSaving,
      saveError,
    },
    {
      // Test controls
      startTest,
      endTest,
      handleTyping,

      // Settings controls
      setSelectedDuration,
      setSelectedRank,

      // Keyboard event handlers
      handleKeyDown: keyboardHandlers.handleKeyDown,
      handleKeyUp: keyboardHandlers.handleKeyUp,

      // UI helpers
      formatTime,
      formatDuration,
      getRankEffect,
      renderFormattedText,

      // Result actions
      handleRetry,
      handleNewTest,
      saveResults,
    },
  ];
}
