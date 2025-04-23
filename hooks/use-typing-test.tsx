/**
 * Main hook to orchestrate the typing test functionality
 */
import { useState, useRef, useEffect } from 'react';
import { useTimer } from '@/hooks/use-timer';
import { useTypingStats } from '@/hooks/use-typing-stats';
import { useTypingTexts } from '@/hooks/use-typing-texts';
import { useKeyboard } from '@/hooks/use-keyboard';
import { TypingText } from '@/data/typing-texts';
import { testResultsService } from '@/services/test-results';
import { errorLog } from '@/lib/logger';

// Constants
export const TYPING_RANKS = [
  { id: "e", label: "E", className: "dungeon-rank e-rank" },
  { id: "d", label: "D", className: "dungeon-rank d-rank" },
  { id: "c", label: "C", className: "dungeon-rank c-rank" },
  { id: "b", label: "B", className: "dungeon-rank b-rank" },
  { id: "a", label: "A", className: "dungeon-rank a-rank" },
  { id: "s", label: "S", className: "dungeon-rank s-rank" },
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
export function useTypingTest(options: UseTypingTestOptions = {}): [TypingTestState, TypingTestControls] {
  const { 
    onTypingSpeedChange, 
    onTestComplete, 
    autoSaveResults = true 
  } = options;
  
  // Test settings
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedRank, setSelectedRank] = useState('e');
  const [isTestActive, setIsTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  // Final stats storage
  const [finalStats, setFinalStats] = useState<TypingTestState['finalStats']>(null);
  
  // Saving state
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Input ref for focusing
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  // Set up timer
  const [timerState, timerControls] = useTimer({
    duration: selectedDuration,
    onComplete: () => endTest()
  });
  
  // Set up typing stats tracking
  const [typingStats, typingStatsActions] = useTypingStats({
    isActive: isTestActive,
    startTime: timerState.startTime,
    elapsedTime: timerState.elapsedTime
  });
  
  // Set up text management
  const [textState, textActions] = useTypingTexts({
    rank: selectedRank,
    duration: selectedDuration,
    isActive: isTestActive,
    onTextComplete: (completedText: TypingText) => {
      // Count words in the completed text
      const wordsInText = completedText.text.split(/\s+/).filter(word => word.length > 0).length;
      typingStatsActions.addWordsTyped(wordsInText);
    }
  });
  
  // Set up keyboard handling
  const [activeKeys, keyboardHandlers] = useKeyboard({
    onEnterPressed: () => {
      if (!isTestActive && !testCompleted) {
        startTest();
      }
    }
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
    // Reset all state
    setTypedText('');
    setTestCompleted(false);
    setSaveError(null);
    
    // Reset text state
    textActions.resetTexts();
    
    // Reset stats
    typingStatsActions.resetStats();
    
    // Start the timer
    timerControls.start();
    
    // Activate test
    setIsTestActive(true);
    
    // Focus input
    if (inputRef.current) {
      // Prevent any default browser behavior
      inputRef.current.blur();
      inputRef.current.focus();
    }
  };
  
  /**
   * End the typing test
   */
  const endTest = async () => {
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
      wordsTyped: stats.wordsTyped
    };
    
    // Set final results
    setFinalStats(finalStatsObject);
    
    // Mark test as completed
    setIsTestActive(false);
    setTestCompleted(true);
    
    // Reset UI state
    setTypedText('');
    keyboardHandlers.clearActiveKeys();
    
    // Call completion callback if provided
    if (onTestComplete) {
      onTestComplete(finalStatsObject);
    }
    
    // Auto-save if enabled
    if (autoSaveResults) {
      try {
        await saveResults();
      } catch (error) {
        // Error is handled in saveResults function
        // Just log it here for debugging purposes
        errorLog('Auto-save failed:', error);
      }
    }
  };
  
  /**
   * Save test results to the server
   */
  const saveResults = async (): Promise<boolean> => {
    // Check if we have final stats
    if (!finalStats) {
      return false;
    }
    
    // Set saving state
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // Save to server
      await testResultsService.saveTestResult({
        wpm: finalStats.wpm,
        accuracy: finalStats.accuracy,
        duration: finalStats.duration,
        difficulty: finalStats.rank,
        wordsTyped: finalStats.wordsTyped
      });
      
      // Successfully saved
      setIsSaving(false);
      return true;
    } catch (error) {
      // Handle error
      setIsSaving(false);
      setSaveError('Failed to save results. Please try again or log in if you\'re not already logged in.');
      errorLog('Error saving test results:', error);
      return false;
    }
  };
  
  /**
   * Handle user typing
   */
  const handleTyping = (value: string) => {
    if (!isTestActive) return;
    
    setTypedText(value);
    
    // Process the typed text
    const currentSourceText = textState.currentText;
    
    if (value.length > currentSourceText.length) {
      // User has typed beyond the current text
      // This shouldn't normally happen due to UI constraints,
      // but we handle it gracefully just in case
      textActions.moveToNextText();
      setTypedText('');
      return;
    }
    
    if (value === currentSourceText) {
      // User has completed the current text exactly
      textActions.moveToNextText();
      setTypedText('');
      return;
    }
    
    // Update typing stats with the latest typed text
    typingStatsActions.updateStats(value, currentSourceText);
  };
  
  /**
   * Format time for display (MM:SS)
   */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  /**
   * Format duration for display
   */
  const formatDuration = (duration: number) => {
    if (duration < 1) {
      return `${duration * 60} sec`;
    }
    return `${duration} min`;
  };
  
  /**
   * Get the appropriate rank effect for UI
   */
  const getRankEffect = () => {
    // Map rank to effect class
    const rankEffectMap: Record<string, string> = {
      'e': 'effect-none', 
      'd': 'effect-fire',
      'c': 'effect-lightning',
      'b': 'effect-ice',
      'a': 'effect-shadow',
      's': 'effect-divine'
    };
    
    return rankEffectMap[selectedRank] || 'effect-none';
  };
  
  /**
   * Retry with same settings
   */
  const handleRetry = () => {
    // Reset all state
    setFinalStats(null);
    setTestCompleted(false);
    
    // Start a new test with the same settings
    startTest();
  };
  
  /**
   * Prepare for a new test
   */
  const handleNewTest = () => {
    // Reset all state to allow for new settings
    setFinalStats(null);
    setTestCompleted(false);
    
    // Don't auto-start the test
    // Let the user change settings first
  };
  
  /**
   * Render the text with formatting based on typing state
   */
  const renderFormattedText = () => {
    if (!textState.currentText) return null;
    
    // Create an array of JSX elements for each character with appropriate styling
    const renderedText = textState.currentText.split('').map((char, index) => {
      let className = "text-gray-400"; // default untyped color
      
      if (index < typedText.length) {
        // For typed characters
        className = typedText[index] === char ? "text-green-500" : "text-red-500";
      } else if (index === typedText.length) {
        // Current character to type
        className = "text-solo-purple-light underline";
      }
      
      return (
        <span 
          key={index} 
          className={className}
          style={{ 
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            letterSpacing: '0.05rem'
          }}
        >
          {char}
        </span>
      );
    });
    
    return <>{renderedText}</>;
  };
  
  // Set inputRef for external components to use 
  const setInputRefExternal = (ref: HTMLInputElement | null) => {
    inputRef.current = ref;
  };
  
  return [
    {
      // Settings
      selectedDuration,
      selectedRank,
      isTestActive,
      testCompleted,
      
      // Typing state
      typedText,
      
      // Derived stats
      timeLeft: timerState.timeLeft,
      wpm: typingStats.wpm,
      accuracy: typingStats.accuracy,
      progress: textState.progress,
      activeKeys,
      typingSpeed: typingStats.typingSpeed,
      
      // Text data
      currentText: textState.currentText,
      completedCharacters: textState.completedCharacters,
      totalCharacters: textState.totalCharacters,
      
      // Final stats
      finalStats,
      
      // Saving state
      isSaving,
      saveError
    },
    {
      // Controls
      startTest,
      endTest,
      handleTyping,
      
      // Setting controls
      setSelectedDuration,
      setSelectedRank,
      
      // Keyboard handlers
      handleKeyDown: keyboardHandlers.handleKeyDown,
      handleKeyUp: keyboardHandlers.handleKeyUp,
      
      // UI helpers
      formatTime,
      formatDuration,
      getRankEffect,
      renderFormattedText,
      
      // Test result actions
      handleRetry,
      handleNewTest,
      saveResults
    }
  ];
} 