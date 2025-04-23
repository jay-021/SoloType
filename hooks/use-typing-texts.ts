/**
 * Custom hook to manage typing text content for the typing test
 */
import { useState, useEffect } from 'react';
import { getTextsForTest, TypingText } from '@/data/typing-texts';

export interface TextProgressState {
  /** Current active text */
  currentText: string;
  /** Index of the current text in the text array */
  currentTextIndex: number;
  /** Total character count across all texts */
  totalCharacters: number;
  /** Count of completed characters */
  completedCharacters: number;
  /** Percentage progress through the test (0-100) */
  progress: number;
  /** Array of all test texts */
  testTexts: TypingText[];
}

export interface TextProgressActions {
  /** Move to the next text */
  moveToNextText: () => void;
  /** Reset text state */
  resetTexts: () => void;
  /** Update progress based on current typing */
  updateProgress: (currentInputLength: number) => void;
}

export interface UseTypingTextsOptions {
  /** Selected rank for text difficulty */
  rank: string;
  /** Test duration in minutes */
  duration: number;
  /** Whether test is currently active */
  isActive: boolean;
  /** Callback when text is completed (optional) */
  onTextComplete?: (completedText: TypingText) => void;
}

/**
 * Hook for managing typing text content and progression
 * 
 * @param options - Configuration options
 * @returns Text state and control functions
 */
export function useTypingTexts(options: UseTypingTextsOptions): [TextProgressState, TextProgressActions] {
  const { rank, duration, isActive, onTextComplete } = options;
  
  // Text state
  const [testTexts, setTestTexts] = useState<TypingText[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [completedCharacters, setCompletedCharacters] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Load texts when rank or duration changes (and not during active test)
  useEffect(() => {
    if (!isActive) {
      try {
        // Get initial set of texts for the test
        const initialTexts = getTextsForTest(rank, duration);
        
        // Always ensure we have at least 3 texts to prevent running out
        let texts = initialTexts;
        if (initialTexts.length < 3) {
          const additionalTexts = getTextsForTest(rank, duration * 2);
          texts = [...initialTexts, ...additionalTexts];
        }
        
        setTestTexts(texts);
        
        // Set initial text
        if (texts.length > 0) {
          const firstText = texts[0].text;
          setCurrentText(firstText);
          
          // Calculate total characters for progress tracking
          const total = texts.reduce((sum, text) => sum + text.text.length, 0);
          setTotalCharacters(total);
          
          console.log(`Loaded ${texts.length} texts with ${total} total characters`);
        }
      } catch (error) {
        console.error('Error loading texts:', error);
        setTestTexts([]);
      }
    }
  }, [rank, duration, isActive]);
  
  /**
   * Move to next text in the sequence
   */
  const moveToNextText = () => {
    // Always log current status for debugging
    console.log(`Moving to next text. Current index: ${currentTextIndex}, Total texts: ${testTexts.length}`);
    
    if (testTexts.length === 0) {
      console.error('No texts available to move to');
      return;
    }
    
    // Get the text that was just completed
    const completedText = testTexts[currentTextIndex];
    
    if (!completedText) {
      console.error(`No text found at index ${currentTextIndex}`);
      return;
    }
    
    // Add completed text length to the completed characters count
    setCompletedCharacters(prev => prev + currentText.length);
    
    // Call the completion callback if provided
    if (onTextComplete) {
      onTextComplete(completedText);
    }
    
    // Move to next text
    const nextIndex = currentTextIndex + 1;
    
    // Check if we need to load more texts
    const needMoreTexts = nextIndex >= testTexts.length - 1; // If we're on the last or second-to-last text
    
    // If we have another text available, set it as current
    if (nextIndex < testTexts.length) {
      const nextText = testTexts[nextIndex].text;
      setCurrentText(nextText);
      setCurrentTextIndex(nextIndex);
      console.log(`Moving to text ${nextIndex}: "${nextText.substring(0, 30)}..."`);
    } else {
      console.log('Reached the end of available texts, loading more...');
    }
    
    // Always proactively load more texts when needed, even if we still have some left
    if (needMoreTexts) {
      try {
        // Get additional texts - use a larger duration to ensure we have enough
        const newTexts = getTextsForTest(rank, duration * 2);
        console.log(`Loaded ${newTexts.length} additional texts`);
        
        // If we're at the end, use the first new text
        if (nextIndex >= testTexts.length) {
          if (newTexts.length > 0) {
            setCurrentText(newTexts[0].text);
            setCurrentTextIndex(testTexts.length); // Point to first of new texts
            console.log(`Set new current text: "${newTexts[0].text.substring(0, 30)}..."`);
          } else {
            console.error('Failed to load additional texts');
          }
        }
        
        // Update test texts and total characters
        setTestTexts(prev => [...prev, ...newTexts]);
        
        // Calculate additional characters
        const additionalChars = newTexts.reduce((sum, text) => sum + text.text.length, 0);
        setTotalCharacters(prev => prev + additionalChars);
        
        console.log(`Updated total characters to ${totalCharacters + additionalChars}`);
      } catch (error) {
        console.error('Error loading additional texts:', error);
      }
    }
  };
  
  /**
   * Reset text state
   */
  const resetTexts = () => {
    setCurrentTextIndex(0);
    setCompletedCharacters(0);
    setProgress(0);
    
    // Reload a new set of texts for a fresh start
    try {
      const freshTexts = getTextsForTest(rank, duration);
      setTestTexts(freshTexts);
      
      // Reset current text to first text if available
      if (freshTexts.length > 0) {
        setCurrentText(freshTexts[0].text);
        
        // Recalculate total characters
        const total = freshTexts.reduce((sum, text) => sum + text.text.length, 0);
        setTotalCharacters(total);
        
        console.log(`Reset with ${freshTexts.length} new texts`);
      }
    } catch (error) {
      console.error('Error reloading texts on reset:', error);
      
      // Fall back to using existing texts if available
      if (testTexts.length > 0) {
        setCurrentText(testTexts[0].text);
      }
    }
  };
  
  /**
   * Update progress based on current typing
   */
  const updateProgress = (currentInputLength: number) => {
    if (totalCharacters === 0) return false;
    
    // Calculate completed character count
    const totalCompleted = completedCharacters + currentInputLength;
    
    // Calculate overall progress percentage (0-100)
    const progressValue = (totalCompleted / totalCharacters) * 100;
    
    // Update progress state (cap at 100%)
    setProgress(Math.min(progressValue, 100));
    
    // Check if current text is completed
    if (currentInputLength >= currentText.length) {
      moveToNextText();
      return true; // Text was completed
    }
    
    return false; // Text not yet completed
  };
  
  return [
    {
      currentText,
      currentTextIndex,
      totalCharacters,
      completedCharacters,
      progress,
      testTexts
    },
    {
      moveToNextText,
      resetTexts,
      updateProgress
    }
  ];
} 